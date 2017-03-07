import { browser, element, by } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getH1Text() {
    return element(by.css('app-root h1')).getText();
  }
}
