export interface Feed {
    _id?: string;
    name: string;
    url: string;
    lastFetched: Date;
    createdAt: Date;
    updatedAt: Date;
    storiesCount?: number;
};
