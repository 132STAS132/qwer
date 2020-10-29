import { signUpPage } from "../../../../pages/signUp.page";
import { messengerData } from "../../../../testData/messenger.data";
import { messenger } from "../../../../pages/messengerWidgetComponents/messenger.component";
import { signInFormData } from "../../../../testData/signInForm.data";
import * as faker from "faker";

const { randomMailTrapEmail, successSendMessageForm } = messengerData;
const { randomCountry } = signInFormData;

describe('After sending form (Message sent.)', () => {
    // todo need to update after fixing https://rentgrata.atlassian.net/browse/RS-232 . Add command for running
    it('[C489] Select country (Phone Number)', () => {
        const { countryCode, countryName, dialCode } = randomCountry();
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .submitPasswordForm()
        messenger
            .selectCountry(countryCode, countryName)
            .contactForm.verifyPhoneInputValue(`+${dialCode}`)
            .verifySelectedFlag(countryCode, countryName);
    });

    it('[C491] Type invalid phone number', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .submitPasswordForm()
        messenger
            .chatWithResident
            .sendMessageComponent
            .fillPhoneFieldSuccessForm(faker.phone.phoneNumber())
            .clickOnChatViaSms()
            .verifyPhoneFieldError(successSendMessageForm.errorInvalidPhoneNumber);
    });

    it('[C493] Leave field empty', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .submitPasswordForm()
        messenger
            .chatWithResident
            .sendMessageComponent.clickOnChatViaSms()
            .verifyPhoneFieldError(successSendMessageForm.errorInvalidPhoneNumber);
    });

    it('[C790] Click on "Opt out"', () => {
        // todo add check for opt out text after fixing issue with + sign
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .submitPasswordForm()
        messenger
            .chatWithResident
            .sendMessageComponent
            .optOutAction(successSendMessageForm.optOutButton)
            .verifyIsOptOutFormExpanded()
    });

    it('[C791] Click on "Cancel"', () => {
        const email = randomMailTrapEmail();
        signUpPage
            .proceedToSignUpPage(email)
            .submitPasswordForm()
        messenger
            .chatWithResident
            .sendMessageComponent
            .optOutAction(successSendMessageForm.optOutButton)
            .optOutAction(successSendMessageForm.cancelButton)
            .verifyIsOptOutFormExpanded(false)
    });
})