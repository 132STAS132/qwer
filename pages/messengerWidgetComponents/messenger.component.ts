import { AskQuestionComponent } from "./askQuestion.component";
import { ContactComponent } from "./contact.component";
import { BasePage } from "../base.page";
import { widgetButtonsExpandedInterface, widgetButtonsCollapsedInterface } from "../../interfaces/widget.interface";
import { messengerData } from "../../testData/messenger.data";

export class MessengerComponent extends BasePage {
    readonly askQuestion: AskQuestionComponent;
    readonly contactForm: ContactComponent;

    constructor() {
        super();
        this.askQuestion = new AskQuestionComponent();
        this.contactForm = new ContactComponent();
    }

    /** locators **/

    private widgetIFrame(): string {
        return '[id*=zoid-rg-widget-feature-icons] .zoid-component-frame.zoid-visible';
    }

    private icon360(): string {
        return '[title="Virtual Tour"] svg path[d*="M138.664"] ~ path[d*="M371.605"] ~  path[d*="M466.848"]';
    }

    private calendarIcon(): string {
        return '//*[contains(@d,"M255")]/ancestor::div[@title="Schedule a Tour"]';
    }

    private envelopeIcon(): string {
        return '[title="Contact Property"] #contact-property_svg__flatOnLight-reg';
    }

    private residentProfilePictures(): string {
        return '.trigger-cirlces-layout  [alt="Resident profile picture."]';
    }

    private dots3Icon(): string {
        return '[title="More"] #more-icon_svg__flatOnLight-reg'
    }

    private contactPropertyForm(): string {
        return 'section.contact-property-container';
    }

    private chatWithResidentFiltersSection(): string {
        return '#rg-widget-messenger .residents-filter-strap';
    }


    /** actions **/

    goToWidgetIFrame(): this {
        this.allure.startStep('Switch to widget iFrame');

        this.wd.switchToFrame(this.widgetIFrame());

        this.allure.endStep();
        return this;
    }

    clickOnWidgetButton(button: string) {
        this.clickOnButtonByText(button);
    }

    clickOnShowMoreButton(): this {
        this.clickOnButtonByText(messengerData.widgetButtonsCollapsed.showMoreButton);
        this.wd.waitForDisplayed(this.buttonByText(messengerData.widgetButtonsExpanded.showLessButton));
        this.wd.waitForDisplayed(this.dots3Icon(), true);
        this.wd.waitForDisplayed(this.envelopeIcon());
        this.wd.wait(1);
        return this;
    }

    clickOnShowLessButton(): this {
        this.clickOnButtonByText(messengerData.widgetButtonsExpanded.showLessButton);
        this.wd.waitForDisplayed(this.buttonByText(messengerData.widgetButtonsCollapsed.showMoreButton));
        this.wd.waitForDisplayed(this.dots3Icon());
        this.wd.waitForDisplayed(this.envelopeIcon(), false);
        this.wd.wait(1);
        return this;
    }

    /** verifications **/

    private verifyEnvelopeIcon(expected: boolean): this {
        const elementTitle = 'Envelope icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.envelopeIcon()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    private verifyIcon360(expected: boolean): this {
        const elementTitle = '360 icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.icon360()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    private verifyCalendarIcon(expected: boolean): this {
        const elementTitle = 'Calendar icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.calendarIcon()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyWidgetIcons(expected = true): this {
        this.allure.startStep('Verify widget icons');

        this.verifyEnvelopeIcon(expected)
            .verifyIcon360(expected)
            // .verifyCalendarIcon(expected); todo check how it works from admin side

        this.allure.endStep();
        return this;
    }

    verifyCountOfResidentProfilePictures(count = 3): this {
        this.allure.startStep(`Verify count of displayed resident profile pictures.`);
        let elements = [];
        // stabilizing for loading images
        try {
            browser.waitUntil(() => {
                elements = this.wd.elements(this.residentProfilePictures());
                return elements.length === count;
            });
        } catch (e) {}
        elements.forEach(element => {
            if (!element.isDisplayed()) {
                throw new Error(`${element.getAttribute('src')} is not displayed`);
            }
        })

        this.expect(
            elements.length,
            'Incorrect count of displayed resident profile pictures'
        ).to.be.equal(count);

        this.allure.endStep();
        return this;
    }

    verifyWidgetButtons(buttons: widgetButtonsExpandedInterface | widgetButtonsCollapsedInterface, expected = true): this {
        this.allure.startStep('Verify messenger widget buttons');

        Object.values(buttons).forEach(button => {
            this.allure.startStep(this.verifyAllureMessage(`${button} button`));
            this.expect(
                this.wd.isElementVisible(this.buttonByText(button)),
                this.displayedErrorMessage(button, expected)
            ).to.be.equal(expected)
            this.allure.endStep();
        });

        this.allure.endStep();
        return this;
    }

    verifyContactPropertyFormIsDisplayed(expected = true) {
        const element = 'Contact property form'
        this.allure.startStep(this.verifyAllureMessage(element));
        // waiting for animation
        try {
            this.wd.waitForDisplayed(this.contactPropertyForm(), false,2000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.contactPropertyForm()),
            this.displayedErrorMessage(element, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
    }

    verifyChatWithResidentFormIsDisplayed(expected = true) {
        const element = 'Chat with resident form'
        this.allure.startStep(this.verifyAllureMessage(element));
        // waiting for animation
        try {
            this.wd.waitForDisplayed(this.chatWithResidentFiltersSection(), false,2000);
        } catch (e) {}
        this.expect(
            this.wd.isElementVisible(this.chatWithResidentFiltersSection()),
            this.displayedErrorMessage(element, expected)
        ).to.be.equal(expected);
        this.allure.endStep();
    }
}

export const messenger = new MessengerComponent();