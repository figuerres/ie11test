import { Ie11testPage } from './app.po';

describe('ie11test App', () => {
  let page: Ie11testPage;

  beforeEach(() => {
    page = new Ie11testPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
