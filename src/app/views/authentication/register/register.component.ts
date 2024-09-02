import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public username: string = '';
  public email: string = '';
  public phone: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(
    private _authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public register(): void {
    const form = { username: this.username, email: this.email, phone: this.phone, password: this.password, confirmPassword: this.confirmPassword };

    this._authenticationService.register(form).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('register failed', error);
      }
    );
  }
}
