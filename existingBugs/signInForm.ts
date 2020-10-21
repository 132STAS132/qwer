import { BugInterface } from "../interfaces/bug.interface";

export default {
    emailOrPasswordIsIncorrect: ((): BugInterface => {
        return {
            bugId: 'RN-417',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-417',
            scenarios: ['[C456] Continue with Incorrect email','[C457] Continue with incorrect password']
        }
    })(),
    incorrectPhoneNumberError: ((): BugInterface => {
        return {
            bugId: 'RN-418',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-418',
            scenarios: ['[C460] Continue with incorrect Phone Number']
        }
    })(),
}