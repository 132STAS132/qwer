import { expect }  from "chai";
import { WDIO } from "../core/wdio";
import { AllureReporterInterface } from "../interfaces/allureReporter.interface";
import allure from "@wdio/allure-reporter";
import dateFormat = require('dateformat');

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

    private chatWithResidentIFrame(): string {
        return '[id*="zoid-rg-widget-messenger"] iframe';
    }

    clickOnButtonByText(text: string): this {
        this.allure.startStep(`Click on [${text}] button`);
        this.wd.click(this.buttonByText(text), this.wd.isSafari());
        this.allure.endStep();
        return this;
    }

    goToWidgetIFrame(): this {
        this.allure.startStep('Switch to widget iFrame');
        this.wd.closeFrame();
        this.wd.switchToFrame(this.widgetIFrame());
        this.allure.endStep();
        return this;
    }

    gotoChatOrContactIFrame(): this {
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

    clickOnCloseIcon(): this {
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

    clickOnBackIcon(): this {
        this.allure.startStep('Click on back icon');
        this.wd.click(this.backIcon());
        this.allure.endStep();
        return this;
    }

    /** verifications **/
}