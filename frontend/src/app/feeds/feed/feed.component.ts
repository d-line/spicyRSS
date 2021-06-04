import { Component, Input, OnInit } from '@angular/core';
import { Feed } from '../feed';
import * as moment from 'moment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input() feed: Feed;

  public fetched: string;

  constructor() { }

  ngOnInit(): void {
    this.fetched = moment(this.feed.lastFetched).fromNow();
  }

}
