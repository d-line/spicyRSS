import { IsString } from 'class-validator';
import { FeedUrl, NewFeed } from './feed.interface';

export class CreateFeedDto implements FeedUrl {
    @IsString()
    public url: string;
}

export class FeedDto implements NewFeed {
    @IsString()
    public name: string;
    @IsString()
    public url: string;
}
