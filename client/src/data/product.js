import { getRequest } from '../lib/api-request.js';


let ProductData = {};

let fakeProducts = [
    {
        id: 1,
        nom: "Product 1",
        prix: 100,
        image: "https://static.zara.net/assets/public/e371/e00e/5721491ba928/40d8e059580d/00840333406-e1/00840333406-e1.jpg?ts=1726567034981&w=449&f=auto"
    },
    {
        id: 2,
        nom: "Product 2",
        prix: 200,
        image: "https://static.zara.net/assets/public/b2e9/3381/253a4bf9b773/59264b30f398/01966900490-e1/01966900490-e1.jpg?ts=1728403173574&w=449&f=auto"
    },
    {
        id: 3,
        nom: "Product 3",
        prix: 300,
        image: "https://static.zara.net/assets/public/e404/de35/631c4def9fd4/457f5238335e/03692900401-e1/03692900401-e1.jpg?ts=1728403170556&w=449&f=auto"
    },
    {
        id: 4,
        nom: "Product 4",
        prix: 200,
        image: "https://static.zara.net/assets/public/bd26/60c0/70d049a4bc2d/df7cba1ba7b7/03332310712-e1/03332310712-e1.jpg?ts=1727185921481&w=449&f=auto"
    },
    {
        id: 5,
        nom: "Product 5",
        prix: 100,
        image: "https://static.zara.net/assets/public/d8b3/f1ca/10d547369907/431d97e56137/06516398800-e1/06516398800-e1.jpg?ts=1726834130348&w=449&f=auto"
    }
];

ProductData.fetch = async function (id) {
    let data = await getRequest('products/' + id);
    return data == false ? fakeProducts.pop() : [data];
}

ProductData.fetchAll = async function () {
    let data = await getRequest('products');
    return data == false ? fakeProducts : data;
}

// ProductData.fetchAll = async function () {
//     return fakeProducts;
// };




export { ProductData };
