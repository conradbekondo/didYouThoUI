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
    return this.http.post(`${environment.apiOrigin}/api/auth/signout`, {}).pipe(
      catchError(extractHttpError)
    )
  }

  credentialSignIn(email: string, password: string) {
    return this.http.post(`${environment.apiOrigin}/api/auth/signin`, {
      username: email,
      password
    }).pipe(
      catchError(extractHttpError)
    );
  }

  emailSignUp(email: string, password: string, username: string, name: String, role: string[]) {
    return this.http.post(`${environment.apiOrigin}/api/auth/signup`, {
      username: username,
      name: name,
      email: email,
      password: password,
      role: role
    }).pipe(
      catchError(extractHttpError)
    );
  }
}
