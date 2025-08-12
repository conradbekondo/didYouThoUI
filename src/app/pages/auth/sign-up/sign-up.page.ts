import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFingerprint, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@spartan-ng/brain/forms';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmErrorDirective, HlmFormFieldComponent } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'dy-sign-up',
  viewProviders: [
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
    RouterLink,
    BrnSelectImports,
    HlmSelectImports
  ],
  templateUrl: './sign-up.page.html',
  styleUrl: './sign-up.page.css'
})
export class SignUpPage {
  protected route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly signingUp = signal(false);

  altAuthMethods = [
    { label: 'Google', icon: 'bootstrapGoogle', handler: this.doGoogleSignIn.bind(this) },
    { label: 'Passkey', icon: 'bootstrapFingerprint', handler: this.doPasskeySignIn.bind(this) },
  ];

  private doPasskeySignIn() {
    alert('Feature coming soon!');
  }

  private doGoogleSignIn() {
    alert('Feature coming soon!');
  }

  readonly form = new FormGroup({
    role: new FormControl<string | null>(null, Validators.required),
    // username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { name, password, email, role } = this.form.value;
    this.signingUp.set(true);
    this.authService.emailSignUp(email!, password!,  name!, [role!]).subscribe({
      error: (e: Error) => {
        this.signingUp.set(false);
        toast.error('Could not sign up', { description: e.message })
      },
      complete: () => {
        this.signingUp.set(false);
        this.router.navigate(['..', 'login'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
      }
    });
  }
}
