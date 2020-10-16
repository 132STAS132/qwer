import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
    /** locators **/
    private signInPageTitle(): string {
        return '//div[@class="complete_signup"]//h4[text()="Sign in"]';
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

    private phoneDropDown(): string {
        return '.iti-arrow';
    }

    private phoneDropDownItemByCountryCode(value: string): string {
        return `[data-country-code="${value}"]`;
    }

    private selectedDialCode(): string {
        return '.selected-dial-code';
    }

    private selectedFlagByCountryCode(countryCode: string): string {
        return `.selected-flag .iti-flag.${countryCode}`;
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

    switchAuthMethodTo(method: string): this {
        this.allure.startStep(`Switch auth method to ${method}`);
        this.wd.click(this.switchAuthMethodLink(method));
        this.allure.endStep();
        return this;
    }

    selectCountry(countryCode: string, countryName: string): this {
        this.allure.startStep(`Select ${countryName} country from phone dropdown`);
        this.wd.selectFromDropDown(this.phoneDropDown(), this.phoneDropDownItemByCountryCode(countryCode));
        this.allure.endStep();
        return this;
    }

    /** verifications **/

    verifyIsEmailFieldDisplayed(expected = true): this {
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

    verifyIsPhoneFieldDisplayed(expected = true): this {
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

    verifyIsAuthMethodDisplayed(method: string, expected = true): this {
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
            this.wd.getText(this.errorMessage()).trim(),
            'Incorrect error message is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }

    verifySelectedDialCode(dialCode: string, countryName: string): this {
        this.allure.startStep(`Verify selected dial code is ${dialCode} for ${countryName} country`);
        this.expect(
            this.wd.getText(this.selectedDialCode()),
            `Selected dial code should be ${dialCode}`
        ).to.be.equal(dialCode);
        this.allure.endStep();
        return this;
    }

    verifySelectedFlag(dialCode: string, countryName: string): this {
        this.allure.startStep(`Verify is flag for ${countryName} country displayed`);
        this.expect(
            this.wd.isElementVisible(this.selectedFlagByCountryCode(dialCode)),
            `Incorrect country flag for selected ${countryName} country is displayed`
        ).to.be.true;
        this.allure.endStep();
        return this;
    }
}