import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct heading', () => {
    page.navigateTo();
    expect(page.getH1Text()).toEqual('Meangular');
  });
});
