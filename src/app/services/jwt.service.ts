import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { isDefined } from '@angular/compiler/src/util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient) { }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {
    localStorage.removeItem('access_token');

    if (username in environment.fakeCreds && environment.fakeCreds[username].pw === password) {
      localStorage.setItem('access_token', environment.fakeCreds[username].token);
      console.log('---jwt token---', environment.fakeCreds[username].token);
      return true;
    }

    return false;

    // return this.httpClient.post<{ access_token: string }>('http://www.jinkiescosmo.com/auth/login', { username, password }).pipe(tap(res => {
    //   console.log('---jwt token---', res.access_token);
    //   localStorage.setItem('access_token', res.access_token);
    // }))
  }

  register(username: string, password: string) {
    return this.httpClient.post<{ access_token: string }>('http://www.jinkiescosmo/auth/register', { username, password }).pipe(tap(res => {
      this.login(username, password);
    }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
