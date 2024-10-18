import { getRequest } from '../lib/api-request.js';


let CatégorieData = {};

let fakeCategories = [
    {
        id: 1,
        nom: "Jean",
    },
    {
        id: 2,
        nom: "Robe",
    },
    {
        id: 3,
        nom: "Sac",
    }
];

CatégorieData.fetch = async function (id) {
    let data = await getRequest('categories' + id);
    return data == false ? fakeCategories.pop() : [data];
}

CatégorieData.fetchAll = async function () {
    let data = await getRequest('categories');
    return data == false ? fakeCategories : data;
}

// ProductData.fetchAll = async function () {
//     return fakeProducts;
// };




export { CatégorieData };
