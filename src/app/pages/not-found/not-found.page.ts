import { Component } from '@angular/core';
import { NgxFuzzyTextComponent } from '@omnedia/ngx-fuzzy-text';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'dy-not-found',
  imports: [NgxFuzzyTextComponent, RouterLink, HlmButtonDirective],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css'
})
export class NotFoundPage {

}
