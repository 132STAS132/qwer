import { BasePage } from "../base.page";
import { SignInPage } from "../signIn.page";

export class SendMessageComponent extends BasePage {
    /** locators **/
    private sendMessageToText(): string {
        // Sending message to:
        return '.resident-name';
    }

    private userNameSendMessageForm(): string {
        return `${this.sendMessageToText()} ~ p`;
    }

    private messageInMessageForm(): string {
        return `.authentication-container .message`
    }

    private sendMessageFormTitle(): string {
        return `${this.widgetMessengerId} #phoneAuthentication-header-title #title`;
    }

    private sendMessageFormInfo(): string {
        return `${this.widgetMessengerId} .authentication-info`;
    }

    private firstNameInput(): string {
        return  '.firstName-input input';
    }

    private lastNameInput(): string {
        return  '.lastName-input input';
    }

    private emailInput(): string {
        return  '.email-input input';
    }

    private errorMessageByLabel(label: string): string {
        return `//p[text()="${label}"]//ancestor::div[contains(@class, "has-")]//*[contains(@id,"-error-msg")]`;
    }

    private loadSpinner(): string {
        return '.ant-spin-spinning';
    }

    private subInfoVerifyEmailForm(): string {
        return 'span.verification-code-subInfo';
    }

    private signInLink(): string {
        return '.log-in-link';
    }

    private loadingSpinner(): string {
        return '.phoneAuthentication-wrapper  [aria-label="Loading"]';
    }

    private verificationCodeInput(): string {
        return '.verification-code-input';
    }

    private invalidCodeErrorText(): string {
        return '.verification-code-container div[style*="rgb(224"]';
    }

    private resentInformationText(): string {
        return '.verification-code-resend ~ .verification-code-subInfo';
    }

    private didNotReceiveLink(): string {
        return '.verification-code-resend span';
    }

    /** methods **/

    clickOnContinueButton(button = 'Continue') {
        this.clickOnButtonByText(button);
        return this;
    }

    fillFirstNameInput(value: string) {
        this.allure.startStep(`Fill first name input with "${value}" value`);
        this.wd.clearAndFill(this.firstNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillLastNameInput(value: string) {
        this.allure.startStep(`Fill last name input with "${value}" value`);
        this.wd.clearAndFill(this.lastNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillEmailInput(value: string) {
        this.allure.startStep(`Fill email input with "${value}" value`);
        this.wd.clearAndFill(this.emailInput(), value);
        this.allure.endStep();
        return this;
    }

    waitForLoadSpinnerToDisappear() {
        this.allure.startStep(`Wait for load spinner to disappear`);
        // due to animation
        this.wd.wait(1);
        try {
            this.wd.waitForDisplayed(this.loadSpinner(), true, 10000);
        } catch (e) {}
        // due to animation
        this.wd.wait(1);
        this.allure.endStep();
        return this;
    }

    clickOnSignInLink() {
        this.allure.startStep('Click on SignIn link');
        this.wd.click(this.signInLink());
        this.wd.wait(1);
        this.allure.endStep();
        return this;
    }

    clickOnSignInLinkAndSwitchToNewWindow(): SignInPage {
        this.allure.startStep('Click on SignIn link and switch to new window');
        this.clickOnSignInLink();
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return new SignInPage();
    }

    submitVerificationCodeInput(value: string) {
        this.allure.startStep(`Submit [verification code input] with ${value}`);
        this.wd.clearAndFill(this.verificationCodeInput(), value);
        this.allure.endStep();
        return this;
    }

    clickOnVerifyEmailButton(button = 'Verify Email') {
        this.clickOnButtonByText(button);
        return this;
    }

    clickOnIDidNotReceive() {
        this.allure.startStep('Click on "I did not receive a code." link');
        this.wd.click(this.didNotReceiveLink());
        this.allure.endStep();
        return this;
    }

    /** verifications **/
    verifySendMessageToText(text: string) {
        const sendMessageTo = this.wd.getText(this.sendMessageToText());
        const userName = this.wd.getText(this.userNameSendMessageForm());
        this.expect(
            `${sendMessageTo} ${userName}`,
            'Incorrect text is displayed'
        ).to.be.equal(text);
        return this;
    }

    verifyErrorMessageUnderField(field: "Email" | "Last name" | "First name", expectedError: string, shouldBeDisplayed = true) {
        this.allure.startStep(`Verify [${expectedError}] error message is ${shouldBeDisplayed ? 'displayed' : 'not displayed'} under ${field}`);
        if (!shouldBeDisplayed) {
            this.expect(
                this.wd.isElementVisible(this.errorMessageByLabel(field)),
                `Element with error message should not be displayed`
            ).to.be.false;
        } else {
            this.expect(
                this.wd.getText(this.errorMessageByLabel(field)),
                `Incorrect error message is displayed under ${field} field`
            ).to.be.equal(expectedError)
        }
        this.allure.endStep();
        return this;
    }

    verifyTitleOfSendMessageForm(title: string) {
        this.allure.startStep(`Verify title of send message form is [${title}]`);
        this.expect(
            this.wd.getText(this.sendMessageFormTitle()),
            'Incorrect title of send message form is displayed'
        ).to.be.equal(title);
        this.allure.endStep();
        return this;
    }

    verifyMessageSentToAndSubInfo(expectedText: string) {
        this.allure.startStep(`Verify message should be ${expectedText}`);
        const text = this.wd.elements(this.subInfoVerifyEmailForm())
            .map(el => {
                if (el.isDisplayed()) {
                    return el.getText()
                }
            })
            .join(' ').trim();
        this.expect(
            text,
            'Incorrect text is displayed'
        ).to.be.equal(expectedText);
        this.allure.endStep();
        return this;
    }

    verifyAuthInfoOfSendMessageForm(info: string) {
        this.allure.startStep(`Verify authentication info of send message form is [${info}]`);
        this.expect(
            this.wd.getText(this.sendMessageFormInfo()),
            'Incorrect authentication info of send message form is displayed'
        ).to.be.equal(info);
        this.allure.endStep();
        return this;
    }

    verifyMessageInMessageForm(message: string) {
        this.allure.startStep(`Verify message in the message form is ${message}`);
        this.expect(
            this.wd.getText(this.messageInMessageForm()),
            'Incorrect message text is displayed'
        ).to.be.equal(message);
        this.allure.endStep();
    }

    verifyLoadingSpinnerIsDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('Load spinner'));
        this.wd.waitForDisplayed(this.loadingSpinner(), !expected);
        this.expect(
            this.wd.isElementVisible(this.loadingSpinner()),
            this.displayedErrorMessage('Load spinner', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyInvalidCodeError(expectedText: string) {
        this.allure.startStep(`Verify error text should be ${expectedText}`);
        this.expect(
            this.wd.getText(this.invalidCodeErrorText()),
            'Incorrect text is displayed'
        )
        this.allure.endStep();
        return this;
    }

    verifyResentText(expectedText: string) {
        this.allure.startStep(`Verify resent text is ${expectedText}`);
        this.expect(
            this.wd.getText(this.resentInformationText()),
            'Incorrect resent text is displayed'
        ).to.be.equal(expectedText);
        this.allure.endStep();
        return this;
    }
}