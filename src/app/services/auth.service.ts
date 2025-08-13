import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { extractHttpError } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  signOut() {
    return this.http.post(`${environment.apiBaseUrl}/auth/signout`, {}).pipe(
      catchError(extractHttpError)
    )
  }

  credentialSignIn(email: string, password: string) {
    return this.http.post(`${environment.apiBaseUrl}/auth/signin`, {
      email: email,
      password: password
    }).pipe(
      catchError(extractHttpError)
    );
  }

  emailSignUp(email: string, password: string, name: string, role: string[]) {
    return this.http.post(`${environment.apiBaseUrl}/auth/signup`, {
      name: name,
      email: email,
      password: password,
      role: role
    }).pipe(
      catchError(extractHttpError)
    );
  }
}
