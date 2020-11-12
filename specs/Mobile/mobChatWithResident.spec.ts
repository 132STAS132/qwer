import {messenger} from "../../pages/messengerWidgetComponents/messenger.component";
import {messengerFormsData} from "../../testData/messengerForms.data";
import {termsConditionsForm} from "../../pages/messengerWidgetComponents/termsConditionsForm.component";

const {
    chatWithResidentFilters,
} = messengerFormsData;

describe('Main page', () => {
    it('[C535] Check filters', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.clickOnFilter(chatWithResidentFilters.floorplans.name)
            .selectFilterOption(chatWithResidentFilters.floorplans.studio)
            .clickOnTheApplyButton()
            .verifyFilteredResults(chatWithResidentFilters.floorplans.studio)
    });

    it('[C774] Collapse form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .clickOnCloseIcon()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });

    it('[C775] Click on "Contact Property or Schedule Tour"', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
        messenger.chatWithResident.clickOnContactPropertyOrScheduleTourButton()
        messenger.contactForm.verifyContactPropertyFormIsDisplayed();
    });

    it('[C804] Click on Privacy link', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
        termsConditionsForm
            .clickOnPrivacyLink()
            .verifyPrivacyPolicyText()
    });

    it('[C803] Click on Terms link', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
        termsConditionsForm
            .clickOnTermsLink()
            .verifyTermsOfUseText()
    });

    it('[C773] Cancel filter', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.clickOnFilter(chatWithResidentFilters.floorplans.name)
            .verifyFilterOptionsSectionIsDisplayed()
            .clickOnTheCancelButton()
            .verifyFilterOptionsSectionIsDisplayed(false)
    });
});