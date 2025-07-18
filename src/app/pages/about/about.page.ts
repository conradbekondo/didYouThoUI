import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Location } from '@angular/common';
import { lucideArrowLeft } from '@ng-icons/lucide';

@Component({
  selector: 'dy-about',
  viewProviders: [
    provideIcons({
      lucideArrowLeft
    })
  ],
  imports: [
    HlmButtonDirective,
    NgIcon
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css'
})
export class AboutPage {
  private location = inject(Location);

  onBackButtonClicked() {
    this.location.back();
  }
}
