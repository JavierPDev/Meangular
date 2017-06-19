import { browser, element, by, ExpectedConditions } from 'protractor';

export class AppPage {
  /**
   * Run expectation for submit button to be enabled/disabled according to
   * argument. Optional second argument is useful when multiple submit
   * buttons are on the page.
   * @param {Boolean} isEnabled - Whether to test for enabled or disabled
   * @param {String} containerSelector - CSS selector of submit btn's parent
   */
  public expectSubmitEnabledStateToBe(isEnabled: boolean, containerSelector?: string): void {
    const selector = containerSelector
      ? containerSelector + ' [type="submit"]' : '[type="submit"]';
    const submitBtn = element(by.css(selector));
    expect(submitBtn.isEnabled()).toBe(isEnabled);
  }

  /**
   * Run expectation for DOM title to be set to argument.
   * @param {String} title - DOM title
   */
  public expectDOMTitleToBe(title: string): void {
    expect(browser.getTitle()).toBe(title);
  }

  public getCancelButton() {
    return element(by.cssContainingText('.btn-default', 'Cancel'));
  }

  public getH1Text() {
    return element(by.css('h1')).getText();
  }

  public clickBlogNavLink(): void {
    element(by.cssContainingText('nav a', 'Blog')).click();
  }

  public expectConfirmDialogPresent(): void {
    browser.wait(ExpectedConditions.alertIsPresent(), 5000);
    browser.switchTo().alert().dismiss();
  }

  public waitForErrorTextToBe(text: string): void {
    const alertEl = element(by.css('.alert-danger'));
    browser.wait(
      () => ExpectedConditions.textToBePresentInElement(alertEl, text),
      5000,
      `Error alert should contain "${text}" within 5 seconds`
    );
  }

  public waitForSuccessTextToBe(text: string): void {
    const alertEl = element(by.css('.alert-success'));
    browser.wait(
      () => ExpectedConditions.textToBePresentInElement(alertEl, text),
      5000,
      `Success alert should contain "${text}" within 5 seconds`
    );
  }
}
