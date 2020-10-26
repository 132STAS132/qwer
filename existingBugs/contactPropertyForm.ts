import { BugInterface } from "../interfaces/bug.interface";

export default {
    expectedMoveInDateWarningDoesNotDisappear: ((): BugInterface => {
        return {
            bugId: 'RN-440',
            originalLink: 'https://rentgrata.atlassian.net/browse/RN-440',
            scenarios: ['[C753] Leave "Expected Move In Date" empty']
        }
    })(),
}