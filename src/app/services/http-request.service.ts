import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '@constants/app-constants';


  // You can define an interface say 'Config' and have the response data
  // map to according to the interface structure in the component or service call below
  // this.configService.getConfig()
  // .subscribe((data: Config) => this.config = { ...data });
  //

  // Then in this service something like:
  //     return this.http.get<Config>(AppConstants.API_ENDPOINT + endpointPath);

  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }

  // these are the defaults - {observe: 'body', responseType: 'json'}


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  getRequest(endpointPath: string) {

    return this.http.get(AppConstants.API_ENDPOINT + endpointPath, { observe: 'response' })
      .pipe(
        retry(AppConstants.API_REQUEST_RETRY_COUNT), // retry a failed request up to 3 times
        catchError(this.handleError)
      );

  }

  // postRequest(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
