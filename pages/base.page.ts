import { expect }  from "chai";
import { WDIO } from "../core/wdio";
import { AllureReporterInterface } from "../interfaces/allureReporter.interface";
import allure from "@wdio/allure-reporter";

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

    /** verifications **/
}