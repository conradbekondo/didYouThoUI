import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { dispatch } from '@ngxs/store';
import { CompleteGithubSignIn } from '@state/auth/actions';
import { toast } from 'ngx-sonner';
import { switchMap } from 'rxjs';

@Component({
  selector: 'dy-github-callback',
  imports: [],
  template: `
    <p class="text-2xl font-bold">{{ msg() }}</p>
  `,
  styleUrl: './github-callback.page.css'
})
export class GithubCallbackPage implements OnInit {
  private readonly title = inject(Title);
  readonly msg = signal(this.title.getTitle());
  private route = inject(ActivatedRoute);
  private navigateFn = dispatch(Navigate);
  private completeSignIn = dispatch(CompleteGithubSignIn)

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.completeSignIn(token).pipe(
        switchMap(() => this.navigateFn(['/tasks/overview']))
      ).subscribe({
        error: (e: Error) => {
          toast.error('Could not sign you in', { description: e.message });
        }
      });
    }
  }
}
