import {
    widgetButtonsCollapsedInterface,
    widgetButtonsExpandedInterface,
    sendMessageFormInterface,
    widgetIconsInterface
} from "../interfaces/widget.interface";

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
            errorMustEnterFirstName: "You must enter your first name."
        }
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