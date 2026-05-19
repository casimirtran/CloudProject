import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Böcker</h2>
    <div class="mb-3 d-flex gap-2">
      <input class="form-control" placeholder="Titel" [(ngModel)]="current.title">
      <input class="form-control" placeholder="Författare" [(ngModel)]="current.author">
      <button class="btn btn-success" (click)="save()" [disabled]="isLoading">
        <i class="fa fa-spinner fa-spin" *ngIf="isLoading"></i> Spara
      </button>
    </div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let b of items">
        <span>{{b.title}} - {{b.author}}</span>
        <div>
          <button class="btn btn-sm btn-warning me-2" (click)="edit(b)">Redigera</button>
          <button class="btn btn-sm btn-danger" (click)="delete(b.id)">Radera</button>
        </div>
      </li>
    </ul>
  `
})
export class BooksComponent implements OnInit {
  items: any[] = [];
  current: any = { title: '', author: '' };
  isLoading = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }
  load() { this.api.getBooks().subscribe(res => this.items = res); }
  save() {
    if(!this.current.title) return;
    this.isLoading = true;
    const req = this.current.id ? this.api.updateBook(this.current.id, this.current) : this.api.addBook(this.current);
    req.subscribe(() => { this.load(); this.current = {title: '', author: ''}; this.isLoading = false; });
  }
  edit(b: any) { this.current = {...b}; }
  delete(id: number) { this.api.deleteBook(id).subscribe(() => this.load()); }
}