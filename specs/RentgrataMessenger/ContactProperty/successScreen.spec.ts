import { messenger } from "../../../pages/messengerWidgetComponents/messenger.component";
import { messengerFormsData } from "../../../testData/messengerForms.data";
import { commonData } from "../../../testData/common.data";

const { url } = commonData;
const { successContactForm } = messengerFormsData;


describe('Success Screen', () => {
    it('[C778] Check your First Name', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifyFormElement(successContactForm.firstName, data.firstName);
    });

    it('[C779] Check your Last Name', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifyFormElement(successContactForm.lastName, data.lastName);
    });

    it('[C780] Check your Email', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifyFormElement(successContactForm.email, data.email);
    });

    it('[C781] Check your Expected Move In date', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifyFormElement(successContactForm.expectedMoveIn, `${data.expectedMoveInDate.month} ${data.expectedMoveInDate.day}, ${data.expectedMoveInDate.year}`);
    });

    it('[C782] Check your Message', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifyFormElement(successContactForm.message, data.message);
    });

    it('[C783] Click on "Go back to resident list"', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .clickOnBackToResidentListButton();
        messenger.chatWithResident.verifyChatWithResidentFormIsDisplayed()
    });

    it('[C784] Click on Rentgrata icon', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .clickOnRentgrataLogo()
            .closeWindowAndSwitchToOpened()
            .verifyUrl(url.rentgrata)
    });

    it('[C785] Click on Download on the App Store', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .clickOnDownloadOnTheAppStore()
            .closeWindowAndSwitchToOpened()
            .verifyUrl(url.appStore);
    });

    it('[C786] Check success screen title and description', () => {
        const data = messenger.contactForm.getRandomDataForContactPropertyForm();
        messenger.contactForm.successForm
            .proceedToSuccessForm(data)
            .verifySuccessFormTitleText(successContactForm.successFormText())
            .verifySuccessFormDescriptionText(successContactForm.descriptionFormText);
    });
})