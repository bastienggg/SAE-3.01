import { getRequest } from '../lib/api-request.js';




let PanierData = {
    items: []
};

PanierData.add = function (item) {
    if (typeof item === 'object' && item !== null) {
        this.items.push(item);
    } else {
        throw new Error('Item must be an object');
    }
};

PanierData.getAll = function () {
    return [...this.items];
};

PanierData.getUniqueItemsWithCount = function () {
    const uniqueItems = [];
    const itemCounts = new Map();

    for (const item of this.items) {
        if (itemCounts.has(item.id_produit)) {
            itemCounts.set(item.id_produit, itemCounts.get(item.id_produit) + 1);
        } else {
            itemCounts.set(item.id_produit, item.nombre || 1);
            uniqueItems.push({ ...item });
        }
    }

    for (const uniqueItem of uniqueItems) {
        uniqueItem.nombre = itemCounts.get(uniqueItem.id_produit);
    }

    return uniqueItems;
};

PanierData.incrementItemCount = function (id_produit) {
    const item = this.items.find(item => item.id_produit === id_produit);
    if (item) {
        item.nombre = (item.nombre || 1) + 1;
    } else {
        throw new Error('Item not found');
    }
};

PanierData.decrementItemCount = function (id_produit) {
    const item = this.items.find(item => item.id_produit === id_produit);
    if (item) {
        if (item.nombre > 1) {
            item.nombre -= 1;
        } else {
            throw new Error('Item count cannot be less than 1');
        }
    } else {
        throw new Error('Item not found');
    }
};

PanierData.deleteById = function (id) {
    const index = this.items.findIndex(item => item.id_produit === id);
    if (index !== -1) {
        this.items.splice(index, 1);
    } else {
        throw new Error('Item not found');
    }
};

PanierData.getTotalPrice = function () {
    let total = 0;
    for (const item of this.items) {
        total += item.prix || 0;
    }
    return total;
};

PanierData.toFormData = function () {
    const formData = new FormData();
    formData.append('items', JSON.stringify(this.items));
    return formData;
}

PanierData.getItemsWithDetailsJSON = function () {
    return JSON.stringify(this.items.map(item => ({
        id_produit: item.id_produit,
        nombre: item.nombre || 1,
        prix: item.prix || 0
    })));
};

PanierData.getItemsWithDetails = function () {
    return this.items.map(item => ({
        id_produit: item.id_produit,
        nombre: item.nombre || 1,
        prix: item.prix || 0
    }));
};


export { PanierData };
