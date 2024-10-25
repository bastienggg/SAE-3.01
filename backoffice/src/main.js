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
            let dataId = Number(this.getAttribute('data-id'));
            
            let selectElement = document.querySelector(`select[data-id="${dataId}"]`);
            if (selectElement) {
                let selectedValue = selectElement.value;
                console.log('ID du bouton validé:', dataId, 'Valeur sélectionnée:', selectedValue);
                // Vous pouvez ajouter ici le code pour traiter la valeur sélectionnée
                let initOrderUrl = `../api/commandes/${dataId}?changestatut=${selectedValue}`;
                console.log('URL de la commande initiale:', initOrderUrl);
                fetch(initOrderUrl)
                    .then(response => {
                        console.log('Request successful:', response);
                        // Traiter la réponse JSON ici
                        
                        if (response.ok) {
                            location.reload();
                            alert('Statut de commande changé avec succès');
                            return true;
                            
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(data => {
                        console.log('Response JSON:', data);
                        // Vous pouvez ajouter ici le code pour mettre à jour l'interface utilisateur en fonction de la réponse JSON
                    })
                    
            } else {
                console.log('Aucun élément select trouvé avec data-id:', dataId);
            }
        });
    });
};


// Ajouter un bouton pour consulter les détails de la commande
C.setupOrderDetailsListeners =  function () {
document.querySelectorAll('#order-details').forEach(button => {
    button.addEventListener('click', async function () {
        let orderId = Number(this.getAttribute('data-id'));
        let orderDetailsUrl = `../api/commandes/${orderId}?details=${orderId}`;

        
            let response = await fetch(orderDetailsUrl);
            let data = await response.json();
            let orderDetails = data.orderDetails;
            console.log(orderDetails);
            displayOrderDetails(orderDetails);
            
            

            
    });
});
}

function displayOrderDetails(orderDetails) {
    // Créer une interface utilisateur pour afficher les détails de la commande
    let orderDetailsContainer = document.getElementById('order-details-container');
    orderDetailsContainer.innerHTML = '';
    console.log('Détails de la commande:', orderDetails);
    orderDetails.forEach(product => {
        let productRow = document.createElement('div');
        productRow.classList.add('product-row');

        let productName = document.createElement('span');
        productName.textContent = product.name;
        productRow.appendChild(productName);

        let productQuantity = document.createElement('input');
        productQuantity.type = 'number';
        productQuantity.value = product.quantity;
        productQuantity.setAttribute('data-product-id', product.id);
        productRow.appendChild(productQuantity);

        orderDetailsContainer.appendChild(productRow);
    });

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save Changes';
    saveButton.addEventListener('click', function () {
        saveOrderChanges(orderDetails.id);
    });
    orderDetailsContainer.appendChild(saveButton);
}

function saveOrderChanges(orderId) {
    let updatedProducts = [];
    document.querySelectorAll('.product-row input').forEach(input => {
        let productId = Number(input.getAttribute('data-product-id'));
        let newQuantity = Number(input.value);
        updatedProducts.push({ id: productId, quantity: newQuantity });
    });

    let updateOrderUrl = `../api/commandes/${orderId}/update`;
    fetch(updateOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: updatedProducts })
    })
    
}


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
    C.setupOrderDetailsListeners();


};



C.init();