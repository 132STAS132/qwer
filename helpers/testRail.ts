import btoa = require('btoa');
import FormData = require('form-data');
import axios, { AxiosInstance } from 'axios';
import { TestRailStatus } from "../testData/testRailStatus.data";

interface Options {
  readonly _user: string;
  readonly _password: string;
  readonly _baseUrl: string;
  readonly projectId?: number;
  readonly suiteId?: number;
  readonly runName?: string;
}

interface CreateRunRequestData {
  readonly suite_id: number;
  readonly name: string;
  readonly assignedto_id: string;
  readonly include_all: boolean;
  readonly case_ids: [number] | [];
}

interface UpdateRequest {
  caseId: string;
  runId?: string;
  passed?: boolean;
  errorMessage?: string;
  resultId?: string;
  changeStatusTo?: string;
}

export class TestRailHelper {
  constructor(options: Options) {
    this._user = process.env.TESTRAIL_USER;
    this._password = process.env.TESTRAIL_PASSWORD;
    this._baseUrl = process.env.TESTRAIL_BASE_URL;
    this.projectId = options.projectId;
    this.suiteId = options.suiteId;
    this.runName = options.runName;
  }

  private readonly _user: string;
  private readonly _password: string;
  private readonly _baseUrl: string;
  private readonly projectId: number;
  private readonly suiteId: number;
  private readonly runName: string;

  private apiClient(contentType = 'application/json'): AxiosInstance {

    const errorCode = '\x1b[31m%s\x1b[0m';
    const message = (property: string) => ` TESTRAIL API - ${property} is not defined. Please check .env`;

    if (!this._user) {
      throw new Error(errorCode + message('User email'));
    }
    if (!this._password) {
      throw new Error(errorCode + message('API Token'));
    }
    if (!this._baseUrl) {
      throw new Error(errorCode + message('Base url'));
    }


    return axios.create({
      baseURL: this._baseUrl,
      headers: {
        'Content-Type': contentType,
        Authorization: 'Basic ' + btoa(`${this._user}:${this._password}`),
      },
    });
  }

  async addAttachment(testInfo: UpdateRequest, image: string, imageName = 'browserScreenshot.png'): Promise<void> {
    const url = `add_attachment_to_result_for_case/${testInfo.resultId}/${testInfo.caseId}`;
    const formData = new FormData();

    formData.append('attachment', image, imageName);
    return await this.apiClient(`multipart/form-data; boundary=${formData.getBoundary()}`).post(
        url,
        formData,
    );
  }

  async getResultsForCase(testInfo: UpdateRequest): Promise<string> {
    const url = `get_results_for_case/${testInfo.runId}/${testInfo.caseId}`;
    const response = await this.apiClient().get(url);
    return response.data[0].id as string;
  }

  async createRun(ids: [number] | []): Promise<string> {
    const url = `add_run/${this.projectId}`;

    const today = new Date();
    let dd: string | number = today.getDate();
    let mm: string | number = today.getMonth() + 1;
    const yyyy: number = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = ` - ${dd}.${mm}.${yyyy}`;

    const data: CreateRunRequestData = {
      suite_id: this.suiteId,
      name: this.runName + date,
      assignedto_id: '',
      include_all: false,
      case_ids: ids,
    };

    const response = await this.apiClient().post(url, data);
    return response.data.id as string;
  }

  async updateRun(testInfo: UpdateRequest, image = null): Promise<void> {
    const url = `add_result_for_case/${testInfo.runId}/${testInfo.caseId}`;
    let statusId = null;
    if (testInfo.changeStatusTo === TestRailStatus.retest) {
      statusId = 4;
    }
    if (testInfo.changeStatusTo === TestRailStatus.dueToABug) {
      statusId = 6;
    }
    if (!testInfo.changeStatusTo) {
      statusId = testInfo.passed ? 1 : 5;
    }
    await this.apiClient().post(url, {
      status_id: statusId,
      comment: testInfo.passed
          ? 'Status: Passed'
          : `Status: Failed \n Case Id: [C${testInfo.caseId}] \n Error message: ${testInfo.errorMessage}`,
    });

    if (image) {
      const resultId = await this.getResultsForCase(testInfo);
      await this.addAttachment({ ...testInfo, resultId }, image);
    }
  }

  async addCommentToTestCase(testInfo: { runId, caseId }, comment: string): Promise<void>  {
    const url = `add_result_for_case/${testInfo.runId}/${testInfo.caseId}`;
    return await this.apiClient().post(url, {
      comment,
    });
  }
}
