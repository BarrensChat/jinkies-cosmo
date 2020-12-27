import { Injectable } from '@angular/core';
import { AppConstants } from '@constants/app-constants';
import { HttpRequestService } from '@services/http-request.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private hs: HttpRequestService) { }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {

    localStorage.removeItem('access_token');

    return this.hs.postRequest('auth/login', {email: username, password: password}).pipe(tap(res => {

      if(!res || !res.error) {
        console.log('jwt token ->', res, res.access_token);
        localStorage.setItem('access_token', res.access_token);
      }

    }))

    //USE FOR FAKE CREDENTIALS BEFORE SETTING UP BACKEND/DEVOPS
    // if (username in environment.fakeCreds && environment.fakeCreds[username].pw === password) {
    //   localStorage.setItem('access_token', environment.fakeCreds[username].token);
    //   console.log('---jwt token---', environment.fakeCreds[username].token);
    //   return true;
    // }

    // return false;
  }

  register(username: string, password: string) {
    // return this.httpClient.post<{ access_token: string }>(AppConstants.API_ENDPOINT +'auth/register', { username, password }).pipe(tap(res => {
    //   console.log('User ', username, ' has been registered');
    //   this.login(username, password);
    // }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
