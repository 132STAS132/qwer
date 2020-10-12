import { BasePage } from "../base.page";
import { sendMessageFieldsType } from "../../interfaces/widget.interface";

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
        return `//p[text()="${label}"]//ancestor::div[contains(@class, "has-error")]//*[contains(@id,"-error-msg")]`;
    }


    /** methods **/

    clickOnContinueButton(button = 'Continue'): this {
        this.allure.startStep(`Click on [Continue] button`);
        this.clickOnButtonByText(button);
        this.allure.endStep();
        return this;
    }

    fillFirstNameInput(value: string): this {
        this.allure.startStep(`Fill first name input with "${value}" value`);
        this.wd.setValue(this.firstNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillLastNameInput(value: string): this {
        this.allure.startStep(`Fill last name input with "${value}" value`);
        this.wd.setValue(this.lastNameInput(), value);
        this.allure.endStep();
        return this;
    }

    fillEmailInput(value: string): this {
        this.allure.startStep(`Fill email input with "${value}" value`);
        this.wd.setValue(this.emailInput(), value);
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
    }

    verifyErrorMessageUnderField(field: sendMessageFieldsType, expectedError: string, shouldDisplayed = true): this {
        this.allure.startStep(`Verify [${expectedError}] error message is ${shouldDisplayed ? 'displayed' : 'not displayed'} under ${field}`);
        if (!shouldDisplayed) {
            this.expect(
                this.wd.isElementVisible(this.errorMessageByLabel(field)),
                `${expectedError} error should not be displayed`
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