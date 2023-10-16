import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleSigninButtonModule, SocialLoginModule} from "@abacritt/angularx-social-login";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserInterface} from "../model/user.interface";

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
  authenticatedUser: UserInterface | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authenticatedUser.subscribe(user => {
      this.authenticatedUser = user;
      if(this.authenticatedUser !== null) {
        this.router.navigate(['/']);
      }
    })
  }

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
