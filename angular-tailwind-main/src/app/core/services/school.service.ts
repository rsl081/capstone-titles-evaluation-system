import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private baseURL = environment.apiUrl;
  schoolUpdateNeeded = new Subject<{}>();

  constructor(private http: HttpClient) {}

  getSchoolYear() {
    return this.http.get<any>(this.baseURL + 'school').pipe((s) => s);
  }

  getSpecificSchoolYear(year: string) {
    return this.http.get<any>(this.baseURL + 'school/' + year).pipe((s) => s);
  }

  addSchoolYear(schoolYear: any) {
    return this.http.post<any>(this.baseURL + 'school', schoolYear);
  }

  addSection(section: any) {
    return this.http.post<any>(this.baseURL + 'section', section);
  }
  
  deleteSection(id: any) {
    return this.http.delete<any>(this.baseURL + 'section/' + id);
  }

}
