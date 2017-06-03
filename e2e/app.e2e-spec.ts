import { KaratiFeV1Page } from './app.po';

describe('karati-fe-v1 App', () => {
  let page: KaratiFeV1Page;

  beforeEach(() => {
    page = new KaratiFeV1Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
