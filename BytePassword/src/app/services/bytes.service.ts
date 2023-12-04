import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BytesService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public retrieveCredentials(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiServiceUrl}/byte/getCredentials`);
  }

  public retrieveEncryptInfo(country: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiServiceUrl}/byte/get-info`);
  }

  public deleteUserInfo(info: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(
      `${this.apiServiceUrl}/byte/deleteCredentials`,
      info
    );
  }

  public addCredentials(info: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `${this.apiServiceUrl}/byte/addCredentials`,
      info,
      { headers }
    );
  }
  /* **   USER SERVICES ** */




  public registerUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiServiceUrl}/byte/register-user`, userInfo, {
      headers,
    });
  }

  public logOutUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiServiceUrl}/byte/log-out-user`, userInfo, {
      headers,
    });
  }

  public logInUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiServiceUrl}/byte/login-user`, userInfo, {
      headers,
    });
  }
/**
 * a service to store the logged-in username
 */
  private loggedInUsernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setLoggedInUsername(username: string): void {
    this.loggedInUsernameSubject.next(username);
  }

  getLoggedInUsername(): Observable<string> {
    return this.loggedInUsernameSubject.asObservable();
  }

}
