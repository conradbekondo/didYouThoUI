import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { extractHttpError } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  emailSigning(email: string, password: string) {
    return this.http.post(`${environment.apiOrigin}/api/auth/signin`, { username: email, password }).pipe(
      catchError(extractHttpError)
    );
  }

  emailSignUp(email: string, password: string, username: string, role: string[]) {
    return this.http.post(`${environment.apiOrigin}/api/auth/signup`, {
      username: username,
      email,
      password,
      role
    }).pipe(
      catchError(extractHttpError)
    );
  }
}
