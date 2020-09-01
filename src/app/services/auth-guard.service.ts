import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  //TODO: implement a user jwt token or some kind of user auth
  constructor(private router:Router, private JwtService: JwtService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canAccessCosmo();
  }

  canAccessCosmo(): boolean {

    //TODO: actually validate the jwt
    if(!this.JwtService.loggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
    

}
