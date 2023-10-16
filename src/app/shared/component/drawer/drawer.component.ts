import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidenavDirective} from "../../directive/sidenav/sidenav.directive";
import {MatInputModule} from "@angular/material/input";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/service/auth.service";
import {UserInterface} from "../../../auth/model/user.interface";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, SidenavDirective, MatInputModule, FormsModule],
  providers: [AuthService],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  ticker = new FormControl('');
  authenticatedUser: UserInterface | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.authenticatedUser.pipe(takeUntilDestroyed()).subscribe((user: UserInterface | null) => {
      this.authenticatedUser = user;
    });
  }

  searchTicker() {
    this.router.navigate(['searchticker/', this.ticker.value?.toUpperCase()])
  }

  logStatusText(): string {
    return this.authenticatedUser ? 'Logout' : 'Login';
  }

  loginOrLogout() {
    if (this.authenticatedUser) {
      this.authService.signOut();
      this.authenticatedUser = null;
    } else {
      this.router.navigate(['auth']);
    }
  }
}
