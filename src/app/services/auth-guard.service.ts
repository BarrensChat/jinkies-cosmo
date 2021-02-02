import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '@services/jwt.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private router:Router, private JwtService: JwtService, private snackBar: MatSnackBar) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canAccessCosmo();
  }

  canAccessCosmo(): boolean {

    if(!this.JwtService.loggedIn) {
      this.snackBar.open('Try logging in again', 'Unauthorized', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.router.navigate(['/']);
      return false;
    }
    return true;
  }


}
