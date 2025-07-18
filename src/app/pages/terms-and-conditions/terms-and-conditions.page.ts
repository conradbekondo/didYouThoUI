import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { Location } from '@angular/common';

@Component({
  selector: 'dy-terms-and-conditions',
  viewProviders: [
    provideIcons({
      lucideArrowLeft
    })
  ],
  imports: [
    HlmButtonDirective,
    NgIcon
  ],
  templateUrl: './terms-and-conditions.page.html',
  styleUrl: './terms-and-conditions.page.css'
})
export class TermsAndConditionsPage {
  private location = inject(Location);

  onBackButtonClicked() {
    this.location.back();
  }
}
