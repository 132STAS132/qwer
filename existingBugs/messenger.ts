import { BugInterface } from "../interfaces/bug.interface";

export default {
    clickOnButtons: ((): BugInterface => {
        return {
            bugId: 'RN-377',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-377',
            scenarios: ['[C524] Click on Contact Property', '[C702] Click on Chat with a Resident']
        }
    })(),
}