import { ProductData } from "./data/product.js";
import { CatégorieData } from "./data/categories.js";

import { ProductView } from "./ui/products/index.js";
import { navView } from "./ui/navbar/index.js";
import { MenuBurgerView } from "./ui/menu_burger/index.js";
import { CatégorieView } from "./ui/categories/index.js";
import { CategorieMenueView } from "./ui/categories-burger/index.js";
import { FicheProductView } from "./ui/fiche-product/index.js";
import { FicheProductColorView } from "./ui/fiche-product-color/index.js";
import { FicheProductSizeView } from "./ui/fiche-product-size/index.js";

let C = {};
// Fonction pour rendre du HTML dans un élément sélectionné par un sélecteur
C.renderHTML = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
};

// Fonction pour configurer l'écouteur de la barre de recherche
C.setupSearchBarListener = function () {
    document.getElementById('searchbar').addEventListener('input', async function () {
        let query = this.value;
        console.log('Requête de recherche:', query);
        if (query.length > 0) {
            let results = await ProductData.search(query);
            console.log('Résultats de recherche:', results);
            document.querySelector("#main").style.display = 'none';
            document.querySelector("#fiche-product").innerHTML = '';
            let html = ProductView.render(results);
            C.renderHTML("#main-articles", html);
            C.setupProductClickListener();
        } else {
            C.renderHTML("#main-articles", '');
        }
    });
};

// Fonction pour configurer l'écouteur de clic sur les couleurs
C.setupColorClickListener = function () {
    document.querySelectorAll('#couleur').forEach(function (element) {
        element.addEventListener('click', async function () {
            let color = this.dataset.clr;
            let name = this.dataset.nom;
            console.log('Couleur cliquée:', color);
            console.log('Nom cliqué:', name);
            let data = await ProductData.fetchByNameAndColor(name, color);
            data = Array.isArray(data) ? data : [data];
            console.log('Produit récupéré:', data);
            let html = FicheProductView.render(data);
            C.renderHTML("#fiche-product", html);

            let colors = await ProductData.fetchColorsByName(name);
            console.log('Couleurs récupérées:', colors);
            await C.handleProductColors(colors);

            let sizes = await ProductData.fetchSizesByNameAndColor(name, color);
            console.log('Tailles récupérées:', sizes);
            await C.handleProductSizes(sizes);
        });
    });
};

// Fonction pour configurer l'écouteur de clic sur les tailles
C.setupSizeClickListener = function () {
    document.querySelectorAll('#taille').forEach(function (element) {
        element.addEventListener('click', async function () {
            let size = this.dataset.taille;
            let name = this.dataset.nom;
            let color = this.dataset.color;
            console.log('Taille cliquée:', size);
            console.log('Nom cliqué:', name);
            let data = await ProductData.fetchByNameAndSize(name, size);
            data = Array.isArray(data) ? data : [data];
            console.log('Produit récupéré:', data);
            let html = FicheProductView.render(data);
            C.renderHTML("#fiche-product", html);

            let colors = await ProductData.fetchColorsByName(name);
            console.log('Couleurs récupérées:', colors);
            await C.handleProductColors(colors);

            let sizes = await ProductData.fetchSizesByNameAndColor(name, color);
            console.log('Tailles récupérées:', sizes);
            await C.handleProductSizes(sizes);
        });
    });
};

// Fonction pour gérer les tailles de produit
C.handleProductSizes = async function (sizes) {
    console.log('Gestion des tailles de produit:', sizes);
    let html = FicheProductSizeView.render(sizes);
    C.renderHTML("#fiche-product-size", html);
    C.setupColorClickListener();
    C.setupSizeClickListener();
};

// Fonction pour gérer les couleurs de produit
C.handleProductColors = async function (colors) {
    console.log('Gestion des couleurs de produit:', colors);
    let html = FicheProductColorView.render(colors);
    C.renderHTML("#fiche-product-color", html);
    C.setupColorClickListener();
    C.setupSizeClickListener();
};

// Fonction pour gérer le clic sur un produit
C.handleProductClick = async function (productId, productName) {
    console.log('Gestion du clic sur le produit avec productId:', productId, 'productName:', productName);
    let productData = await ProductData.fetchById(productId);
    console.log('Données du produit récupérées:', productData);
    let html = FicheProductView.render(productData);
    C.renderHTML("#main-articles", '');
    C.renderHTML("#fiche-product", html);

    if (productName) {
        console.log('Récupération des couleurs pour le produit:', productName);
        let colors = await ProductData.fetchColorsByName(productName);
        console.log('Couleurs récupérées:', colors);

        let sizes = await ProductData.fetchSizesByName(productName);
        console.log('Tailles récupérées:', sizes);

        await C.handleProductSizes(sizes);
        await C.handleProductColors(colors);
    }
};

// Fonction pour configurer l'écouteur de clic sur les produits
C.setupProductClickListener = function () {
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
    document.querySelectorAll(selector).forEach(function (element) {
        element.addEventListener('click', function () {
            console.log('Dataset du produit:', this.dataset);
        });
    });
};

// Fonction pour ajouter un écouteur de clic à tous les éléments correspondant au sélecteur
C.addClickListener = function (selector, handler) {
    document.querySelectorAll(selector).forEach(function (element) {
        element.addEventListener('click', handler);
    });
};

// Fonction pour configurer l'écouteur de clic pour le bouton d'accueil
C.setupHomeButtonListener = function () {
    document.getElementById('home-btn').addEventListener('click', function () {
        console.log('Bouton d\'accueil cliqué');
        document.querySelector("#main").style.display = 'flex';
        C.renderHTML("#main-articles", '');
        C.renderHTML(".categorie", '');
    });
};

// Fonction pour configurer l'écouteur de clic pour le bouton de fermeture du menu
C.setupCloseMenuListener = function () {
    document.getElementById('close-menu').addEventListener('click', function () {
        console.log('Bouton de fermeture du menu cliqué');
        C.renderHTML("#burger", '');
    });
};

// Fonction pour gérer le clic sur un filtre de catégorie
C.handler_clickOnFilter = async function (ev) {
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
            C.renderHTML("#main-articles", html);
            C.setupProductClickListener();
        }
    }
};

// Fonction pour charger les catégories et configurer les écouteurs de clic pour les filtres
C.loadCategories = async function () {
    console.log('Chargement des catégories');
    let data = await CatégorieData.fetchAll();
    console.log('Catégories récupérées:', data);
    let html = CatégorieView.render(data);
    C.renderHTML(".categorie", html);
    C.addClickListener('#filters', C.handler_clickOnFilter);
    C.setupProductClickListener();
};

// Fonction pour configurer les écouteurs d'événements pour le menu burger et les catégories
C.setupEventListeners = function () {
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
                C.renderHTML("#main-articles", html);
                C.loadCategories();
            }
        });
        C.setupCloseMenuListener();
    });
};

// Fonction pour charger tous les produits et configurer les écouteurs de clic pour les produits
C.loadProducts = async function () {
    console.log('Chargement des produits');
    document.querySelector("#main").style.display = 'none';
    let data = await ProductData.fetchAll();
    console.log('Produits récupérés:', data);
    let html = ProductView.render(data);
    C.renderHTML("#main-articles", html);
    C.setupProductClickListener();
};

// Fonction pour initialiser l'application en configurant les écouteurs d'événements et en chargeant les vues initiales
C.init = async function () {
    console.log('Initialisation de l\'application');
    let html2 = navView.render();
    C.renderHTML("#nav", html2);
    C.setupSearchBarListener();
    C.setupEventListeners();
    C.setupHomeButtonListener();
};

C.init();
