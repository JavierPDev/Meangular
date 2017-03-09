import { browser, element, by } from 'protractor';

export class UserPage {
  public login() {
    browser.get('/login');
    browser.getCurrentUrl()
      .then(url => {
        if (/\/login$/.test(url)) {
          element(by.name('email')).sendKeys('javier@javierdev.com');
          element(by.name('password')).sendKeys('Ajq4NZ19$l');
          element(by.css('form')).submit();
        }
      })
  }

  public logout() {
    const logoutLink = element(by.cssContainingText('a', 'Logout'));
    browser.isElementPresent(logoutLink)
      .then(isPresent => {
        if (isPresent) logoutLink.click();
      });
  }
}
