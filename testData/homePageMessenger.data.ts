import {
    widgetButtonsCollapsedInterface,
    widgetButtonsExpandedInterface,
    widgetIconsInterface
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
}

export const homePageMessengerData = new HomePageMessengerData();