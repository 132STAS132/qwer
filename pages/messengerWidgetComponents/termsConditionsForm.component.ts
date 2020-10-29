import { BasePage } from "../base.page";
import { messenger } from "./messenger.component";
import * as faker from "faker";
import { messengerData } from "../../testData/messenger.data";

class TermsConditionsFormComponent extends BasePage {
    /** locators **/
    private formTitle(): string {
        return '#phoneAuthentication-header-title #title';
    }

    private headerInfo(): string {
        return '#phoneAuthentication-header-title ~ #phoneAuthentication-header-info';
    }

    private termsContainer(): string {
        return '.phoneAuthenticatication-terms-container div'
    }

    private agreementText(): string {
        return '.phoneAuthenticatication-agreement-clause'
    }

    private termsOfUse(): string {
        return '.phoneAuthenticatication-agreement-clause .link[href*="terms"]';
    }

    private termsLinkFooter(): string {
        return '.footerWrapper .__link[href*="terms"]';
    }

    private privacyPolicy(): string {
        return '.phoneAuthenticatication-agreement-clause .link[href*="privacy"]';
    }

    private privacyLinkFooter(): string {
        return '.footerWrapper .__link[href*="privacy"]';
    }

    private agreeAndContinueButton(): string {
        return '.phoneAuthenticatication-accept-button';
    }

    /** actions **/

    proceedToTermsConditionsForm(email: string, message = faker.random.words(), firstName = faker.random.word(), lastName = faker.random.word()) {
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(message)
            .sendMessageComponent
            .fillLastNameInput(lastName)
            .fillFirstNameInput(firstName)
            .fillEmailInput(email)
            .clickOnContinueButton()
            .waitForLoadSpinnerToDisappear()
        const code = messenger.getFromMailTrapEmailVerificationCode(email)
        messenger
            .chatWithResident.sendMessageComponent
            .submitVerificationCodeInput(code)
            .clickOnVerifyEmailButton();
        browser.waitUntil(() => this.wd.getText(this.formTitle()) === messengerData.termsConditionsFormData.title, {
            timeout: 4000,
            timeoutMsg: `${messengerData.termsConditionsFormData.title} form still not displayed after 4s`
        });
        return this;
    }

    clickOnTermsOfUseLink() {
        // above Agree and Continue
        this.allure.startStep(`Click on [terms of use] link above "Agree and Continue" button`);
        this.wd.click(this.termsOfUse());
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return this;
    }

    clickOnPrivacyPolicyLink() {
        // above Agree and Continue
        this.allure.startStep(`Click on [Privacy Policy] link above "Agree and Continue" button`);
        this.wd.click(this.privacyPolicy());
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return this;
    }

    clickOnTermsLink() {
        // above Agree and Continue
        this.allure.startStep(`Click on [terms] link in the footer`);
        this.wd.click(this.termsLinkFooter());
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return this;
    }

    clickOnPrivacyLink() {
        // above Agree and Continue
        this.allure.startStep(`Click on [Privacy] link in the footer`);
        this.wd.click(this.privacyLinkFooter());
        this.wd.switchToSecondWindow();
        this.allure.endStep();
        return this;
    }

    clickOnAgreeAndContinueButton(waitForWindowCount = 2) {
        this.allure.startStep('Click on [Agree and continue] button');
        this.wd.click(this.agreeAndContinueButton());
        this.waitForWindowsCount(waitForWindowCount);
        this.allure.endStep();
        return this;
    }


    /** verifications **/

    verifyTermsConditionsFormTitle(title: string) {
        this.allure.startStep(`Verify form title is ${title}`);
        // for stabilizing
        try {
            browser.waitUntil(() => this.wd.getText(this.formTitle()) === title, {
                timeout: 4000
            });
        } catch (e) {}
        this.expect(
            this.wd.getText(this.formTitle()),
            'Incorrect form title'
        ).to.be.equal(title);
        this.allure.endStep();
        return this;
    }

    verifyHeaderInfoText(text: string) {
        this.allure.startStep(`Verify header info text`);
        // for stabilizing
        try {
            browser.waitUntil(() => this.wd.getText(this.headerInfo()) === messengerData.termsConditionsFormData.title, {
                timeout: 4000
            });
        } catch (e) {}
        this.expect(
            this.wd.getText(this.headerInfo()),
            `Incorrect header info text of ${messengerData.termsConditionsFormData.title} title is displayed`
        ).to.be.equal(text);
        this.allure.endStep();
        return this;
    }

    verifyTermsText(text: string) {
        this.allure.startStep('Verify terms');
        this.expect(
            this.wd.getText(this.termsContainer()).replace(/\n/g,''),
            'Incorrect text is displayed'
        ).to.be.equal(text);
        this.allure.endStep();
        return this;
    }

    verifyAgreementText(text: string) {
        this.allure.startStep('Verify terms');
        this.expect(
            this.wd.getText(this.agreementText()).replace(/\n/g,''),
            'Incorrect text is displayed'
        ).to.be.equal(text);
        this.allure.endStep();
        return this;
    }

    verifyTermsOfUseText(fileName = 'terms') {
        this.verifyTxtFile(fileName);
        return this;
    }

    verifyPrivacyPolicyText(fileName = 'privacy') {
        this.verifyTxtFile(fileName);
        return this;
    }
}

export const termsConditionsForm = new TermsConditionsFormComponent();