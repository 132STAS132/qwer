import { BasePage } from "./base.page";

export class ForgotPasswordPage extends BasePage {
    /** locators **/
    formTitle(): string {
        return '.forgot-password-label';
    }

    formDescription(): string {
        return '.text-center + .set-new-password-helper-text';
    }

    /** actions **/

    /** verifications **/

    verifyFormTitle(title: string) {
        this.allure.startStep(`Verify form title is ${title}`);
        this.expect(
            this.wd.getText(this.formTitle()),
            'Incorrect text is displayed'
        ).to.be.equal(title);
        this.allure.endStep();
        return this;
    }
}