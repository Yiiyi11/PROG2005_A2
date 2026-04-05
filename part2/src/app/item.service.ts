import { Injectable } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  qty: number;
  popular: boolean;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  // ✅ 预设 5 条示例数据（HD 要求）
  items: Item[] = [
    { id: 1, name: 'Laptop', qty: 10, popular: true, status: 'In Stock' },
    { id: 2, name: 'Monitor', qty: 3, popular: true, status: 'Low Stock' },
    { id: 3, name: 'Keyboard', qty: 20, popular: false, status: 'In Stock' },
    { id: 4, name: 'Wireless Mouse', qty: 0, popular: false, status: 'Out of Stock' },
    { id: 5, name: 'Headphones', qty: 7, popular: true, status: 'In Stock' },
  ];

  // 自动计算库存状态
  private getStatus(qty: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 5) return 'Low Stock';
    return 'In Stock';
  }

  // ID 重复验证
  isIdExists(id: number): boolean {
    return this.items.some(item => item.id === id);
  }

  // 添加商品
  addItem(item: Omit<Item, 'status'>) {
    const status = this.getStatus(item.qty);
    this.items.push({ ...item, status });
  }

  // 删除商品
  deleteItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }
}