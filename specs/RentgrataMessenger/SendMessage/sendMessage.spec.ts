import { messenger } from "../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { allureHelper } from "../../../helpers/allure";
import { bugs } from "../../../existingBugs/bugs";
import { commonData } from "../../../testData/common.data";
import { messengerFormsData } from "../../../testData/messengerForms.data";

const {
    randomMailTrapEmail,
    existingTestUser
} = commonData;

const {
    sendMessageForm,
    verifyEmailForm,
} = messengerFormsData;

describe('Send Message', () => {
    it('[C445] Click on Back button', () => {
        allureHelper.addIssueToAllure(bugs.sendMessageForm.backButton);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.verifyAuthInfoOfSendMessageForm(sendMessageForm.authInfoMessage)
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false)
            .clickOnBackIcon()
            .verifyChatWithResidentFormIsDisplayed();
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
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail, false)
                .fillFirstNameInput(' ')
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorFirstNameCanNotBeBlank)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail, false)
    });

    it('[C450] Continue with Empty Last Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillEmailInput(faker.internet.email())
                .fillFirstNameInput(faker.random.words())
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail, false)
                .fillLastNameInput(' ')
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorLastNameCanNotBeBlank)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail, false)
    });

    it('[C451] Continue with Empty Email', () => {
        allureHelper.addIssueToAllure(bugs.sendMessageForm.emailCanNotBeBlank);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.word())
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
                .fillEmailInput(' ')
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailCanNotBeBlank)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
    });

    it('[C452] Continue with incorrect Email', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput('email@com')
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailInvalid)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false);
    });

    it('[C763] Click on continue button w/o data and fill out all fields', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName)
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput('email@com')
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailInvalid)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
                .fillLastNameInput(' ')
                .fillEmailInput(faker.internet.email())
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorLastNameCanNotBeBlank)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailInvalid, false)
    });

    it('[C453] Continue with already existing Email', () => {
        // todo register new user with the correct credentials (used for other scenarios). See fixtures
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput(existingTestUser.email)
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailExists)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false);
    });

    it('[C448] Continue with valid data', () => {
        const email = randomMailTrapEmail();
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput(email)
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyTitleOfSendMessageForm(verifyEmailForm.title)
                .verifyMessageSentToAndSubInfo(verifyEmailForm.sentCodeTo(email));
    });

    it('[C454] Click on Sign In here', () => {
        allureHelper.addIssueToAllure(bugs.sendMessageForm.signInHere)
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnSignInLinkAndSwitchToNewWindow(false)
                .verifySignInPageTitleDisplayed();
    });
})