import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '@constants/app-constants';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';


  // You can define an interface say 'Config' and have the response data
  // map according to the interface structure in the component or service call below
  // this.configService.getConfig()
  // .subscribe((data: Config) => this.config = { ...data });
  //

  // Then you can do something like:
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

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  getRequest(endpointPath: string): Observable<any> {

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

      return this.http.post(AppConstants.API_ENDPOINT + endpointPath, payload, httpOptions).pipe(
        retry(AppConstants.API_REQUEST_RETRY_COUNT),
        catchError((res) => this.handleError(res)) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      console.error( `Backend returned code ${error.status}, body was: `, error.error);

        if (error.status === 401) {
          //TODO: add different colors for the snackbars (preferably in the service created for them)

            // TODO: This is throwing undefined and needs to be fixed

            // this.snackBar.open('Try logging in again', 'Unauthorized', {
            //   duration: 2500,
            //   horizontalPosition: 'center',
            //   verticalPosition: 'top',
            // });
            // const router = injector.get(Router);
            // router.navigate(['/login']);
            // this.router.navigate(['/']);

        }
    }
    // Return an observable with a user-facing error message.
    return of(error);
  }


}
