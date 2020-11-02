import { BasePage } from "../base.page";
import { SignInPage } from "../signIn.page";
import { messengerFormsData } from "../../testData/messengerForms.data";

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

    // === success sent data ====
    private phoneFieldError(): string {
        return '#phone-number-error-msg';
    }

    private phoneInput(): string {
        return '.intl-tel-input input'
    }

    private optOutButton(button: string): string {
        return `//*[@class="message-resident-success-wrapper__contact-property"]//a[text()="${button}"]`;
    }

    private optOutWrapper(): string {
        return '.message-resident-success-wrapper__guest-card-opt-out';
    }

    private successSentMessageTitleText(): string {
        return '.message-resident-success-wrapper__success-info__header';
    }

    private successSentMessageInfoText(): string {
        return '.message-resident-success-wrapper__success-info__text';
    }

    private backToResidentsButton(): string {
        return '.message-resident-success-wrapper__nav-links a';
    }

    private rentgrataLinkInText(): string {
        return '.message-resident-success-wrapper__success-info__text a';
    }

    // === /success sent data ====
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

    clickOnChatViaSms(buttonName = 'Chat via SMS Text') {
        this.clickOnButtonByText(buttonName);
        return this;
    }

    fillPhoneFieldSuccessForm(value: string) {
        this.allure.startStep(`Fill phone field with ${value}`);
        this.wd.clearAndFill(this.phoneInput(), value);
        this.allure.endStep();
        return this;
    }

    optOutAction(action: string) {
        this.allure.startStep(`Click on ${action}`);
        this.wd.click(this.optOutButton(action));
        if (action === messengerFormsData.successSendMessageForm.optOutButton) {
            this.wd.waitForDisplayed(this.optOutButton(messengerFormsData.successSendMessageForm.cancelButton));
        } else {
            this.wd.waitForDisplayed(this.optOutButton(messengerFormsData.successSendMessageForm.optOutButton));
        }
        this.allure.endStep();
        return this;
    }

    clickOnBackToResidentButton() {
        this.allure.startStep('Click on [Back to residents] button');
        this.wd.click(this.backToResidentsButton());
        this.allure.endStep();
        return this;
    }

    clickOnDoneButton(buttonName = "Done") {
        this.clickOnButtonByText(buttonName);
        return this;
    }

    clickOnRentgrataLinkInText() {
        this.allure.startStep('Click on rentgrata link in text');
        this.wd.click(this.rentgrataLinkInText());
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

    verifyPhoneFieldError(expectedText: string) {
        this.allure.startStep(`Verify phone error is ${expectedText}`);
        this.expect(
            this.wd.getText(this.phoneFieldError()),
            'Incorrect error text under phone field is displayed'
        ).to.be.equal(expectedText);
        this.allure.endStep();
        return this;
    }

    verifyIsOptOutFormExpanded(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('opt out form'));
        this.expect(
            this.wd.isElementVisible(this.optOutWrapper()),
            this.displayedErrorMessage('opt out form', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifySuccessSentMessageTitleText(text: string) {
        this.allure.startStep(`Verify success text is ${text}`);
        this.expect(
            this.wd.getText(this.successSentMessageTitleText()),
            'Incorrect text is displayed'
        ).to.be.equal(text);
        this.allure.endStep();
        return this;
    }

    verifySuccessSentMessageInfoText(expectedText: string) {
        this.allure.startStep(`Verify success info text is ${expectedText}`);
        // should be 2 element;
        const currentText =
            this.wd.elements(this.successSentMessageInfoText())
            .map(el => el.getText())
            .join(' ');

        this.expect(
            currentText,
            'Incorrect text is displayed'
        ).to.be.equal(expectedText);
        this.allure.endStep();
        return this;
    }
}