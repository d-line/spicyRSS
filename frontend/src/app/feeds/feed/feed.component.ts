import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feed } from '../feed';
import * as moment from 'moment';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input() feed: Feed;
  @Output() closeAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();

  public fetched: string;
  public edit = false;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.feed.isOpened = false;
    this.fetched = moment(this.feed.lastFetched).fromNow();
  }

  public toggle($element: HTMLElement) {
    this.closeAll.emit(this.feed);
    setTimeout(() => {
      $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }, 100);
    this.feed.isOpened = !this.feed.isOpened;
  }

  public remove(feed: Feed) {
    this.feedService.delete(feed._id || '')
      .subscribe(res => {
        this.removed.emit(feed);
      });
  }


  public showEdit() {
    this.edit = true;
  }

  public onCloseForm(feed: Feed) {
    this.feed = feed;
    this.edit = false;
  }
}
