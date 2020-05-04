import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoonQuizService } from './moon-quiz.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  //TODO: implement a user jwt token or some kind of user auth
  constructor(private MoonQuizService:MoonQuizService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canGoToRoute(); //route.params.quizAnswer -- could use a param
  }
  
  canGoToRoute(): boolean {
    return this.MoonQuizService.getHasUserAnsweredCorrectly();
  }
    

}
