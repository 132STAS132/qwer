import { signUpPage } from "../../../../pages/signUp.page";
import { messengerData } from "../../../../testData/messenger.data";
import { signUpFormData } from "../../../../testData/signUpForm.data";
import * as faker from "faker";
import {messenger} from "../../../../pages/messengerWidgetComponents/messenger.component";

const { randomMailTrapEmail } = messengerData;
const { validationErrors } = signUpFormData;
const messageData = {
    message: faker.random.words(),
    firstName: faker.random.word(),
    lastName: faker.random.word(),
}

describe('Select Password form', () => {
    it('[C486] Type invalid data', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .fillFirstPasswordField('123')
            .fillConfirmPasswordField('123')
            .clickOnSubmitButton()
            .verifyErrorMessage(validationErrors.atLeast4)
            .fillFirstPasswordField('1234')
            .fillConfirmPasswordField('123')
            .clickOnSubmitButton()
            .verifyErrorMessage(validationErrors.atLeast4)
            .fillFirstPasswordField('123')
            .fillConfirmPasswordField('1234')
            .clickOnSubmitButton()
            .verifyErrorMessage(validationErrors.atLeast4);
    });

    it('[C487] Leave fields empty', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .clickOnSubmitButton()
            .verifyErrorMessage(validationErrors.atLeast4)
    });

    it('[C488] Different password', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .fillFirstPasswordField('1234')
            .fillConfirmPasswordField('1235')
            .clickOnSubmitButton()
            .verifyErrorMessage(validationErrors.confirmationMatch)
    });

    it('[C789] Check your message', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email, messageData.message)
            .verifyMessageText(messageData.message)
    });

    it('[C787] Check your name',() => {
        const email = randomMailTrapEmail();
        const firstName = signUpPage.capitalizeFirstCharacter(messageData.firstName);
        signUpPage
            .proceedToSignUpPage(email, messageData.message, firstName)
            .verifyWelcomeText(`Welcome, ${firstName}!`);
    });

    it('[C788] Сheck who to send the message to',() => {
        const email = randomMailTrapEmail();
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture();
        const name = messenger.chatWithResident.getFirstProfileName()
        messenger.clickOnCloseIcon()
        signUpPage
            .proceedToSignUpPage(email, messageData.message)
            .verifyMessageSentTo(`To ${name}`);
    });
});