import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row justify-content-center mt-5">
      <div class="col-md-4">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">{{ isLogin ? 'Logga in' : 'Skapa konto' }}</h3>
            <div class="mb-3">
              <label>Användarnamn</label>
              <input type="text" class="form-control" [(ngModel)]="user.username">
            </div>
            <div class="mb-3">
              <label>Lösenord</label>
              <input type="password" class="form-control" [(ngModel)]="user.passwordHash">
            </div>
            <button class="btn btn-primary w-100 mb-3" (click)="submit()" [disabled]="isLoading">
              <i class="fa fa-spinner fa-spin me-2" *ngIf="isLoading"></i>
              {{ isLogin ? 'Logga in' : 'Skapa konto' }}
            </button>
            <button class="btn btn-link w-100" (click)="isLogin = !isLogin" [disabled]="isLoading">
              {{ isLogin ? 'Inget konto? Skapa här' : 'Har du konto? Logga in' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  user = { username: '', passwordHash: '' };

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    if (!this.user.username || !this.user.passwordHash) return;
    this.isLoading = true;
    
    if (this.isLogin) {
      this.api.login(this.user).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/books']);
        },
        error: () => { alert('Fel inloggning'); this.isLoading = false; }
      });
    } else {
      this.api.register(this.user).subscribe({
        next: () => { alert('Konto skapat! Logga in.'); this.isLogin = true; this.isLoading = false; },
        error: () => { alert('Namnet är upptaget'); this.isLoading = false; }
      });
    }
  }
}