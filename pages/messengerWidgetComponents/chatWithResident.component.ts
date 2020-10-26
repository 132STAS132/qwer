import { BasePage } from "../base.page";
import { SendMessageComponent } from "./sendMessage.component";

export class ChatWithResidentComponent extends BasePage {

    sendMessageComponent: SendMessageComponent;

    constructor() {
        super();
        this.sendMessageComponent = new SendMessageComponent();
    }


    /** locators **/

    private get widgetMessengerIdXPATH(): string {
        return '//*[@id="rg-widget-messenger"]';
    }

    private chatWithResidentFiltersSection(): string {
        return `${this.widgetMessengerId} .residents-filter-strap`;
    }

    private messageTextAreaFields(): string {
        return `${this.widgetMessengerId} textarea`;
    }

    private sendButtonEnabled(): string {
        return `${this.widgetMessengerId} [type="submit"]:not([disabled])`;
    }

    private errorMessageForActiveSendButton(): string {
        // send button is active and error message is displayed above the message textarea.
        // A lot of messages could be displayed but active send button is displayed only for "sending" field
        return `${this.widgetMessengerIdXPATH}//button[@type="submit" and not(@disabled)]//ancestor::div[contains(@class, "has-error")]//*[@id="message-error-msg"]`;
    }

    private expectedMoveInDateInputs(): string {
        return `${this.widgetMessengerId} [id*="expectedMoveInDate"] input:last-child`;
    }

    private contactFormButton(): string {
        return '#contact-property-button';
    }

    private profileNames(): string {
        return '.profile-detail h3';
    }

    /** actions **/
    fillFirstMessageInput(value: string) {
        this.allure.startStep(`Fill first message input with ${value}`);
        this.wd.setValue(this.messageTextAreaFields(), value);
        this.allure.endStep();
        return this;
    }

    clickOnActiveSendButton() {
        this.allure.startStep('Click on active [Send] button');
        this.wd.click(this.sendButtonEnabled(), this.wd.isSafari());
        this.allure.endStep();
        return this;
    }

    sendMessage(value: string, to?: string) {
        this.allure.startStep('Send message');
        if (to) {
            // update if needed, is used only for filling first message field
        } else {
            this.fillFirstMessageInput(value);
            this.clickOnActiveSendButton();
        }
        this.allure.endStep();
        return this;
    }

    selectExpectedMoveInDate(date: { day: string, month: string, year: string }, to?: string) {
        this.allure.startStep(`Select expected move in date - ${date.day}/${date.month}/${date.year}`);
        if (to) {
            // update if needed, is used only for filling first day input
        } else {
            this.wd.wait(2);
            if (this.wd.isSafari()) {
                this.wd.focusElement(this.messageTextAreaFields());
            } else {
                this.wd.click(this.messageTextAreaFields());
            }

            this.wd.click(this.expectedMoveInDateInputs(), this.wd.isSafari());

            this.selectDataInDatePicker(date);
        }
        this.allure.endStep();
        return this;
    }

    clickOnContactPropertyOrScheduleTourButton() {
        this.allure.startStep('Click on "Contact Property or Schedule Tour" button');
        this.wd.click(this.contactFormButton(), this.wd.isSafari());
        this.allure.endStep();
        return this;
    }

    getFirstProfileName(): string {
        return this.wd.getText(this.profileNames());
    }

    /** verifications **/
    verifyChatWithResidentFormIsDisplayed(expected = true) {
        const element = 'Chat with resident form';
        this.allure.startStep(this.verifyAllureMessage(element));
        // waiting for animation
        try {
            this.wd.waitForDisplayed(this.chatWithResidentFiltersSection(), !expected,2000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.chatWithResidentFiltersSection()),
            this.displayedErrorMessage(element, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyErrorMessageForEmptyFiled(errorMessage: string) {
        this.allure.startStep(`Verify error message for empty field is ${errorMessage}`);
        this.expect(
            this.wd.getText(this.errorMessageForActiveSendButton()),
            'Incorrect error message for empty field is displayed'
        ).to.be.equal(errorMessage);
        this.allure.endStep();
        return this;
    }

    verifyExpectedMoveInDate(month: string, day: string, year: string) {
        const expectedDate = `${month}/${day}/${year}`;
        // verification for the first opened field
        this.allure.startStep(`Verify expected move in date is ${expectedDate}`);
        this.expect(
            this.wd.getValue(this.expectedMoveInDateInputs()),
            'Incorrect expected move in date value is displayed'
        ).to.be.equal(expectedDate);
        this.allure.endStep();
        return this;
    }

}