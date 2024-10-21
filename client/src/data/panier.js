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

PanierData.deleteById = function (id) {
    const index = this.items.findIndex(item => item.id_produit === id);
    if (index !== -1) {
        this.items.splice(index, 1);
    } else {
        throw new Error('Item not found');
    }
};





export { PanierData };
