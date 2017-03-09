import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('App', () => {
  let appPage: AppPage;

  beforeAll(() => {
    appPage = new AppPage();
    browser.get('/');
  });

  it('displays correct heading', () => {
    expect(appPage.getH1Text()).toEqual('Meangular');
  });
});
