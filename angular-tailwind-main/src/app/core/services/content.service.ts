import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private baseURL = environment.apiUrl;
  contentUpdateNeeded = new Subject<{}>();

  constructor(private http: HttpClient) {}

  getContent() {
    return this.http.get<any>(this.baseURL + 'contents').pipe((s) => s);
  }

  postContent(body: {}) {
    return this.http.post<any>(this.baseURL + 'contents', body).pipe((s) => s);
  }

  editContent(id: any, body: any) {
    return this.http.put<any>(this.baseURL + 'contents/' + id, body).pipe((s) => s);
  }
}
