import {messenger} from "../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { messengerData } from "../../testData/messenger.data";

const {
    sendMessageForm,
} = messengerData;

describe('Send Message', () => {
    it('[C445] Click on Back button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.verifyAuthInfoOfSendMessageForm(sendMessageForm.authInfoMessage)
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false)
            .clickOnBackIcon()
            .verifyChatWithResidentFormIsDisplayed()
    });

    it('[C446] Check "Sending message to"',() => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture();
        const name = messenger.chatWithResident.getFirstProfileName();
        messenger.chatWithResident
            .sendMessage(faker.random.words())
            .sendMessageComponent.verifySendMessageToText(`Sending message to: ${name}`);
    });

    it('[C447] Check the Message',() => {
        const messageText = faker.random.words();
        messenger.goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(messageText)
            .sendMessageComponent.verifyMessageInMessageForm(messageText);
    });

    it('[C449] Continue with Empty First Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillEmailInput(faker.internet.email())
                .fillLastNameInput(faker.random.words())
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName)
    });

    xit('', () => {
        // todo add chek for all errors after opening send message form. ( should not be displayed )
        // todo update structure of the test data and interfaces
    });
})