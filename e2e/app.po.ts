import { browser, element, by } from 'protractor';

export class AppPage {
  public clearToken() {
    browser.executeScript('localStorage.clear()');
  }

  /**
   * Run expectation for submit button to be enabled/disabled according to
   * argument. Optional second argument is useful when multiple submit
   * buttons are on the page.
   * @param {Boolean} isEnabled - Whether to test for enabled or disabled
   * @param {String} containerSelector - CSS selector of submit btn's parent
   */
  public expectSubmitEnabledStateToBe(isEnabled, containerSelector?) {
    const selector = containerSelector
      ? containerSelector+' [type="submit"]' : '[type="submit"]';
    const submitBtn = element(by.css(selector));
    expect(submitBtn.isEnabled()).toBe(isEnabled);
  }

  public getH1Text() {
    return element(by.css('h1')).getText();
  }

  public getErrorText() {
    return element(by.css('.alert.alert-danger')).getText();
  }

  public getSuccessText() {
    return element(by.css('.alert.alert-success')).getText();
  }
}
