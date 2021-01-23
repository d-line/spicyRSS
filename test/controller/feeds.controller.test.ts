import { FeedsController } from '../../src/controllers/feeds.controller';
import { FeedUrl } from '../../src/models/feed';

describe('UserController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('postOne', () => {
    const userController = new FeedsController();
    const testBody = {
      url: '123'
    };
    const res = userController.createFeed(testBody as FeedUrl);
    expect(res).toBeUndefined();
  });
});
