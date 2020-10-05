import allure from '@wdio/allure-reporter';
import { JiraAPI } from "./jira";

class Allure extends JiraAPI {
  addIssueToAllure(bugInfo: { bugId: string, originalLink: string, scenarios?: Array<string> }) {
    let bug = browser.call(async () => await this.getIssueInfo(bugInfo.bugId));
    if (bug) {
        let scenariosMarkup = bugInfo.scenarios && bugInfo.scenarios.length ? '<div  style="margin: 15px 0 5px 0;"><span style="font-weight: bold;">Scenarios related to bug:</span></div>' + bugInfo.scenarios.map(scenario => `<div style="margin-bottom: 5px;">${scenario}</div>`).join(' ') : '';

        let markup = `<div style="font-weight: bold;margin-bottom: 10px;font-size: 18px;">Bug Info:</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: bold;">Status: </span>${bug.fields.status.name}</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: bold;">Issue type: </span> <img src="${bug.fields.issuetype.iconUrl}" alt="issue type picture" style="height: 14px;"> ${bug.fields.issuetype.name}</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: bold;">Priority: </span><img src="${bug.fields.priority.iconUrl}" alt="issue priority picture" style="height: 14px;"> ${bug.fields.priority.name}</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: bold;">Summary: </span> ${bug.fields.summary}</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: bold;">Project name: </span> <img src="${bug.fields.project.avatarUrls["16x16"]}" alt="project picture" style="height: 14px;"> ${bug.fields.project.name}</div>
        ${bug.fields.resolution ? `<div style="margin-bottom: 5px;"><span style="font-weight: bold;">Resolution: </span>${bug.fields.resolution.description}</div>` : ''}
        ${bug.fields.assignee ? `<div style="margin-bottom: 5px;">
                <span style="font-weight: bold;">Assignee:</span>
                <img src="${bug.fields.assignee.avatarUrls["16x16"]}" alt="assignee picture" style="height: 14px;">
                <span>${bug.fields.assignee.displayName}</span>
            </div>
        `: ''}
        <div style="margin-bottom: 5px;">
            <span style="font-weight: bold;">Creator: </span>
            <img src="${bug.fields.creator.avatarUrls["16x16"]}" alt="creator picture" style="height: 14px;">
            <span>${bug.fields.creator.displayName}</span>
        </div>
        <div style="margin-bottom: 5px;"><a href="${bugInfo.originalLink}" target="_blank">Read more...</a></div>
        <div></div>
        ${scenariosMarkup}`;

        markup = markup.replace(/\n/g,'');

        allure.addDescription(markup, 'Issue description');
    }
  }
}

export const allureHelper = new Allure();