import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient) { }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  login(username: string, password: string) {

    const fakeCreds = {
      sonic: {
        pw: 'dankeykang',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiV2hpc2tleSIsIlN1cm5hbWUiOiJEaWNrIiwiUm9sZSI6WyJDb250ZW50IENyZWF0b3IiLCJBZG1pbiJdfQ.wRkwxHYSJPrNIhYUlt_DfkKBXnr1fOaEKbePjupOHe8'
      },
      mario: {
        pw: 'shrek',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiQ3JvbmRsaW4iLCJTdXJuYW1lIjoiSm9uZXMiLCJSb2xlIjpbIkNvbnRlbnQgQ3JlYXRvciIsIkFkbWluIl19.KCFpaIzTC2EXStcA3kX_LUNaVC6x0tcat1O2nkwpq_U'
      },
      link: {
        pw: 'jarjarbinks',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiUnVwZXJ0IiwiU3VybmFtZSI6IlN0ZWFseW9naXJsIiwiUm9sZSI6WyJDb250ZW50IENyZWF0b3IiLCJBZG1pbiJdfQ.FDh58r3eWMzMqBAlaZySRiAvdE7jNSYqz5pmUU93O94'
      },
      kirby: {
        pw: 'misspiggy',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiQWx0cmlnaHQiLCJTdXJuYW1lIjoiSmVycnkiLCJSb2xlIjpbIkNvbnRlbnQgQ3JlYXRvciIsIkFkbWluIl19.KJjh0q49orxYGGLtT7Bgpc5Qh3Tr5rN3QWAPQwjb_vA'
      }
    }

    if (username in fakeCreds && fakeCreds[username].pw === password) {
      localStorage.setItem('access_token', fakeCreds[username].token);
      console.log('---jwt token---', fakeCreds[username].token);
      return true;
    }
    
    return false;

    // return this.httpClient.post<{ access_token: string }>('http://www.your-server.com/auth/login', { username, password }).pipe(tap(res => {
    //   console.log('---jwt token---', res.access_token);
    //   localStorage.setItem('access_token', res.access_token);
    // }))
  }

  register(username: string, password: string) {
    return this.httpClient.post<{ access_token: string }>('http://www.your-server.com/auth/register', { username, password }).pipe(tap(res => {
      this.login(username, password)
    }))
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}