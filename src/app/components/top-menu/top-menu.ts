import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideSearch } from '@ng-icons/lucide'
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'dy-top-menu',
  viewProviders: [
    provideIcons({
      lucideSearch,
      lucideBell
    })
  ],
  imports: [
    NgIcon,
    HlmButtonDirective
  ],
  template: `
    <p class="font-extrabold text-2xl">{{ title.getTitle() }}</p>
    <div class="inline-flex items-center gap-3">
      @for (action of actions; track $index) {
        <button [title]="action.tooltip" (click)="action.handler()" class="text-muted-foreground" hlmBtn variant="ghost"
                size="icon">
          <ng-icon [name]="action.icon" size="20"/>
        </button>
      }
    </div>
  `,
  styleUrl: './top-menu.css'
})
export class TopMenu {
  readonly title = inject(Title);

  private onNotificationActionTriggered() {
    alert('Coming soon');
  }

  private onSearchActionTriggered() {
    alert('Coming soon');
  }

  readonly actions = [
    { tooltip: 'Search', handler: this.onSearchActionTriggered.bind(this), icon: 'lucideSearch' },
    { tooltip: 'Notifications', handler: this.onNotificationActionTriggered.bind(this), icon: 'lucideBell' },
  ];
}
