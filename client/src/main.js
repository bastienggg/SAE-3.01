import { ProductData } from "./data/product.js";
import { CatégorieData } from "./data/categories.js";

import { ProductView } from "./ui/products/index.js";
import { navView } from "./ui/navbar/index.js";
import { MenuBurgerView } from "./ui/menu_burger/index.js";
import { CatégorieView } from "./ui/categories/index.js";
import { CategorieMenueView } from "./ui/categories-burger/index.js";

// import '../dist/style.css';

let C = {};
C.setupHomeButtonListener = function () {
    document.getElementById('home-btn').addEventListener('click', function () {
        console.log('Home button clicked');
        document.querySelector("#main").style.display = 'flex';
        document.querySelector("#main-articles").innerHTML = '';
        document.querySelector(".categorie").innerHTML = '';
    });
};

C.setupCloseMenuListener = function () {
    document.getElementById('close-menu').addEventListener('click', function () {
        document.querySelector("#burger").innerHTML = '';
    });
};





C.handler_clickOnFilter = async function (ev) {
    if (ev.target.dataset.id != undefined) {
        let value = Number(ev.target.dataset.id);
        console.log('Filter clicked: ' + value);
        console.log(value);
        let data = await ProductData.fetchByCategory(value);
        if (data.length === 0) {
            console.log('No products found for this category');
            document.querySelector("#main-articles").innerHTML = '<p>No products found for this category.</p>';
        } else {
            console.log(data);
            let html = ProductView.render(data);
            document.querySelector("#main-articles").innerHTML = '';
            document.querySelector("#main-articles").innerHTML = html;
        }
    }
};
C.loadCategories = async function () {
    let data = await CatégorieData.fetchAll();
    console.log(data);
    let html = CatégorieView.render(data);
    document.querySelector(".categorie").innerHTML = html;
    let filtres = document.querySelectorAll('#filters');
    if (filtres) {
        filtres.forEach(function (filtre) {
            filtre.addEventListener('click', C.handler_clickOnFilter);
        });
    }

};

C.setupEventListeners = function () {
    document.getElementById('burger-logo').addEventListener('click', async function () {
        let template = MenuBurgerView.render();
        document.querySelector("#burger").innerHTML = template;

        // Load categories into the burger menu
        let categories = await CatégorieData.fetchAll();
        console.log(categories);
        let categoriesHtml = CategorieMenueView.render(categories);
        console.log(categoriesHtml);
        document.querySelector(".categories-burger").innerHTML += categoriesHtml;

        document.querySelectorAll('#menu-burger-item').forEach(function (item) {
            item.addEventListener('click', async function () {
                if (item.textContent.trim() === 'tout voir') {
                    console.log('Menu burger item "tout voir" clicked');
                    document.querySelector("#burger").innerHTML = '';
                    C.loadCategories();
                    C.loadProducts();
                } else if (item.dataset.id) {
                    document.querySelector("#main").style.display = 'none';
                    let categoryId = Number(item.dataset.id);
                    console.log('Menu burger item clicked with category ID: ' + categoryId);
                    document.querySelector("#burger").innerHTML = '';
                    let data = await ProductData.fetchByCategory(categoryId);
                    console.log(data);
                    let html = ProductView.render(data);
                    document.querySelector("#main-articles").innerHTML = html;
                    C.loadCategories();


                }
            });
        });
        C.setupCloseMenuListener();
    });
};



C.loadProducts = async function () {
    document.querySelector("#main").style.display = 'none';
    let data = await ProductData.fetchAll();
    let html = ProductView.render(data);
    document.querySelector("#main-articles").innerHTML = html;
};


C.init = async function () {
    let html2 = navView.render();
    document.querySelector("#nav").innerHTML = html2;



    C.setupEventListeners();
    C.setupHomeButtonListener();
};


C.init();
