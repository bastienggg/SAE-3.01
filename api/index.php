<?php
require_once "Controller/ProductController.php";
require_once "Repository/ProductRepository.php";
require_once "Controller/CategorieController.php";
require_once "Class/HttpRequest.php";


if (!isset($_COOKIE['panier'])) {
    // Initialize an empty panier if it doesn't exist
    $panier = [];
    setcookie('panier', json_encode($panier), time() + (86400 * 30), "/"); // 30 days expiration
} else {
    // Retrieve the panier from the cookie
    $panier = json_decode($_COOKIE['panier'], true);
}

// Example of adding a product to the panier
function addTopanier($productId, $quantity, $name, $price) {
    global $panier;
    if (isset($panier[$productId])) {
        $panier[$productId]['quantity'] += $quantity;
    } else {
        $panier[$productId] = [
            'quantity' => $quantity,
            'name' => $name,
            'price' => $price
        ];
    }
    setcookie('panier', json_encode($panier), time() + (86400 * 30), "/"); // Update the cookie
}


// Example of removing a product from the panier
function removeFrompanier($productId) {
    global $panier;
    if (isset($panier[$productId])) {
        unset($panier[$productId]);
        setcookie('panier', json_encode($panier), time() + (86400 * 30), "/"); // Update the cookie
    }
}

// Example of clearing the panier
function clearpanier() {
    global $panier;
    $panier = [];
    setcookie('panier', json_encode($panier), time() + (86400 * 30), "/"); // Update the cookie
}





/** IMPORTANT
 * 
 *  De part le .htaccess, toutes les requêtes seront redirigées vers ce fichier index.php
 * 
 *  On pose le principe que toutes les requêtes, pour être valides, doivent être dee la forme :
 * 
 *  http://.../api/ressources ou  http://.../api/ressources/{id}
 * 
 *  Par exemple : http://.../api/products ou  http://.../api/products/3
 */



/**
 *  $router est notre "routeur" rudimentaire.
 * 
 *  C'est un tableau associatif qui associe à chaque nom de ressource 
 *  le Controller en charge de traiter la requête.
 *  Ici ProductController est le controleur qui traitera toutes les requêtes ciblant la ressource "products"
 *  On ajoutera des "routes" à $router si l'on a d'autres ressource à traiter.
 */
$router = [
    "products" => new ProductController(),
    "categories" => new CategorieController()
];

// objet HttpRequest qui contient toutes les infos utiles sur la requêtes (voir class/HttpRequest.php)
$request = new HttpRequest();

// on récupère la ressource ciblée par la requête
$route = $request->getRessources();

if ( isset($router[$route]) ){ // si on a un controleur pour cette ressource
    $ctrl = $router[$route];  // on le récupère
    $json = $ctrl->jsonResponse($request); // et on invoque jsonResponse pour obtenir la réponse (json) à la requête (voir class/Controller.php et ProductController.php)
    if ($json){ 
        header("Content-type: application/json;charset=utf-8");
        echo $json;
    }
    else{
        http_response_code(404); // en cas de problème pour produire la réponse, on retourne un 404
    }
    die();
}
http_response_code(404); // si on a pas de controlleur pour traiter la requête -> 404
die();



?>