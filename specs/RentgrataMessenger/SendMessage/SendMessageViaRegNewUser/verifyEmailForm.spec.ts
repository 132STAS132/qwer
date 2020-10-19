import {messenger} from "../../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import {messengerData} from "../../../../testData/messenger.data";

const {
    randomMailTrapEmail,
    verifyEmailForm,
} = messengerData;

describe('Verify Email form', () => {
    it('[C466] Open the Verify Email form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
            .fillLastNameInput(faker.random.words())
            .fillFirstNameInput(faker.random.words())
            .fillEmailInput(randomMailTrapEmail)
            .clickOnContinueButton()
            .waitForLoadSpinnerToDisappear()
            .verifyTitleOfSendMessageForm(verifyEmailForm.title)
    });

    it('[C467] Check Email', () => {
        const email = randomMailTrapEmail;
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
            .verifyMessageSentToAndSubInfo(verifyEmailForm.sentCodeTo(email));
    });

    it('[C469] Continue with invalid code', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
            .fillLastNameInput(faker.random.words())
            .fillFirstNameInput(faker.random.words())
            .fillEmailInput(randomMailTrapEmail)
            .clickOnContinueButton()
            .waitForLoadSpinnerToDisappear()
            .submitVerificationCodeInput(faker.random.uuid())
            .clickOnVerifyEmailButton()
            .verifyInvalidCodeError(verifyEmailForm.invalidCodeError);
    });

    it('[C470] Continue with empty code field', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent
            .fillLastNameInput(faker.random.words())
            .fillFirstNameInput(faker.random.words())
            .fillEmailInput(randomMailTrapEmail)
            .clickOnContinueButton()
            .waitForLoadSpinnerToDisappear()
            .submitVerificationCodeInput(' ')
            .clickOnVerifyEmailButton()
            .verifyInvalidCodeError(verifyEmailForm.invalidCodeError);
    });

    it('[C471] Click on "I did not receive a code."', () => {
        const email = randomMailTrapEmail;
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
            .clickOnIDidNotReceive()
            .verifyResentText(verifyEmailForm.resentText(email));
    });
});