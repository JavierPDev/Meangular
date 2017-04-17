import { browser, element, by } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('BlogView component', () => {
  let userPage: UserPage;
  let appPage: AppPage;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
  });

  describe('blog entry', () => {
    beforeAll(() => {
      browser.get('/blog/example');
    });

    it('has the correct DOM title', () => {
      appPage.expectDOMTitleToBe('Meangular | Blog Entry: example');
    });

    it('has correct blog entry title', () => {
      const headingText = appPage.getH1Text();
      expect(headingText).toBe('example');
    });

    it('has correct blog entry content', () => {
      const blogEntryText = element(by.id('blogEntryContent')).getText();
      expect(blogEntryText).toMatch(/^For example/);
    });
  });

  describe('edit and delete buttons', () => {
    it('are not displayed if unauthenticated', () => {
      userPage.logout();
      browser.get('/blog/example');
      const blogEditBtn = element(by.id('blogEditBtn'));
      const blogDeleteBtn = element(by.id('blogDeleteBtn'));
      expect(blogEditBtn.isPresent()).toBe(false);
      expect(blogDeleteBtn.isPresent()).toBe(false);
    });

    it('are not displayed if authenticated with user that did not create entry',
       () => {
      userPage.login('help@meangular.com', 'truetrue1!');
      browser.get('/blog/example');
      const blogEditBtn = element(by.id('blogEditBtn'));
      const blogDeleteBtn = element(by.id('blogDeleteBtn'));
      expect(blogEditBtn.isPresent()).toBe(false);
      expect(blogDeleteBtn.isPresent()).toBe(false);
    });

    it('are displayed if authenticated with user that created entry', () => {
      userPage.logout();
      userPage.login('accounting@meangular.com', 'truetrue1!');
      browser.get('/blog/example');
      const blogEditBtn = element(by.id('blogEditBtn'));
      const blogDeleteBtn = element(by.id('blogDeleteBtn'));
      expect(blogEditBtn.isPresent()).toBe(true);
      expect(blogDeleteBtn.isPresent()).toBe(true);
    });

    it('are displayed if authenticated with admin user', () => {
      userPage.logout();
      userPage.login();
      browser.get('/blog/example');
      const blogEditBtn = element(by.id('blogEditBtn'));
      const blogDeleteBtn = element(by.id('blogDeleteBtn'));
      expect(blogEditBtn.isPresent()).toBe(true);
      expect(blogDeleteBtn.isPresent()).toBe(true);
    });

    it('edit button works', () => {
      const blogEditBtn = element(by.id('blogEditBtn'));
      blogEditBtn.click();
      const h1Text = appPage.getH1Text();
      expect(h1Text).toMatch('Edit Blog Entry');
    });

    it('delete button works', () => {
      browser.get('/blog/clara');
      const blogDeleteBtn = element(by.id('blogDeleteBtn'));
      blogDeleteBtn.click();
      browser.sleep(300);
      expect(appPage.getH1Text()).toBe('Blog List');
      const noEl = element(by.cssContainingText('li h2 a', 'clara'));
      expect(noEl.isPresent()).toBe(false);
    });
  });
});
