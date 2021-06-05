import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feed } from '../feed';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed-edit',
  templateUrl: './feed-edit.component.html',
  styleUrls: ['./feed-edit.component.scss']
})
export class FeedEditComponent implements OnInit {
  @Input() feed: Feed;
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();
  public feedForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      name: [this.feed.name, Validators.required],
      url: [this.feed.url, Validators.required],
    });
  }

  public onFormSubmit(): void {
    const id = this.feed._id || '';
    this.feedService.update(id, this.feedForm.value)
      .subscribe((feed: Feed) => this.closeForm.emit(this.feed));
  }
}
