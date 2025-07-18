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
import { bootstrapFingerprint, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'dy-login',
  providers: [
    provideIcons({
      bootstrapGoogle,
      bootstrapFingerprint
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
  readonly signingIn = signal(false);

  private doPasskeySignIn() {
    console.log('passkey sign in');
  }

  private doGoogleSignIn() {
    console.log('google sign in')
  }

  altAuthMethods = [
    { label: 'Google', icon: 'bootstrapGoogle', handler: this.doGoogleSignIn.bind(this) },
    { label: 'Passkey', icon: 'bootstrapFingerprint', handler: this.doPasskeySignIn.bind(this) },
  ];

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required])
  });

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.signingIn.set(true);
    const { username, password } = this.form.value;
    this.authService.login(username!, password!).subscribe({
      error: (e: Error) => {
        toast.error('Could not sign in', { description: e.message });
        this.signingIn.set(false);
      },
      complete: () => {
        this.signingIn.set(false);
        const redirect = decodeURIComponent(this.route.snapshot.queryParamMap.get('continue') ?? '/');
        this.router.navigate([redirect]);
      }
    })
  }
}
