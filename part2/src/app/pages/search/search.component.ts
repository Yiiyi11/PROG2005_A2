import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  keyword = '';
  showPopularOnly = false;

  constructor(public itemService: ItemService) {}

  get filteredItems() {
    let list = this.showPopularOnly
      ? this.itemService.items.filter(i => i.popular)
      : this.itemService.items;

    return list.filter(i =>
      i.name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}