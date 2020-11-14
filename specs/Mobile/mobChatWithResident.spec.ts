import {messenger} from "../../pages/messengerWidgetComponents/messenger.component";
import {messengerFormsData} from "../../testData/messengerForms.data";
import {termsConditionsForm} from "../../pages/messengerWidgetComponents/termsConditionsForm.component";
import {poweredByRentgrataForm} from "../../pages/messengerWidgetComponents/poweredByRentgrata.component";
import * as faker from 'faker';

const {
    chatWithResidentFilters,
    sendMessageForm,
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

    it('[C761] Select Expected Move In Date', () => {
        const date = messenger.getDateFromToday(2);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.selectExpectedMoveInDate({
            day: date.day,
            month: date.monthFullName,
            year: date.year
        })
            .verifyExpectedMoveInDate(date.monthDigits, date.dayLeadingZero, date.year);
    });

    it('[C533] Send a message', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.verifyTitleOfSendMessageForm(sendMessageForm.title)
            .verifyAuthInfoOfSendMessageForm(sendMessageForm.authInfoMessage);
    });

    it('[C534] Send a message w/o data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage('')
            .verifyErrorMessageForEmptyFiled(sendMessageForm.errorEmptyMessage);
    });

    it('[C532] Check list of residents', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.verifyFullListOfResidents();
    });

    it('[C771] Reset filters by clicking on "X" button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.clickOnFilter(chatWithResidentFilters.floorplans.name)
            .selectFilterOption(chatWithResidentFilters.floorplans.studio)
            .clickOnTheApplyButton()
            .verifyFilteredResults(chatWithResidentFilters.floorplans.studio)
            .clickOnResetFiltersButton()
            .verifyFullListOfResidents()
    });

    it('[C771] Reset filters by clicking on "X" button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.clickOnFilter(chatWithResidentFilters.floorplans.name)
            .selectFilterOption(chatWithResidentFilters.floorplans.studio)
            .clickOnTheApplyButton()
            .verifyFilteredResults(chatWithResidentFilters.floorplans.studio)
            .clickOnResetFiltersButton()
            .verifyFullListOfResidents()
    });

    it('[C772] Reset filters by unchecking the selected option', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.clickOnFilter(chatWithResidentFilters.floorplans.name)
            .selectFilterOption(chatWithResidentFilters.floorplans.studio)
            .clickOnTheApplyButton()
            .verifyFilteredResults(chatWithResidentFilters.floorplans.studio)
            .clickOnFilter(chatWithResidentFilters.floorplans.name)
            .selectFilterOption(chatWithResidentFilters.floorplans.studio)
            .clickOnTheApplyButton()
            .verifyFullListOfResidents()
    });

    it('[C805] Click on powered by Rentgrata', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture();
        poweredByRentgrataForm
            .clickOnPoweredByRentgrataLink()
            .verifyRentgrataLogoIsDisplayed()
    });

    it.only('[C532] Check list of residents', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.verifyFullListOfResidentsViaScroll();
    });
});