import { postRequest } from "./lib/api-request.js";

import { CommandeData } from "./data/commande.js";
import { ProductData } from "./data/product.js";

import { ProductView } from "./ui/products/index.js";
import { CommandeView } from "./ui/commande/index.js";





let C = {};

// Fonction pour rendre du HTML dans un élément sélectionné par un sélecteur
C.renderHTML = function (selector, html) {
    console.log('Appel de renderHTML avec selector:', selector, 'et html:', html);
    document.querySelector(selector).innerHTML = html;
};

// Fonction pour détecter le clic sur les éléments avec l'ID "valider"
C.setupValidationListeners = function () {
    document.querySelectorAll('#valider').forEach(button => {
        button.addEventListener('click', function () {
            let dataId = this.getAttribute('data-id');
            let selectElement = document.querySelector(`select[data-id="${dataId}"]`);
            if (selectElement) {
                let selectedValue = selectElement.value;
                console.log('ID du bouton validé:', dataId, 'Valeur sélectionnée:', selectedValue);
                // Vous pouvez ajouter ici le code pour traiter la valeur sélectionnée
                let initOrderUrl = `../api/commandes/${dataId}?changestatut=${selectedValue}`;
                postRequest(initOrderUrl, {})
                    .then(response => {
                        console.log('Request successful:', response);
                        // Traiter la réponse JSON ici
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(data => {
                        console.log('Response JSON:', data);
                        // Vous pouvez ajouter ici le code pour mettre à jour l'interface utilisateur en fonction de la réponse JSON
                    })
                    .catch(error => {
                        console.error('Request failed:', error);
                    });
            } else {
                console.log('Aucun élément select trouvé avec data-id:', dataId);
            }
        });
    });
};



// Fonction pour initialiser l'application en configurant les écouteurs d'événements et en chargeant les vues initiales
C.init = async function () {
    let data = await ProductData.fetchAll();
    let html = ProductView.render(data);
    console.log('Produits récupérés:', data);
    console.log('HTML des produits:', html);
    C.renderHTML("#produits", html);

    let data2 = await CommandeData.getALL();
    let html2 = CommandeView.render(data2);
    console.log('Commandes récupérées:', data2);
    console.log('HTML des commandes:', html2);
    C.renderHTML("#commandes", html2);

    C.setupValidationListeners();

};



C.init();