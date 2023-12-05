import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../auth/service/auth.service";
import {TitleDirective} from "../../shared/directive/title/title.directive";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardViewDirective} from "../../shared/directive/card-view/card-view.directive";
import {ProfileService} from "../service/profile.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TitleDirective, MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, CardViewDirective],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public authService: AuthService = inject(AuthService);
  private profileService: ProfileService = inject(ProfileService);

  public user$ = this.authService.authenticatedUser;
  public money = new FormControl(0);

  uploadMoney() {
    this.profileService.uploadMoney(this.money.value ?? 0).subscribe({
      next: (user) => {
        this.authService.authenticatedUser.next(user);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
