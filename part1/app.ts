/*
Author: Shen Jingyi
Student ID: 24832643
Unit Code: PROG2005
Assessment: A2 - Part 1 (TypeScript Inventory System)
File Function: Implement product addition, data validation and responsive design.
Date: 2026/4/8
*/
import { InventoryService } from './inventory.service.js';
import type { Item } from './item.interface.js';

const inventoryService = new InventoryService();

function init() {
    render();
    refreshList();
}

function render() {
    const app = document.getElementById('app')!;
    app.innerHTML = `
        <div class="form-container">
            <h3>Add / Edit / Delete Item</h3>
            <input id="itemId" placeholder="Item ID (e.g. ITEM001)" />
            <input id="itemName" placeholder="Item Name" />
            <select id="category">
                <option value="">-- Select Category --</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Clothing</option>
                <option>Tools</option>
                <option>Miscellaneous</option>
            </select>
            <input id="quantity" type="number" placeholder="Quantity" min="1" />
            <input id="price" type="number" placeholder="Price" min="0.01" step="0.01" />
            <input id="supplierName" placeholder="Supplier Name" />
            <select id="stockStatus">
                <option value="">-- Select Stock Status --</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
            </select>
            <label><input id="isPopular" type="checkbox" /> Popular Item</label>
            <input id="comment" placeholder="Comment (optional)" />
            <div class="btn-row">
                <button onclick="addItem()">Add Item</button>
                <button onclick="updateItem()">Update Item</button>
                <button onclick="deleteItem()">Delete Item</button>
            </div>
        </div>

        <div class="search-container">
            <h3>Search Items</h3>
            <input id="search" placeholder="Search by name..." oninput="search()" />
            <button onclick="refreshList()">Show All</button>
            <button onclick="showPopular()">Show Popular</button>
        </div>

        <div id="list"></div>
    `;
}

function refreshList(items?: Item[]) {
    const data = items || inventoryService.getAllItems();
    const list = document.getElementById('list')!;
    if (data.length === 0) {
        list.innerHTML = '<p>No items in inventory</p>';
        return;
    }
    list.innerHTML = data.map(i => `
        <div class="card">
            <h4>${i.itemName}</h4>
            <p>ID: ${i.itemId}</p>
            <p>Category: ${i.category}</p>
            <p>Qty: ${i.quantity} | Price: $${i.price.toFixed(2)}</p>
            <p>Supplier: ${i.supplierName}</p>
            <p>Stock: ${i.stockStatus}</p>
            <p>Popular: ${i.isPopular ? 'YES' : 'NO'}</p>
            ${i.comment ? `<p>Note: ${i.comment}</p>` : ''}
        </div>
    `).join('');
}

(window as any).refreshList = refreshList;

(window as any).addItem = () => {
    const itemIdEl = document.getElementById('itemId') as HTMLInputElement;
    const itemNameEl = document.getElementById('itemName') as HTMLInputElement;
    const categoryEl = document.getElementById('category') as HTMLSelectElement;
    const quantityEl = document.getElementById('quantity') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const supplierNameEl = document.getElementById('supplierName') as HTMLInputElement;
    const stockStatusEl = document.getElementById('stockStatus') as HTMLSelectElement;

    const requiredFields = [
        { el: itemIdEl, name: 'Item ID' },
        { el: itemNameEl, name: 'Item Name' },
        { el: categoryEl, name: 'Category' },
        { el: quantityEl, name: 'Quantity' },
        { el: priceEl, name: 'Price' },
        { el: supplierNameEl, name: 'Supplier Name' },
        { el: stockStatusEl, name: 'Stock Status' }
    ];

    const empty = requiredFields.find(f => !f.el.value.trim());
    if (empty) {
        showMessage(`Error: ${empty.name} cannot be empty`, 'error');
        empty.el.focus();
        return;
    }

    const qty = Number(quantityEl.value);
    const price = Number(priceEl.value);

    if (qty <= 0 || isNaN(qty)) {
        showMessage('Error: Quantity must be > 0', 'error');
        quantityEl.focus();
        return;
    }

    if (price <= 0 || isNaN(price)) {
        showMessage('Error: Price must be > 0', 'error');
        priceEl.focus();
        return;
    }

    const item: Item = {
        itemId: itemIdEl.value.trim(),
        itemName: itemNameEl.value.trim(),
        category: categoryEl.value as Item['category'], // 👈 加类型
        quantity: qty,
        price: price,
        supplierName: supplierNameEl.value.trim(),
        stockStatus: stockStatusEl.value as Item['stockStatus'], // 👈 加类型
        isPopular: (document.getElementById('isPopular') as HTMLInputElement).checked,
        comment: (document.getElementById('comment') as HTMLInputElement).value.trim() || undefined
    };

    inventoryService.addItem(item);
    refreshList();
};

(window as any).updateItem = () => {
    const name = (document.getElementById('itemName') as HTMLInputElement).value.trim();
    if (!name) {
        showMessage('Error: Enter item name to update', 'error');
        return;
    }

    const data = {
        category: (document.getElementById('category') as HTMLSelectElement).value as Item['category'], // 👈 加类型
        quantity: Number((document.getElementById('quantity') as HTMLInputElement).value),
        price: Number((document.getElementById('price') as HTMLInputElement).value),
        supplierName: (document.getElementById('supplierName') as HTMLInputElement).value.trim(),
        stockStatus: (document.getElementById('stockStatus') as HTMLSelectElement).value as Item['stockStatus'], // 👈 加类型
        isPopular: (document.getElementById('isPopular') as HTMLInputElement).checked,
        comment: (document.getElementById('comment') as HTMLInputElement).value.trim() || undefined
    };

    inventoryService.editItemByName(name, data);
    refreshList();
};

(window as any).deleteItem = () => {
    const name = (document.getElementById('itemName') as HTMLInputElement).value.trim();
    if (!name) {
        showMessage('Error: Enter item name to delete', 'error');
        return;
    }
    if (!confirm(`Confirm delete: ${name}?`)) return;
    inventoryService.deleteItemByName(name);
    refreshList();
};

(window as any).search = () => {
    const keyword = (document.getElementById('search') as HTMLInputElement).value.trim();
    refreshList(inventoryService.searchByName(keyword));
};

(window as any).showPopular = () => {
    refreshList(inventoryService.getPopularItems());
};

function showMessage(text: string, type: 'success' | 'error') {
    const el = document.getElementById('message')!;
    el.textContent = text;
    el.className = type;
    setTimeout(() => el.textContent = '', 3500);
}

init();