import {
    widgetButtonsCollapsedInterface,
    widgetButtonsExpandedInterface,
    sendMessageFormInterface,
    widgetIconsInterface
} from "../interfaces/widget.interface";
import * as faker from "faker";

class MessengerData {
    get widgetButtonsExpanded(): widgetButtonsExpandedInterface  {
        return {
            chatButton: "Chat with a Resident",
            contactButton: "Contact Property",
            showLessButton: "Show Less"
        }
    }

    get widgetButtonsCollapsed(): widgetButtonsCollapsedInterface  {
        let obj = { ...this.widgetButtonsExpanded, showMoreButton: "Show More" };
        delete obj.showLessButton;
        return obj;
    }

    get iconsUnderResidents(): widgetIconsInterface {
        return {
            scheduleATour: "Schedule a Tour",
            virtualTour: "Virtual Tour",
            contactProperty: "Contact Property"
        }
    }

    get sendMessageForm(): sendMessageFormInterface {
        return {
            title: "Send Message",
            authInfoMessage: "To send your message, please provide a few more details or sign in to your Rentgrata account below.",
            errorEmptyMessage: 'Please type your message below.',
            firstNameField: "First name",
            lastNameField: "Last name",
            emailField: "Email",

            errorMustEnterFirstName: "You must enter your first name.",
            errorMustEnterLastName: "You must enter your last name.",

            errorLasNameCanNotBeBlank: "Last name can not be blank",
            errorFirstNameCanNotBeBlank: "First name can not be blank",

            errorMustEnterEmail: "You must enter your email.",
            errorEmailInvalid: "Email invalid. Please try again!",

            errorEmailExists: "Email exists. Please try signing in instead.",
        }
    }

    get verifyEmailForm(): { title: string, sentCodeTo: (to: string) => string } {
        return {
            title: "Verify Email",
            sentCodeTo: (to: string): string => {
                return `We sent an email with a code to ${to}. Please enter the code below.`
            }
        }
    }

    get randomMailTrapEmail(): string {
        return `e659345dfe-cf3bb0+${faker.random.uuid()}@inbox.mailtrap.io`;
    }

    get toolTipText(): widgetIconsInterface {
        return {
            scheduleATour: "Schedule a Tour",
            virtualTour: "Virtual Tour",
            contactProperty: "Contact Property"
        }
    }
}

export const messengerData = new MessengerData();