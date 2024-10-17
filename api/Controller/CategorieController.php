<?php
require_once "Controller.php";
require_once "Repository/CategorieRepository.php" ;




class CategorieController extends Controller {

    private CategorieRepository $Categories;

    public function __construct(){
        $this->Categories = new CategorieRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id){
            // URI is .../categories/{id}
            $p = $this->Categories->find($id);
            return $p==null ? false :  $p;
        }
        else{
            // URI is .../categories
            $cat = $request->getParam("category"); 
            if ( $cat == false) // Si on ne demande pas une catégorie en particulier, on retourne toutes les catégories
                return $this->Categories->findAll();

        }
    }

    //decode la requête post 
    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $obj = json_decode($json);
        $p = new Categorie(0); // 0 est une valeur symbolique et temporaire puisque la catégorie n'a pas encore de véritable id.
        $p->setName($obj->name);

        $ok = $this->Categories->save($p); 
        return $ok ? $p : false;
    }
   
}

?>