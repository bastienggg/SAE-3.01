<?php
require_once "Controller.php";
require_once "Repository/CommandeRepository.php";

// This class inherits the jsonResponse method and the $cnx property from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class CommandeController extends Controller {

    private CommandeRepository $commandes;

    public function __construct(){
        $this->commandes = new CommandeRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        // URI is .../commandes/id/{option}
        

        
        $id = $request->getId("id");
        
        if ($id){
            if ($request->getParam("details")) {
                return $this->commandes->getOrderDetailsById($id);
            }
            if ($request->getParam("changestatut")){
                $statut = $request->getParam("changestatut");
                
                $commande = $this->commandes->find($id);
                if ($commande) {
                    $commande->setStatut($statut);
                    $this->commandes->updatestatut($commande);
                }
            }
            $c = $this->commandes->find($id);
            return $c == null ? false : $c;
        } else {
            // URI is .../commandes
            return $this->commandes->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        
        $idaction = $request->getId();
        if ($idaction == "addOrder"){
            return $this->CommandeRequest($request);
        }

        if ($idaction == "addOrderDetail"){
            return $this->CommandeOrderRequest($request);
        }
        

    }

    private function CommandeRequest(HttpRequest $request){
        $id_client = $request->getParam("id_client");
        $statut = $request->getParam("statut");
        
        
        $commande = new Commande(0);
        $commande->setIdclient($id_client);
        $commande->setStatut($statut);
        

        $this->commandes->save($commande);
        $temp = $commande->getId(); //
        
        return ['id' => $temp, 'commande' => $commande];
    }

    private function CommandeOrderRequest(HttpRequest $request){
        
        $id_commande = $request->getParam("id_commande");
        $id_product = $request->getParam("id_product");
        $price = $request->getParam("price");
        $quantity = $request->getParam("quantity");
        $orderDetails = [];
        array_push($orderDetails, ["id_produit" => $id_product, "quantity" => $quantity, "price" => $price]);
        $commande = new CommandeDetail($id_commande);
        $commande->setOrderDetails($orderDetails);
        $this->commandes->saveOrderDetails($commande);
        return $commande;
    }

}

