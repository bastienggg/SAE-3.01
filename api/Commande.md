Commande disponible : 

PRODUIT

/products --> Retourne tout les produits

/products/{id} --> Retourne le produit avec l'id

/products?name={valeur} --> Retourne le produit et les options possible

/products?categories={id} --> Retourne tout les produits d'une catégorie (ID donnée)

CATEGORIES

/categories --> Retourne toutes les catégories

/categories/{id} --> Retourne une catégories avec l'id 

Cookie : Pannier /

// Test the functions

addTopanier($id_produit, $quantite)
removeFromPanier($id_produit)

addTopanier(1, 2); // Ajoute deux unité du produit avec ID 1 
addTopanier(2, 1); // Ajoute une unité du produit avec ID 2 
removeFrompanier(1); // Enlève les produit du panier 