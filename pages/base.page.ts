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

    private errorMessageByLabel(label: string): string {
        return `//p[text()="${label}"]//ancestor::div[contains(@class, "has-")]//*[contains(@id,"-error-msg")]`;
    }

    private phoneDropDown(): string {
        return '.iti-arrow';
    }

    private phoneDropDownItemByCountryCode(value: string): string {
        return `[data-country-code="${value}"]`;
    }

    private selectedFlagByCountryCode(countryCode: string): string {
        return `.selected-flag .iti-flag.${countryCode}`;
    }

    private warningMessageText(): string {
        return '.ant-modal-confirm-content';
    }

    private rentgrataLogo(): string {
        return '[class="anticon"] [alt="Rentgrata logo"]';
    }

    private downloadOnAppStore(): string {
        return '[alt="Rentgrata iOS app download button"]'
    }

    // date picker start
    private get datePickerElement(): string {
        return `.flatpickr-calendar.open`;
    }

    private yearInput(): string {
        return `${this.datePickerElement} .numInput.cur-year`;
    }

    private monthSelect(): string {
        return `${this.datePickerElement} .flatpickr-monthDropdown-months`;
    }

    private day(month: string, day: string, year: string): string {
        // e.g. October 9, 2020
        return `${this.datePickerElement} [aria-label="${month} ${day}, ${year}"]`;
    }

    // date picker end

    selectDataInDatePicker(date: { day: string, month: string, year: string }) {
        if (this.wd.isSafari()) {
            this.wd.click(this.yearInput(), true);
        }
        this.wd.setValue(this.yearInput(), date.year, !this.wd.isSafari());
        this.wd.setDropDownValueByText(this.monthSelect(), date.month);
        this.wd.click(this.day(date.month, date.day, date.year), this.wd.isSafari());
    }

    clickOnButtonByText(text: string, waitForAnimationSec = 0) {
        this.allure.startStep(`Click on [${text}] button`);
        this.wd.wait(waitForAnimationSec)
        this.wd.click(this.buttonByText(text), this.wd.isSafari());
        this.allure.endStep();
        return this;
    }

    clickOnRentgrataLogo(count = 2) {
        this.allure.startStep(`Click on [Rentgrata Logo]`);
        this.wd.click(this.rentgrataLogo());
        this.waitForWindowsCount(count);
        this.allure.endStep();
        return this;
    }

    clickOnDownloadOnTheAppStore(count = 2) {
        this.allure.startStep(`Click on [Download on the APP Store]`);
        this.wd.click(this.downloadOnAppStore());
        this.waitForWindowsCount(count);
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

    switchToFirstOpenedWindow() {
        this.allure.startStep('Switch to first opened window');
        this.wd.switchToWindowHandle(0);
        this.allure.endStep();
        return this;
    }

    waitForWindowsCount(count: number) {
        browser.waitUntil(() => browser.getWindowHandles().length === count);
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
        this.wd.waitForPageToLoad();
        if (browser.isMobile) {
            this.wd.wait(2);
        }
        this.wd.closeFrame();
        this.wd.switchToFrame(this.widgetIFrame());
        this.allure.endStep();
        return this;
    }

    reload() {
        browser.reloadSession();
        browser.url('');
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

    isMobile(): boolean {
        return this.wd.isMobile();
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

    refreshPage() {
        this.allure.startStep('Refresh the page');
        this.wd.refresh();
        this.allure.endStep();
        return this;
    }

    selectCountry(countryCode: string, countryName: string) {
        this.allure.startStep(`Select ${countryName} country from phone dropdown`);
        this.wd.selectFromDropDown(this.phoneDropDown(), this.phoneDropDownItemByCountryCode(countryCode));
        this.allure.endStep();
        return this;
    }

    capitalizeFirstCharacter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    // mobile
    hideKeyboard() {
        if (browser.isMobile) {
            this.wd.hideKeyboard();
            this.wd.wait(1);
            if (browser.isKeyboardShown()) {
                this.wd.nativeClick("header");
            }
            try {
                browser.waitUntil(() => !browser.isKeyboardShown())
            } catch (e) {}
            this.wd.wait(1);
        }
        return this;
    }

    /** verifications **/
    verifyUrl(url: string) {
        this.allure.startStep(`Verify current url is ${url}`);
        this.expect(
            this.wd.getUrl(),
            'Incorrect url'
        ).to.be.equal(url);
        this.allure.endStep();
        return this;
    }

    verifySelectedFlag(dialCode: string, countryName: string) {
        this.allure.startStep(`Verify is flag for ${countryName} country displayed`);
        this.expect(
            this.wd.isElementVisible(this.selectedFlagByCountryCode(dialCode)),
            `Incorrect country flag for selected ${countryName} country is displayed`
        ).to.be.true;
        this.allure.endStep();
        return this;
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

    verifyErrorMessageUnderField(field: string, expectedError: string, shouldBeDisplayed = true) {
        this.allure.startStep(`Verify [${expectedError}] error message is ${shouldBeDisplayed ? 'displayed' : 'not displayed'} under ${field}`);
        if (!shouldBeDisplayed) {
            this.wd.pause(500);
            this.expect(
                this.wd.isElementVisible(this.errorMessageByLabel(field)),
                `Element with error message should not be displayed`
            ).to.be.false;
        } else {
            this.expect(
                this.wd.getText(this.errorMessageByLabel(field)),
                `Incorrect error message is displayed under ${field} field`
            ).to.be.equal(expectedError)
        }
        this.allure.endStep();
        return this;
    }

    verifyWarningMessageText(text: string) {
        this.allure.startStep(`Verify warning message text is ${text}`);
        this.expect(
            this.wd.getText(this.warningMessageText()),
            'Warning message is incorrect'
        ).to.be.equal(text);
        this.allure.endStep();
        return this;
    }

    verifyIsWarningDisplayed(expected= true) {
        this.allure.startStep(this.verifyAllureMessage('warning message'));
        try {
            this.wd.waitForDisplayed(this.warningMessageText(), !expected,3000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.warningMessageText()),
            this.displayedErrorMessage('warning message', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }
}