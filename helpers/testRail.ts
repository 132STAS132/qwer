import btoa = require('btoa');
import FormData = require('form-data');
import axios, { AxiosInstance } from 'axios';

interface Options {
  readonly domain: string;
  readonly user: string;
  readonly password: string;
  readonly testRailApi: string;
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
  retest?: string;
}

export class TestRailHelper {
  constructor(options: Options) {
    this.domain = options.domain;
    this.user = options.user;
    this.password = options.password;
    this.testRailApi = options.testRailApi;
    this.projectId = options.projectId;
    this.suiteId = options.suiteId;
    this.runName = options.runName;
  }

  readonly domain: string;
  readonly user: string;
  readonly password: string;
  readonly testRailApi: string;
  readonly projectId: number;
  readonly suiteId: number;
  readonly runName: string;

  private apiClient(contentType = 'application/json'): AxiosInstance {
    return axios.create({
      baseURL: `${this.domain}${this.testRailApi}`,
      headers: {
        'Content-Type': contentType,
        Authorization: 'Basic ' + btoa(`${this.user}:${this.password}`),
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
    await this.apiClient().post(url, {
      status_id: testInfo.retest === 'retest' ? 4 : testInfo.passed ? 1 : 5,
      comment: testInfo.passed
          ? 'Status: Passed'
          : `Case Id: [C${testInfo.caseId}] \n Error message: ${testInfo.errorMessage}`,
    });

    if (image) {
      const resultId = await this.getResultsForCase(testInfo);
      await this.addAttachment({ ...testInfo, resultId }, image);
    }
  }

  async addCommentToTestCase(testInfo: { runId, caseId }, comment: string) {
    const url = `add_result_for_case/${testInfo.runId}/${testInfo.caseId}`;
    return await this.apiClient().post(url, {
      comment,
    });
  }
}
