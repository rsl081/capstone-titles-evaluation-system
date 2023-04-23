import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject, Subject } from 'rxjs';
import { IUser, IUserRoot } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseURL = environment.apiUrl;
  public currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  userUpdateNeeded = new Subject<{}>();

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(this.baseURL + 'account/login', credentials).pipe(
      map((response: IUser) => {
        let user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  getRole() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);
    return obj.role;
  }

  registerFaculty(values: any) {
    return this.http.post<IUser>(this.baseURL + 'account/faculty/register', values);
  }

  registerStudent(values: any) {
    return this.http.post<IUser>(this.baseURL + 'account/capstone-group/register', values);
  }

  setCurrentUser(user: IUser) {
    if (user !== null) {
      user.role = this.getDecodedToken(user.token).role;
      this.currentUserSource.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }

  totalAdviser() {
    return this.http.get<any>(this.baseURL + 'account/adviser/total').pipe((total) => total);
  }

  totalCoordinator() {
    return this.http.get<any>(this.baseURL + 'account/coordinator/total').pipe((total) => total);
  }

  totalPanel() {
    return this.http.get<any>(this.baseURL + 'account/panel/total').pipe((total) => total);
  }

  totalAdmin() {
    return this.http.get<any>(this.baseURL + 'account/admin/total').pipe((total) => total);
  }

  getAllFaculty() {
    return this.http.get<IUserRoot>(this.baseURL + 'admin/faculty/all').pipe(map((f) => f.data));
  }

  getAllFacultyAdviserAndPanel() {
    return this.http.get<IUserRoot>(this.baseURL + 'admin/faculty-panel-and-adviser/all').pipe(map((f) => f.data));
  }

  getAllAdviserAndPanel() {
    return this.http.get<IUserRoot>(this.baseURL + 'admin/panel-and-adviser/all').pipe(map((f) => f.data));
  }

  //get yung user
  getCurrentUser(id: string) {
    return this.http.get<IUserRoot>(this.baseURL + 'account/get-current-user/' + id).pipe(map((f) => f));
  }

  getAllStudent() {
    return this.http.get<IUserRoot>(this.baseURL + 'admin/student/all').pipe(map((s) => s.data));
  }

  getAllCoordinator() {
    return this.http.get<IUserRoot>(this.baseURL + 'admin/coordinator/all').pipe(map((s) => s.data));
  }

  editFaculty(faculty: {}) {
    return this.http.put(this.baseURL + 'admin/faculty/edit', faculty);
  }

  editRoles(username: any, roles: any) {
    return this.http.put<any>(this.baseURL + 'admin/faculty/edit-roles/' + username + '?roles=' + roles, {});
  }

  resetPassword(body: {}) {
    return this.http.post<any>(this.baseURL + 'account/resetpassword', body);
  }
}
