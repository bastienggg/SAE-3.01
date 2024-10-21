import { getRequest } from '../lib/api-request.js';




let PanierData = [];

PanierData.add = function (item) {
    if (!this.items) {
        this.items = [];
    }
    this.items.push(item);
};

PanierData.getAll = function () {
    return this.items || [];
};





export { PanierData };
