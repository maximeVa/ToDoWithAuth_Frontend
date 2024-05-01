import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from "rxjs";
import {User} from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any;
  private authToken: string | undefined;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post('/api/login', user)
    .pipe(
      tap((response: any) => {
        this.authToken = response.token;
        this.currentUser = response.user;
      })
    );
  }

  logout(): void {
    this.authToken = '';
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.authToken;
  }

  getUser(): any {
    return this.currentUser;
  }

  hasPermission(permissionName: string): boolean {
    // Implement logic to check user's permissions based on roles or claims
    return true; // Replace with actual permission checking logic
  }
}
