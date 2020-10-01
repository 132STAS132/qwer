import { messenger } from "../pages/messengerWidgetComponents/messenger.component";
import { messengerData } from "../testData/messenger.data";

const collapsedStateButtons = messengerData.widgetButtonsCollapsed;
const expandedStateButtons = messengerData.widgetButtonsExpanded;

describe('Rentgrata Messenger', () => {
    it('[C437] Check content', () => {
       messenger
           .goToWidgetIFrame()
           .verifyWidgetIcons()
           .verifyCountOfResidentProfilePictures()
           .verifyWidgetButtons(expandedStateButtons)
    });

    it('[C527] Click on Show Less/More', () => {
        messenger
            .goToWidgetIFrame()
            .clickOnShowLessButton()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(collapsedStateButtons)
            .verifyWidgetButtons({
                showLessButton: expandedStateButtons.showLessButton
            }, false)
            .verifyWidgetIcons(false)
            .clickOnShowMoreButton()
            .verifyWidgetIcons()
            .verifyCountOfResidentProfilePictures()
            .verifyWidgetButtons(expandedStateButtons)
    });
});