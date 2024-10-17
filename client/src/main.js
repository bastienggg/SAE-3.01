import { ProductData } from "./data/product.js";
import { ProductView } from "./ui/products/index.js";
import { navView } from "./ui/navbar/index.js";
import { MenuBurgerView } from "./ui/menu_burger/index.js";

// import '../dist/style.css';

let C = {};
C.setupHomeButtonListener = function () {
    document.getElementById('home-btn').addEventListener('click', function () {
        console.log('Home button clicked');
        document.querySelector("#main").style.display = 'flex';
        document.querySelector("#main-articles").innerHTML = '';

    });
};

C.setupCloseMenuListener = function () {
    document.getElementById('close-menu').addEventListener('click', function () {
        document.querySelector("#burger").innerHTML = '';
    });
};

C.setupEventListeners = function () {
    document.getElementById('burger-logo').addEventListener('click', function () {
        let template = MenuBurgerView.render();
        document.querySelector("#burger").innerHTML = template;
        document.querySelectorAll('#menu-burger-item').forEach(function (item) {
            item.addEventListener('click', function () {
                if (item.textContent.trim() === 'tout voir') {
                    console.log('Menu burger item "tout voir" clicked');
                    document.querySelector("#burger").innerHTML = '';
                    C.loadProducts();
                } else {
                    console.log('Menu burger item clicked');
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