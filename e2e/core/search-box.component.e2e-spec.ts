import { browser, element, by } from 'protractor';

import { AppPage } from '../app.po';

describe('Searchbox component', () => {
  let appPage;
  let searchbox;

  beforeAll(() => {
    appPage = new AppPage();
    searchbox = element(by.name('searchTerm'));
  });

  describe('search usage without user', () => {
    beforeAll(() => {
      browser.get('/blog/list');
      searchbox.sendKeys('lorem');
    });

    it('navigates to page 1 of search results after keys entered', () => {
      expect(browser.getCurrentUrl()).toContain('/blog/list');
      expect(browser.getCurrentUrl()).toContain('search=lorem');
      expect(browser.getCurrentUrl()).toContain('page=1');
      expect(browser.getCurrentUrl()).not.toEndWith('/blog/list');
    });

    it('displays results', () => {
      expect(element(by.css('.blog-list-item')).isDisplayed()).toBe(true);
    });

    it('displays results count with search term', () => {
      const count = element(by.css('.item-count'));
      const expectedText = '1 through 1 of 1 for search term "lorem"';
      expect(count.isDisplayed()).toBe(true);
      expect(count.getText()).toBe(expectedText);
    });
  });

  describe('search usage with user', () => {
    beforeAll(() => {
      browser.get('/blog/list');
      element(by.cssContainingText('a', 'owner')).click();
      searchbox.sendKeys('lorem');
    });

    it('navigates to page 1 of search results after keys entered', () => {
      expect(browser.getCurrentUrl()).toContain('/blog/list');
      expect(browser.getCurrentUrl()).toContain('search=lorem');
      expect(browser.getCurrentUrl()).toContain('page=1');
      expect(browser.getCurrentUrl()).toContain('user=');
      expect(browser.getCurrentUrl()).toContain('username=owner');
      expect(browser.getCurrentUrl()).not.toEndWith('/blog/list');
    });

    it('displays results', () => {
      expect(element(by.css('.blog-list-item')).isDisplayed()).toBe(true);
    });

    it('displays results count with search term and user author', () => {
      const count = element(by.css('.item-count'));
      const expectedText = '1 through 1 of 1 for search term "lorem" by user'
        + ' owner';
      expect(count.isDisplayed()).toBe(true);
      expect(count.getText()).toBe(expectedText);
    });
  });
});
