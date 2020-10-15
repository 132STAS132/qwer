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

    /** methods **/

    clickOnContinueButton(button = 'Continue'): this {
        this.clickOnButtonByText(button);
        return this;
    }

    fillFirstNameInput(value: string): this {
        this.allure.startStep(`Fill first name input with "${value}" value`);
        this.wd.clearAndFill(this.firstNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillLastNameInput(value: string): this {
        this.allure.startStep(`Fill last name input with "${value}" value`);
        this.wd.clearAndFill(this.lastNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillEmailInput(value: string): this {
        this.allure.startStep(`Fill email input with "${value}" value`);
        this.wd.clearAndFill(this.emailInput(), value);
        this.allure.endStep();
        return this;
    }

    waitForLoadSpinnerToDisappear(): this {
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

    clickOnSignInLink(): SignInPage {
        this.allure.startStep('Click on SignIn link');
        this.wd.click(this.signInLink());
        this.wd.wait(1);
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return new SignInPage();
    }

    /** verifications **/
    verifySendMessageToText(text: string) {
        const sendMessageTo = this.wd.getText(this.sendMessageToText());
        const userName = this.wd.getText(this.userNameSendMessageForm());
        this.expect(
            `${sendMessageTo} ${userName}`,
            'Incorrect text is displayed'
        ).to.be.equal(text);
    }

    verifyErrorMessageUnderField(field: "Email" | "Last name" | "First name", expectedError: string, shouldBeDisplayed = true): this {
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

    verifyTitleOfSendMessageForm(title: string): this {
        this.allure.startStep(`Verify title of send message form is [${title}]`);
        this.expect(
            this.wd.getText(this.sendMessageFormTitle()),
            'Incorrect title of send message form is displayed'
        ).to.be.equal(title);
        this.allure.endStep();
        return this;
    }

    verifyMessageSentToAndSubInfo(expectedText: string): this {
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

    verifyAuthInfoOfSendMessageForm(info: string): this {
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
}