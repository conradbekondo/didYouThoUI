import { Component, HostBinding, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideListChecks } from '@ng-icons/lucide';

type MenuItem = {
  label: string;
  icon: string;
  path: string;
  notifications?: number;
}

@Component({
  selector: 'dy-side-menu',
  viewProviders: [
    provideIcons({
      lucideLayoutDashboard, lucideListChecks
    })
  ],
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    NgIcon
  ],
  template: `
    <div class="p-2 flex" [class.justify-center]="!isOpen">
      <a routerLink="/">
        <img alt="brand" priority ngSrc="/favicon.ico" width="40" height="40"/>
      </a>
    </div>
    <div class="px-2 overflow-y-auto">
      <ul class="flex flex-col gap-3 list-none">
        @for (item of menuItems; track $index) {
          <li class="flex items-center" [class.justify-center]="!isOpen">
            <a [routerLink]="item.path" routerLinkActive="text-accent-foreground"
               [routerLinkActiveOptions]="{exact: false}" class="flex items-center gap-2 text-accent-foreground/50">
              <ng-icon [name]="item.icon" size="25"/>
              @if (isOpen) {
                <span>{{ item.label }}</span>
              }
            </a>
          </li>
        }
      </ul>
    </div>
    <div class="bg-green-500 py-2">
      test
    </div>
  `,
  styleUrl: './side-menu.css'
})
export class SideMenu {
  readonly menuItems: MenuItem[] = [
    { label: 'Overview', icon: 'lucideLayoutDashboard', path: 'overview' },
    { label: 'Tasks', icon: 'lucideListChecks', path: 'all' }
  ]

  @HostBinding('attr.expanded')
  isOpen = false;

  @HostListener('mouseover')
  onMouseOver() {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isOpen = false
  }
}
