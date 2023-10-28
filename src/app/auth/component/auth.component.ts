import {Component, computed, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleSigninButtonModule, SocialLoginModule} from "@abacritt/angularx-social-login";
import {Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserInterface} from "../model/user.interface";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    SocialLoginModule,
    RouterOutlet,
    GoogleSigninButtonModule
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  authenticatedUser: Signal<UserInterface | null>= computed(() => this.authService.authenticatedUser.value);

  getAccessToken(): void {
    this.authService.getAccessToken();
  }

  async refreshToken() {
    await this.authService.refreshToken();
  }

  async logOut() {
    await this.authService.signOut();
  }
}
