import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) return true;
  inject(Router).navigate(['/login']);
  return false;
};