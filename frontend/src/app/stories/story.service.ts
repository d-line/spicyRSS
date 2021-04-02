import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Story } from './story';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private router: Router, private http: HttpClient) {}

  public unread(page = 1): Observable<Story[]> {
    return this.http.get<Story[]>((`${environment.apiUrl}/news?page=${page}`));
  }

  public update(story: Story): Observable<Story> {
    return this.http.put<Story>(`${environment.apiUrl}/stories/${story._id}`, story);
  }

  public markAsRead(story: Story): Observable<Story> {
    if (!story.isRead) {
      story.isRead = true;
      return this.update(story);
    } else {
      return of(story);
    }
  }
}
