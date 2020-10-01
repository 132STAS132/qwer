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

    clickOnButtonByText(text: string): this {
        this.allure.startStep(`Click on [${text}] button`);
        this.wd.click(this.buttonByText(text));
        this.allure.endStep();
        return this;
    }

    /** verifications **/
}