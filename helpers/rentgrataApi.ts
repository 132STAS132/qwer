import axios, { AxiosInstance } from "axios";

class RentgrataApi {
    private _mailTrapToken: string;
    private _baseUrl: string;

    constructor() {
        this._baseUrl = "https://rentgrataserver-staging.herokuapp.com/api/";
    }

    private apiClient(): AxiosInstance {
        return axios.create({
            baseURL: this._baseUrl,
            headers: {},
        });
    }

    async getResidentsInfo() {
        const response = await this.apiClient().get('widget/listings/4115dda5-05ed-4ff0-be4f-0aa572204b29/residents');
        return response.data;
    }
}

export const rentgrataApi = new RentgrataApi();