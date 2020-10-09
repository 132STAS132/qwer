import { BasePage } from "../base.page";

export class ChatWithResidentComponent extends BasePage {
    /** locators **/

    private closeChatWithResidentIcon(): string {
        return 'i.close-icon';
    }

    private chatWithResidentFiltersSection(): string {
        return '#rg-widget-messenger .residents-filter-strap';
    }

    /** actions **/
    closeChatWithResidentForm(): this {
        this.allure.startStep('Close chat with resident form');
        // could by flaky due to animation
        this.wd.wait(2);
        this.wd.click(this.closeChatWithResidentIcon(), this.wd.isSafari());
        try {
            this.wd.waitForDisplayed(this.chatWithResidentFiltersSection(), false,3000);
        } catch (e) {}
        this.wd.closeFrame();
        this.goToWidgetIFrame();
        this.allure.endStep();
        return this;
    }

    /** verifications **/
    verifyChatWithResidentFormIsDisplayed(expected = true): this {
        const element = 'Chat with resident form';
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
        return this;
    }
}