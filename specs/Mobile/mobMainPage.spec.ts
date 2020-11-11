import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";
import {homePageMessengerData} from "../../testData/homePageMessenger.data";
import {messengerFormsData} from "../../testData/messengerForms.data";

const {
    popupMessagesText,
    iconsUnderResidents
} = homePageMessengerData;

const {
    chatWithResidentForm
} = messengerFormsData;

describe('Main page', () => {
    // todo in progress, update according to the expected result
    it('[C529] Check content', () => {
        messenger
            .goToWidgetIFrame()
            .verifyCountOfResidentProfilePictures();
    });

    // need update
    it('[C768] Check popup', () => {
        messenger
            .goToWidgetIFrame()
            .verifyPopupMessageText(popupMessagesText.askMeMessage);
    });

    it('[C770] Cancel popup', () => {
        messenger
            .goToWidgetIFrame()
            .verifyPopupMessagesState()
            .clickOnClosePopupIcon()
            .verifyPopupMessagesState(false);
    });

    it('[C530] Click on icons', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
        messenger.chatWithResident
            .verifyChatWithResidentFormIsDisplayed()
            .verifyFormTitleText(chatWithResidentForm.weLiveHere)
    });

    it('[C531] Collapse form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .clickOnCloseIcon()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });
});