import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark mb-4" *ngIf="api.isLoggedIn()">
      <div class="container">
        <a class="navbar-brand" href="#">App</a>
        <div class="navbar-nav me-auto">
          <a class="nav-link" routerLink="/books">Böcker</a>
          <a class="nav-link" routerLink="/quotes">Citat</a>
        </div>
        <button class="btn btn-outline-light me-2" (click)="toggleDarkMode()">
          <i class="fa" [ngClass]="isDark ? 'fa-sun-o' : 'fa-moon-o'"></i>
        </button>
        <button class="btn btn-danger" (click)="api.logout()">Logga ut</button>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  isDark = false;
  constructor(public api: ApiService) {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      this.isDark = true;
      if(typeof document !== 'undefined') document.body.classList.add('dark-mode');
    }
  }
  toggleDarkMode() {
    this.isDark = !this.isDark;
    if(typeof document !== 'undefined') document.body.classList.toggle('dark-mode', this.isDark);
    if(typeof localStorage !== 'undefined') localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}