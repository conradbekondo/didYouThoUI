import { Component } from '@angular/core';
import { SideMenu } from '../../components/side-menu/side-menu';
import { TopMenu } from '../../components/top-menu/top-menu';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'dy-task-layout',
  imports: [
    SideMenu,
    TopMenu,
    RouterOutlet,
    Footer
  ],
  template: `
    <div class="hidden lg:block col-start-1 col-span-1 row-start-1 row-span-4 border border-y-0 border-l-0 border-muted">
      <dy-side-menu/>
    </div>
    <div class="lg:col-start-2 col-start-1 col-span-1 row-start-1 row-span-1">

    </div>
    <div class="lg:col-start-2 col-start-1 col-span-1 row-start-2 row-span-1 border border-x-0 border-t-0 border-muted">
      <dy-top-menu/>
    </div>
    <main class="overflow-y-auto lg:col-start-2 col-start-1 col-span-1 row-start-3 row-span-1">
      <router-outlet/>
    </main>
    <div class="lg:col-start-2 col-start-1 col-span-1 row-start-4 row-span-1 border border-x-0 border-b-0 border-muted p-2">
      <dy-footer/>
    </div>
  `,
  styleUrl: './task.layout.css'
})
export class TaskLayout {

}
