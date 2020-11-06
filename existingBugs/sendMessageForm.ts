import { BugInterface } from "../interfaces/bug.interface";

export default {
    emailCanNotBeBlank: ((): BugInterface => {
        return {
            bugId: 'RN-419',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-419',
            scenarios: ['[C451] Continue with Empty Email']
        }
    })(),
    signInHere: ((): BugInterface => {
        return {
            bugId: 'RS-269',
            originalLink: 'https://rentgrata.atlassian.net/browse/RS-269',
            scenarios: ['[C454] Click on Sign In here']
        }
    })(),
    backButton: ((): BugInterface => {
        return {
            bugId: 'RS-268',
            originalLink: 'https://rentgrata.atlassian.net/browse/RS-268',
            scenarios: ['[C445] Click on Back button']
        }
    })(),
}