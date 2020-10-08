import { ChatWithResidentComponent } from "./chatWithResident.component";
import { ContactComponent } from "./contact.component";
import { BasePage } from "../base.page";
import { widgetButtonsExpandedInterface, widgetButtonsCollapsedInterface } from "../../interfaces/widget.interface";
import { messengerData } from "../../testData/messenger.data";
import { widgetIconsType } from "../../interfaces/widget.interface";

export class MessengerComponent extends BasePage {
    readonly chatWithResident: ChatWithResidentComponent;
    readonly contactForm: ContactComponent;

    constructor() {
        super();
        this.chatWithResident = new ChatWithResidentComponent();
        this.contactForm = new ContactComponent();
    }

    /** locators **/

    private chatWithResidentIFrame(): string {
        return '[id*="zoid-rg-widget-messenger"] iframe';
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

    private residentProfilePictureByIndex(index: number): string {
        return `.faceslayout.expanded span:nth-of-type(${index})`;
    }

    private dots3Icon(): string {
        return '[title="More"] #more-icon_svg__flatOnLight-reg'
    }

    /** actions **/

    clickOnWidgetButton(button: string) {
        this.clickOnButtonByText(button);
    }

    clickOnResidentPicture(number = 1): this {
        this.allure.startStep('Click on resident picture and switch to chat form iFrame');
        // due to animation
        this.wd.wait(2);
        this.wd.click(this.residentProfilePictureByIndex(number), this.wd.isSafari());
        this.wd.closeFrame();
        this.wd.switchToFrame(this.chatWithResidentIFrame());
        this.allure.endStep();
        return this;
    }

    private getIconLocator(icon: widgetIconsType) {
        const icons = new Map([
            ['360', this.icon360()],
            ['envelope', this.envelopeIcon()],
            ['calendar', this.calendarIcon()],
        ]);
        return icons.get(icon.toLowerCase().trim());
    }

    clickOnIcon(icon: widgetIconsType, waitExpectedForm = true): this {
        this.allure.startStep(`Click on [${icon}] icon`);
        this.wd.click(this.getIconLocator(icon));
        if (waitExpectedForm) {
            try {
                this.wd.waitForDisplayed(this.contactForm.contactPropertyForm())
            } catch (e) {}
        }

        this.allure.endStep();
        return this;
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

    verifyEnvelopeIcon(expected: boolean): this {
        const elementTitle = 'Envelope icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.envelopeIcon()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyIcon360(expected: boolean): this {
        const elementTitle = '360 icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.icon360()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyCalendarIcon(expected: boolean): this {
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
            .verifyCalendarIcon(expected);

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
        });

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
            // stabilizing for iFrame
            try {
                this.wd.waitForDisplayed(this.buttonByText(button), !expected, 5000);
            } catch (e) {}
            this.expect(
                this.wd.isElementVisible(this.buttonByText(button)),
                this.displayedErrorMessage(button, expected)
            ).to.be.equal(expected)
            this.allure.endStep();
        });

        this.allure.endStep();
        return this;
    }
}

export const messenger = new MessengerComponent();