import { messenger } from "../../pages/messengerWidgetComponents/messenger.component";
import * as faker from "faker";

describe('Send Message via Sing in', () => {
    it('[C456] Continue with Incorrect email', () => {
        // todo wait for answer - verifyErrorMessage should be updated and moved to fixtures
        messenger
            .goToWidgetIFrame()
            .clickOnResidentPicture()
            .chatWithResident.sendMessage(faker.random.words())
            .sendMessageComponent.clickOnSignInLink()
            .submitForm('ksd@dscom', '1234')
            .verifyErrorMessage('The password you entered was incorrect. Please try again.')
    });
});