import { NgOptimizedImage } from '@angular/common';
import { Component, HostBinding, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight, lucideLayoutDashboard, lucideListChecks, lucideLock } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

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
      lucideLayoutDashboard,
      lucideListChecks,
      lucideLock,
      lucideChevronLeft,
      lucideChevronRight
    })
  ],
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    NgIcon,
    HlmButtonDirective
  ],
  template: `
    <div class="p-2 flex" [class.justify-center]="!isOpen">
      <a routerLink="/" class="flex items-center gap-3">
        <img alt="brand" priority ngSrc="/favicon.ico" width="35" height="35"/>
        @if(isOpen) {
          <span class="text-2xl font-bold">Did You Tho?</span>
        }
      </a>
    </div>
    <div class="px-2 overflow-y-auto">
      <ul class="flex flex-col gap-3 list-none">
        @for (item of menuItems; track $index) {
          <li class="flex items-center justify-center rounded-md px-1 py-2" [class.justify-center]="!isOpen">
            <a [routerLink]="item.path" routerLinkActive="active-route"
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
    <div class="relative flex px-2" [class.justify-center]="!isOpen">
      <button (click)="isOpen = !isOpen" hlmBtn class="rounded-full absolute -top-9 -right-5 bg-accent dark:bg-accent" size="sm"
              variant="outline">
        <ng-icon [name]="isOpen ? 'lucideChevronLeft' : 'lucideChevronRight'" size="10"/>
      </button>
      <button [title]="isOpen ? '' : 'Sign out'" class="flex w-full" (click)="onSignOutButtonClicked()" hlmBtn [size]="isOpen ? 'sm' : 'icon'" variant="outline">
        <ng-icon name="lucideLock" size="20"/>
        @if(isOpen) {
          <span>Sign Out</span>
        }
      </button>
    </div>
  `,
  styleUrl: './side-menu.css'
})
export class SideMenu {
  readonly signOut = output();
  readonly menuItems: MenuItem[] = [
    { label: 'Overview', icon: 'lucideLayoutDashboard', path: 'overview' },
    { label: 'Tasks', icon: 'lucideListChecks', path: 'all' }
  ];

  @HostBinding('attr.expanded')
  isOpen = false;

  onSignOutButtonClicked() {
    this.signOut.emit();
  }
}
