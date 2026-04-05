import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  id: number | null = null;
  name = '';
  qty: number | null = null;
  popular = false;
  message = '';
  isError = false;

  constructor(public itemService: ItemService) {}

  add() {
    this.message = '';
    this.isError = false;

    if (this.id === null || this.id <= 0 || !this.name.trim() || this.qty === null || this.qty < 0) {
      this.message = '❌ Error: Please fill in all required fields correctly!';
      this.isError = true;
      return;
    }

    if (this.itemService.isIdExists(this.id)) {
      this.message = '❌ Error: Item ID already exists!';
      this.isError = true;
      return;
    }

    this.itemService.addItem({
      id: this.id,
      name: this.name.trim(),
      qty: this.qty,
      popular: this.popular
    });

    this.message = '✅ Item added successfully!';
    this.id = null;
    this.name = '';
    this.qty = null;
    this.popular = false;
  }

  delete(id: number) {
    if (confirm('⚠ Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id);
      this.message = '✅ Item deleted successfully!';
    }
  }
}