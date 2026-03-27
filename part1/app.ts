import { InventoryService } from './inventory.service.js';
const service = new InventoryService();

const app = document.getElementById('app')!;
app.innerHTML = `
<div class="form">
    <h3>Add New Item</h3>
    <input id="id" placeholder="Item ID" />
    <input id="name" placeholder="Name" />
    <select id="cat">
        <option>Electronics</option><option>Furniture</option><option>Clothing</option><option>Tools</option><option>Miscellaneous</option>
    </select>
    <input id="qty" type="number" placeholder="Quantity" />
    <input id="price" type="number" placeholder="Price" />
    <input id="supp" placeholder="Supplier" />
    <select id="stock">
        <option>In Stock</option><option>Low Stock</option><option>Out of Stock</option>
    </select>
    <label><input id="popular" type="checkbox" /> Popular</label>
    <button onclick="add()">Add Item</button>
</div>
<div id="list"></div>
`;

// 全局 add 函数
(window as any).add = () => {
    const item = {
        itemId: (document.getElementById('id') as HTMLInputElement).value,
        itemName: (document.getElementById('name') as HTMLInputElement).value,
        category: (document.getElementById('cat') as HTMLSelectElement).value as any,
        quantity: Number((document.getElementById('qty') as HTMLInputElement).value),
        price: Number((document.getElementById('price') as HTMLInputElement).value),
        supplierName: (document.getElementById('supp') as HTMLInputElement).value,
        stockStatus: (document.getElementById('stock') as HTMLSelectElement).value as any,
        isPopular: (document.getElementById('popular') as HTMLInputElement).checked
    };
    service.addItem(item);
};