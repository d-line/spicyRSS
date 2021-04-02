import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story } from '../../stories/story';
import { StoryService } from '../story.service';
import { first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import * as striptags from 'striptags';
import { faFacebookSquare, faTwitterSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faBookmark as faBookmarked, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: Story;
  @Output() closeAll: EventEmitter<any> = new EventEmitter<any>();
  
  public iFacebook = faFacebookSquare;
  public iTwitter = faTwitterSquare;
  public iTumblr = faTumblrSquare;
  public iExternalLink = faExternalLinkAlt;
  public iBookmark = faBookmark;
  public iBookmarked = faBookmarked;


  public html = '';

  constructor(
    private storyService: StoryService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.story.isOpened = false;
  }

  public toggle($element: HTMLElement) {
    this.closeAll.emit(this.story);
    setTimeout(() => {
      $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }, 100);
    this.story.isOpened = !this.story.isOpened;
    if (this.story.isOpened) {
      this.html = this.getHtml();
    }

    if (this.story.isOpened && !this.story.keepUnread) {
      this.markAsRead();
    }
  }

  public getHtml() {
    if (!this.isYoutube) {
      return this.story.body;
    }
    let html = `<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${this.youtubeId}" frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>`;
    html = this.sanitizer.bypassSecurityTrustHtml(html) as string;
    return html;
  }

  public get storyLead() {
    return striptags(this.story.body).substr(0, 100);
  }

  public get isYoutube() {
    return this.story.permalink.includes('youtube.com/watch?v=');
  }

  public get youtubeId() {
    if (!this.isYoutube) { return null; }
    return this.story.permalink.substr(-11);
  }

  public get faviconUrl() {
    const url = new URL(this.story.permalink);
    return `${url.origin}/favicon.ico`;
  }

  private markAsRead() {
    this.storyService.markAsRead(this.story).pipe(first())
      .subscribe((res: any) => {
      }, err => {
        console.log(err);
      });
  }

  public toggleKeepUnread() {
    this.story.keepUnread = !this.story.keepUnread;
    this.story.isRead = !this.story.keepUnread;
    this.storyService.update(this.story)
      .subscribe((res: any) => {
      }, err => {
        console.log(err);
      });
  }

  public isToday(pubdate: Date) {
    const today = new Date();
    const date = new Date(pubdate);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

}
