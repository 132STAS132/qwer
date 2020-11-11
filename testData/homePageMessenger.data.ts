import {
    widgetButtonsCollapsedInterface,
    widgetButtonsExpandedInterface,
    widgetIconsInterface,
    widgetPopupsInterface
} from "../interfaces/homePageWidget.interface";

class HomePageMessengerData {
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

    get toolTipText(): widgetIconsInterface {
        return {
            scheduleATour: "Schedule a Tour",
            virtualTour: "Virtual Tour",
            contactProperty: "Contact Property"
        }
    }

    get popupMessagesText(): widgetPopupsInterface {
        return {
            heyMessage: "Hey, I live here!",
            learnMoreMessage: "Want to learn more from my point of view?",
            askMeMessage: "Ask me a question and we'll split a reward if you move in. You'll make $100."
        }
    }
}

export const homePageMessengerData = new HomePageMessengerData();