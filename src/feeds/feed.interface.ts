export interface Feed {
    _id?: string;
    name: string;
    url: string;
    lastFetched: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewFeed {
    name: string;
    url: string;
}

export interface FeedUrl {
    url: string;
}