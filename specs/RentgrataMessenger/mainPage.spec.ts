import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";
import { messengerData } from '../../testData/messenger.data';

const {
    widgetButtonsCollapsed,
    widgetButtonsExpanded,
    iconsUnderResidents,
    toolTipText
} = messengerData;


describe("Main page", () => {
    // todo delete only for 2 scenarios
    it.only('[C437] Check content', () => {
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
            .clickOnCloseIcon()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });

    it('[C523] Click on Schedule a Tour', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.scheduleATour)
            .contactForm.verifyContactPropertyFormIsDisplayed();
    });

    it('[C725] Click on Virtual Tour', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.virtualTour)
            .chatWithResident.verifyChatWithResidentFormIsDisplayed();
    });

    it('[C524] Click on Contact Property', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed();
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });

    it('[C525] Hover on Schedule a Tour icon', () => {
        messenger
            .goToWidgetIFrame()
            .moveToIcon(iconsUnderResidents.scheduleATour)
            .verifyToolTipText(toolTipText.scheduleATour);
    });

    it('[C726] Hover on "Virtual Tour" icon', () => {
        messenger
            .goToWidgetIFrame()
            .moveToIcon(iconsUnderResidents.virtualTour)
            .verifyToolTipText(toolTipText.virtualTour);
    });

    it('[C526] Hover on Contact Property icon', () => {
        messenger
            .goToWidgetIFrame()
            .moveToIcon(iconsUnderResidents.contactProperty)
            .verifyToolTipText(toolTipText.contactProperty);
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

    it.only('[C702] Click on Chat with a Resident', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.chatButton)
            .gotoChatOrContactIFrame()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed();
        messenger.contactForm.verifyContactPropertyFormIsDisplayed(false);
    });

    it('[C758] Click on Contact Property icon', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.contactProperty)
            .contactForm.verifyContactPropertyFormIsDisplayed();
    });

    it('[C729] Collapse "Contact Property" form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.contactProperty)
            .clickOnCloseIcon()
            .goToWidgetIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed(false)
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });
});