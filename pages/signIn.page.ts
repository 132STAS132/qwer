import { BasePage } from "./base.page";
import { ForgotPasswordPage } from "./forgotPassword.page";

export class SignInPage extends BasePage {
    /** locators **/
    private signInPageTitle(): string {
        return this.isMobile() ? '//div[contains(.,"Sign in")]' :'//div[@class="complete_signup"]//h4[text()="Sign in"]';
    }

    private emailField(): string {
        return '#user_authentication_email';
    }

    private phoneField(): string {
        return '#user_authentication_phone_number';
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

    private switchAuthMethodLink(method: string): string {
        return `//*[@class="switch-authentication-method"]/a[text()="${method}"]`;
    }

    private selectedDialCode(): string {
        return '.selected-dial-code';
    }

    private forgotPasswordLink(): string {
        return '.forgot_password_link';
    }

    /** actions **/

    fillEmailField(value: string) {
        this.allure.startStep(`Fill email field with ${value}`);
        this.wd.clearAndFill(this.emailField(), value);
        this.allure.endStep();
        return this;
    }

    fillPhoneField(value: string) {
        this.allure.startStep(`Fill phone field with ${value}`);
        this.wd.clearAndFill(this.phoneField(), value);
        this.allure.endStep();
        return this;
    }

    fillPasswordField(value: string) {
        this.allure.startStep(`Fill password field with ${value}`);
        this.wd.clearAndFill(this.passwordField(), value);
        this.allure.endStep();
        return this;
    }

    clickOnSubmitButton() {
        this.allure.startStep('Click on [Submit] button');
        this.wd.click(this.submitButton());
        this.allure.endStep();
        return this;
    }

    clickOnForgotPasswordLink(passwordPageTitle = 'Password Reset | Resident Referrals | Rentgrata'): ForgotPasswordPage {
        this.allure.startStep('Click on [forgot password ?] link');
        this.wd.click(this.forgotPasswordLink());
        this.wd.switchToWindowByName(passwordPageTitle);
        this.allure.endStep();
        return new ForgotPasswordPage();
    }

    submitForm(email, password) {
        // for simulate user behavior - otherwise tests not stable
        this.wd.wait(1);
        this.fillEmailField(email);
        this.wd.wait(1);
        this.fillPasswordField(password);
        this.wd.wait(1);
        this.clickOnSubmitButton();
        return this;
    }

    switchAuthMethodTo(method: string) {
        this.allure.startStep(`Switch auth method to ${method}`);
        this.wd.click(this.switchAuthMethodLink(method));
        this.allure.endStep();
        return this;
    }

    /** verifications **/

    verifyIsEmailFieldDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('email field'));
        try {
            this.wd.waitForDisplayed(this.emailField(), !expected, 7000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.emailField()),
            this.displayedErrorMessage('email field', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyIsPhoneFieldDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('phone field'));
        try {
            this.wd.waitForDisplayed(this.phoneField(), !expected, 7000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.phoneField()),
            this.displayedErrorMessage('phone field', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyIsAuthMethodDisplayed(method: string, expected = true) {
        this.allure.startStep(this.verifyAllureMessage(`${method} link`));
        try {
            this.wd.waitForDisplayed(this.switchAuthMethodLink(method), !expected, 7000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.switchAuthMethodLink(method)),
            this.displayedErrorMessage(`${method} link`, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifySignInPageTitleDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('sign in page title'));
        this.wd.waitForDisplayed(this.signInPageTitle(), !expected);
        this.expect(
            this.wd.isElementVisible(this.signInPageTitle()),
            this.displayedErrorMessage('sign in page title', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyErrorMessage(message: string) {
        this.allure.startStep(`Verify error message is ${message}`);
        this.expect(
            this.wd.getText(this.errorMessage()).trim(),
            'Incorrect error message is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }

    verifySelectedDialCode(dialCode: string, countryName: string) {
        this.allure.startStep(`Verify selected dial code is ${dialCode} for ${countryName} country`);
        this.expect(
            this.wd.getText(this.selectedDialCode()),
            `Selected dial code should be ${dialCode}`
        ).to.be.equal(dialCode);
        this.allure.endStep();
        return this;
    }
}