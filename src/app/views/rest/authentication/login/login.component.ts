import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication.service";
import { Router } from '@angular/router';
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public isLoading: boolean = false
  public isPasswordVisible: boolean = false;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _alertService: AlertService
  ) {}
  public login(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    const form = { email: this.email, password: this.password };

    this._authenticationService.login(form, {
      next: () => {
        this.isLoading = false;
        this._router.navigate(['/jobs']);
      },
      error: (error) => {
        this.isLoading = false;
        this._alertService.errorToast(error.error);
      },
    });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
