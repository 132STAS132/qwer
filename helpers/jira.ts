import axios, { AxiosInstance } from 'axios';
import btoa = require('btoa');
import { JiraBugInterface} from "../interfaces/jira.interface";

export class JiraAPI {
    private readonly _userEmail: string;
    private readonly _userAPIToken: string
    private readonly _baseUrl: string

    constructor() {
        this._userEmail = process.env.JIRA_USER;
        this._userAPIToken = process.env.JIRA_TOKEN;
        this._baseUrl = process.env.JIRA_BASE_URL;
    }

    private get apiInstance(): AxiosInstance {
        const errorCode = '\x1b[31m%s\x1b[0m';
        const message = (property: string) => ` JIRA API - ${property} is not defined. Please check .env`;
        if (!this._userEmail) {
            throw new Error(errorCode + message('Email'));
        }
        if (!this._userAPIToken) {
            throw new Error(errorCode + message('API Token'));
        }
        if (!this._baseUrl) {
            throw new Error(errorCode + message('Base url'));
        }
        return axios.create({
            baseURL: this._baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${this._userEmail}:${this._userAPIToken}`),
            },
        });
    }

    protected async getIssueInfo(issue: string): Promise<JiraBugInterface> {
        const issuePath = `issue/${issue}`;
        const response = await this.apiInstance.get(issuePath);
        return response.data;
    }
}