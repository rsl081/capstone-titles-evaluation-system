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
    return this.http.get<IUserRoot>(this.baseURL + 'admin/faculty/all').pipe(map((file) => file.data));
  }

  
  editFaculty(faculty: {}) {
    return this.http.put(this.baseURL + 'admin/faculty/edit', faculty);
  }


}
