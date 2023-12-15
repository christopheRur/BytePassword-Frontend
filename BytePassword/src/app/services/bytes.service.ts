import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredTemplate } from '../models/CredTemplate';

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

  public retrieveEncryptInfo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiServiceUrl}/byte/get-info`);
  }
/**
 *Will delete user info from db
 * @param info
 * @returns
 */
  public deleteUserInfo(info: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.info("00--=-=-=ssf-==-=->"+info.email)
    const email=info.email;

    return this.http.delete<any>(
      `${this.apiServiceUrl}/byte/deleteCredentials${email}`, {headers}

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

  public retrieveEmailById(idToRetrieve: number): Observable<string> {
    return this.retrieveCredentials().pipe(
      map((response: CredTemplate[]) => {
        const userDetails = response.find(item => item.id === idToRetrieve);
        return userDetails ? userDetails.email : ''; // Return email if found, otherwise an empty string
      })
    );

  }
}
