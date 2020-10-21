import { termsConditionsForm } from "../../../../pages/messengerWidgetComponents/termsConditionsForm.component";
import { messengerData } from "../../../../testData/messenger.data";
import { messenger } from "../../../../pages/messengerWidgetComponents/messenger.component";

const {
    randomMailTrapEmail,
    termsConditionsFormData,
    verifyEmailForm
} = messengerData;


describe('Terms & Conditions form ', () => {
    it('[C480] Check data', () => {
        termsConditionsForm
            .proceedToTermsConditionsForm(randomMailTrapEmail())
            .verifyHeaderInfoText(termsConditionsFormData.headerInfoText)
            .verifyTermsText(termsConditionsFormData.termsText)
            .verifyAgreementText(termsConditionsFormData.agreementText);
    });

    it('[C481] Click on "Terms of Use"', () => {
        termsConditionsForm
            .proceedToTermsConditionsForm(randomMailTrapEmail())
            .clickOnTermsOfUseLink()
            .verifyTermsOfUseText()
            .closeWindowAndSwitchToOpened()
            .gotoChatOrContactIFrame()
            .clickOnTermsLink()
            .verifyTermsOfUseText()
    });

    it('[C482] Click on "Privacy Policy."', () => {
        termsConditionsForm
            .proceedToTermsConditionsForm(randomMailTrapEmail())
            .clickOnPrivacyPolicyLink()
            .verifyPrivacyPolicyText()
            .closeWindowAndSwitchToOpened()
            .gotoChatOrContactIFrame()
            .clickOnPrivacyLink()
            .verifyPrivacyPolicyText()
    });

    it('[C483] Click on "<" button', () => {
        const email = randomMailTrapEmail();
        termsConditionsForm
            .proceedToTermsConditionsForm(email)
            .clickOnLeftArrowButton()
        messenger.chatWithResident.sendMessageComponent
            .waitForLoadSpinnerToDisappear()
            .verifyTitleOfSendMessageForm(verifyEmailForm.title)
            .verifyMessageSentToAndSubInfo(verifyEmailForm.sentCodeTo(email));
    });
});