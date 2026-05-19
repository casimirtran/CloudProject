import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Mina Citat (Max 5)</h2>
    <div class="mb-3 d-flex gap-2">
      <input class="form-control" placeholder="Citat" [(ngModel)]="current.text" [disabled]="items.length >= 5 && !current.id">
      <button class="btn btn-success" (click)="save()" [disabled]="isLoading || (items.length >= 5 && !current.id)">
        <i class="fa fa-spinner fa-spin" *ngIf="isLoading"></i> Spara
      </button>
    </div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let q of items">
        <span>{{q.text}}</span>
        <div>
          <button class="btn btn-sm btn-warning me-2" (click)="edit(q)">Redigera</button>
          <button class="btn btn-sm btn-danger" (click)="delete(q.id)">Radera</button>
        </div>
      </li>
    </ul>
  `
})
export class QuotesComponent implements OnInit {
  items: any[] = [];
  current: any = { text: '' };
  isLoading = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }
  load() { this.api.getQuotes().subscribe(res => this.items = res); }
  save() {
    if(!this.current.text) return;
    this.isLoading = true;
    const req = this.current.id ? this.api.updateQuote(this.current.id, this.current) : this.api.addQuote(this.current);
    req.subscribe({
      next: () => { this.load(); this.current = {text: ''}; this.isLoading = false; },
      error: () => { alert('Max 5 citat!'); this.isLoading = false; }
    });
  }
  edit(q: any) { this.current = {...q}; }
  delete(id: number) { this.api.deleteQuote(id).subscribe(() => this.load()); }
}