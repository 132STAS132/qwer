import { BasePage } from "../base.page";

export class ContactComponent extends BasePage {
    /** locators **/
    contactPropertyForm(): string {
        return 'section.contact-property-container';
    }

    /** actions **/

    /** verifications **/
    verifyContactPropertyFormIsDisplayed(expected = true) {
        const element = 'Contact property form';
        this.allure.startStep(this.verifyAllureMessage(element));
        // waiting for animation
        try {
            this.wd.waitForDisplayed(this.contactPropertyForm(), !expected,2000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.contactPropertyForm()),
            this.displayedErrorMessage(element, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
    }
}