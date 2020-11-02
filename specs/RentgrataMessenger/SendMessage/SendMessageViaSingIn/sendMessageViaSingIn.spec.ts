import { messenger } from "../../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { signInFormData } from "../../../../testData/signInForm.data";
import { forgotPasswordData } from "../../../../testData/forgotPassword.data";
import { commonData } from "../../../../testData/common.data";

const { existingTestUser } = commonData;
const { authMethods, randomCountry } = signInFormData;
const {
    emailOrPasswordIncorrect,
    phoneNumberOrPasswordIncorrect
} = signInFormData.validationErrors;
const { form } = forgotPasswordData;

import { allureHelper } from "../../../../helpers/allure";
import { bugs } from "../../../../existingBugs/bugs";

describe('Send Message via Sing in', () => {
    it('[C456] Continue with Incorrect email', () => {
        allureHelper.addIssueToAllure(bugs.signInForm.emailOrPasswordIsIncorrect);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm('ksd@dscom', '1234')
            .verifyErrorMessage(emailOrPasswordIncorrect)
    });

    it('[C457] Continue with incorrect password', () => {
        allureHelper.addIssueToAllure(bugs.signInForm.emailOrPasswordIsIncorrect);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, 'password')
            .verifyErrorMessage(emailOrPasswordIncorrect);
    });

    it('[C764] Click on "Sign in with phone number"', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .verifyIsEmailFieldDisplayed()
            .verifyIsAuthMethodDisplayed(authMethods.email, false)
            .verifyIsPhoneFieldDisplayed(false)
            .verifyIsAuthMethodDisplayed(authMethods.phone)
            .switchAuthMethodTo(authMethods.phone)
            .verifyIsEmailFieldDisplayed(false)
            .verifyIsAuthMethodDisplayed(authMethods.email)
            .verifyIsPhoneFieldDisplayed()
            .verifyIsAuthMethodDisplayed(authMethods.phone, false)
            .switchAuthMethodTo(authMethods.email)
            .verifyIsEmailFieldDisplayed()
            .verifyIsAuthMethodDisplayed(authMethods.email, false)
            .verifyIsPhoneFieldDisplayed(false)
            .verifyIsAuthMethodDisplayed(authMethods.phone)
    });

    it('[C766] Select country', () => {
        const { countryCode, countryName, dialCode } = randomCountry();
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .switchAuthMethodTo(authMethods.phone)
            .selectCountry(countryCode, countryName)
            .verifySelectedDialCode(`+${dialCode}`, countryName)
            .verifySelectedFlag(countryCode, countryName)
    });

    it('[C460] Continue with incorrect Phone Number', () => {
        allureHelper.addIssueToAllure(bugs.signInForm.incorrectPhoneNumberError);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .switchAuthMethodTo(authMethods.phone)
            .fillPasswordField(faker.random.word())
            .fillPhoneField(faker.random.word())
            .clickOnSubmitButton()
            .verifyErrorMessage(phoneNumberOrPasswordIncorrect)
    });

    it('[C461] Click on "Forgot Password?" link', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .clickOnForgotPasswordLink()
            .verifyFormTitle(form.title);
    });

    it('[C765] Close the form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
            .goToLoadingIframe()
            .verifyLoadingSpinnerIsDisplayed()
            .switchToNewWindowAndCloseCurrent()
            .verifyLoadingSpinnerIsDisplayed(false);
    });
});