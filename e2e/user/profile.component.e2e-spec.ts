import { browser, element, by, Key} from 'protractor';

import { UserPage } from '../user/user.po';
import { AppPage } from '../app.po';

describe('Profile component', () => {
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
    userPage.login();
    browser.get('/profile');
    emailInput = element(by.name('email'));
    nameInput = element(by.name('name'));
    passwordInput = element(by.name('password'));
    confirmPasswordInput = element(by.name('confirmPassword'));
    body = element(by.css('body'));
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

    describe('required', () => {
      beforeAll(() => {
        emailInput.clear();
        emailInput.sendKeys('ta');
        emailInput.clear();
        emailInput.click();
        emailInput.sendKeys('j');
        emailInput.sendKeys(Key.BACK_SPACE);
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
        appPage.expectSubmitEnabledStateToBe(false, '#profileForm');
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
        appPage.expectSubmitEnabledStateToBe(false, '#profileForm');
      });
    });

    describe('valid', () => {
      beforeAll(() => {
        emailInput.clear();
        emailInput.sendKeys('valid@email.com');
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

    describe('required', () => {
      beforeAll(() => {
        nameInput.clear();
        nameInput.sendKeys('ta');
        nameInput.clear();
        nameInput.click();
        nameInput.sendKeys('j');
        nameInput.sendKeys(Key.BACK_SPACE);
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
        appPage.expectSubmitEnabledStateToBe(false, '#profileForm');
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
        appPage.expectSubmitEnabledStateToBe(false, '#profileForm');
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

  describe('update profile', () => {
    it('successfully updates profile', () => {
      const profileForm = element(by.id('profileForm'));
      profileForm.submit();
      expect(appPage.getSuccessText()).toBe('Profile updated');
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

    describe('minlength', () => {
      beforeAll(() => {
        passwordInput.sendKeys('Te');
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText())
          .toBe('Password must contain at least 6 characters');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false, '#passwordForm');
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

    describe('minlength', () => {
      beforeAll(() => {
        confirmPasswordInput.sendKeys('Te');
        body.click();
      });

      it('has validation style', () => {
        expect(formGroup.getAttribute('class')).toMatch('has-error');
      });

      it('has correct text warning', () => {
        expect(warningSpan.isPresent()).toBe(true);
        expect(warningSpan.isDisplayed()).toBe(true);
        expect(warningSpan.getText())
          .toBe('Password must contain at least 6 characters');
      });

      it('submit button is disabled', () => {
        appPage.expectSubmitEnabledStateToBe(false, '#passwordForm');
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

  describe('change password', () => {
    it('successfully updates password', () => {
      const passwordForm = element(by.id('passwordForm'));
      passwordForm.submit();
      expect(appPage.getSuccessText()).toBe('Password updated');
    });

    it('clears password fields', () => {
      expect(passwordInput.getAttribute('value')).toBe('');
      expect(confirmPasswordInput.getAttribute('value')).toBe('');
    });
  });
});
