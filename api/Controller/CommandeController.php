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
            
            $c = $this->commandes->find($id);
            return $c == null ? false : $c;
        } else {
            // URI is .../commandes
            return $this->commandes->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $obj = json_decode($json);

        $c = new Commande(0); // 0 is a symbolic and temporary value since the commande does not have a real id yet.
        $c->setIdClient($obj->client_id);
        $c->setDate($obj->date);
        $c->setStatut($obj->status);

        $ok = $this->commandes->save($c); 
        return $ok ? $c : false;
    }
}
?>
