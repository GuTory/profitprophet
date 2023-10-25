import {inject, Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of, Subject, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpClient} from '@angular/common/http';
import {mapSocialUserToUserInterface, UserInterface} from "../model/user.interface";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authService = inject(SocialAuthService);
  private router = inject(Router);
  private http = inject(HttpClient)

  authenticatedUser: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);
  accessToken: string = '';

  constructor() {
    this.authService.authState.pipe(takeUntilDestroyed()).subscribe((user: SocialUser | null) => {
      this.authenticateUser(user).subscribe((returnedUser: UserInterface | null) => {
        this.authenticatedUser.next(returnedUser);
      });
    });
  }

  authenticateUser(user: SocialUser | null): Observable<UserInterface | null> {
    if (user === null){
      return of(null);
    }
    const userInstance = mapSocialUserToUserInterface(user);
    return this.http.post<UserInterface>(environment.localBackendBaseUrl + environment.authenticationUrl, userInstance);
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  async refreshToken(): Promise<void> {
    return await this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut();
  }
}
