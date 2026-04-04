export class InventoryService {
    constructor() {
        this.items = [
            {
                itemId: 'ITEM001',
                itemName: 'Laptop',
                category: 'Electronics',
                quantity: 15,
                price: 1299.99,
                supplierName: 'TechSupplier Ltd',
                stockStatus: 'In Stock',
                isPopular: true,
                comment: 'Best-selling model'
            },
            {
                itemId: 'ITEM002',
                itemName: 'Office Chair',
                category: 'Furniture',
                quantity: 8,
                price: 199.50,
                supplierName: 'Furniture World',
                stockStatus: 'Low Stock',
                isPopular: false,
                comment: undefined // 👈 改这里
            },
            {
                itemId: 'ITEM003',
                itemName: 'Cotton T-Shirt',
                category: 'Clothing',
                quantity: 50,
                price: 19.99,
                supplierName: 'Fashion Hub',
                stockStatus: 'In Stock',
                isPopular: true,
                comment: 'Summer collection'
            },
            {
                itemId: 'ITEM004',
                itemName: 'Cordless Drill',
                category: 'Tools',
                quantity: 12,
                price: 89.90,
                supplierName: 'ToolMaster',
                stockStatus: 'In Stock',
                isPopular: false,
                comment: undefined // 👈 改这里
            }
        ];
    }
    // 下面所有代码保持不变
    addItem(item) {
        if (!item.itemId || !item.itemName || !item.category ||
            isNaN(item.quantity) || item.quantity <= 0 ||
            isNaN(item.price) || item.price <= 0 || !item.supplierName || !item.stockStatus) {
            this.showMessage('Error: All required fields must be filled and valid!', 'error');
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
        let msgEl = document.getElementById('message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.id = 'message';
            document.body.insertBefore(msgEl, document.getElementById('app'));
        }
        msgEl.textContent = text;
        msgEl.className = type;
        setTimeout(() => msgEl.textContent = '', 3500);
    }
}
