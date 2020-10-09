import { messenger } from '../pages/messengerWidgetComponents/messenger.component';
import { messengerData } from '../testData/messenger.data';

const { widgetButtonsCollapsed, widgetButtonsExpanded } = messengerData;

describe('Rentgrata Messenger', () => {
    it('[C437] Check content', () => {
       messenger
           .goToWidgetIFrame()
           .verifyWidgetIcons()
           .verifyCountOfResidentProfilePictures()
           .verifyWidgetButtons(widgetButtonsExpanded);
    });

    it('[C438] Click on resident icons', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentIconsAndVerifyChatWithResidentForm();
    });

    it('[C441] Collapse form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.closeChatWithResidentForm()
            .verifyChatWithResidentFormIsDisplayed(false)
    });

    it('[C527] Click on Show Less/More', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnShowLessButton()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(widgetButtonsCollapsed)
            .verifyWidgetButtons({
                showLessButton: widgetButtonsExpanded.showLessButton
            }, false)
            .verifyWidgetIcons(false)
            .clickOnShowMoreButton()
            .verifyWidgetIcons()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(widgetButtonsExpanded);
    });

    it('[C524] Click on Contact Property', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed();
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });

    it('[C702] Click on Chat with a Resident', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.chatButton)
            .gotoChatOrContactIFrame()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed();
        messenger.contactForm.verifyContactPropertyFormIsDisplayed(false);
    });
});