import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface AggregatesStory {
  _id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class AggregatesService {
  constructor(private http: HttpClient) {}

  public stories(): Observable<AggregatesStory[]> {
    return this.http.get<AggregatesStory[]>((`${environment.apiUrl}/aggregates/stories`));
  }
}