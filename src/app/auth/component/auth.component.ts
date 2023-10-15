import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {AuthService} from "../service/auth.service";
import {UserInterface} from "../../shared/model/user.interface";

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
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  user$: Observable<SocialUser> = this.authService.user$.pipe(takeUntilDestroyed());
  authenticatedUser: UserInterface | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user$.subscribe(user => {
      this.authService.authenticateUser(user).pipe().subscribe((user: UserInterface | null) => {
        this.authenticatedUser = user;
      });
    })
  }

  getAccessToken(): void {
    this.authService.getAccessToken();
  }

  async refreshToken() {
    await this.authService.refreshToken();
  }

  async logOut(){
    await this.authService.signOut();
  }
}
