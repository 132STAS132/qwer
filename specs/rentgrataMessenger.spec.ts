import { messenger } from '../pages/messengerWidgetComponents/messenger.component';
import { messengerData } from '../testData/messenger.data';
import { allureHelper } from '../helpers/allure';
import { bugs } from "../existingBugs/bugs";

const { widgetButtonsCollapsed, widgetButtonsExpanded } = messengerData;

describe('Rentgrata Messenger', () => {
    it('[C437] Check content', () => {
        // todo update verifyWidgetIcons method. 1 method skipped. Waiting for answer.
       messenger
           .goToWidgetIFrame()
           .verifyWidgetIcons()
           .verifyCountOfResidentProfilePictures()
           .verifyWidgetButtons(widgetButtonsExpanded);
    });

    it('[C527] Click on Show Less/More', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnShowLessButton()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(widgetButtonsCollapsed)
            .verifyWidgetButtons({
                showLessButton: widgetButtonsExpanded.showLessButton
            }, false)
            .verifyWidgetIcons(false)
            .clickOnShowMoreButton()
            .verifyWidgetIcons()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(widgetButtonsExpanded);
    });

    it('[C524] Click on Contact Property', () => {
        allureHelper.addIssueToAllure(bugs.messenger.clickOnButtons);
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.contactButton)
            .verifyContactPropertyFormIsDisplayed();
    });

    it('[C702] Click on Chat with a Resident', () => {
        allureHelper.addIssueToAllure(bugs.messenger.clickOnButtons);
        messenger
            .goToWidgetIFrame()
            .clickOnButtonByText(widgetButtonsCollapsed.chatButton)
            .verifyChatWithResidentFormIsDisplayed();
    });
});