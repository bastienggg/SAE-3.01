import { getRequest } from '../lib/api-request.js';

let ProductData = {};

let fakeProducts = [
    {
        id_produit: 1,
        nom: "Robe_jean",
        description: "Blallalalalla",
        id_categorie: 1,
        prix: 35,
        image: "https://static.zara.net/assets/public/d5bd/c93e/b27b47839d27/fbc5d2c2b1fd/04365284401-015-a1/04365284401-015-a1.jpg?ts=1726825163884&w=264&f=auto",
        stock: "350",
        couleur: "Bleu",
        taille: "S"
    },
    {
        id_produit: 2,
        nom: "Sac à seau épaule",
        description: "Ce mangifizfuafzayf_azç_f_ahfiaf",
        id_categorie: 3,
        prix: 95,
        image: "https://static.zara.net/assets/public/c74c/9793/e73047e2a74b/4a665fb0cfb9/16111410800-p/16111410800-p.jpg?ts=1728994290928&w=563&f=auto",
        stock: "15",
        couleur: "Noir"
    },
    {
        id_produit: 3,
        nom: "Sweat à capuche ",
        "description": "Sweat à capuche confectionné en coton avec intérieur gratté. Col à capuche réglable et manches longues. Poche kangourou sur le devant. Finitions côtelées.",
        id_categorie: 2,
        prix: 39.95,
        image: "https://static.zara.net/assets/public/b99a/efc3/0bb74402a055/871ecab95fd4/04393350800-p/04393350800-p.jpg?ts=1723039663442&w=750&f=auto",
        stock: "25",
        couleur: "Noir",
        taille: "M"
    },
    {
        id_produit: 4,
        nom: "Sweat à capuche ",
        description: "Sweat à capuche confectionné en coton avec intérieur gratté. Col à capuche réglable et manches longues. Poche kangourou sur le devant. Finitions côtelées.",
        id_categorie: 2,
        prix: 39.95,
        image: "https://static.zara.net/assets/public/b99a/efc3/0bb74402a055/871ecab95fd4/04393350800-p/04393350800-p.jpg?ts=1723039663442&w=750&f=auto",
        stock: "25",
        couleur: "Noir",
        taille: "S"
    },
    {
        id_produit: 5,
        nom: "Sweat à capuche",
        description: "Sweat à capuche confectionné en coton avec intérieur gratté. Col à capuche réglable et manches longues. Poche kangourou sur le devant. Finitions côtelées.",
        id_categorie: 2,
        prix: 39.95,
        image: "https://static.zara.net/assets/public/1571/653f/1cbd4c4e9279/bb36cf270934/04393350807-p/04393350807-p.jpg?ts=1722954832207&w=750&f=auto",
        stock: "65",
        couleur: "Gris",
        taille: "M"
    },
    {
        id_produit: 8,
        nom: "Robe_jean",
        description: "Blallalalalla",
        id_categorie: 1,
        prix: 35,
        image: "https://static.zara.net/assets/public/d5bd/c93e/b27b47839d27/fbc5d2c2b1fd/04365284401-015-a1/04365284401-015-a1.jpg?ts=1726825163884&w=264&f=auto",
        stock: "350",
        couleur: "Vert",
        taille: "S"
    }
];

ProductData.fetch = async function (id) {
    let data = await getRequest('products/' + id);
    return data == false ? fakeProducts.pop() : [data];
}

ProductData.fetchAll = async function () {
    let data = await getRequest('products');
    if (data === false) {
        const uniqueProducts = fakeProducts.reduce((acc, product) => {
            if (!acc.some(p => p.nom.trim() === product.nom.trim())) {
                acc.push(product);
            }
            return acc;
        }, []);
        return uniqueProducts;
    }
    return data;
}

ProductData.search = async function (searchString) {
    let data = await getRequest('products?search=' + encodeURIComponent(searchString)); // This is not a real API endpoint
    if (data === false) {
        const searchLower = searchString.toLowerCase();
        const filteredProducts = fakeProducts.filter(product =>
            product.nom.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.couleur.toLowerCase().includes(searchLower)
        );
        const uniqueProducts = filteredProducts.reduce((acc, product) => {
            if (!acc.some(p => p.nom.trim() === product.nom.trim())) {
                acc.push(product);
            }
            return acc;
        }, []);
        return uniqueProducts;
    }
    const uniqueData = data.reduce((acc, product) => {
        if (!acc.some(p => p.nom.trim() === product.nom.trim())) {
            acc.push(product);
        }
        return acc;
    }, []);
    return uniqueData;
}

ProductData.fetchByCategory = async function (categoryId) {
    let data = await getRequest('products?category=' + categoryId); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product => product.id_categorie === categoryId);
        const uniqueProducts = filteredProducts.reduce((acc, product) => {
            if (!acc.some(p => p.nom.trim() === product.nom.trim())) {
                acc.push(product);
            }
            return acc;
        }, []);
        return uniqueProducts;
    }
    return data;
}

ProductData.fetchSizesByName = async function (productName) {
    let data = await getRequest('products?name=' + encodeURIComponent(productName)); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product => product.nom.trim() === productName.trim());
        const sizesAndNames = filteredProducts.map(product => ({ taille: product.taille, nom: product.nom })).filter(p => p.taille !== undefined);
        if (sizesAndNames.length === 0) {
            return [];
        }
        return [...new Set(sizesAndNames.map(s => s.taille))].map(taille => {
            const product = sizesAndNames.find(p => p.taille === taille);
            return { taille, nom: product.nom };
        }); // Return unique sizes with product names as objects
    }
    const sizesAndNames = data.map(product => ({ taille: product.taille, nom: product.nom })).filter(p => p.taille !== undefined);
    if (sizesAndNames.length === 0) {
        return [];
    }
    return [...new Set(sizesAndNames.map(s => s.taille))].map(taille => {
        const product = sizesAndNames.find(p => p.taille === taille);
        return { taille, nom: product.nom };
    }); // Return unique sizes with product names as objects
}

ProductData.fetchByNameAndColor = async function (productName, productColor) {
    let data = await getRequest(`products?name=${encodeURIComponent(productName)}&color=${encodeURIComponent(productColor)}`); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product =>
            product.nom.trim() === productName.trim() && product.couleur.trim() === productColor.trim()
        );
        return filteredProducts.length > 0 ? filteredProducts[0] : null;
    }
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

ProductData.fetchSizesByNameAndColor = async function (productName, productColor) {
    let data = await getRequest(`products?name=${encodeURIComponent(productName)}&color=${encodeURIComponent(productColor)}`); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product =>
            product.nom.trim() === productName.trim() && product.couleur.trim() === productColor.trim()
        );
        const sizes = filteredProducts.map(product => product.taille).filter(taille => taille !== undefined);
        return sizes.map(taille => ({ taille }));
    }
    const sizes = data.map(product => product.taille).filter(taille => taille !== undefined);
    return sizes.map(taille => ({ taille }));
}

ProductData.fetchByNameAndSize = async function (productName, productSize) {
    let data = await getRequest(`products?name=${encodeURIComponent(productName)}&size=${encodeURIComponent(productSize)}`); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product =>
            product.nom.trim() === productName.trim() && product.taille.trim() === productSize.trim()
        );
        return filteredProducts.length > 0 ? filteredProducts[0] : null;
    }
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}


ProductData.fetchColorsByName = async function (productName) {
    let data = await getRequest('products?name=' + encodeURIComponent(productName)); // This is not a real API endpoint
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product => product.nom.trim() === productName.trim());
        const colorsAndNames = filteredProducts.map(product => ({ couleur: product.couleur, nom: product.nom }));
        return [...new Set(colorsAndNames.map(c => c.couleur))].map(couleur => {
            const product = colorsAndNames.find(p => p.couleur === couleur);
            return { couleur, nom: product.nom };
        }); // Return unique colors with product names as objects
    }
    const colorsAndNames = data.map(product => ({ couleur: product.couleur, nom: product.nom }));
    return [...new Set(colorsAndNames.map(c => c.couleur))].map(couleur => {
        const product = colorsAndNames.find(p => p.couleur === couleur);
        return { couleur, nom: product.nom };
    }); // Return unique colors with product names as objects
}

ProductData.fetchById = async function (id) {
    let data = await getRequest('products/' + id);
    if (data === false) {
        const filteredProducts = fakeProducts.filter(product => product.id_produit === id);
        return filteredProducts;
    }
    return data;
}
export { ProductData };
