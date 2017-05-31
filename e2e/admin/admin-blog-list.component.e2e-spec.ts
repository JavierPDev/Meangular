import { browser, element, by, ElementFinder } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('AdminBlogList component', () => {
  let userPage: UserPage;
  let appPage: AppPage;

  beforeAll(() => {
    browser.get('/');
    userPage = new UserPage();
    appPage = new AppPage();
    userPage.logout();
    userPage.login();
    browser.sleep(200);
    browser.get('/admin/blog/list');
  });

  describe('create new entry button', () => {
    let createBtn: ElementFinder;

    beforeEach(() => {
      createBtn = element(by.id('createBlogEntryBtn'));
    });

    it('is displayed', () => {
      expect(createBtn.isPresent()).toBe(true);
      expect(createBtn.isDisplayed()).toBe(true);
    });

    it('works', () => {
      createBtn.click();
      expect(appPage.getH1Text()).toBe('Create a Blog Entry');
    });

    describe('cancel button in blog create from admin list', () => {
      it('goes back to admin list', () => {
        expect(browser.getCurrentUrl()).toEndWith('/blog/create');
        appPage.getCancelButton().click();
        expect(browser.getCurrentUrl()).toEndWith('/admin/blog/list');
      });
    });
  });

  describe('list', () => {
    let link: ElementFinder;

    beforeAll(() => {
      link = element(by.css('td a'));
    });

    it('has the correct DOM title', () => {
      appPage.expectDOMTitleToBe('Meangular | Admin Blog List');
    });

    it('loads blog items', () => {
      expect(link.getText()).toBe('example');
    });

    it('has working blog entry links', () => {
      link.click();
      expect(appPage.getH1Text()).toBe('example');
    });

    describe('cancel button in blog create from admin list', () => {
      it('has working blog edit buttons', () => {
        browser.get('/admin/blog/list');
        const editBtn = element(by.css('.fa-edit'));
        expect(editBtn.isDisplayed()).toBe(true);
        editBtn.click();
        expect(appPage.getH1Text()).toBe('Edit Blog Entry');
      });

      it('goes back to admin list', () => {
        expect(browser.getCurrentUrl()).toContain('edit');
        appPage.getCancelButton().click();
        expect(browser.getCurrentUrl()).toEndWith('/admin/blog/list');
      });
    });

    it('has working blog delete', (done) => {
      element.all(by.css('.fa-trash'))
        .then(items => {
          const deleteBtn: ElementFinder = items[6];
          expect(deleteBtn.isDisplayed()).toBe(true);
          deleteBtn.click();
          browser.sleep(200);
          expect(deleteBtn.isPresent()).toBe(false);
          done();
        });
    });
  });
});
