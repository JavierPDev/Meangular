import { Element } from '@angular/compiler';
import {
  browser, by, element, ExpectedConditions, ElementFinder
} from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('Comments', () => {
  let userPage: UserPage;
  let appPage: AppPage;
  let openBtn: ElementFinder;
  let submitBtn: ElementFinder;
  let cancelBtn: ElementFinder;
  let form: ElementFinder;
  let comment: ElementFinder;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
  });

  describe('create', () => {
    it('unauthenticated users should not see a comment button', () => {
      userPage.logout();
      browser.get('/blog/mean');
      openBtn = element(by.buttonText('New Comment'));
      expect(openBtn.isPresent()).toBe(false);
    });

    it('authenticated users should not see a comment button', () => {
      userPage.login('legal@meangular.com', 'truetrue1!');
      browser.get('/blog/mean');
      openBtn = element(by.buttonText('New Comment'));
      expect(openBtn.isDisplayed()).toBe(true);
    });

    it('authenticated users should be able to bring up comment form', () => {
      openBtn.click();
      form = element(by.id('commentInput'));
      expect(form.isDisplayed()).toBe(true);
    });

    it('submit button should be disabled if no comment entered', () => {
      appPage.expectSubmitEnabledStateToBe(false);
    });

    it('warning text should be displayed if no comment entered', () => {
      const warning = element(
        by.cssContainingText('.help-block', 'Comment is required')
      );
      expect(warning.isDisplayed()).toBe(true);
    });

    it('authenticated user should be able to submit comment', () => {
      form = element(by.id('commentInput'));
      form.sendKeys('Test comment');
      appPage.expectSubmitEnabledStateToBe(true);
    });

    it('authenticated user should not see form or buttons after submission',
      () => {
      submitBtn = element(by.buttonText('Save'));
      cancelBtn = element(by.buttonText('Cancel'));
      submitBtn.click();
      form = element(by.id('commentInput'));
      expect(form.isPresent()).toBe(false);
      expect(submitBtn.isPresent()).toBe(false);
      expect(cancelBtn.isPresent()).toBe(false);
    });

    it('authenticated user should see comment after submission', () => {
      comment = element(
        by.cssContainingText('.blogEntryComment', 'Test comment')
      );
      expect(comment.isDisplayed()).toBe(true);
    });

    it('cancel button should hide the form', () => {
      openBtn.click();
      expect(form.isDisplayed()).toBe(true);
      cancelBtn = element(by.buttonText('Cancel'));
      cancelBtn.click();
      expect(form.isPresent()).toBe(false);
    });

    it('cancel button should hide the form buttons', () => {
      expect(submitBtn.isPresent()).toBe(false);
      expect(cancelBtn.isPresent()).toBe(false);
    });
  });

  describe('edit/delete', () => {
    let editBtn: ElementFinder;
    let deleteBtn: ElementFinder;

    it('unauthenticated users should not see edit/delete buttons', () => {
      userPage.logout();
      browser.get('/blog/mean');
      editBtn = element(by.buttonText('Edit Comment'));
      deleteBtn = element(by.buttonText('Delete Comment'));
      expect(editBtn.isPresent()).toBe(false);
      expect(deleteBtn.isPresent()).toBe(false);
    });

    it('authenticated users that are not admins or comment author should '
      + 'not see edit or delete button', () => {
      userPage.login('help@meangular.com', 'truetrue1!');
      browser.get('/blog/mean');
      expect(editBtn.isPresent()).toBe(false);
      expect(deleteBtn.isPresent()).toBe(false);
    });

    describe('comment author', () => {
      beforeAll(() => {
        userPage.logout();
        userPage.login();
        browser.get('/blog/mean');
      });

      testEditAndDeleteUserStory('author');

      afterAll(() => {
        // Create new comment for admin to edit and then delete
        openBtn = element(by.buttonText('New Comment'));
        openBtn.click();
        form = element(by.id('commentInput'));
        form.sendKeys('Test comment');
        submitBtn = element(by.buttonText('Save'));
        submitBtn.click();
      });
    });

    describe('admin', () => {
      beforeAll(() => {
        userPage.logout();
        userPage.login();
        browser.get('/blog/mean');
      });

      testEditAndDeleteUserStory('admin');
    });

    function testEditAndDeleteUserStory(editor: string) {
      it('should be able to see edit and delete buttons', () => {
        expect(editBtn.isPresent()).toBe(true);
        expect(deleteBtn.isPresent()).toBe(true);
      });

      it('should be able to edit comment', () => {
        editBtn.click();
        form = element(by.id('commentInput'));
        expect(form.isDisplayed()).toBe(true);
        form.sendKeys(' Edited by ' + editor);
      });

      it('should be able to submit edited comment', () => {
        appPage.expectSubmitEnabledStateToBe(true);
      });

      it('should not see form or form buttons after submission',
        () => {
        submitBtn = element(by.buttonText('Save'));
        cancelBtn = element(by.buttonText('Cancel'));
        submitBtn.click();
        form = element(by.id('commentInput'));
        expect(form.isPresent()).toBe(false);
        expect(submitBtn.isPresent()).toBe(false);
        expect(cancelBtn.isPresent()).toBe(false);
      });

      it('should see comment after submission', () => {
        comment = element(
          by.cssContainingText(
            '.blogEntryComment',
            'Test comment Edited by ' + editor)
        );
        expect(comment.isDisplayed()).toBe(true);
      });

      it('should be able to delete comment', () => {
        deleteBtn = element(by.buttonText('Delete Comment'));
        deleteBtn.click();
        expect(comment.isPresent()).toBe(false);
        expect(deleteBtn.isPresent()).toBe(false);
        expect(editBtn.isPresent()).toBe(false);
      });
    }
  });
});
