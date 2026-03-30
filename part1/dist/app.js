import { InventoryService } from './inventory.service.js';
const inventoryService = new InventoryService();
function init() {
    render();
    refreshList();
}
function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="form-container">
            <h3>Add New Item</h3>
            <input id="itemId" placeholder="Item ID" />
            <input id="itemName" placeholder="Item Name" />
            <select id="category">
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Clothing</option>
                <option>Tools</option>
                <option>Miscellaneous</option>
            </select>
            <input id="quantity" type="number" placeholder="Quantity" />
            <input id="price" type="number" placeholder="Price" />
            <input id="supplierName" placeholder="Supplier Name" />
            <select id="stockStatus">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
            </select>
            <label><input id="isPopular" type="checkbox" /> Popular</label>
            <input id="comment" placeholder="Comment (optional)" />
            <div class="btn-row">
                <button onclick="addItem()">Add</button>
                <button onclick="updateItem()">Update</button>
                <button onclick="deleteItem()">Delete</button>
            </div>
        </div>

        <div class="search-container">
            <h3>Search</h3>
            <input id="search" placeholder="Search by name" oninput="search()" />
            <button onclick="refreshList()">Show All</button>
            <button onclick="showPopular()">Show Popular</button>
        </div>

        <div id="list"></div>
    `;
}
function refreshList(items) {
    const data = items || inventoryService.getAllItems();
    const list = document.getElementById('list');
    if (data.length === 0) {
        list.innerHTML = '<p>No items</p>';
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
// Global functions
window.addItem = () => {
    const item = {
        itemId: document.getElementById('itemId').value.trim(),
        itemName: document.getElementById('itemName').value.trim(),
        category: document.getElementById('category').value,
        quantity: Number(document.getElementById('quantity').value),
        price: Number(document.getElementById('price').value),
        supplierName: document.getElementById('supplierName').value.trim(),
        stockStatus: document.getElementById('stockStatus').value,
        isPopular: document.getElementById('isPopular').checked,
        comment: document.getElementById('comment').value.trim() || undefined
    };
    inventoryService.addItem(item);
    refreshList();
};
window.updateItem = () => {
    const name = document.getElementById('itemName').value.trim();
    if (!name)
        return alert('Enter item name');
    const data = {
        category: document.getElementById('category').value,
        quantity: Number(document.getElementById('quantity').value),
        price: Number(document.getElementById('price').value),
        supplierName: document.getElementById('supplierName').value.trim(),
        stockStatus: document.getElementById('stockStatus').value,
        isPopular: document.getElementById('isPopular').checked,
        comment: document.getElementById('comment').value.trim() || undefined
    };
    inventoryService.editItemByName(name, data);
    refreshList();
};
window.deleteItem = () => {
    const name = document.getElementById('itemName').value.trim();
    if (!name)
        return alert('Enter item name');
    inventoryService.deleteItemByName(name);
    refreshList();
};
window.search = () => {
    const keyword = document.getElementById('search').value.trim();
    refreshList(inventoryService.searchByName(keyword));
};
window.showPopular = () => {
    refreshList(inventoryService.getPopularItems());
};
init();
