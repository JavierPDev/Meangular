import { NgcliprojectPage } from './app.po';

describe('ngcliproject App', function() {
  let page: NgcliprojectPage;

  beforeEach(() => {
    page = new NgcliprojectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
