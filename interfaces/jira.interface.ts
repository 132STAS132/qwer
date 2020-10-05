export interface JiraBugInterface {
    fields: {
        issuetype: {
            name: string,
            iconUrl: string
        },
        project: {
            name: string,
            avatarUrls: {
                '16x16': string,
            },
        },
        resolution: {
            description: string,
        },
        priority: {
            name: string,
            iconUrl: string
        },
        assignee: {
            avatarUrls: {
                '16x16': string,
            },
            displayName: string,
        },
        status: {
            name: string,
        },
        summary: string,
        creator: {
            avatarUrls: {
                '16x16': string,
            },
            displayName: string,
        },
    },
}