export interface Feed {
    name: string;
    url: string;
    // lastFetched: Date;
    // createdAt: Date;
    // updatedAt: Date;
    lastFetched: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewFeed {
    name: string;
    url: string;
}

export interface FeedUrl {
    url: string;
}