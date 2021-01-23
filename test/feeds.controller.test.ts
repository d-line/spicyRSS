import { FeedsController } from '../src/controllers/feeds.controller';

describe('FeedsController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('postOne', () => {
    const feedsController = new FeedsController();
    const testBody = {
      url: 'https://www.reddit.com/r/algorithms/new/.rss'
    };
    const res = feedsController.createFeed(testBody as any);
    expect(res).toBeDefined();
  });
});
