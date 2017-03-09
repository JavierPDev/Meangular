import { browser, element, by } from 'protractor';

import { UserPage } from '../user/user.po';

describe('Navbar component', () => {
  const userPage: UserPage = new UserPage();

  it('has working home link', () => {
    element(by.cssContainingText('.navbar', 'Home')).click();
    const currentPath = browser.getCurrentUrl();
    expect(currentPath).toMatch(/$/);
  });

  it('has working blog link', () => {
    element(by.cssContainingText('a', 'Blog')).click();
    const currentPath = browser.getCurrentUrl();
    expect(currentPath).toMatch(/\/blog\/list$/);
  });

  describe('unauthenticated user', () => {
    beforeAll(() => {
      userPage.logout();
    });

    it('has working signup link', () => {
      element(by.cssContainingText('a', 'Sign Up')).click();
      const currentPath = browser.getCurrentUrl();
      expect(currentPath).toMatch(/\/signup$/);
    });

    it('has working login link', () => {
      element(by.cssContainingText('a', 'Log In')).click();
      const currentPath = browser.getCurrentUrl();
      expect(currentPath).toMatch(/\/login$/);
    });

    it('does not have logout link', () => {
      const logout = element(by.cssContainingText('a', 'Logout'));
      expect(logout.isPresent()).toBe(false);
    });
  });

  describe('authenticated user', () => {
    beforeAll(() => {
      userPage.login();
    });

    it('has working profile link', () => {
      element(by.cssContainingText('a', 'Profile')).click();
      const currentPath = browser.getCurrentUrl();
      expect(currentPath).toMatch(/\/profile/);
    });

    it('displays logout link', () => {
      const logout = element(by.cssContainingText('a', 'Logout'));
      expect(logout.isPresent()).toBe(true);
      expect(logout.isDisplayed()).toBe(true);
    });

    it('does not have login link', () => {
      const login = element(by.cssContainingText('a', 'Log In'));
      expect(login.isPresent()).toBe(false);
    });

    it('does not have signup link', () => {
      const signup = element(by.cssContainingText('a', 'Sign Up'));
      expect(signup.isPresent()).toBe(false);
    });
  });
});
