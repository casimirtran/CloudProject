import { Routes } from '@angular/router';
import { AuthComponent } from './auth';
import { BooksComponent } from './books';
import { QuotesComponent } from './quotes';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'books', component: BooksComponent, canActivate: [authGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];