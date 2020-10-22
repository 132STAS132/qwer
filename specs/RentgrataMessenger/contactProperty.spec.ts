import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";
import { messengerData } from "../../testData/messenger.data";

const {
    existingTestUser,
    widgetButtonsCollapsed,
    contactPropertyForm
} = messengerData;

describe('Contact Property', () => {
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
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.verifyAllFieldsAreEmpty()
    });

    it('[C740] Contact Property with empty First Name', () => {
        const date = messenger.getDateFromToday(2);
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                lastName: faker.random.word(),
                email: faker.internet.email(),
                message: faker.random.word(),
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
        const date = messenger.getDateFromToday(2);
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                email: faker.internet.email(),
                message: faker.random.word(),
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
        const date = messenger.getDateFromToday(2);
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                message: faker.random.word(),
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
        const date = messenger.getDateFromToday(2);
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                lastName: faker.random.word(),
                message: faker.random.word(),
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .submitForm({
                email: faker.random.word(),
            })
            .verifyErrorMessageUnderField(contactPropertyForm.emailField, contactPropertyForm.errorInvalidEmail)
    });

    it('[C753] Leave "Expected Move In Date" empty', () => {
        // todo link a bug
        const date = messenger.getDateFromToday(2);
        messenger.refreshPage()
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton, 3)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: faker.random.word(),
                email: faker.internet.email(),
                lastName: faker.random.word(),
                message: faker.random.word(),
            })
            .verifyErrorMessageUnderField(contactPropertyForm.expectedMoveInDate, contactPropertyForm.errorMustSelectDate)
            .submitForm({
                lastName: ' ',
                expectedMoveInDate: {
                    day: date.day,
                    month: date.monthFullName,
                    year: date.year
                }
            })
            .verifyErrorMessageUnderField(contactPropertyForm.lastNameField, contactPropertyForm.errorMustEnterLastName)
            .verifyErrorMessageUnderField(contactPropertyForm.expectedMoveInDate, contactPropertyForm.errorMustSelectDate, false)
    });
});