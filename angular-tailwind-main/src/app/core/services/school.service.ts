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

  //* Section
  addSection(section: any) {
    return this.http.post<any>(this.baseURL + 'section', section);
  }

  deleteSection(id: any) {
    return this.http.delete<any>(this.baseURL + 'section/' + id);
  }

  getSection() {
    return this.http.get<any>(this.baseURL + 'section').pipe((s) => s);
  }

  assignSection(id: any, coordinatorId: any) {
    return this.http.put<any>(this.baseURL + 'section/assign/' + id, coordinatorId).pipe((s) => s);
  }

  getSpecificSection(sectionName: string) {
    return this.http.get<any>(this.baseURL + 'section/' + sectionName).pipe((s) => s);
  }

  addGroup(gr: any) {
    return this.http.post<any>(this.baseURL + 'group', gr);
  }

  addTeam(team: any) {
    return this.http.post<any>(this.baseURL + 'teams', team);
  }

  assignTeam(id: any, student: any) {
    return this.http.put<any>(this.baseURL + 'teams/assign/' + id, student).pipe((s) => s);
  }


  deleteTeam(id: any) {
    return this.http.delete<any>(this.baseURL + 'teams/' + id).pipe((s) => s);
  }
  
}
