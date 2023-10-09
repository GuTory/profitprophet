import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule, SocialUser
} from "@abacritt/angularx-social-login";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    SocialLoginModule,
    HttpClientModule,
    RouterOutlet,
    GoogleSigninButtonModule
  ],
  providers: [],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  accessToken: string = '';
  user$: Observable<SocialUser> = this.authService.authState;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, private router: Router) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user != null) {
        this.loggedIn = true;
      }
    });
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(){
    this.authService.signOut();
  }
}
