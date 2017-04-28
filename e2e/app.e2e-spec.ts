import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('App', () => {
  let appPage: AppPage;

  beforeAll(() => {
    appPage = new AppPage();
    browser.get('/');
  });

  it('loads', () => {
    expect(element(by.css('app-home')).isPresent()).toBe(true);
  });
});
