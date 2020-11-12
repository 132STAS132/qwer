import {messenger} from "../../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import {commonData} from "../../../../testData/common.data";
import {messengerFormsData} from "../../../../testData/messengerForms.data";
import {allureHelper} from "../../../../helpers/allure";
import {bugs} from "../../../../existingBugs/bugs";
import {signInFormData} from "../../../../testData/signInForm.data";
import {forgotPasswordData} from "../../../../testData/forgotPassword.data";

const {existingTestUser} = commonData;
const {
    successSendMessageForm,
    sendMessageForm
} = messengerFormsData;
const {form} = forgotPasswordData;
const {
    emailOrPasswordIncorrect,
    passwordYouEnteredIncorrect
} = signInFormData.validationErrors;

describe('Send Message via Sing in', () => {
    // todo need update after fix bug with the send email messages
    it('[C818] Continue with valid data', () => {
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

    it('[C819] Continue with Incorrect email', () => {
        allureHelper.addIssueToAllure(bugs.signInForm.emailOrPasswordIsIncorrect);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm('ksd@dscom', '1234')
            .verifyErrorMessage(emailOrPasswordIncorrect)
    });

    it('[C820] Continue with incorrect password', () => {
        allureHelper.addIssueToAllure(bugs.signInForm.emailOrPasswordIsIncorrect);
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, 'password')
            .verifyErrorMessage(emailOrPasswordIncorrect);
    });

    it('[C821] Continue with Empty data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .clickOnSubmitButton()
            .verifyErrorMessage(passwordYouEnteredIncorrect);
    });

    it('[C826] Click on "Forgot Password?" link', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .clickOnForgotPasswordLink()
            .verifyFormTitle(form.title);
    });

    it('[C827] Close the form', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
        messenger.chatWithResident.sendMessageComponent.verifyTitleOfSendMessageForm(sendMessageForm.title)
            .clickOnSignInLinkAndSwitchToNewWindow()
            .closeWindowAndSwitchToOpened()
            .goToLoadingIframe()
        messenger.chatWithResident.sendMessageComponent.verifyTitleOfSendMessageForm(sendMessageForm.title)

    });
});