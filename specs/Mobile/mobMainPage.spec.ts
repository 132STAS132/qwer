import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";

describe('Main page', () => {
    // todo in progress, update according to the expected result
    it('[C529] Check content', () => {
        messenger
            .goToWidgetIFrame()
            .verifyCountOfResidentProfilePictures();
    });
});