import { Feed } from '../feeds/feed';

export interface Story {
    _id: string;
    title: string;
    permalink: string;
    body: string;
    feed: Feed;
    published: Date;
    isRead: boolean;
    keepUnread: boolean;
    isStarred: boolean;
    isOpened: boolean;
}
