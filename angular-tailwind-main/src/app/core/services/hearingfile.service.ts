import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HearingfileService {
  
  private baseURL = environment.apiUrl;
  hearingFileUpdateNeeded = new Subject<{}>();

  constructor(private http: HttpClient) {}

  deleteHearing(id: any) {
    return this.http.delete<any>(this.baseURL + 'hearing/' + id);
  }

  editHearingFile(id: any, body: any) {
    return this.http.put<any>(this.baseURL + 'hearing/' + id, body);
  }

}
