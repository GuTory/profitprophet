import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SidenavDirective} from "../shared/directive/sidenav/sidenav.directive";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, SidenavDirective, MatInputModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  ticker = new FormControl('');
  constructor() { }
  searchTicker(){
  }
}
