import { BasePage } from "../base.page";
import { contactPropertyFormInterface } from "../../interfaces/widjetForms.interface";
import { ContactPropertySuccessComponent } from "./contactPropertySuccess.component";
import * as faker from "faker";
import {messenger} from "./messenger.component";

export class ContactComponent extends BasePage {

    successForm: ContactPropertySuccessComponent;

    constructor() {
        super();
        this.successForm = new ContactPropertySuccessComponent();
    }


    /** locators **/
    private contactPropertyForm(): string {
        return 'section.contact-property-container';
    }

    private firstNameInput(): string {
        return '#firstName';
    }

    private lastNameInput(): string {
        return '#lastName';
    }

    private emailInput(): string {
        return '#email';
    }

    private allFields(): string {
        return '.contact-property-form [class*="contact-property-form__input"], input[type="tel"]';
    }

    private expectedMoveInDateInput(): string {
        return '#moveInDate input:last-child';
    }

    private scheduleATourInput(): string {
        return '#tourDate input:last-child';
    }

    private phoneInput(): string {
        return '.intl-tel-input input';
    }

    private messageTextArea(): string {
        return '#message';
    }

    private phoneErrorMessage(): string {
        return '#contact-phone-error-msg'
    }

    /** actions **/
    selectExpectedMoveInDate(date: { day: string, month: string, year: string }) {
        this.allure.startStep(`Select expected move in date - ${date.day}/${date.month}/${date.year}`);
        this.wd.click(this.expectedMoveInDateInput(), true);
        this.selectDataInDatePicker(date)
        this.allure.endStep();
        return this;
    }

    getFormFieldLocator(name: string) {
        const fieldLocators = new Map([
            ['firstName', this.firstNameInput()],
            ['lastName', this.lastNameInput()],
            ['email', this.emailInput()],
            ['expectedMoveInDate', this.expectedMoveInDateInput()],
            ['scheduleATour', this.scheduleATourInput()],
            ['phone', this.phoneInput()],
            ['message', this.messageTextArea()]
        ]);
        const locator = fieldLocators.get(name);
        if (!locator) throw new Error(`${name} is not supported`);
        return locator;
    }

    fillFormFields(info: contactPropertyFormInterface) {
        Object.entries(info).forEach(([key, value]) => {
            if (key === 'expectedMoveInDate') {
                this.selectExpectedMoveInDate(value);
            } else if (key === 'scheduleATour') {
                throw new Error('Not implemented');
            } else {
                this.allure.startStep(`Fill ${key} input with ${value} value`);
                this.wd.clearAndFill(this.getFormFieldLocator(key), value);
            }
            this.allure.endStep();
        });
        return this;
    }

    clickOnContactProperty() {
        this.clickOnButtonByText('Contact Property');
        return this;
    }


    submitForm(info: contactPropertyFormInterface, wait = 0) {
        this.wd.wait(wait);
        this.fillFormFields(info);
        this.clickOnContactProperty();
        return this;
    }

    getRandomDataForContactPropertyForm(): contactPropertyFormInterface {
        const date = messenger.getDateFromToday(2);
        return {
            firstName: faker.random.word(),
            lastName: faker.random.word(),
            email: faker.internet.email(),
            message: faker.random.uuid(),
            expectedMoveInDate: {
                day: date.day,
                month: date.monthFullName,
                year: date.year
            }
        }
    }

    /** verifications **/

    verifyEmailInputValue(value: string) {
        this.allure.startStep('Verify email input value');
        this.expect(
            this.wd.getValue(this.emailInput()),
            'Incorrect value is displayed for email input field'
        ).to.be.equal(value);
        this.allure.endStep();
        return this;
    }

    verifyPhoneInputValue(value: string) {
        this.allure.startStep('Verify phone input value');
        this.expect(
            this.wd.getValue(this.getFormFieldLocator('phone')),
            'Incorrect value is displayed for phone input field'
        ).to.be.equal(value);
        this.allure.endStep();
        return this;
    }

    verifyFirstNameInputValue(value: string) {
        this.allure.startStep('Verify first name input value');
        this.expect(
            this.wd.getValue(this.getFormFieldLocator('firstName')),
            'Incorrect value is displayed for first name input field'
        ).to.be.equal(value);
        this.allure.endStep();
        return this;
    }

    verifyLastNameInputValue(value: string) {
        this.allure.startStep('Verify last name input value');
        this.expect(
            this.wd.getValue(this.getFormFieldLocator('lastName')),
            'Incorrect value is displayed for last name input field'
        ).to.be.equal(value);
        this.allure.endStep();
        return this;
    }

    verifyAllFieldsAreEmpty(fieldsCount = 7) {
        this.allure.startStep('Verify all fields are empty');
        const result = [];
        this.wd.elements(this.allFields()).forEach(el => {
            if (el.isDisplayed()) {
                result.push(el.getValue() === '' && el.getText() === '');
            }
        });
        this.expect(result.length, 'Incorrect count of displayed fields.').to.be.equal(fieldsCount)
        this.expect(result.every(el => el === true),'All fields should be empty').to.be.true;

        this.allure.endStep();
        return this;
    }

    verifyContactPropertyFormIsDisplayed(expected = true) {
        const element = 'Contact property form';
        this.allure.startStep(this.verifyAllureMessage(element));
        // waiting for animation
        try {
            this.wd.waitForDisplayed(this.contactPropertyForm(), !expected,2000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.contactPropertyForm()),
            this.displayedErrorMessage(element, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyExpectedMoveInDateValue(month: string, day: string, year: string) {
        const expectedDate = `${month}/${day}/${year}`;
        this.allure.startStep(`Verify expected move in date is ${expectedDate}`);
        this.expect(
            this.wd.getValue(this.getFormFieldLocator('expectedMoveInDate')),
            'Incorrect expected move in date value is displayed'
        ).to.be.equal(expectedDate);
        this.allure.endStep();
        return this;
    }

    verifyPhoneErrorMessage(expectedError: string, shouldBeDisplayed = true) {
        this.allure.startStep(`Verify [${expectedError}] error message is ${shouldBeDisplayed ? 'displayed' : 'not displayed'} under Phone`);
        if (!shouldBeDisplayed) {
            this.wd.pause(500);
            this.expect(
                this.wd.isElementVisible(this.phoneErrorMessage()),
                `Phone error message should not be displayed`
            ).to.be.false;
        } else {
            this.expect(
                this.wd.getText(this.phoneErrorMessage()),
                `Incorrect error message is displayed under Phone field`
            ).to.be.equal(expectedError)
        }
        this.allure.endStep();
        return this;
    }
}