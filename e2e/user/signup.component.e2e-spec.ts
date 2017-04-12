import { browser, element, by } from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('Signup component', () => {
  let userPage: UserPage;
  let appPage: AppPage;
  let emailInput;
  let nameInput;
  let passwordInput;
  let confirmPasswordInput;
  let body;

  beforeAll(() => {
    userPage = new UserPage();
    appPage = new AppPage();
    userPage.logout();
    browser.get('/signup');
    emailInput = element(by.name('email'));
    nameInput = element(by.name('name'));
    passwordInput = element(by.name('password'));
    confirmPasswordInput = element(by.name('confirmPassword'));
    body = element(by.css('body'));
  });

  it('has the correct DOM title', () => {
    appPage.expectDOMTitleToBe('Meangular | Signup');
  });

  describe('email validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
       formGroup = emailInput.element(by.xpath('..'));
    });

    beforeEach(() => {
       warningSpan = formGroup.element(by.css('span'));
    });

    describe('untouched', () => {
      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('required', () => {
      beforeAll(() => {
        emailInput.click();
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Email is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('email pattern', () => {
      beforeAll(() => {
        emailInput.sendKeys('invalid@email');
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Must be a proper email');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('valid', () => {
      beforeAll(() => {
        emailInput.clear();
        emailInput.sendKeys('valid@validemail.com');
      });

      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });
    });
  });

  describe('name validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
       formGroup = nameInput.element(by.xpath('..'));
    });

    beforeEach(() => {
       warningSpan = formGroup.element(by.css('span'));
    });

    describe('untouched', () => {
      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('required', () => {
      beforeAll(() => {
        nameInput.click();
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Name is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('minlength', () => {
      beforeAll(() => {
        nameInput.sendKeys('Te');
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText())
          .toBe('Name requires at least three characters');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('valid', () => {
      beforeAll(() => {
        nameInput.clear();
        nameInput.sendKeys('Test User');
      });

      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });
    });
  });

  describe('password validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
       formGroup = passwordInput.element(by.xpath('..'));
    });

    beforeEach(() => {
       warningSpan = formGroup.element(by.css('span'));
    });

    describe('untouched', () => {
      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('required', () => {
      beforeAll(() => {
        passwordInput.click();
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Password is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('minlength', () => {
      beforeAll(() => {
        passwordInput.sendKeys('Te');
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText())
          .toBe('Password requires at least six characters');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('valid', () => {
      beforeAll(() => {
        passwordInput.clear();
        passwordInput.sendKeys('TestPassword');
      });

      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });
    });
  });

  describe('confirmPassword validation', () => {
    let formGroup;
    let warningSpan;

    beforeAll(() => {
       formGroup = confirmPasswordInput.element(by.xpath('..'));
    });

    beforeEach(() => {
       warningSpan = formGroup.element(by.css('span'));
    });

    describe('untouched', () => {
      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('required', () => {
      beforeAll(() => {
        confirmPasswordInput.click();
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText()).toBe('Password is required');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('minlength', () => {
      beforeAll(() => {
        confirmPasswordInput.sendKeys('Te');
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText())
          .toBe('Password requires at least six characters');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false);
      });
    });

    describe('valid', () => {
      beforeAll(() => {
        confirmPasswordInput.clear();
        confirmPasswordInput.sendKeys('TestPassword');
      });

      it('has no validation style', () => {
        expect(formGroup.getAttribute('class')).not.toMatch('has-error');
      });

      it('has no text warnings', () => {
        expect(warningSpan.isPresent()).toBe(false);
      });
    });
  });

  describe('signup', () => {
    it('successfully signs up and authenticates user', () => {
      const form = element(by.css('form'));
      form.submit();
      const currentPath = browser.getCurrentUrl();
      expect(currentPath).not.toMatch(/\/signup/);
    });
  });
});
