import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";
import * as faker from 'faker';
import { homePageMessengerData } from "../../testData/homePageMessenger.data";
import { messengerFormsData } from "../../testData/messengerForms.data";

const { widgetButtonsCollapsed } = homePageMessengerData;
const { sendMessageForm } = messengerFormsData;

describe("Chat with a Resident", () => {
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