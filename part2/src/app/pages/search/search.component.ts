import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  keyword = '';
  showPopular = false;

  items = [
    { name: 'Laptop', popular: true },
    { name: 'Keyboard', popular: false },
    { name: 'Monitor', popular: true },
    { name: 'Mouse', popular: false },
    { name: 'Headphones', popular: true }
  ];

  get filteredItems() {
    let list = this.showPopular ? this.items.filter(i => i.popular) : this.items;
    return list.filter(i =>
      i.name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}