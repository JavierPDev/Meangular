import { browser, element, by } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('Login component', () => {
  let userPage: UserPage;
  let appPage: AppPage;
  let emailInput;
  let passwordInput;
  let loginForm;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
    userPage.logout();
    browser.get('/login');
    emailInput = element(by.name('email'));
    passwordInput = element(by.name('password'));
    loginForm = element(by.css('form'));
  });

  it('has the correct DOM title', () => {
    appPage.expectDOMTitleToBe('Meangular | Login');
  });

  describe('error alert', () => {
    beforeEach(() => {
      emailInput.clear();
      passwordInput.clear();
    });

    it('displays error for non-existent email', () => {
      const nonexistentEmail = 'doesnot@exist.com';
      emailInput.sendKeys(nonexistentEmail);
      passwordInput.sendKeys('truetrue1!');
      loginForm.submit();
      expect(appPage.getErrorText())
        .toBe(`Email ${nonexistentEmail} not found`);
    });

    it('displays error for wrong password', () => {
      const email = 'javier@javierdev.com';
      emailInput.sendKeys(email);
      passwordInput.sendKeys('invalidpass');
      loginForm.submit();
      expect(appPage.getErrorText()).toBe('Invalid email or password.');
    });
  });

  describe('authentication', () => {
    it('logs in with working credentials', () => {
      userPage.login();
      const logoutLink = element(by.cssContainingText('a', 'Logout'));
      expect(logoutLink.isPresent()).toBe(true);
      expect(logoutLink.isDisplayed()).toBe(true);
    });
  });
});
