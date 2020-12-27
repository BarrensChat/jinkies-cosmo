import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'auth-token'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  getRequest(endpointPath: string) {

    // If there are CORS problems opt to using jsonp
    return this.http.get(AppConstants.API_ENDPOINT + endpointPath)
      .pipe(
        retry(AppConstants.API_REQUEST_RETRY_COUNT), // retry a failed request up to API_REQUEST_RETRY_COUNT times
        catchError(this.handleError)
      );
  }

  // body - The data to POST in the body of the request.
  // options` - An object containing method options which, in this case, specify required headers.
  postRequest(endpointPath: string, payload): Observable<any> {

    // return this.http.post<any>(AppConstants.API_ENDPOINT + endpointPath, hero, httpOptions)
    //   .pipe(
    //     catchError(this.handleError('addHero', hero))
    //   );

    console.log('posting ->', httpOptions, 'payload ->', payload);

      return this.http.post(AppConstants.API_ENDPOINT + endpointPath, payload, httpOptions).pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return of(error);
  }


}
