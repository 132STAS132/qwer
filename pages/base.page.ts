import { expect }  from "chai";
import { WDIO } from "../core/wdio";
import { AllureReporterInterface } from "../interfaces/allureReporter.interface";
import allure from "@wdio/allure-reporter";
import dateFormat = require('dateformat');
import { mailTrapApi } from "../helpers/mailTrapApi";
import parseTextContent = require('parse-html-text-content');
import fs = require('fs');

export class BasePage {

    protected wd: WDIO;
    protected expect: Chai.ExpectStatic;
    protected allure: AllureReporterInterface;

    constructor() {
        this.wd = new WDIO();
        this.expect = expect;
        this.allure = allure;
    }


    /** locators **/
    protected buttonByText(text: string): string {
        return `//span[text()="${text}"]/ancestor::button`;
    }

    /** actions **/
    protected verifyAllureMessage(element: string): string {
        return `Verify is ${element} displayed`;
    }

    protected displayedErrorMessage(element: string, expected: boolean): string {
        return `${element} should${expected ? '' : ' not'} be displayed`
    }

    protected get widgetMessengerId(): string {
        return '#rg-widget-messenger';
    }

    private closeChatOrContactFormIcon(): string {
        return 'i.close-icon';
    }

    private backIcon(): string {
        return '[aria-label="icon: back"]';
    }

    private widgetIFrame(): string {
        return '[id*=zoid-rg-widget-feature-icons] .zoid-component-frame.zoid-visible';
    }

    private loadingIFrame(): string {
        return '.zoid-tag-rg-widget-messenger .zoid-component-frame.zoid-visible';
    }

    private chatWithResidentIFrame(): string {
        return '[id*="zoid-rg-widget-messenger"] iframe';
    }

    private leftArrowButton(): string {
        return '.anticon.anticon-left';
    }

    private txtContainer(): string {
        return '.container';
    }

    clickOnButtonByText(text: string) {
        this.allure.startStep(`Click on [${text}] button`);
        this.wd.click(this.buttonByText(text), this.wd.isSafari());
        this.allure.endStep();
        return this;
    }

    switchToNewWindowAndCloseCurrent() {
        this.allure.startStep('Switch to new windows and close');
        const url = this.wd.getUrl()
        this.wd.switchToSecondWindow();
        this.wd.closeCurrentWindow();
        this.wd.switchWindow(url);
        this.allure.endStep();
        return this;
    }

    closeWindowAndSwitchToOpened() {
        this.allure.startStep('Close current window and switch to opened');
        this.wd.closeCurrentWindow();
        this.wd.switchToWindowHandle(0);
        this.allure.endStep();
        return this;
    }

    goToWidgetIFrame() {
        this.allure.startStep('Switch to widget iFrame');
        this.wd.closeFrame();
        this.wd.switchToFrame(this.widgetIFrame());
        this.allure.endStep();
        return this;
    }

    goToLoadingIframe() {
        this.allure.startStep('Switch to loading iFrame');
        this.wd.closeFrame();
        this.wd.switchToFrame(this.loadingIFrame());
        this.allure.endStep();
        return this;
    }

    gotoChatOrContactIFrame() {
        this.allure.startStep('Switch to chat with resident iFrame');
        this.wd.closeFrame();
        this.wd.switchToFrame(this.chatWithResidentIFrame());
        this.allure.endStep();
        return this;
    }

    getDateFromToday(plus: number): { day: string, dayLeadingZero: string, year: string, monthDigits: string, monthFullName: string } {
        const now = new Date();
        const tomorrow = now.setDate(now.getDate() + plus);
        return  {
            day: dateFormat(tomorrow, 'd'),
            dayLeadingZero: dateFormat(tomorrow, 'dd'),
            year: dateFormat(tomorrow, 'yyyy'),
            monthDigits: dateFormat(tomorrow, 'mm'),
            monthFullName: dateFormat(tomorrow, 'mmmm')
        }
    }

    clickOnCloseIcon() {
        this.allure.startStep('Close form');
        // could by flaky due to animation
        this.wd.wait(2);
        this.wd.click(this.closeChatOrContactFormIcon(), this.wd.isSafari());
        try {
            this.wd.waitForDisplayed(this.closeChatOrContactFormIcon(), false,3000);
        } catch (e) {}
        this.allure.endStep();
        return this;
    }

    clickOnBackIcon() {
        this.allure.startStep('Click on back icon');
        this.wd.click(this.backIcon());
        this.allure.endStep();
        return this;
    }

    clickOnLeftArrowButton() {
        this.allure.startStep('Click on left arrow button');
        this.wd.click(this.leftArrowButton());
        this.allure.endStep();
        return this;
    }

    getFromMailTrapEmailVerificationCode(email: string) {
        let messageInfo = null;

        browser.waitUntil( () => browser.call(async () => {
            try {
                messageInfo = await mailTrapApi.getInboxMessageByTo(email);
                return true
            } catch (e) {
                return false;
            }

        }),
        {
            interval: 2000,
            timeoutMsg: `Message to ${email} has not received`,
        });

        let text = null;
        browser.waitUntil(() => browser.call(async () => {
            try {
                const data  = await mailTrapApi.getEmailBodyById(messageInfo['id']);
                text = data.data;
                return true;
            } catch (e) {
                return false;
            }
        }),
            {
                interval: 2000,
                timeoutMsg: `Can not get data for message with ${messageInfo['id']} id`,
        });
        text = browser.call(() => parseTextContent(text));
        return text.match(/\d+/)[0];
    }

    verifyTxtFile(fileName: string, selector = this.txtContainer()) {
        this.wd.waitForPageToLoad();
        this.allure.startStep(`Verify ${fileName} html`);
        const pathToTxt = process.env.PATH_TO_TXT_TEST_DATA + `/${fileName}.txt`;
        let data = this.wd.getText(selector)
            .replace(/\n/g,'')
            .replace(/\s/g,'');
        // fs.writeFileSync(pathToTxt, data);
        let savedTxt = fs.readFileSync(pathToTxt,'utf-8')
            .replace(/\n/g,'')
            .replace(/\s/g,'');
        this.expect(data,`Incorrect text is displayed`).to.be.equal(savedTxt);
        return this;
    }

    /** verifications **/
}