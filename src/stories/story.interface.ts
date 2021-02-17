import { Feed } from 'feeds/feed.interface';

export interface Story {
    title: string;
    permalink: string;
    body: string;
    feed: Feed;
    published: Date;
    isRead: boolean;
    keepUnread: boolean;
    isStarred: boolean;
}