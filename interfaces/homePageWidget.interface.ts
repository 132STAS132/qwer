
interface widgetButtonsInterface {
    chatButton?: string,
    contactButton?: string,
}

export interface widgetButtonsCollapsedInterface extends widgetButtonsInterface {
    showMoreButton?: string
}

export interface widgetButtonsExpandedInterface extends widgetButtonsInterface {
    showLessButton?: string
}

export interface widgetIconsInterface {
    scheduleATour: string,
    virtualTour: string,
    contactProperty: string
}