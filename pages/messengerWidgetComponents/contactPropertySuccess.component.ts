import { BasePage } from "../base.page";
import { messenger } from "./messenger.component";
import { homePageMessengerData } from "../../testData/homePageMessenger.data";
import { contactPropertyFormInterface } from "../../interfaces/widjetForms.interface";

const {
    widgetButtonsCollapsed
} = homePageMessengerData;

export class ContactPropertySuccessComponent extends BasePage {
    /** selectors **/
    private successFormWrapper(): string {
        return '.contact-property-success-wrapper__success-info';
    }

    private formElementByTitle(title: string): string {
        return `//ul[@class="contact-property-success-wrapper__success-info__info-copy"]/li[contains(.,"${title}")]`
    }

    private backToResidentListButton(): string {
        return '//a[text()="Go back to resident list"]';
    }

    private successFormTitleText(): string {
        return 'h3.contact-property-success-wrapper__success-info__header';
    }

    private descriptionFormText(): string {
        return `${this.successFormTitleText()} + p`;
    }

    /** actions **/

    clickOnBackToResidentListButton() {
        this.allure.startStep('Click on back to resident button');
        this.wd.click(this.backToResidentListButton());
        this.allure.endStep();
        return this;
    }

    proceedToSuccessForm(info: contactPropertyFormInterface) {
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .gotoChatOrContactIFrame()
            .contactForm.submitForm({
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                message: info.message,
                expectedMoveInDate: {
                    day: info.expectedMoveInDate.day,
                    month: info.expectedMoveInDate.month,
                    year: info.expectedMoveInDate.year
                }
            })
            .successForm.verifySuccessFormIsDisplayed();
        return this;
    }

    /** verifications **/
    verifySuccessFormIsDisplayed(expected = true) {
        this.allure.startStep(this.verifyAllureMessage('success form'));
        this.wd.waitForDisplayed(this.successFormWrapper(), !expected);
        this.expect(
            this.wd.isElementVisible(this.successFormWrapper()),
            this.displayedErrorMessage('success form', expected)
        ).to.be.equal(expected);
        this.allure.endStep();
        return this;
    }

    verifyFormElement(element: string, expectedValue: string) {
        this.allure.startStep(`Verify ${element} is displayed with ${expectedValue}`);
        this.expect(
            this.wd.getText(this.formElementByTitle(element)),
            `Incorrect text for the ${element} is displayed`
        ).to.be.equal(`${element} ${expectedValue}`);
        this.allure.endStep();
        return this;
    }

    verifySuccessFormTitleText(expectedValue: string) {
        this.allure.startStep('Verify form title');
        this.expect(
            this.wd.getText(this.successFormTitleText()),
            'Incorrect title of the form is displayed'
        ).to.be.equal(expectedValue)
        this.allure.endStep();
        return this;
    }

    verifySuccessFormDescriptionText(expectedValue: string) {
        this.allure.startStep('Verify form description');
        this.expect(
            this.wd.getText(this.descriptionFormText()),
            'Incorrect description of the form is displayed'
        ).to.be.equal(expectedValue)
        this.allure.endStep();
        return this;
    }
}