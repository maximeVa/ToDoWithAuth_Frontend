import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user';
import {catchError, throwError} from "rxjs"; // Importez le modèle d'utilisateur si vous l'avez créé

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = { username: '', email: '', password: '' }; // Initialisez un utilisateur vide

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.user)
    .pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        // Affichez un message demurrer à l'utilisateur
        return throwError(error); // Propagez l'erreur pour la gestion ultérieure
      })
    )
    .subscribe(() => {
      // Réussite de la connexion
      console.log('Login successful!');
      // Redirigez l'utilisateur vers la page d'accueil ou une autre page
    });
  }

}
