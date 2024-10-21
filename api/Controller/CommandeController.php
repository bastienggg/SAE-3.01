<?php
require_once "Controller.php";
require_once "Repository/CommandeRepository.php" ;




class CommandeController extends Controller {

    private CommandeRepository $Commande;

    public function __construct(){
        $this->Commande = new CommandeRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id){
            // URI is .../Commande/{id}
            $p = $this->Commande->find($id);
            return $p==null ? false :  $p;
        }
        else{
            // URI is .../categories
            $cat = $request->getParam("category"); 
            if ( $cat == false) // Si on ne demande pas une catégorie en particulier, on retourne toutes les catégories
                return $this->Commande->findAll();

        }
    }

    //decode la requête post 
    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $obj = json_decode($json);
        $p = new Commande(0); // 0 est une valeur symbolique et temporaire puisque la catégorie n'a pas encore de véritable id.
        $p->setStatut($obj->statut);
        $p->setPrix($obj->prix);
        $p->setDate($obj->date);
        $p->setIdclient($obj->id_client);

        $ok = $this->Commande->save($p); 
        return $ok ? $p : false;
    }
   
}

?>