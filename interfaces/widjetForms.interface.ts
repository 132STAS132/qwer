export interface sendMessageFormInterface {
    // Send Message
    title: string,
    // To send your message, please provide a few more details or sign in to your Rentgrata account below.
    authInfoMessage: string,
    // Please type your message below.
    errorEmptyMessage: string,
    // You must enter your first name.
    errorMustEnterFirstName: string,
    errorMustEnterLastName: string,
    errorMustEnterEmail: string,

    errorLastNameCanNotBeBlank: string,
    errorFirstNameCanNotBeBlank: string,
    errorEmailCanNotBeBlank: string,

    errorEmailInvalid: string,
    errorEmailExists: string,

    firstNameField: "First name",
    lastNameField: "Last name",
    emailField: "Email",
}

export interface verifyEmailFormInterface {
    title: string,
    sentCodeTo: (to: string) => string,
    invalidCodeError: string,
    resentText: (to: string) => string,
}

export interface termsConditionsFormInterface {
    title: string,
    headerInfoText: string,
    termsText: string,
    agreementText: string,
}

export interface contactPropertyFormInterface {
    firstName?: string,
    lastName?: string,
    email?: string,
    expectedMoveInDate?: {
        day: string,
        month: string,
        year: string,
    },
    scheduleATour?: string,
    phone?: string,
    message?: string,
}

export interface contactPropertyFormFields {
    firstNameField: "First Name",
    lastNameField: "Last Name",
    emailField: "Email",
    messageField: "Message",
    phoneField: "Phone",
    expectedMoveInDate: "Expected Move In Date",
    errorMustEnterFirstName: string,
    errorMustEnterLastName: string,
    errorMustEnterEmail: string,
    errorMustEnterMessage: string,
    errorMessageAtLeast5: string,
    errorInvalidPhone: string,
    errorInvalidEmail: string,
    errorMustSelectDate: string,
}

export interface userInterface {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export interface forgotPasswordFormInterface {
    title: string,
    description: string,
}

export interface warningMessageCloseFormInterface {
    cancelWarning: string,
    yesButton: string,
    noButton: string,
}

export interface successContactFormInterface {
    firstName: string,
    lastName: string,
    email: string,
    expectedMoveIn: string,
    message: string,
    placeholder: string
    successFormText(property?: string): string,
    descriptionFormText: string,
}

export interface successSendMessageFormInterface {
    successMessage: string,
    descriptionPasswordJustCreated: string,
    errorInvalidPhoneNumber: string,
    optOutButton: string,
    cancelButton: string,
    thankYouForUsingRentgrata: string,
    descriptionExistingUser: string,
}

export interface chatWithResidentFormInterface {
    weLiveHere: string,
}