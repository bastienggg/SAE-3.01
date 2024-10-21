import { ProductData } from "./data/product.js";
import { CatégorieData } from "./data/categories.js";
import { PanierData } from "./data/panier.js";

import { ProductView } from "./ui/products/index.js";
import { navView } from "./ui/navbar/index.js";
import { MenuBurgerView } from "./ui/menu_burger/index.js";
import { CatégorieView } from "./ui/categories/index.js";
import { CategorieMenueView } from "./ui/categories-burger/index.js";
import { FicheProductView } from "./ui/fiche-product/index.js";
import { FicheProductColorView } from "./ui/fiche-product-color/index.js";
import { FicheProductSizeView } from "./ui/fiche-product-size/index.js";
import { selectionTailleView } from "./ui/popup-panier/index.js";
import { ProductSizeView } from "./ui/product-sizes/index.js";
import { panierView } from "./ui/panier/index.js";
import { ProductPanierView } from "./ui/product-panier/index.js";

let C = {};

// Fonction pour rendre du HTML dans un élément sélectionné par un sélecteur
C.renderHTML = function (selector, html) {
    console.log('Appel de renderHTML avec selector:', selector, 'et html:', html);
    document.querySelector(selector).innerHTML = html;
};

// Fonction pour configurer l'écouteur de clic sur l'élément avec l'ID "delete-from-panier"
C.setupDeleteFromPanierClickListener = function () {
    console.log('Appel de setupDeleteFromPanierClickListener');
    document.querySelectorAll('#delete-from-panier').forEach(function (element) {
        element.addEventListener('click', function () {
            console.log('Élément "delete-from-panier" cliqué');
            // Ajoutez ici le code pour gérer la suppression d'un produit du panier
            let productId = Number(this.dataset.id);
            console.log('ID du produit à supprimer:', productId);
            PanierData.deleteById(productId);

            C.renderHTML("#products-panier", '');

            let panier = PanierData.getAll() || [];
            console.log('Produits du panier:', panier);
            let html2 = ProductPanierView.render(panier);
            C.renderHTML("#products-panier", html2);

            // Reconfigurer les écouteurs de clic après la mise à jour du panier
            C.setupDeleteFromPanierClickListener();
        });
    });
};


// Fonction pour configurer l'écouteur de clic sur l'élément avec l'ID "panier"
C.setupPanierClickListener = function () {
    console.log('Appel de setupPanierClickListener');
    document.getElementById('panier').addEventListener('click', function () {
        console.log('Panier cliqué');
        C.renderHTML("#main-articles", '');
        document.querySelector("#main").style.display = 'none';
        C.renderHTML("#fiche-product", '');
        C.renderHTML(".categorie", '');


        let html = panierView.render();
        C.renderHTML("#panier-container", html);

        let panier = PanierData.getAll() || [];
        console.log('Produits du panier:', panier);
        let html2 = ProductPanierView.render(panier);
        C.renderHTML("#products-panier", html2);

        C.setupDeleteFromPanierClickListener();

    });
};



// Fonction pour configurer l'écouteur de la barre de recherche
C.setupSearchBarListener = function () {
    C.renderHTML("#panier-container", '');
    console.log('Appel de setupSearchBarListener');
    document.getElementById('searchbar').addEventListener('input', async function () {
        let query = this.value;
        console.log('Requête de recherche:', query);
        if (query.length > 0) {
            let results = await ProductData.search(query);
            console.log('Résultats de recherche:', results);
            document.querySelector("#main").style.display = 'none';
            document.querySelector("#fiche-product").innerHTML = '';
            let html = ProductView.render(results);
            C.renderHTML("#panier-container", '');

            C.renderHTML("#main-articles", html);
            C.setupProductClickListener();
        } else {
            C.renderHTML("#panier-container", '');

            C.renderHTML("#main-articles", '');
        }
    });
};

// Fonction pour configurer l'écouteur de clic sur les couleurs
C.setupColorClickListener = function () {
    console.log('Appel de setupColorClickListener');
    document.querySelectorAll('#couleur').forEach(function (element) {
        element.addEventListener('click', async function () {
            let color = this.dataset.clr;
            let name = this.dataset.nom;
            console.log('Couleur cliquée:', color);
            console.log('Nom cliqué:', name);
            let data = await ProductData.fetchByNameAndColor(name, color);
            console.log('Produit récupéré:', data);
            let html = FicheProductView.render(data);
            document.querySelector("#fiche-product").innerHTML = '';
            C.renderHTML("#fiche-product", html);
            C.renderHTML("#panier-container", '');


            let colors = await ProductData.fetchColorsByName(name);
            console.log('Couleurs récupérées:', colors);
            await C.handleProductColors(colors);

            let sizes = await ProductData.fetchSizesByNameAndColor(name, color);
            console.log('Tailles récupérées:', sizes);
            console.log('fetch avec pour paramétre name:', name, 'et color:', color);
            await C.handleProductSizes(sizes);

            C.setupAddButtonPanierListener();

        });
    });
};

// Fonction pour gérer les tailles de produit
C.handleProductSizes = async function (sizes) {
    console.log('Appel de handleProductSizes avec sizes:', sizes);
    let html = FicheProductSizeView.render(sizes);
    C.renderHTML("#fiche-product-size", html);
    C.setupColorClickListener();
};

// Fonction pour gérer les couleurs de produit
C.handleProductColors = async function (colors) {
    console.log('Appel de handleProductColors avec colors:', colors);
    let html = FicheProductColorView.render(colors);
    C.renderHTML("#fiche-product-color", html);
    C.setupColorClickListener();
};

// Fonction pour gérer le clic sur un produit
C.handleProductClick = async function (productId, productName) {
    console.log('Appel de handleProductClick avec productId:', productId, 'et productName:', productName);
    let productData = await ProductData.fetchById(productId);
    console.log('Données du produit récupérées:', productData);
    let html = FicheProductView.render(productData);
    C.renderHTML("#main-articles", '');
    C.renderHTML("#panier-container", '');
    C.renderHTML("#fiche-product", html);

    if (productName) {
        console.log('Récupération des couleurs pour le produit:', productName);
        let colors = await ProductData.fetchColorsByName(productName);
        console.log('Couleurs récupérées:', colors);

        let sizes = await ProductData.fetchSizesByName(productName);
        console.log('Tailles récupérées:', sizes);

        await C.handleProductSizes(sizes);
        await C.handleProductColors(colors);
        C.setupAddButtonPanierListener();
    }
};


// Fonction pour configurer l'écouteur de clic sur l'élément avec l'ID "tailles"
C.setupSizeClickListener = async function () {
    console.log('Appel de setupSizeClickListener');
    document.getElementById('tailles').addEventListener('click', async function (event) {
        let target = event.target;
        if (target && target.dataset.id) {
            console.log('Taille cliquée avec data-id:', target.dataset.id);
            let Id = Number(target.dataset.id);
            let data = await ProductData.fetch(Id);
            data = data ? { ...data } : {};
            console.log('Produit récupéré:', data);

            PanierData.add(data);
            console.log('Produit ajouté au panier:', data);
            console.log(PanierData.getAll());

            document.querySelector("#selection-size").innerHTML = '';
            C.renderHTML("#panier-container", '');

        }
    });
};



// Fonction pour récupérer les tailles disponibles pour une couleur de produit en utilisant l'ID du produit
C.getAvailableSizesByProductId = async function (productName, productColor) {
    console.log('Appel de getAvailableSizesByProductId avec Name', productName + ' et productColor:', productColor);
    let data = await ProductData.fetchAllByNameAndColor(productName, productColor);
    console.log('Tailles récupérées:', data);

    let html = selectionTailleView.render();
    C.renderHTML("#selection-size", html);

    let html2 = ProductSizeView.render(data);
    C.renderHTML("#tailles", html2);

    C.setupSizeClickListener();
};



// Fonction pour configurer l'écouteur de clic pour l'élément avec l'ID "ajouter"
C.setupAddButtonPanierListener = function () {
    console.log('Appel de setupAddButtonListener');
    document.getElementById('ajouter').addEventListener('click', function () {
        console.log('Bouton "ajouter" cliqué');
        let button = this;
        let dataName = button.dataset.name;
        let dataColor = button.dataset.clr;
        console.log('data-name du bouton cliqué:', dataName);
        console.log('data-clr du bouton cliqué:', dataColor);
        if (!button.dataset.clicked) {
            button.dataset.clicked = true;
            C.getAvailableSizesByProductId(dataName, dataColor);
        }
    });
};


// Fonction pour configurer l'écouteur de clic sur les produits
C.setupProductClickListener = function () {
    console.log('Appel de setupProductClickListener');
    document.querySelectorAll('.product').forEach(function (element) {
        element.addEventListener('click', async function () {
            console.log('Dataset du produit:', this.dataset);
            let productId = Number(this.id);
            console.log('Produit cliqué:', productId);
            await C.handleProductClick(productId, this.dataset.name);
        });
    });
};

// Fonction pour récupérer le dataset d'un produit cliqué
C.getProductDataset = function (selector) {
    console.log('Appel de getProductDataset avec selector:', selector);
    document.querySelectorAll(selector).forEach(function (element) {
        element.addEventListener('click', function () {
            console.log('Dataset du produit:', this.dataset);
        });
    });
};

// Fonction pour ajouter un écouteur de clic à tous les éléments correspondant au sélecteur
C.addClickListener = function (selector, handler) {
    console.log('Appel de addClickListener avec selector:', selector, 'et handler:', handler);
    document.querySelectorAll(selector).forEach(function (element) {
        element.addEventListener('click', handler);
    });
};

// Fonction pour configurer l'écouteur de clic pour le bouton d'accueil
C.setupHomeButtonListener = function () {
    console.log('Appel de setupHomeButtonListener');
    document.getElementById('home-btn').addEventListener('click', function () {
        console.log('Bouton d\'accueil cliqué');
        document.querySelector("#main").style.display = 'flex';
        C.renderHTML("#main-articles", '');
        C.renderHTML(".categorie", '');
        C.renderHTML("#panier-container", '');

    });
};

// Fonction pour configurer l'écouteur de clic pour le bouton de fermeture du menu
C.setupCloseMenuListener = function () {
    console.log('Appel de setupCloseMenuListener');
    document.getElementById('close-menu').addEventListener('click', function () {
        console.log('Bouton de fermeture du menu cliqué');
        C.renderHTML("#burger", '');
    });
};

// Fonction pour gérer le clic sur un filtre de catégorie
C.handler_clickOnFilter = async function (ev) {
    console.log('Appel de handler_clickOnFilter avec ev:', ev);
    console.log('Filtre cliqué', ev.target.dataset.id);
    if (ev.target.dataset.id != undefined) {
        let value = Number(ev.target.dataset.id);
        console.log('Récupération des produits pour la catégorie:', value);
        let data = await ProductData.fetchByCategory(value);
        console.log('Produits récupérés:', data);
        if (data.length === 0) {
            C.renderHTML("#main-articles", '<p>Aucun produit trouvé pour cette catégorie.</p>');
        } else {
            let html = ProductView.render(data);
            C.renderHTML("#fiche-product", '');
            C.renderHTML("#panier-container", '');

            C.renderHTML("#main-articles", html);
            C.setupProductClickListener();
        }
    }
};

// Fonction pour charger les catégories et configurer les écouteurs de clic pour les filtres
C.loadCategories = async function () {
    console.log('Appel de loadCategories');
    let data = await CatégorieData.fetchAll();
    console.log('Catégories récupérées:', data);
    let html = CatégorieView.render(data);
    C.renderHTML("#panier-container", '');

    C.renderHTML(".categorie", html);
    C.addClickListener('#filters', C.handler_clickOnFilter);
    C.setupProductClickListener();
};

// Fonction pour configurer les écouteurs d'événements pour le menu burger et les catégories
C.setupEventListeners = function () {
    console.log('Appel de setupEventListeners');
    document.getElementById('burger-logo').addEventListener('click', async function () {
        console.log('Logo du burger cliqué');
        let template = MenuBurgerView.render();
        C.renderHTML("#burger", template);

        let categories = await CatégorieData.fetchAll();
        console.log('Catégories récupérées pour le menu burger:', categories);
        let categoriesHtml = CategorieMenueView.render(categories);
        document.querySelector(".categories-burger").innerHTML += categoriesHtml;

        C.addClickListener('#menu-burger-item', async function () {
            console.log('Élément du menu burger cliqué', this.textContent.trim());
            if (this.textContent.trim() === 'tout voir') {
                C.renderHTML("#burger", '');
                C.renderHTML("#fiche-product", '');
                C.loadCategories();
                C.loadProducts();
            } else if (this.dataset.id) {
                document.querySelector("#main").style.display = 'none';
                let categoryId = Number(this.dataset.id);
                console.log('Récupération des produits pour la catégorie:', categoryId);
                C.renderHTML("#burger", '');
                let data = await ProductData.fetchByCategory(categoryId);
                console.log('Produits récupérés:', data);
                let html = ProductView.render(data);
                C.renderHTML("#fiche-product", '');
                C.renderHTML("#panier-container", '');

                C.renderHTML("#main-articles", html);
                C.loadCategories();
            }
        });
        C.setupCloseMenuListener();
    });
};

// Fonction pour charger tous les produits et configurer les écouteurs de clic pour les produits
C.loadProducts = async function () {
    console.log('Appel de loadProducts');
    document.querySelector("#main").style.display = 'none';
    C.renderHTML("#panier-container", '');

    let data = await ProductData.fetchAll();
    console.log('Produits récupérés:', data);
    let html = ProductView.render(data);
    C.renderHTML("#main-articles", html);
    C.setupProductClickListener();
};

// Fonction pour initialiser l'application en configurant les écouteurs d'événements et en chargeant les vues initiales
C.init = async function () {
    console.log('Appel de init');
    let html2 = navView.render();
    C.renderHTML("#nav", html2);
    C.setupSearchBarListener();
    C.setupEventListeners();
    C.setupHomeButtonListener();
    C.setupPanierClickListener();
};

C.init();