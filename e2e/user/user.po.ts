import { browser, element, by } from 'protractor';

export class UserPage {
  /**
   * If not already logged in log in with provided email and password. If no
   * username and password provided use admin account.
   * @param {String} email - User email
   * @param {String} password - User password
   */
  public login(email = 'javier@javierdev.com', password = 'Ajq4NZ19$l') {
    browser.get('/login');
    browser.getCurrentUrl()
      .then(url => {
        if (/\/login$/.test(url)) {
          element(by.name('email')).sendKeys(email);
          element(by.name('password')).sendKeys(password);
          element(by.css('form')).submit();
          browser.sleep(300);
        }
      });
  }

  public logout() {
    const logoutLink = element(by.cssContainingText('a', 'Logout'));
    browser.isElementPresent(logoutLink)
      .then(isPresent => {
        if (isPresent) {
          logoutLink.click();
        }
      });
  }
}
