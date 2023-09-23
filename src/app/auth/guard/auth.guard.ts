import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};

@Injectable({providedIn: 'root'})
export class AuthGuard{

  user$: Observable<SocialUser> = this.authService.authState;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user != null) {
        this.loggedIn = true;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedIn;
  }
}
