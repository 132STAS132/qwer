import { BasePage } from "../base.page";
import { contactPropertyFormInterface } from "../../interfaces/widget.interface";

export class ContactComponent extends BasePage {
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

    submitForm(info: contactPropertyFormInterface) {
        this.fillFormFields(info);
        this.clickOnButtonByText('Contact Property');
        return this;
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

    verifyFirstNameInputValue(value: string) {
        this.allure.startStep('Verify first name input value');
        this.expect(
            this.wd.getValue(this.firstNameInput()),
            'Incorrect value is displayed for first name input field'
        ).to.be.equal(value);
        this.allure.endStep();
        return this;
    }

    verifyLastNameInputValue(value: string) {
        this.allure.startStep('Verify last name input value');
        this.expect(
            this.wd.getValue(this.lastNameInput()),
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
}