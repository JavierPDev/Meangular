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

  public getH1Text() {
    return element(by.css('h1')).getText();
  }

  public getErrorText() {
    return element(by.css('.alert.alert-danger')).getText();
  }

  public getSuccessText() {
    return element(by.css('.alert.alert-success')).getText();
  }

  public clickBlogNavLink(): void {
    element(by.cssContainingText('nav a', 'Blog')).click();
  }

  public expectConfirmDialogPresent(): void {
    browser.wait(ExpectedConditions.alertIsPresent(), 5000);
    browser.switchTo().alert().dismiss();
  }
}
