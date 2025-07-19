import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'dy-auth',
  imports: [RouterOutlet, Footer],
  template: `
    <div class="container lg:max-w-140 space-y-3">
      <router-outlet/>
      <div>
        <dy-footer/>
      </div>
    </div>
  `,
  styleUrl: './auth.layout.css'
})
export class AuthLayout {
}
