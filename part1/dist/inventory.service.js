export class InventoryService {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        if (!item.itemId || !item.itemName || !item.category ||
            isNaN(item.quantity) || item.quantity <= 0 ||
            isNaN(item.price) || item.price <= 0 || !item.supplierName) {
            this.showMessage('Error: All required fields must be valid!', 'error');
            return false;
        }
        const idExists = this.items.some(i => i.itemId === item.itemId);
        if (idExists) {
            this.showMessage('Error: Item ID already exists!', 'error');
            return false;
        }
        this.items.push(item);
        this.showMessage('Success: Item added!', 'success');
        return true;
    }
    editItemByName(itemName, updatedData) {
        const index = this.items.findIndex(i => i.itemName.toLowerCase() === itemName.toLowerCase());
        if (index === -1) {
            this.showMessage('Error: Item not found!', 'error');
            return false;
        }
        this.items[index] = Object.assign(Object.assign({}, this.items[index]), updatedData);
        this.showMessage('Success: Item updated!', 'success');
        return true;
    }
    deleteItemByName(itemName) {
        const initialLength = this.items.length;
        this.items = this.items.filter(i => i.itemName.toLowerCase() !== itemName.toLowerCase());
        if (this.items.length < initialLength) {
            this.showMessage('Success: Item deleted!', 'success');
            return true;
        }
        this.showMessage('Error: Item not found!', 'error');
        return false;
    }
    searchByName(keyword) {
        return this.items.filter(i => i.itemName.toLowerCase().includes(keyword.toLowerCase()));
    }
    getAllItems() {
        return [...this.items];
    }
    getPopularItems() {
        return this.items.filter(i => i.isPopular);
    }
    showMessage(text, type) {
        const msgEl = document.getElementById('message');
        if (msgEl) {
            msgEl.textContent = text;
            msgEl.className = type;
            setTimeout(() => msgEl.textContent = '', 3500);
        }
    }
}
