import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JustifileService {
  private baseURL = environment.apiUrl;
  justiUpdateNeeded = new Subject<{}>();

  constructor(private http: HttpClient) {}

  deleteJustFile(id: any) {
    return this.http.delete<any>(this.baseURL + 'justification/' + id);
  }
  
  editJustFile(id: any, body:any) {
    return this.http.put<any>(this.baseURL + 'justification/' + id, body);
  }

}
