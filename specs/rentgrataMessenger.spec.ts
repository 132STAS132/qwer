import { messenger } from '../pages/messengerWidgetComponents/messenger.component';
import { messengerData } from '../testData/messenger.data';
import * as faker from 'faker';

const {
    widgetButtonsCollapsed,
    widgetButtonsExpanded,
    sendMessageForm,
    iconsUnderResidents,
    toolTipText
} = messengerData;


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
            .clickOnCloseIcon()
            .chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
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

    it('[C440] Send a message', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.verifyTitleOfSendMessageForm(sendMessageForm.title)
            .verifyAuthInfoOfSendMessageForm(sendMessageForm.authInfoMessage);
    });

    it('[C442] Send a message w/o data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage('')
            .verifyErrorMessageForEmptyFiled(sendMessageForm.errorEmptyMessage);
    });

    it('[C443] Select Expected Move In Date', () => {
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

    it('[C758] Click on Contact Property icon', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.contactProperty)
            .contactForm.verifyContactPropertyFormIsDisplayed();
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

    it('[C729] Collapse "Contact Property" form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnIcon(iconsUnderResidents.contactProperty)
            .clickOnCloseIcon()
            .goToWidgetIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed(false)
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
    });

    it('[C730] Collapse "Contact Property" form after opening it from "Chat with a Resident"',() => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.chatButton)
            .gotoChatOrContactIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed(false)
        messenger.chatWithResident.clickOnContactPropertyOrScheduleTourButton()
        messenger.contactForm.verifyContactPropertyFormIsDisplayed();
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed(false);
        messenger.contactForm.clickOnCloseIcon();
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed();
        messenger.contactForm.verifyContactPropertyFormIsDisplayed(false);
    });
});