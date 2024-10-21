import { getRequest } from '../lib/api-request.js';




let PanierData = [];

PanierData.add = function (item) {
    if (typeof item === 'object' && item !== null) {
        this.push(item);
    } else {
        throw new Error('Item must be an object');
    }
};

PanierData.getAll = function () {
    return [...this];
};





export { PanierData };
