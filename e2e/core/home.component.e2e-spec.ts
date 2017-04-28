import { browser } from 'protractor';
import { AppPage } from '../app.po';

describe('Home', () => {
  let appPage: AppPage;

  beforeAll(() => {
    appPage = new AppPage();
    browser.get('/');
  });

  it('displays correct heading', () => {
    expect(appPage.getH1Text()).toEqual('Meangular');
  });

  it('has the correct DOM title', () => {
    appPage.expectDOMTitleToBe('Meangular | Home');
  });
});
