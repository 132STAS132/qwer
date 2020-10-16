import { messenger } from "../../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { signInFormData } from "../../../../testData/signInForm.data";
import { messengerData } from "../../../../testData/messenger.data";

const { existingEmail } = messengerData;
const { authMethods, randomCountry } = signInFormData;
const { passwordError } = signInFormData.validationErrors;

describe('Send Message via Sing in', () => {
    xit('[C456] Continue with Incorrect email', () => {
        // todo wait for answer - verifyErrorMessage should be updated and moved to fixtures. Mark as automated
        // link a bug
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
            .submitForm('ksd@dscom', '1234')
            // .verifyErrorMessage('The password you entered was incorrect. Please try again.')
    });

    it('[C457] Continue with incorrect password', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
            .submitForm(existingEmail, 'password')
            .verifyErrorMessage(passwordError);
    });

    it('[C764] Click on "Sign in with phone number"', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
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
            .sendMessageComponent.clickOnSignInLink()
            .switchAuthMethodTo(authMethods.phone)
            .selectCountry(countryCode, countryName)
            .verifySelectedDialCode(`+${dialCode}`, countryName)
            .verifySelectedFlag(countryCode, countryName)
    });

    xit('[C458] Continue with Empty data', () => {
        // todo link a bug .
    })

    xit('[C460] Continue with incorrect Phone Number', () => {
       // todo link a bug .
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
            .switchAuthMethodTo(authMethods.phone)
        // fill phone form
        // .verifyErrorMessage('The password you entered was incorrect. Please try again.')
    });

    it('[C461] Click on "Forgot Password?" link', () => {

    });
});