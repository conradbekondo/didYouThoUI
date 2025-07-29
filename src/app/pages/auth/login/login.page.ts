import { Component, inject, signal } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HlmErrorDirective, HlmFormFieldComponent } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@spartan-ng/brain/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFingerprint, bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { toast } from 'ngx-sonner';
import { environment } from '../../../../environments/environment';
import { actionMatcher, dispatch } from '@ngxs/store';
import { isActionLoading } from '../../../../utils';
import { CredentialSignIn } from '@state/auth/actions';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string(),
  password: z.string()
})

@Component({
  selector: 'dy-login',
  viewProviders: [
    provideIcons({
      bootstrapGoogle,
      bootstrapFingerprint,
      bootstrapGithub
    }),
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  imports: [
    NgIcon,
    HlmCardImports,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    ReactiveFormsModule,
    HlmFormFieldComponent,
    HlmErrorDirective,
    HlmInputDirective,
    HlmButtonDirective,
    RouterLink
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {
  protected route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly signingIn = isActionLoading(CredentialSignIn);
  private credentialSignIn = dispatch(CredentialSignIn);

  private doPasskeySignIn() {
    alert('Feature coming soon!');
  }

  private doGoogleSignIn() {
    location.href = `${environment.apiOrigin}/oauth2/authorization/google`;
  }

  private doGitHubSignIn() {
    location.href = `${environment.apiOrigin}/oauth2/authorization/github`;
  }

  oauthMethods = [
    { label: 'Google', icon: 'bootstrapGoogle', handler: this.doGoogleSignIn.bind(this) },
    { label: 'Passkey', icon: 'bootstrapFingerprint', handler: this.doPasskeySignIn.bind(this) },
    { label: 'GitHub', icon: 'bootstrapGithub', handler: this.doGitHubSignIn.bind(this) }
  ];

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required])
  });

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { username, password } = FormSchema.parse(this.form.value);
    this.credentialSignIn(username, password).subscribe({
      error: (e: Error) => {
        toast.error('Could not sign in', { description: e.message });
      },
      complete: () => {
        const redirect = decodeURIComponent(this.route.snapshot.queryParamMap.get('continue') ?? '/');
        this.router.navigate([redirect]);
      }
    })
  }
}
