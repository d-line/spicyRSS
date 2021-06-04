import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Feed[]> {
    return this.http.get<Feed[]>((`${environment.apiUrl}/feeds`));
  }
}