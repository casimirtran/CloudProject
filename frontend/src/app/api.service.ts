import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      setInterval(() => this.http.get(`${this.baseUrl}/auth/wake-up`).subscribe(), 60000);
    }
  }

  register(user: any) { return this.http.post(`${this.baseUrl}/auth/register`, user); }
  login(user: any) { return this.http.post(`${this.baseUrl}/auth/login`, user); }
  logout() { 
    if (typeof localStorage !== 'undefined') localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
  isLoggedIn() { 
    return typeof localStorage !== 'undefined' ? !!localStorage.getItem('token') : false; 
  }

  getBooks() { return this.http.get<any[]>(`${this.baseUrl}/books`); }
  addBook(book: any) { return this.http.post(`${this.baseUrl}/books`, book); }
  updateBook(id: number, book: any) { return this.http.put(`${this.baseUrl}/books/${id}`, book); }
  deleteBook(id: number) { return this.http.delete(`${this.baseUrl}/books/${id}`); }

  getQuotes() { return this.http.get<any[]>(`${this.baseUrl}/quotes`); }
  addQuote(quote: any) { return this.http.post(`${this.baseUrl}/quotes`, quote); }
  updateQuote(id: number, quote: any) { return this.http.put(`${this.baseUrl}/quotes/${id}`, quote); }
  deleteQuote(id: number) { return this.http.delete(`${this.baseUrl}/quotes/${id}`); }
}