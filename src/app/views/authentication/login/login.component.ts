import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import { Router } from '@angular/router';

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

  constructor(
    private _authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public login(): void {
    const form = { email: this.email, password: this.password };

    this._authenticationService.login(form).subscribe(
      (response) => {
        this.router.navigate(['/jobs']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
