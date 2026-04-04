import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  qty: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  name = '';
  qty = 1;
  items: Item[] = [
    { id: 1, name: 'Laptop', qty: 10, status: 'In Stock' },
    { id: 2, name: 'Monitor', qty: 5, status: 'Low Stock' },
    { id: 3, name: 'Mouse', qty: 0, status: 'Out of Stock' }
  ];

  addItem() {
    if (!this.name.trim() || this.qty < 1) return;
    const newItem: Item = {
      id: Date.now(),
      name: this.name.trim(),
      qty: this.qty,
      status: this.qty > 0 ? 'In Stock' : 'Out of Stock'
    };
    this.items.push(newItem);
    this.name = '';
    this.qty = 1;
  }

  deleteItem(item: Item) {
    if (confirm(`Delete ${item.name}?`)) {
      this.items = this.items.filter(i => i.id !== item.id);
    }
  }
}