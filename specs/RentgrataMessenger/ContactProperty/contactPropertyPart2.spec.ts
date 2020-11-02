import { messenger } from "../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { signInFormData } from "../../../testData/signInForm.data";
import {homePageMessengerData} from "../../../testData/homePageMessenger.data";
import {messengerFormsData} from "../../../testData/messengerForms.data";


const { widgetButtonsCollapsed } = homePageMessengerData;
const {
    contactPropertyForm,
    warningMessageCloseForm
} = messengerFormsData;

const date = messenger.getDateFromToday(2);
const { randomCountry } = signInFormData;
const phoneNumber = '+380501234567';

describe('Contact Property part 2', () => {

    it('[C776] Type country code', function () {
        const { countryCode, countryName, dialCode } = randomCountry();
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                phone: `+${dialCode}`
            })
            .verifySelectedFlag(countryCode, countryName)
    });

    it('[C747] Leave phone number empty', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
            expectedMoveInDate: {
                day: date.day,
                month: date.monthFullName,
                year: date.year
            },
        },2)
            .verifyPhoneErrorMessage(contactPropertyForm.errorInvalidPhone, false)
            .submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                email: faker.internet.email(),
                message: faker.random.uuid()
            })
            .successForm.verifySuccessFormIsDisplayed();
    });

    it('[C748] Type invalid phone number', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                phone: "asdw",
            })
            .verifyPhoneErrorMessage(contactPropertyForm.errorInvalidPhone)
            .submitForm({
                phone: phoneNumber,
            })
            .verifyPhoneErrorMessage(contactPropertyForm.errorInvalidPhone, false)
    });

    it('[C749] Close the form with data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.fillFormFields({
                firstName: faker.random.word()
            })
            .clickOnCloseIcon()
            .verifyWarningMessageText(warningMessageCloseForm.cancelWarning);
    });

    it('[C750] Click on "Yes" button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.fillFormFields({
                firstName: faker.random.word()
            })
            .clickOnCloseIcon()
            .clickOnButtonByText(warningMessageCloseForm.yesButton)
            .verifyContactPropertyFormIsDisplayed(false)
    });

    it('[C751] Click on "No" button', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.fillFormFields({
                firstName: faker.random.word()
            })
            .clickOnCloseIcon()
            .verifyIsWarningDisplayed()
            .clickOnButtonByText(warningMessageCloseForm.noButton)
            .verifyIsWarningDisplayed(false)
            .verifyContactPropertyFormIsDisplayed()
    });

    it('[C752] Close the form w/o data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed()
            .clickOnCloseIcon()
            .verifyIsWarningDisplayed(false)
            .verifyContactPropertyFormIsDisplayed(false)
    });

    it('[C739] Contact Property with valid data', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                email: faker.internet.email(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                },
                message: faker.random.uuid(),
            })
            .successForm.verifySuccessFormIsDisplayed();
    });

    it('[C777] Message must be at least 5 characters long', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                message: '1234',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMessageAtLeast5)
            .submitForm({
                message: '12345',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMessageAtLeast5, false)
    });

    it('[C756] Type valid message', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                message: faker.random.uuid(),
            })
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMessageAtLeast5, false)
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMustEnterMessage, false)
    });
})