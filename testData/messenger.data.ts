import {
    widgetButtonsCollapsedInterface,
    widgetButtonsExpandedInterface,
    sendMessageFormInterface,
    widgetIconsInterface,
    termsConditionsFormInterface,
    verifyEmailFormInterface,
    contactPropertyFormFields,
    userInterface
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

    get contactPropertyForm(): contactPropertyFormFields {
        return {
            firstNameField: "First Name",
            lastNameField: "Last Name",
            emailField: "Email",
            errorMustEnterFirstName: "You must enter your first name.",
            errorMustEnterLastName: "You must enter your last name.",
            errorMustEnterEmail: "You must enter your email.",
            errorInvalidEmail: "You must enter a valid email.",
            errorMustSelectDate: "You must select a date.",
            expectedMoveInDate: "Expected Move In Date"
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

            errorLastNameCanNotBeBlank: "Last name can not be blank",
            errorFirstNameCanNotBeBlank: "First name can not be blank",
            errorEmailCanNotBeBlank: "Email can not be blank",

            errorMustEnterEmail: "You must enter your email.",
            errorEmailInvalid: "Email invalid. Please try again!",

            errorEmailExists: "Email exists. Please try signing in instead.",
        }
    }

    get verifyEmailForm(): verifyEmailFormInterface {
        return {
            title: "Verify Email",
            sentCodeTo: (to: string): string => `We sent an email with a code to ${to}. Please enter the code below.`,
            invalidCodeError: "The code you entered is incorrect.",
            resentText: (to: string): string => `The code has been resent to ${to}.`
        }
    }

    get termsConditionsFormData(): termsConditionsFormInterface {
        return {
            title: "Terms & Conditions",
            headerInfoText: "Please read and click the 'Agree and Continue' button below.",
            termsText: "Please keep in mind that the person you are messaging is an actual apartment renter... " +
                "Another real live human person trying to be helpful. This is not a chat bot. " +
                "Please be aware that they may not respond to your initial message immediately." +
                "We'll send you an email when they respond. " +
                "You can chat with this resident via rentgrata.com or the Rentgrata iOS app. " +
                "We'll send you an email when they respond.If this property offers a move-in bonus, " +
                "please be aware that if you use an apartment broker during your apartment search process, you may not be eligible for the move-in bonus offered." +
                "The views and opinions expressed by a user of Rentgrata are those only of the individual user and do not reflect the views, opinions, " +
                "or position of the property management company or its representatives, or Rentgrata. " +
                "Please read our complete Terms of Use which contain important provisions, including the following: " +
                "YOU HEREBY RELEASE RENTGRATA, ALL OTHER USERS, AND ALL PROPERTY MANAGERS, FROM ALL CLAIMS ARISING FROM OR RELATING TO ANY INFORMATION PROVIDED BY ANOTHER USER, " +
                "A PROPERTY MANAGER, OR ANY OTHER THIRD PARTY.Rentgrata is not available to minors (persons under the age of 18). " +
                "By continuing, you represent and warrant that you are at least 18 years old.Thank you for joining our community!",
            agreementText: "By pressing 'Agree and Continue' below, you agree to Rentgrata's Terms of Use and Privacy Policy."
        }
    }

    randomMailTrapEmail(): string {
        return `e659345dfe-cf3bb0+${faker.random.uuid()}@inbox.mailtrap.io`;
    }

    get toolTipText(): widgetIconsInterface {
        return {
            scheduleATour: "Schedule a Tour",
            virtualTour: "Virtual Tour",
            contactProperty: "Contact Property"
        }
    }

    get existingTestUser(): userInterface {
        return {
            email: 'e659345dfe-cf3bb0@inbox.mailtrap.io',
            password: process.env.DEFAULT_USER_PASSWORD,
            firstName: 'James',
            lastName: 'Smt',
        }
    }
}

export const messengerData = new MessengerData();