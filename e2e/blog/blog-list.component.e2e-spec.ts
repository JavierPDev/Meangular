import { browser, element, by } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('BlogList component', () => {
  let userPage: UserPage;
  let appPage: AppPage;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
  });

  describe('list', () => {
    let headingLink;

    beforeAll(() => {
      browser.get('/blog/list');
      headingLink = element(by.css('li h2 a'));
    });

    it('loads blog items', () => {
      expect(headingLink.getText()).toBe('example');
    });

    it('has working blog entry links', () => {
      headingLink.click();
      expect(appPage.getH1Text()).toBe('example');
    });
  });

  describe('create new entry button', () => {
    it('is not displayed if unauthenticated', () => {
      userPage.logout();
      browser.get('/blog/list');
      const createBtn = element(by.id('createBlogEntryBtn'));
      expect(createBtn.isPresent()).toBe(false);
    });

    it('is displayed if authenticated', () => {
      userPage.login();
      element(by.cssContainingText('a', 'Blog')).click();
      const createBtn = element(by.id('createBlogEntryBtn'));
      expect(createBtn.isPresent()).toBe(true);
      expect(createBtn.isDisplayed()).toBe(true);
    });
  });
});
