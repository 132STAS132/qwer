import { messenger } from "../../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { commonData } from "../../../testData/common.data";
import { messengerFormsData } from "../../../testData/messengerForms.data";
import { homePageMessengerData } from "../../../testData/homePageMessenger.data";
import { bugs } from "../../../existingBugs/bugs";
import { allureHelper } from "../../../helpers/allure";
import { signInFormData } from "../../../testData/signInForm.data";

const { existingTestUser } = commonData;
const { widgetButtonsCollapsed } = homePageMessengerData;
const { contactPropertyForm } = messengerFormsData;

const date = messenger.getDateFromToday(2);
const { randomCountry } = signInFormData;
const phoneNumber = '+380501234567';

describe('Contact Property part 1', () => {
    it('[C737] Open Contact Property as logged in user', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLinkAndSwitchToNewWindow()
            .submitForm(existingTestUser.email, existingTestUser.password)
            .waitForWindowsCount(1)
            .switchToFirstOpenedWindow()
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.verifyContactPropertyFormIsDisplayed()
            .verifyEmailInputValue(existingTestUser.email)
            .verifyLastNameInputValue(existingTestUser.lastName)
            .verifyFirstNameInputValue(existingTestUser.firstName)
    });

    it('[C738] Open Contact Property w/o login', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton )
            .gotoChatOrContactIFrame()
            .contactForm.verifyAllFieldsAreEmpty()
    });

    it('[C740] Contact Property with empty First Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                lastName: faker.random.word(),
                email: faker.internet.email(),
                message: faker.random.uuid(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .verifyErrorMessageUnderField(contactPropertyForm.firstNameField, contactPropertyForm.errorMustEnterFirstName)
            .submitForm({
                firstName: faker.random.word(),
                lastName: ' ',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.lastNameField, contactPropertyForm.errorMustEnterLastName)
            .verifyErrorMessageUnderField(contactPropertyForm.firstNameField, contactPropertyForm.errorMustEnterFirstName, false)
    });

    it('[C741] Contact Property with empty Last Name', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                email: faker.internet.email(),
                message: faker.random.uuid(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .verifyErrorMessageUnderField(contactPropertyForm.lastNameField, contactPropertyForm.errorMustEnterLastName)
            .submitForm({
                lastName: faker.random.word(),
                firstName: ' ',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.firstNameField, contactPropertyForm.errorMustEnterFirstName)
            .verifyErrorMessageUnderField(contactPropertyForm.lastNameField, contactPropertyForm.errorMustEnterLastName, false)
    });

    it('[C742] Contact Property with empty Email', function () {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton )
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                message: faker.random.uuid(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .verifyErrorMessageUnderField(contactPropertyForm.emailField, contactPropertyForm.errorMustEnterEmail)
            .submitForm({
                email: faker.internet.email(),
                firstName: ' ',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.firstNameField, contactPropertyForm.errorMustEnterFirstName)
            .verifyErrorMessageUnderField(contactPropertyForm.emailField, contactPropertyForm.errorMustEnterEmail, false)
    });

    it('[C743] Contact Property with invalid Email',() => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                message: faker.random.uuid(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .submitForm({
                email: faker.random.word(),
                lastName: faker.random.word(),
            })
            .verifyErrorMessageUnderField(contactPropertyForm.emailField, contactPropertyForm.errorInvalidEmail)
    });

    it('[C753] Leave "Expected Move In Date" empty', () => {
        allureHelper.addIssueToAllure(bugs.contactPropertyForm.expectedMoveInDateWarningDoesNotDisappear);
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                email: faker.internet.email(),
                lastName: faker.random.word(),
                message: faker.random.uuid(),
            })
            .verifyErrorMessageUnderField(contactPropertyForm.expectedMoveInDate, contactPropertyForm.errorMustSelectDate)
            .submitForm({
                lastName: ' ',
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            }, 3)
            .verifyErrorMessageUnderField(contactPropertyForm.lastNameField, contactPropertyForm.errorMustEnterLastName)
            .verifyErrorMessageUnderField(contactPropertyForm.expectedMoveInDate, contactPropertyForm.errorMustSelectDate, false)
    });

    it('[C757] Leave "Message" field empty', () => {
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
                }
            })
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMustEnterMessage)
            .submitForm({
                message: faker.random.uuid(),
                firstName: ' ',
            })
            .verifyErrorMessageUnderField(contactPropertyForm.firstNameField, contactPropertyForm.errorMustEnterFirstName)
            .verifyErrorMessageUnderField(contactPropertyForm.messageField, contactPropertyForm.errorMustEnterMessage, false)
    });

    it('[C744] Select Expected Move In Date', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            }, 2)
            .verifyExpectedMoveInDateValue(date.monthDigits, date.dayLeadingZero, date.year)
    });

    it('[C745] Select country (Phone Number)', () => {
        const { countryCode, countryName, dialCode } = randomCountry();
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .selectCountry(countryCode, countryName)
            .contactForm.verifyPhoneInputValue(`+${dialCode}`)
            .verifySelectedFlag(countryCode, countryName)
    });

    it('[C746] Type phone number', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                phone: phoneNumber
            })
            .verifyPhoneInputValue(phoneNumber)
            .verifyPhoneErrorMessage(contactPropertyForm.errorInvalidPhone, false)
    });
});