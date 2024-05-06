import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user';
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user)
    .pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        // Display an error message to the user
        return throwError(error); // Propagate the error for further handling
      })
    )
    .subscribe(() => {
      // Registration successful
      console.log('Registration successful!');
      // Optionally redirect user to login page or inform them of successful registration
    });
  }
}
