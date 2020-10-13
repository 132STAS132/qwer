import path = require('path');
import axios from 'axios';
import { seleniumPort } from '../wdio.conf.js'

export class WDIO {
  public get defaultWaitTime(): number {
    return browser.options.waitforTimeout;
  }

  open(path: string) {
    browser.url(path);
  }

  isIE() {
    return browser.capabilities.browserName.toLowerCase()  === 'ie';
  }

  isFF() {
    return browser.capabilities.browserName.toLowerCase()  === 'firefox';
  }

  isSafari() {
    return browser.capabilities.browserName.toLowerCase() === 'safari';
  }

  isChrome() {
    return browser.capabilities.browserName.toLowerCase()  === 'chrome';
  }

  refresh(timeout = this.defaultWaitTime) {
    browser.refresh();
    if (this.isFF()) {
      browser.waitUntil(
        function () {
          return browser.execute(`return document.readyState === 'complete'`);
        },
        { timeout },
      );
    }
  }

  wait(seconds: any) {
    browser.pause(parseInt(seconds) * 1000);
  }

  waitForText(selector: string, text: string, timeout = 5000) {
    try {
      browser.waitUntil(() => $(selector).getText() === text, { timeout });
    } catch (e) {
      console.log(`The '${text}' text still not presented on '${browser.getTitle()}' page`);
    }
  }

  waitForCss(
    selector: string,
    cssProperty: string,
    expectedValue: string,
    timeout = this.defaultWaitTime,
  ) {
    this.waitForElement(selector);
    console.log($(selector).getCSSProperty(cssProperty));
    browser.waitUntil(() => $(selector).getCSSProperty(cssProperty).value === expectedValue, { timeout });
  }

  getCssProperty(selector: string, cssProperty: string, timeout = this.defaultWaitTime,) {
    this.waitForElement(selector, timeout);
    return $(selector).getCSSProperty(cssProperty).value;
  }

  waitForElement(selector: string, timeout = this.defaultWaitTime, waitForEnabled = true) {
    $(selector).waitForExist({ timeout });
    $(selector).waitForDisplayed({ timeout });
    if (waitForEnabled) $(selector).waitForEnabled({ timeout });
  }

  waitForDisplayed(selector: string, reverse = false, timeout = this.defaultWaitTime) {
    browser.waitUntil(
      function () {
        const elementValue = $(selector).isDisplayed();
        if (typeof elementValue === 'object') {
          if (!Object.values(elementValue)[0]) {
            throw new Error(
              `type of ${selector} is ${typeof elementValue}. element value should be boolean but got - ${elementValue}. Failed on waitForDisplayed method. IE specific error`,
            );
          }
        // @ts-ignore
          return browser.isElementDisplayed(Object.values(elementValue)[0]);
        }
        return elementValue === !reverse;
      },
      {
        timeout,
        timeoutMsg: `${selector} - still${!reverse ? ' not' : ''} displayed after ${timeout}ms`,
      },
    );
  }

  selectFromDropDown(dropdownSelector: string, itemSelector: string) {
    this.click(dropdownSelector);
    this.click(itemSelector);
  }

  elements(selector: string, timeout = this.defaultWaitTime): WebdriverIO.ElementArray {
    try {
      this.waitForElement(selector, timeout);
    } catch (e) {
    }
    return $$(selector);
  }

  isElementVisible(selector: string): boolean {
    return $(selector).isDisplayed();
  }

  isElementExisting(selector: string, timeout = this.defaultWaitTime): boolean {
    try {
      this.waitForElement(selector, timeout);
    } catch (error) {
    }
    return $(selector).isExisting();
  }

  reload() {
    browser.reloadSession();
  }

  isChecked(selector: string, timeout = this.defaultWaitTime): boolean {
    try {
      this.waitForElement(selector, timeout);
    } catch (error) {
    }
    return $(selector).isSelected();
  }

  clearFilledText(selector: string) {
    this.selectText(selector);
    this.pressBackspace();
  }

  customClick(selector: string) {
    browser.execute(`arguments[0].click()`, $(selector));
  }

  focusElement(selector: string) {
    browser.execute(`arguments[0].focus()`, $(selector));
  }

  getElementAttributeViaQuerySelector(selector: string, attribute: string): string {
    return browser.execute(function (selector, attribute) {
      const element = selector.match(/\/|\(/g)
        ? document.evaluate(
          selector,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue
        : document.querySelector(selector);
      return element.getAttribute(attribute);
    }, selector, attribute);
  }

  getAttributeByName(selector: string, attribute: string) {
    this.waitForElement(selector);
    return $(selector).getAttribute(attribute);
  }

  switchToWindowByUrlOrTitle(windowTitle: string) {
    browser.switchWindow(windowTitle);
  }

  switchToSecondWindow() {
    const actualWindow = browser.getWindowHandle();
    let allWindows = browser.getWindowHandles();
    const index = allWindows.indexOf(actualWindow);
    allWindows.splice(index, 1)
    browser.switchToWindow(allWindows[0]);
  }

  waitForVisible(selector: string, timeout = this.defaultWaitTime) {
    return browser.waitUntil(
      () => {
        try {
          return $(selector).isDisplayed();
        } catch (e) {
          return false;
        }
      },
      { timeout, timeoutMsg: `${selector} still not displayed after ${timeout}ms` },
    );
  }

  waitForExists(selector: string, reverse = false, timeout = this.defaultWaitTime) {
    return $(selector).waitForExist({ timeout, reverse });
  }

  waitForClickable(selector: string, timeout = this.defaultWaitTime) {
    if (this.isIE()) {
      try {
        // refer to https://webdriver.io/docs/api/element/isClickable.html for getting more information about isClickable method
        $(selector).waitForExist();
        $(selector).waitForDisplayed();
        browser.waitUntil(() => $(selector).isDisplayedInViewport(), { timeout });
        $(selector).waitForEnabled();
        this.pause(500);
      } catch (e) {
      }
      return;
    } else {
      return browser.waitUntil(() => $(selector).isClickable(), { timeout, timeoutMsg: `element with ${selector} selector still not displayed after ${timeout}` });
    }
  }

  isElementClickable(selector: string, timeout = this.defaultWaitTime) {
    $(selector).waitForExist();
    return $(selector).isClickable();
  }

  waitForInVisible(selector: string, timeout = this.defaultWaitTime) {
    return browser.waitUntil(
      () => {
        try {
          return $(selector).isDisplayed() === false;
        } catch (e) {
          return false;
        }
      },
      { timeout, timeoutMsg: `Element ${selector} still displayed after ${timeout}` },
    );
  }

  waitForEnabled(selector: string, timeout = this.defaultWaitTime) {
    if (this.isIE()) {
      try {
        $(selector).waitForEnabled({ timeout });
      } catch (error) {
        if (this.isIE()) {
          browser.waitUntil(
            () => {
              return $(selector).isEnabled();
            },
            {
              timeout,
              timeoutMsg: `${selector} still not enabled`,
            },
          );
        }
      }
    } else {
      $(selector).waitForEnabled({ timeout });
    }
  }

  waitForExist(selector: string, timeout = this.defaultWaitTime) {
    return $(selector).waitForExist({ timeout });
  }

  selectText(selector: string) {
    this.click(selector);
    browser.execute(`document.execCommand("selectall",null,false);`);
    this.pause(1000);
  }

  pressBackspace() {
    browser.keys('Backspace');
    this.pause(1000);
  }

  pressEnter() {
    browser.keys('Enter');
  }

  pressTab() {
    browser.keys('Tab');
  }

  sendValue(value: string, field: string) {
    this.click(field);
    browser.keys(value);
  }

  private executeScrollDown() {
    browser.execute('document.documentElement.scrollTop = document.body.scrollTop = 1000000000');
  }

  scrollDown() {
    this.executeScrollDown();
    this.pause(1000);
    this.executeScrollDown();
  }

  clearAndFill(selector: string, value: string, timeout = this.defaultWaitTime) {
    try {
      this.waitForEnabled(selector, timeout);
      if (this.isIE()) {
        if (this.getValue(selector) !== '') {
          this.selectText(selector);
          this.pressBackspace();
        }
        $(selector).click();

        $(selector).setValue(value);
        this.pause(500);

        if (this.getValue(selector) !== value) {
          this.selectText(selector);
          this.pressBackspace();
          $(selector).click();
          value.split('').forEach((value) => {
            $(selector).addValue(value);
          });
        }
      } else {
        $(selector).click();
        $(selector).clearValue();
        $(selector).setValue(value);
      }
    } catch (e) {
      console.log('ELEMENT ERROR');
      this.selectText(selector);
      this.pressBackspace();
      $(selector).click();
      value.split('').forEach((value) => {
        $(selector).addValue(value);
      });
    }
  }

  addValue(value: string, selector: string) {
    value.split('').forEach((value) => {
      $(selector).addValue(value);
    });
  }

  getElementValue(selector: string) {
    const elementId = this.getElementId(selector);
    return browser.getElementAttribute(elementId, 'value');
  }

  sendKeys(selector: string, value: string) {
    const elementId = this.getElementId(selector);
    browser.elementSendKeys(elementId, value);
  }

  getElementId(selector: string) {
    let elementId: string;
    browser.waitUntil(
      () => {
        elementId = $(selector).elementId;
        return elementId !== undefined;
      },
      { timeout: 3000 },
    );
    return elementId;
  }

  getValueByScript(selector: string) {
    return browser.execute(`arguments[0].value`, $(selector));
  }

  setValue(selector: string, value: string, clickBeforeSetValue = true, timeout = this.defaultWaitTime) {
    if (this.isIE()) {
      this.clearAndFill(selector, value);
      return;
    }
    this.waitForEnabled(selector, timeout);
    if (clickBeforeSetValue) {
      $(selector).click();
    }
    $(selector).setValue(value);
  }

  clickUntilBecomesClickable(selector: string, timeout = this.defaultWaitTime) {
    this.waitForVisible(selector, timeout);
    this.waitForEnabled(selector, timeout);
    let state = false;
    for (let i = 0; i < 10; i++) {
      if (!state) {
        try {
          $(selector).click();
          state = true;
        } catch (e) {
          state = false;
        }
      }
    }
  }

  getLocation(selector: string, timeout = this.defaultWaitTime) {
    this.waitForVisible(selector, timeout);
    return $(selector).getLocation();
  }

  getText(selector: string, waitForDisplayed = true, timeout = this.defaultWaitTime) {
    // safari moveTo issue https://github.com/webdriverio/webdriverio/issues/4322
    if (waitForDisplayed) {
      this.waitForVisible(selector, timeout);
    }
    // IE specific behaviour
    let text = $(selector).getText();

    if (typeof text === 'object') {
      // In the IE browser in some cases we can get $(selector).elementId , but in other it could be { 'session id': 'element id }
      try {
        // get element id - case 1
        let id = $(selector).elementId
        text = browser.getElementText(id);
      } catch (e) {
        // get element id - case 2
        if (!Object.values(text)[0]) {
          throw new Error(
            `type of ${selector} is ${typeof text}. element value should be text but got - ${text}. Failed on getText method. IE specific error`,
          );
        }
        // @ts-ignore
        text = browser.getElementText(Object.values(text)[0])
      }
    }

    return text;
  }

  getHTML(selector: string, include = true) {
    return $(selector).getHTML(include);
  }

  getValue(selector: string) {
    return $(selector).getValue();
  }

  waitForInputHasValue(selector: string) {
    this.waitForElement(selector);
    try {
      browser.waitUntil(function() {
        return $(selector).getValue() !== '';
      });
    } catch (e) {
    }
  }

  getAttribute(selector: string, attribute: string) {
    return $(selector).getAttribute(attribute);
  }

  scrollIntoView(selector: string, timeout = 60000) {
    $(selector).waitForExist({ timeout });
    $(selector).scrollIntoView();
  }

  click(selector: string, customClick = false, timeout = this.defaultWaitTime) {
    // safari click issue https://stackoverflow.com/questions/59401824/safari13-webdriverio-click-issue
    if (this.isSafari()) customClick = true;
    this.waitForClickable(selector, timeout);
    if (!customClick) {
      this.waitForVisible(selector, timeout);
      this.waitForEnabled(selector, timeout);
    }
    if (this.isIE() || this.isSafari()) {
      try {
        browser.waitUntil(
          function () {
            return browser.execute(`return document.readyState === 'complete'`);
          },
          { timeout },
        );
      } catch (e) {
        console.log('ERROR TEXT:', e);
      }
    }
    if (this.isIE()) {
      try {
        if (customClick) {
          this.customClick(selector);
        } else {
          return $(selector).click();
        }
      } catch (error) {
        const elementId = this.getElementId(selector);
        this.scrollIntoView(selector);
        if (customClick) {
          this.customClick(selector);
        } else {
          return browser.elementClick(elementId);
        }
      }
    } else {
      if (customClick) {
        this.customClick(selector);
      } else {
        return $(selector).click();
      }
    }
  }

  pause(pauseTime: number) {
    browser.pause(pauseTime);
  }

  getUrl() {
    return browser.getUrl();
  }

  setDropDownValue(selector: string, value: string, timeout = this.defaultWaitTime) {
    this.waitForVisible(selector, timeout);
    this.waitForEnabled(selector, timeout);

    if (this.isIE()) {
      try {
        return $(selector).selectByAttribute('value', value);
      } catch (error) {
        this.pause(500);
        return $(selector).selectByAttribute('value', value);
      }
    } else {
      return $(selector).selectByAttribute('value', value);
    }
  }

  setDropDownValueByText(selector: string, text: string, timeout = this.defaultWaitTime) {
    this.waitForVisible(selector, timeout);
    this.waitForEnabled(selector, timeout);
    return $(selector).selectByVisibleText(text);
  }

  switchToFrame(selector: string) {
    if (this.isIE()) {
      const numberOfFrame = $$(`${selector}`).length;
      return browser.switchToFrame(numberOfFrame);
    } else {
      $(selector).waitForDisplayed();
      const element = $(selector);
      return browser.switchToFrame(element);
    }
  }

  closeFrame() {
    return browser.switchToFrame(null);
  }

  getLastWindowId(initialWindows: Array<string>): string {
    // should be applied after opening new window
    const windows = browser.getWindowHandles();
    if (windows.length === 1) {
      console.warn('Only 1 window is opened');
      return windows[0];
    }
    return windows.find((w) => initialWindows.indexOf(w) === -1);
  }

  openNewWindow(url: string) {
    if (this.isIE()) {
      const initialWindows = browser.getWindowHandles();
      const windowSize = browser.getWindowSize();
      browser.execute(`window.open("${url}", "_blank");`);
      const windows = browser.getWindowHandles();

      windows.forEach((w) => {
        if (initialWindows.indexOf(w) === -1) browser.switchToWindow(w);
      });

      browser.setWindowSize(windowSize.width, windowSize.height);
      return;
    }

    return browser.newWindow(url);
  }

  reloadSessionAndRefresh() {
    browser.reloadSession();
    browser.refresh();
  }

  switchWindow(urlOrTitleToMatchOrHandle: string) {
    if (urlOrTitleToMatchOrHandle.includes('http')) {
      browser.switchWindow(urlOrTitleToMatchOrHandle);
    } else {
      browser.switchToWindow(urlOrTitleToMatchOrHandle);
    }
  }

  deleteAllCookies() {
    browser.deleteAllCookies();
  }

  getAllCookies() {
    return browser.getAllCookies();
  }

  closeWindow() {
    browser.closeWindow();
  }

  getWindowHandles() {
    return browser.getWindowHandles();
  }

  scrollToElement(selector: string, timeout = this.defaultWaitTime) {
    this.scrollDown();
    $(selector).waitForExist({ timeout });
    $(selector).scrollIntoView();
    this.pause(300);
  }

  clickOutsideElement(selector: string, x = 500, timeout = this.defaultWaitTime) {
    this.waitForVisible(selector, timeout);
    this.waitForEnabled(selector, timeout);
    return $(selector).click({ x });
  }

  clearLocalStorage() {
    browser.execute('window.sessionStorage.clear(); window.localStorage.clear();');
  }

  clickByCoordinates(
    selector: string,
    x = 0,
    y = 0,
    timeout = this.defaultWaitTime,
    waitForElement: Boolean = true,
  ) {
    if (waitForElement) {
      this.waitForVisible(selector, timeout);
      this.waitForEnabled(selector, timeout);
    }
    return $(selector).click({ x: x, y: y });
  }

  getCoordinatesForElement(selector: string) {
    return $(selector).getLocation();
  }

  back() {
    browser.back();
  }

  getBaseUrl() {
    return browser.options.baseUrl;
  }

  moveToElement(selector: string, timeout = this.defaultWaitTime) {
    // safari moveTo issue https://github.com/webdriverio/webdriverio/issues/4322
    this.waitForVisible(selector, timeout);
    this.waitForEnabled(selector, timeout);
    return $(selector).moveTo();
  }

  switchToWindowHandle(windowCount: number) {
    const handles = browser.getWindowHandles();
    browser.switchToWindow(handles[windowCount]);
  }

  switchToWindowByName(windowName: string) {
    const handles = browser.getWindowHandles();
    for (const handle of handles) {
      browser.switchToWindow(handle);
      const currentWindowName = browser.getTitle();
      if (currentWindowName === windowName) break;
    }
  }

  getWindowSize(): { height: number; width: number; x: number; y: number } {
    return browser.getWindowSize();
  }

  setWindowSize(width: number, height: number) {
    browser.setWindowSize(width, height);
  }

  fileUpload(fileName: string, selector: string = 'input[type="file"]',  timeout: number = this.defaultWaitTime ) {

    let correctPath = path.join(__dirname.replace('core','') + '/resources' + `/${fileName}`);

    const remoteFilePath = browser.uploadFile(correctPath);

    $(selector).waitForExist({ timeout });
    this.scrollToElement(selector);
    this.removeAttribute(selector);
    browser.execute(`arguments[0].setAttribute("style", "display: block !important");`, $(selector));
    $(selector).setValue(remoteFilePath);
  }

  removeAttribute(selector: string, attribute = 'class') {
    browser.execute(`arguments[0].removeAttribute("${attribute}");`, $(selector));
  }

  getViewportSize() {
    return browser.getWindowSize();
  }

  getPageTitle(): string {
    return browser.getTitle();
  }

  isCheckboxSelected(selector: string) {
    return $(selector).isSelected();
  }

  getWindowInfo(): { allOpenedWindows: Array<string>; currentWindow: string } {
    return {
      allOpenedWindows: this.getWindowHandles(),
      currentWindow: browser.getWindowHandle(),
    };
  }

  switchToLastWindow(allOpenedWindowsBeforeNew?: Array<string>) {
    if (this.isIE() && allOpenedWindowsBeforeNew) {
      browser.switchToWindow(this.getLastWindowId(allOpenedWindowsBeforeNew));
      return;
    }
    const handles = browser.getWindowHandles();
    browser.switchToWindow(handles[handles.length - 1]);
  }

  getSelectedOption(selector) {
    const element = $(selector);
    const option = element.$(`[value='${element.getValue()}']`);
    return option.getText();
  }

  getPropertyValueViaScript(
    selector: string,
    propertyValue: string,
    timeout = this.defaultWaitTime,
  ) {
    this.waitForVisible(selector, timeout);
    return browser.execute(
      `return window.getComputedStyle(document.querySelector('${selector}'), ':after').getPropertyValue('${propertyValue}')`,
    );
  }

  getWindowTitle() {
    return browser.getTitle();
  }

  closeCurrentWindow() {
    browser.closeWindow();
  }

  dragAndDrop(selector: string, destinationSelector: string, duration = 0) {
    this.waitForElement(selector);
    $(selector).dragAndDrop($(destinationSelector), {duration: duration});
  }

  dragAndDropCoordinates(selector: string, destinationX: number, destinationY: number) {
    this.waitForElement(selector);
    $(selector).dragAndDrop({x: destinationX, y: destinationY}, { duration: 1000 });
  }

  dragAndDropCustom(selector: string, destinationSelector: string, offset = 0) {
    $(selector).moveTo();
    browser.buttonDown(0);
    $(destinationSelector).moveTo({xOffset: offset, yOffset: 0});
    browser.buttonUp(0);
  }

  maximizeWindow() {
    browser.maximizeWindow();
  }

  scrollToTop() {
    browser.execute('window.scroll(0,0);');
  }

  waitForPageToLoad(timeout = this.defaultWaitTime) {
    try {
      browser.waitUntil(
        function () {
          return browser.execute(`return document.readyState === 'complete'`);
        },
        { timeout },
      );
    } catch (e) {
    }
  }

  updateChromeDownloadOptions() {
    //@ts-ignore
    if(JSON.parse(process.env.HEADLESS || 0)) {
      axios.post(`http://localhost:${seleniumPort}/wd/hub/session/${browser.sessionId}/chromium/send_command`,
        {
          'cmd': 'Page.setDownloadBehavior',
          'params': {'behavior': 'allow', 'downloadPath': process.env.DEFAULT_DOWNLOAD_DIR}},
        );
    }
  }

  clearSiteDataAndRefresh() {
    browser.reloadSession();
    browser.url('');
  }

  clearValue(selector: string) {
    $(selector).clearValue();
  }

  clickOnElementById(selector: string, timeout = this.defaultWaitTime) {
    this.waitForDisplayed(selector);
    browser.elementClick($(selector).elementId);
  }

  waitForSelected(selector: string, timeout = this.defaultWaitTime) {
    browser.waitUntil(() => $(selector).isSelected() === true, { timeout });
  }

  waitForUnselected(selector: string, timeout = this.defaultWaitTime) {
    browser.waitUntil(() => $(selector).isSelected() === false, { timeout });
  }

  waitForElementAttribute(selector: string, attribute: string, attributeValue: string, timeout = this.defaultWaitTime) {
    browser.waitUntil(() => $(selector).getAttribute(attribute).includes(attributeValue),{ timeout });
  }

  interactWithCheckbox(
    selectorToClick: string,
    selectorInput: string,
    state: boolean,
    timeout = 10000,
    notQuestionCheckbox = false,
  ) {
      if (state && !this.isCheckboxSelected(selectorInput)) {
        this.click(selectorToClick);
        this.waitForSelected(selectorInput, timeout);
        }
      if (!state && this.isCheckboxSelected(selectorInput)) {
        if (this.isFF() && !selectorToClick.includes(``) && !notQuestionCheckbox) {
          selectorToClick = selectorToClick + ``
        }
        this.click(selectorToClick);
        this.waitForUnselected(selectorInput, timeout);
      }
    }
}
