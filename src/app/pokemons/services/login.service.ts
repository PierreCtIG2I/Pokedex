import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginFormat} from '../models/LoginFormat';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth/login';
  refreshUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth/refresh';
  loginResponse?: LoginFormat;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<LoginFormat> {
    return this.http.post<LoginFormat>(this.loginUrl, {email, password});
  }

  isConnected(): boolean {
    return this.loginResponse?.access_token != null;
  }

  getAccessToken(): string {
    return this.loginResponse.access_token;
  }

  getRefreshToken(): string {
    return this.loginResponse.refresh_token;
  }

  refresh(): boolean {
    if (this.getRefreshToken() !== null) {
      this.http.post<LoginFormat>(this.refreshUrl, {
        refresh_token: this.getRefreshToken()
      }).pipe(tap(response => {
        this.loginResponse = response;
      }));
      return true;
    }
    return false;
  }
}
