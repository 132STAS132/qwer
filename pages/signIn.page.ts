import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
    /** locators **/
    private signInPageTitle(): string {
        return '//div[@class="complete_signup"]//h4[text()="Sign in"]';
    }

    private emailField(): string {
        return '#user_authentication_email';
    }

    private passwordField(): string {
        return '#user_authentication_password';
    }

    private submitButton(): string {
        return '.btn_save.complete_sign_up_btn';
    }

    private errorMessage(): string {
        return '#third_party_sessions_error small';
    }

    /** actions **/

    fillEmailField(value: string): this {
        this.allure.startStep(`Fill email field with ${value}`);
        this.wd.clearAndFill(this.emailField(), value);
        this.allure.endStep();
        return this;
    }

    fillPasswordField(value: string): this {
        this.allure.startStep(`Fill password field with ${value}`);
        this.wd.clearAndFill(this.passwordField(), value);
        this.allure.endStep();
        return this;
    }

    clickOnSubmitButton(): this {
        this.allure.startStep('Click on [Submit] button');
        this.wd.click(this.submitButton());
        this.allure.endStep();
        return this;
    }

    submitForm(email, password): this {
        this.fillEmailField(email);
        this.fillPasswordField(password);
        this.clickOnSubmitButton();
        return this;
    }

    /** verifications **/

    verifySignInPageTitleDisplayed(expected = true): this {
        this.allure.startStep(this.verifyAllureMessage('sign in page title'));
        this.wd.waitForDisplayed(this.signInPageTitle(), !expected);
        this.expect(
            this.wd.isElementVisible(this.signInPageTitle()),
            this.displayedErrorMessage('sign in page title', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyErrorMessage(message: string): this {
        this.allure.startStep(`Verify error message is ${message}`);
        this.expect(
            this.wd.getText(this.errorMessage()),
            'Incorrect error message is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }
}