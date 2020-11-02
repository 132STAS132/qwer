import { messenger } from "../../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { commonData } from "../../../../testData/common.data";
import { messengerFormsData } from "../../../../testData/messengerForms.data";

const {
    existingTestUser,
    url
} = commonData;

const {
    successSendMessageForm,
    chatWithResidentForm
} = messengerFormsData;

describe('Success form', () => {

    afterEach('Reload session',() => messenger.reload());

    it('[C797] Click on Download on the App Store', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
            .gotoChatOrContactIFrame()
            .clickOnDownloadOnTheAppStore()
            .closeWindowAndSwitchToOpened()
            .verifyUrl(url.appStore);
    });

    it('[C462] Check message', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.gotoChatOrContactIFrame()
            .chatWithResident
            .sendMessageComponent
            .verifySuccessSentMessageTitleText(successSendMessageForm.successMessage)
    });

    it('[C795] Check info text', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.gotoChatOrContactIFrame()
            .chatWithResident
            .sendMessageComponent
            .verifySuccessSentMessageInfoText(`${successSendMessageForm.descriptionExistingUser} ${successSendMessageForm.thankYouForUsingRentgrata}`)
    });

    it('[C463] Click on "< Back to Residents" button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.gotoChatOrContactIFrame()
            .chatWithResident.sendMessageComponent
            .clickOnBackToResidentButton();
        messenger.chatWithResident
            .verifyChatWithResidentFormIsDisplayed()
            .verifyFormTitleText(chatWithResidentForm.weLiveHere)
    });

    it('[C464] Click on Done button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.gotoChatOrContactIFrame()
            .chatWithResident.sendMessageComponent
            .clickOnDoneButton();
        messenger.chatWithResident
            .verifyChatWithResidentFormIsDisplayed()
            .verifyFormTitleText(chatWithResidentForm.weLiveHere)
    });

    it('[C465] Click on www.rentgrata.com link', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.gotoChatOrContactIFrame()
            .chatWithResident.sendMessageComponent
            .clickOnRentgrataLinkInText()
            .closeWindowAndSwitchToOpened()
            .verifyUrl(url.rentgrata)
    });

    it('[C796] Click on Rentgrata icon', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, process.env.DEFAULT_USER_PASSWORD)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
            .gotoChatOrContactIFrame()
            .clickOnRentgrataLogo()
            .closeWindowAndSwitchToOpened()
            .verifyUrl(url.rentgrata)
    });

    // todo add scenario for input (missed element)
});