import {inject, Injectable} from '@angular/core';
import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {AuthStateModel} from "../../../types";
import {AuthService} from '../../services/auth.service';
import {CompleteGithubSignIn, CredentialSignIn, SignedIn, SignedOut} from './actions';
import {LoginResponseSchema} from '../../../schemas';
import {patch} from '@ngxs/store/operators';
import {map, tap} from "rxjs";
import {Navigate} from "@ngxs/router-plugin";

export const AUTH_STATE = new StateToken<AuthStateModel>('auth');
type Context = StateContext<AuthStateModel>;

@State({
    name: AUTH_STATE,
})
@Injectable()
export class AuthState {
    private readonly authService = inject(AuthService);

    @Action(SignedOut, {cancelUncompleted: true})
    onSignedOut(ctx: Context) {
        ctx.setState({});
        ctx.dispatch(new Navigate(['/']));
    }

    @Action(CredentialSignIn, {cancelUncompleted: true})
    onCredentialSignIn(ctx: Context, {email, password}: CredentialSignIn) {
        return this.authService.credentialSignIn(email, password).pipe(
            map(response => LoginResponseSchema.parse(response)),
            tap(({userInfo, provider, expiresAt}) => ctx.setState(patch({
                sessionExpiresAt: expiresAt,
                userInfo,
                provider
            }))),
            tap(() => ctx.dispatch(SignedIn))
        )
    }

    @Action(CompleteGithubSignIn, {cancelUncompleted: true})
    onGitHubSignIn(ctx: Context, {jwt}: CompleteGithubSignIn) {
        alert('not implemented');
        // const payload = jwtDecode(jwt);
        // const userInfo = PrincipalSchema.parse(payload);
        // if (payload.exp === undefined) throw new Error('Token is invalid');
        // ctx.setState(patch({
        //   token: jwt,
        //   userInfo,
        //   provider: 'github',
        //   sessionExpiresAt: new Date(payload.exp * 1000)
        // }));
        // ctx.dispatch(SignedIn);
    }
}

// export * from './actions';

