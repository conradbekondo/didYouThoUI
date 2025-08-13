import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { AuthStateModel } from "../../../types";
import { AuthService } from '../../services/auth.service';
import { CompleteGithubSignIn, CredentialSignIn, SignedIn, SignedOut, SignOut } from './actions';
import { LoginResponseSchema, PrincipalSchema } from '../../../schemas';
import { patch } from '@ngxs/store/operators';
import { map, tap } from "rxjs";
import { Navigate } from "@ngxs/router-plugin";
import { jwtDecode } from 'jwt-decode';

export const AUTH_STATE = new StateToken<AuthStateModel>('auth');
type Context = StateContext<AuthStateModel>;

@State({
  name: AUTH_STATE,
})
@Injectable()
export class AuthState {
  private readonly authService = inject(AuthService);

  @Action(SignOut, { cancelUncompleted: true })
  onSignOut(ctx: Context) {
    return this.authService.signOut().pipe(
      tap(() => ctx.dispatch(SignedOut))
    )
  }

  @Action(SignedOut, { cancelUncompleted: true })
  onSignedOut(ctx: Context) {
    ctx.setState({});
    ctx.dispatch(new Navigate(['/']));
    location.reload();
  }

  @Action(CredentialSignIn, { cancelUncompleted: true })
  onCredentialSignIn(ctx: Context, { email, password }: CredentialSignIn) {
    return this.authService.credentialSignIn(email, password).pipe(
      map(response => LoginResponseSchema.parse(response)),
      tap(({ userInfo, provider, expiresAt }) => ctx.setState(patch({
        sessionExpiresAt: expiresAt,
        userInfo,
        provider
      }))),
      tap(() => ctx.dispatch(SignedIn))
    )
  }

  @Action(CompleteGithubSignIn, { cancelUncompleted: true })
  onGitHubSignIn(ctx: Context, { jwt }: CompleteGithubSignIn) {
    const payload = jwtDecode(jwt) as any;
    if (payload.exp === undefined) throw new Error('Token is invalid');
    
    // Extract user info from the loginResponse in the JWT payload
    const loginResponse = payload.loginResponse;
    if (!loginResponse || !loginResponse.userInfo) {
      throw new Error('Invalid token structure');
    }
    
    const userInfo = PrincipalSchema.parse(loginResponse.userInfo);
    ctx.setState(patch({
      token: jwt,
      userInfo,
      provider: 'GITHUB',
      sessionExpiresAt: new Date(payload.exp * 1000)
    }));
    ctx.dispatch(SignedIn);
  }
}

// export * from './actions';

