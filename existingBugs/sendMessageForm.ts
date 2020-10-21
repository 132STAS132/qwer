import { BugInterface } from "../interfaces/bug.interface";

export default {
    emailCanNotBeBlank: ((): BugInterface => {
        return {
            bugId: 'RN-419',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-419',
            scenarios: ['[C451] Continue with Empty Email']
        }
    })(),
}