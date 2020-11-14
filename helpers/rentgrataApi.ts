import axios, { AxiosInstance } from "axios";

class MailTrapApi {
    private _mailTrapToken: string;
    private _baseUrl: string;
    private _mailTrapInboxId: string;

    constructor() {
        this._mailTrapToken = process.env.MAILTRAP_TOKEN;
        this._mailTrapInboxId = process.env.MAILTRAP_INBOX_ID;
        this._baseUrl = "https://mailtrap.io/";
    }

    private apiClient(contentType = 'application/json'): AxiosInstance {

        const errorCode = '\x1b[31m%s\x1b[0m';
        const message = (property: string) => ` MAILTRAP API - ${property} is not defined. Please check .env`;

        if (!this._mailTrapToken) {
            throw new Error(errorCode + message('MAILTRAP_TOKEN'));
        }

        if (!this._mailTrapInboxId) {
            throw new Error(errorCode + message('MAILTRAP_INBOX_ID'));
        }

        return axios.create({
            baseURL: this._baseUrl,
            headers: {
                'Content-Type': contentType,
                'Api-Token':this. _mailTrapToken,
            },
        });
    }

    async getInboxMessageByTo(to: string) {
        const url = `api/v1/inboxes/${this._mailTrapInboxId}/messages`;
        const { data } = await this.apiClient().get(url);
        return data.find(msg => msg.to_email === to);
    }

    async getEmailBodyById(messageId: string) {
        const url = `api/v1/inboxes/${this._mailTrapInboxId}/messages/${messageId}/body.html`;
        return await this.apiClient().get(url);
    }
}

export const mailTrapApi = new MailTrapApi();