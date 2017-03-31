import { browser, element, by, Key } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('BlogEdit component', () => {
  let userPage: UserPage;
  let appPage: AppPage;
  let titleInput;
  let contentInput;
  let body;
  let formGroup;
  let warningSpan;
  let submitBtn;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
  });

  describe('input', () => {
    beforeAll(() => {
      userPage.login('help@greenpioneersolutions.com', 'truetrue1!');
      browser.get('/blog/example/edit');
    });

    it('loads with correct title input', () => {
      titleInput = element(by.id('title'));
      expect(titleInput.getAttribute('value')).toMatch('example');
    });

    it('loads with correct content text', () => {
      contentInput = element(by.name('content'));
      expect(contentInput.getAttribute('value')).toMatch(/^For example/);
    });
  });

  describe('authorization', () => {
    afterAll(() => {
      // Reset content back to test value
      browser.get('/blog/example/edit');
      contentInput = element(by.name('content'));
      contentInput.clear();
      contentInput.sendKeys('For example ...');
      submitBtn = element(by.css('[type="submit"]'));
      submitBtn.click();
    });

    it('gives unauthorized msg if not admin or user that created entry', () => {
      submitBtn = element(by.css('[type="submit"]'));
      submitBtn.click();
      expect(appPage.getErrorText()).toBe('Unauthorized');
    });

    it('successfully edits if using user that created entry', () => {
      userPage.logout();
      userPage.login('qa@greenpioneersolutions.com', 'truetrue1!');
      browser.get('/blog/example/edit');
      expect(browser.getCurrentUrl()).toMatch('/blog/example/edit');
      contentInput = element(by.name('content'));
      contentInput.clear();
      contentInput.sendKeys('user');
      submitBtn = element(by.css('[type="submit"]'));
      submitBtn.click();
      browser.sleep(500);
      expect(element(by.id('blogEntryContent')).getText()).toBe('user');
    });

    it('successfully edits if using admin user', () => {
      userPage.logout();
      userPage.login();
      browser.get('/blog/example/edit');
      contentInput = element(by.name('content'));
      contentInput.clear();
      contentInput.sendKeys('admin');
      submitBtn = element(by.css('[type="submit"]'));
      submitBtn.click();
      expect(element(by.id('blogEntryContent')).getText()).toBe('admin');
    });
  });

  describe('title validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
      userPage.login('help@greenpioneersolutions.com', 'truetrue1!');
      browser.get('/blog/example/edit');
      titleInput = element(by.id('title'));
      formGroup = titleInput.element(by.xpath('..'));
      submitBtn = element(by.css('[type="submit"]'));
      body = element(by.css('body'));
    });

    describe('required', () => {
      beforeAll(() => {
        titleInput.clear();
        titleInput.sendKeys('ta')
        titleInput.clear();
        titleInput.click();
        titleInput.sendKeys('j')
        titleInput.sendKeys(Key.BACK_SPACE);
        body.click();
      });

      beforeEach(() => {
         warningSpan = formGroup.element(by.css('span'));
      });

      afterAll(() => {
        // Enter keys so this input's invalidity doesn't affect content test's
        titleInput.sendKeys('thing');
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Title is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });
  });

  describe('content validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
      contentInput = element(by.id('content'));
      formGroup = contentInput.element(by.xpath('..'));
      submitBtn = element(by.css('[type="submit"]'));
      body = element(by.css('body'));
    });

    describe('required', () => {
      beforeAll(() => {
        contentInput.clear();
        contentInput.click();
        contentInput.sendKeys('j')
        contentInput.sendKeys(Key.BACK_SPACE);
        body.click();
      });

      beforeEach(() => {
         warningSpan = formGroup.element(by.css('span'));
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch(/has-error/);
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Content is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });
  });

  describe('canDeactivate guard', () => {
    beforeEach(() => {
      browser.get('/blog/example/edit');
    });

    it('confirm box appears when attempting to navigate away when content changed',
      () => {
      contentInput = element(by.id('content'));
      contentInput.sendKeys('foo');
      appPage.clickBlogNavLink();
      appPage.expectConfirmDialogPresent();
    });

    it('confirm box appears when attempting to navigate away when title changed',
      () => {
      titleInput = element(by.id('title'));
      titleInput.sendKeys('bar');
      appPage.clickBlogNavLink();
      appPage.expectConfirmDialogPresent();
    });
  });
});
