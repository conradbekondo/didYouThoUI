import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dy-auth',
  imports: [RouterOutlet],
  template: `
    <div class="container lg:max-w-140">
      <router-outlet/>
    </div>
  `,
  styleUrl: './auth.layout.css'
})
export class AuthLayout {
}
