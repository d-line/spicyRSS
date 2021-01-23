import { IsDefined, IsUrl } from 'class-validator';

export interface Feed {
  name: string;
  url: string;
  status?: number;
  lastFetched?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FeedUrl {
  @IsDefined()
  @IsUrl()
  url: string;
}
