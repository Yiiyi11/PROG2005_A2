import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../inventory';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  newItem: Item = {
    itemId: '',
    itemName: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: 'In Stock',
    isPopular: false,
    comment: ''
  };
  items: Item[] = [];
  searchKeyword = '';

  constructor(private inventoryService: InventoryService) {
    this.loadAllItems();
  }

  loadAllItems() {
    this.items = this.inventoryService.getItems();
  }

  showPopularItems() {
    this.items = this.inventoryService.getPopularItems();
  }

  onSearch() {
    this.items = this.inventoryService.searchByName(this.searchKeyword);
  }

  addItem() {
    if (!this.newItem.itemName || !this.newItem.itemId) {
      alert('Please fill in Item ID and Item Name!');
      return;
    }
    this.inventoryService.addItem({ ...this.newItem });
    this.loadAllItems();
    this.newItem = {
      itemId: '',
      itemName: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: 'In Stock',
      isPopular: false,
      comment: ''
    };
  }

  deleteItem(name: string) {
    this.inventoryService.deleteItemByName(name);
    this.loadAllItems();
  }
}