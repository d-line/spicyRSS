import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from './story';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private router: Router, private http: HttpClient) {}

  public unread(): Observable<Story[]> {
    return this.http.get<Story[]>((`${environment.apiUrl}/news`));
  }
}
