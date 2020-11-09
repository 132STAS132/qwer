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
    it('[C807] Click on Back button', () => {
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

    it('[C808] Check "Sending message to"',() => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture();
        const name = messenger.chatWithResident.getFirstProfileName();
        messenger.chatWithResident
            .sendMessage(faker.random.words())
            .sendMessageComponent.verifySendMessageToText(`Sending message to: ${name}`);
    });

    it('[C809] Check the Message',() => {
        const messageText = faker.random.words();
        messenger.goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(messageText)
            .sendMessageComponent.verifyMessageInMessageForm(messageText);
    });

    it('[C811] Continue with Empty First Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
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

    it('[C812] Continue with Empty Last Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
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

    it('[C813] Continue with Empty Email', () => {
        allureHelper.addIssueToAllure(bugs.sendMessageForm.emailCanNotBeBlank);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
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

    it('[C814] Continue with incorrect Email', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput('email@com')
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailInvalid)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false);
    });

    it('[C817] Click on continue button w/o data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
            .clickOnFirstNameInput()
            .clickOnContinueButton()
            .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail)
            .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName)
            .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName)
            .fillFirstNameInput(faker.random.words())
            .clickOnContinueButton()
            .waitForLoadSpinnerToDisappear()
            .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorMustEnterEmail)
            .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName)
            .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false)
    });

    it('[C815] Continue with already existing Email', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
                .fillEmailInput(existingTestUser.email)
                .hideKeyboard()
                .fillLastNameInput(faker.random.words())
                .hideKeyboard()
                .fillFirstNameInput(faker.random.words())
                .hideKeyboard()
                .clickOnContinueButton()
                .verifyErrorMessageUnderField(sendMessageForm.emailField, sendMessageForm.errorEmailExists)
                .verifyErrorMessageUnderField(sendMessageForm.lastNameField, sendMessageForm.errorMustEnterLastName, false)
                .verifyErrorMessageUnderField(sendMessageForm.firstNameField, sendMessageForm.errorMustEnterFirstName, false);
    });

    it('[C810] Continue with valid data', () => {
        const email = randomMailTrapEmail();
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
                .fillLastNameInput(faker.random.words())
                .fillFirstNameInput(faker.random.words())
                .fillEmailInput(email)
                .clickOnContinueButton()
                .waitForLoadSpinnerToDisappear()
                .verifyTitleOfSendMessageForm(verifyEmailForm.title)
                .verifyMessageSentToAndSubInfo(verifyEmailForm.sentCodeTo(email));
    });

    it('[C816] Click on Sign In here', () => {
        allureHelper.addIssueToAllure(bugs.sendMessageForm.signInHere)
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
                .clickOnFirstNameInput()
                .clickOnSignInLinkAndSwitchToNewWindow()
                .verifySignInPageTitleDisplayed();
    });
})