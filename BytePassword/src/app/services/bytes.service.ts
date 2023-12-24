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
/**
 *Retrieve all combo from db
 * @returns
 */
  public retrieveCredentials(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiServiceUrl}/byte/getCredentials`);
  }
/**
 *Get info user from db
 * @returns
 */
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
    console.info('00--=-=-=ssf-==-=->' + info.email);
    const email = info.email;

    return this.http.delete<any>(
      `${this.apiServiceUrl}/byte/deleteCredentials/${email}`
    );
  }
/**
 *ADD pwd, email, hint, ... combo in db
 * @param info
 * @returns
 */
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
/**
 *Verify if pwd & email combo exists
 * @param infoEmail
 * @returns
 */
  public verifyId(infoEmail: string): Observable<any> {
    let emailBody = {
      email: infoEmail,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('==service>', emailBody);

    return this.http.post<any>(
      `${this.apiServiceUrl}/byte/verify_id`,
      emailBody,
      { headers }
    );
  }
  /* **   USER SERVICES ** */

  public registerUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `${this.apiServiceUrl}/byte/register-user`,
      userInfo,
      {
        headers,
      }
    );
  }
/**
 *Logs out user from system
 * @param userInfo
 * @returns
 */
  public logOutUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `${this.apiServiceUrl}/byte/log-out-user`,
      userInfo,
      {
        headers,
      }
    );
  }
/**
 *Give access to user of the system
 * @param userInfo
 * @returns
 */
  public logInUser(userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `${this.apiServiceUrl}/byte/login-user`,
      userInfo,
      {
        headers,
      }
    );
  }
/**
 *utilities
 */
 public reloadPage(){
  window.location.reload()
}

  /**
   * a service to store the logged-in username
   */
  private loggedInUsernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  setLoggedInUsername(username: string): void {
    this.loggedInUsernameSubject.next(username);
  }

  getLoggedInUsername(): Observable<string> {
    return this.loggedInUsernameSubject.asObservable();
  }

  public retrieveEmailById(idToRetrieve: number): Observable<string> {
    return this.retrieveCredentials().pipe(
      map((response: CredTemplate[]) => {
        const userDetails = response.find((item) => item.id === idToRetrieve);
        return userDetails ? userDetails.email : ''; // Return email if found, otherwise an empty string
      })
    );
  }
}
