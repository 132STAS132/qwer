import { ChatWithResidentComponent } from "./chatWithResident.component";
import { ContactComponent } from "./contact.component";
import { BasePage } from "../base.page";
import {
    widgetButtonsExpandedInterface,
    widgetButtonsCollapsedInterface
} from "../../interfaces/homePageWidget.interface";
import { homePageMessengerData } from "../../testData/homePageMessenger.data";

export class MessengerComponent extends BasePage {
    readonly chatWithResident: ChatWithResidentComponent;
    readonly contactForm: ContactComponent;

    constructor() {
        super();
        this.chatWithResident = new ChatWithResidentComponent();
        this.contactForm = new ContactComponent();
    }

    /** locators **/

    private icon360(): string {
        return '[title="Virtual Tour"]';
    }

    private calendarIcon(): string {
        return '//*[contains(@d,"M255")]/ancestor::div[@title="Schedule a Tour"]';
    }

    private envelopeIcon(): string {
        return '[title="Contact Property"]:not(button)';
    }

    private residentProfilePictures(): string {
        return '.trigger-cirlces-layout  [alt="Resident profile picture."]';
    }

    private residentProfilePictureByIndex(index: number): string {
        return `.faceslayout span[class*="resident-avatar"]:nth-of-type(${index})`;
    }

    private dots3Icon(): string {
        return '[title="More"] #more-icon_svg__flatOnLight-reg'
    }

    private tooltip(): string {
        return '#rg-widget-feature-icon-title';
    }

    /** actions **/
    private getIconLocator(icon: string) {
        const icons = new Map([
            [homePageMessengerData.iconsUnderResidents.virtualTour, this.icon360()],
            [homePageMessengerData.iconsUnderResidents.contactProperty, this.envelopeIcon()],
            [homePageMessengerData.iconsUnderResidents.scheduleATour, this.calendarIcon()],
        ]);
        const locator = icons.get(icon);
        if (!locator) throw new Error(`${icon} icon is not supported. Please provide one of [${Array.from(icons.keys()).join(', ')}]`);
        return locator;
    }

    clickOnResidentPicture(number = 1) {
        this.allure.startStep('Click on resident picture and switch to chat form iFrame');
        // due to animation
        this.wd.wait(2);
        this.wd.nativeClick(this.residentProfilePictureByIndex(number), false);
        this.gotoChatOrContactIFrame();
        this.allure.endStep();
        return this;
    }


    clickOnIcon(icon: string) {
        this.allure.startStep(`Click on [${icon}] icon`);
        this.wd.click(this.getIconLocator(icon), this.wd.isSafari());
        this.gotoChatOrContactIFrame();
        this.allure.endStep();
        return this;
    }

    moveToIcon(icon: string, closeIframe = true) {
        this.allure.startStep(`Click on [${icon}] icon`);
        // due to animation
        this.wd.wait(2);
        let tooltipIsExisting = false;
        browser.waitUntil(() => {
            this.wd.moveToElement(this.getIconLocator(icon));
            this.wd.closeFrame();
            tooltipIsExisting = this.wd.isElementExisting(this.tooltip(), 300);
            this.wd.pause(500);
            this.goToWidgetIFrame();
            return tooltipIsExisting;
        }, { timeoutMsg: 'Tooltip element still not existing' });
        if (closeIframe) this.wd.closeFrame();
        this.allure.endStep();
        return this;
    }

    clickOnShowMoreButton() {
        this.clickOnButtonByText(homePageMessengerData.widgetButtonsCollapsed.showMoreButton);
        this.wd.waitForDisplayed(this.buttonByText(homePageMessengerData.widgetButtonsExpanded.showLessButton));
        this.wd.waitForDisplayed(this.dots3Icon(), true);
        // wait for animation
        this.wd.wait(2);
        return this;
    }

    clickOnShowLessButton() {
        this.clickOnButtonByText(homePageMessengerData.widgetButtonsExpanded.showLessButton);
        this.wd.waitForDisplayed(this.buttonByText(homePageMessengerData.widgetButtonsCollapsed.showMoreButton));
        this.wd.waitForDisplayed(this.dots3Icon());
        // wait for animation
        this.wd.wait(2);
        return this;
    }

    clickOnResidentIconsAndVerifyChatWithResidentForm(picturesCount = 3) {
        for (let i = 0; i < picturesCount; i++) {
            this.allure.startStep(`Click on ${i + 1} icon and verify that chat with resident form is displayed`);
            this.clickOnResidentPicture(i + 1)
                .chatWithResident.verifyChatWithResidentFormIsDisplayed()
                .clickOnCloseIcon()
                .goToWidgetIFrame();
            this.allure.endStep();
        }
    }

    /** verifications **/

    verifyEnvelopeIcon(expected: boolean) {
        const elementTitle = 'Envelope icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.envelopeIcon()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyIcon360(expected: boolean) {
        const elementTitle = '360 icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.icon360()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyCalendarIcon(expected: boolean) {
        const elementTitle = 'Calendar icon';
        this.allure.startStep(this.verifyAllureMessage(elementTitle));

        this.expect(
            this.wd.isElementVisible(this.calendarIcon()),
            this.displayedErrorMessage(elementTitle, expected)
        ).to.be.equal(expected);

        this.allure.endStep();
        return this;
    }

    verifyWidgetIcons(expected = true) {
        this.allure.startStep('Verify widget icons');

        this.verifyEnvelopeIcon(expected)
            .verifyIcon360(expected)
            .verifyCalendarIcon(expected);

        this.allure.endStep();
        return this;
    }

    verifyCountOfResidentProfilePictures(count = 3) {
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

    verifyWidgetButtons(buttons: widgetButtonsExpandedInterface | widgetButtonsCollapsedInterface, expected = true) {
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

    verifyToolTipText(text: string) {
        // Safari browser does not support moveTo action. was added workaround for getting text after hovering to element
        this.allure.startStep(`Verify tooltip text is [${text}]`);
        this.expect(
            this.wd.getText(this.tooltip(), !this.wd.isSafari()),
            `Tooltip with [${text}] text should be displayed`
        ).to.be.equal(text);
        this.allure.endStep();
    }
}

export const messenger = new MessengerComponent();