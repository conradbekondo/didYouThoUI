import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { AuthStateModel } from "../../../types";
import { AuthService } from '../../services/auth.service';
import { CompleteGithubSignIn, SignedIn } from './actions';
import { jwtDecode } from 'jwt-decode';
import { PrincipalSchema } from '../../../schemas';
import { patch } from '@ngxs/store/operators';

export const AUTH_STATE = new StateToken<AuthStateModel>('auth');
type Context = StateContext<AuthStateModel>;

@State({
  name: AUTH_STATE,
})
@Injectable()
export class AuthState {
  private readonly authService = inject(AuthService);

  @Action(CompleteGithubSignIn, { cancelUncompleted: true })
  onGitHubSignIn(ctx: Context, { jwt }: CompleteGithubSignIn) {
    debugger;
    const payload = jwtDecode(jwt);
    const userInfo = PrincipalSchema.parse(payload);
    if (payload.exp === undefined) throw new Error('Token is invalid');
    ctx.setState(patch({
      token: jwt,
      userInfo,
      provider: 'github',
      sessionExpiresAt: new Date(payload.exp * 1000)
    }));
    ctx.dispatch(SignedIn);
  }
}

// export * from './actions';

