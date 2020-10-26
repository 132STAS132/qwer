import { BasePage } from "../base.page";

export class ContactPropertySuccessComponent extends BasePage {
    /** selectors **/
    successFormWrapper(): string {
        return '.contact-property-success-wrapper__success-info';
    }
    /** actions **/

    /** verifications **/
    verifySuccessFormIsDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('success form'));
        this.wd.waitForDisplayed(this.successFormWrapper(), !expected);
        this.expect(
            this.wd.isElementVisible(this.successFormWrapper()),
            this.displayedErrorMessage('success form', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }
}