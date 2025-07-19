import { Component, inject } from '@angular/core';
import { NgxFuzzyTextComponent } from '@omnedia/ngx-fuzzy-text';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { Location } from '@angular/common';

@Component({
  selector: 'dy-not-found',
  imports: [NgxFuzzyTextComponent, RouterLink, HlmButtonDirective],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css'
})
export class NotFoundPage {
  readonly location = inject(Location);
}
