import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bootstrapFingerprint, bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { dispatch } from '@ngxs/store';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@spartan-ng/brain/forms';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmErrorDirective, HlmFormFieldComponent } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { CredentialSignIn } from '@state/auth/actions';
import { toast } from 'ngx-sonner';
import { z } from 'zod';
import { environment } from '../../../../environments/environment.development';
import { isActionLoading } from '../../../../utils';

const FormSchema = z.object({
  email: z.email(),
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
  private router = inject(Router);
  readonly signingIn = isActionLoading(CredentialSignIn);
  private credentialSignIn = dispatch(CredentialSignIn);

  private doPasskeySignIn() {
    alert('Feature coming soon!');
  }

  private doGoogleSignIn() {
    location.href = `${environment.apiBaseUrl}/oauth2/authorization/google`;
  }

  private doGitHubSignIn() {
    location.href = `${environment.apiBaseUrl}/oauth2/authorization/github`;
  }

  oauthMethods = [
    { label: 'Google', icon: 'bootstrapGoogle', handler: this.doGoogleSignIn.bind(this) },
    { label: 'Passkey', icon: 'bootstrapFingerprint', handler: this.doPasskeySignIn.bind(this) },
    { label: 'GitHub', icon: 'bootstrapGithub', handler: this.doGitHubSignIn.bind(this) }
  ];

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { email, password } = FormSchema.parse(this.form.value);
    this.credentialSignIn(email, password).subscribe({
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
