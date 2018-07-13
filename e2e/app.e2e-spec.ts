import { AmsUiPage } from './app.po';

describe('ams-ui App', () => {
  let page: AmsUiPage;

  beforeEach(() => {
    page = new AmsUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
