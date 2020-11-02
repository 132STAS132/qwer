import { BasePage } from "./base.page";
import { termsConditionsForm } from "./messengerWidgetComponents/termsConditionsForm.component";
import * as faker from "faker";

class SignUpPage extends BasePage {
    /** locators **/
    private signupContainer(): string {
        return '.complete_signup';
    }

    private passwordFieldSignUp(): string {
        return '#user_password'
    }

    private confirmPasswordField(): string {
        return '#user_password_confirmation'
    }

    private errorMessage(): string {
        return '#error_explanation';
    }

    private submitButton(): string {
        return '.btn_save.complete_sign_up_btn';
    }

    private messageText(): string {
        return '.resident-message';
    }

    private welcomeLabel(): string {
        return '.welcome-label'
    }

    private toMessage(): string {
        return '.image-name-wrapper .name'
    }

    /** actions **/

    fillFirstPasswordField(value) {
        this.allure.startStep(`Fill first password field with ${value}`);
        this.wd.clearAndFill(this.passwordFieldSignUp(), value);
        this.allure.endStep();
        return this;
    }

    fillConfirmPasswordField(value) {
        this.allure.startStep(`Fill confirm password field with ${value}`);
        this.wd.clearAndFill(this.confirmPasswordField(), value);
        this.allure.endStep();
        return this;
    }

    clickOnSubmitButton() {
        this.allure.startStep('Click on [Submit] button');
        this.wd.click(this.submitButton());
        this.allure.endStep();
        return this;
    }

    submitPasswordForm(password = process.env.DEFAULT_USER_PASSWORD) {
        this.fillFirstPasswordField(password)
            .fillConfirmPasswordField(password)
            .clickOnSubmitButton();
    }

    proceedToSignUpPage(email: string, message = faker.random.words(), firstName = faker.random.word(), lastName = faker.random.word()) {
        termsConditionsForm
            .proceedToTermsConditionsForm(email, message, firstName, lastName)
            .clickOnAgreeAndContinueButton();
        this.wd.switchToSecondWindow();
        return this;
    }

    /** verifications **/
    verifyIsSignUpPageOpened(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('sign up page'));
        this.wd.waitForDisplayed(this.signupContainer(), !expected);
        this.expect(
            this.wd.isElementVisible(this.signupContainer()),
            this.displayedErrorMessage('sign up page', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyErrorMessage(message: string) {
        this.allure.startStep(`Verify error message is ${message}`);
        // due to changing errors
        this.wd.wait(2);
        this.expect(
            this.wd.getText(this.errorMessage()).trim(),
            'Incorrect error message is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }

    verifyMessageText(message: string) {
        this.allure.startStep(`Verify message text is ${message}`);
        this.expect(
            this.wd.getText(this.messageText()),
            'Incorrect message is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }

    verifyWelcomeText(message: string) {
        this.allure.startStep(`Verify welcome text is ${message}`);
        this.expect(
            this.wd.getText(this.welcomeLabel()),
            'Incorrect welcome text is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
        return this;
    }

    verifyMessageSentTo(name: string) {
        this.allure.startStep(`Verify message sent To ${name}`);
        this.expect(
            this.wd.getText(this.toMessage()),
            'Incorrect message sent To text is displayed'
        ).to.be.equal(name);
        this.allure.endStep();
        return this;
    }

}

export const signUpPage = new SignUpPage();