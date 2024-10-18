<?php
require_once "Controller.php";
require_once "Repository/ProductRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends Controller {

    private ProductRepository $products;

    public function __construct(){
        $this->products = new ProductRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        // URI is .../products/id/{option}
        $name  = $request->getParam("name");
        if ($name){
            return $this->products->findByName($name);
        }



        
        $id = $request->getId("id");
        if ($id){
            // URI is .../products/name
            $p = $this->products->find($id);
            return $p==null ? false :  $p;
        }
        else{
            // URI is .../products
            $cat = $request->getParam("category"); // is there a category parameter in the request ?
            if ( $cat == false) // no request category, return all products
                return $this->products->findAll();
            // else // return only products of category $cat
            //     return $this->products->findAllByCategory($cat);
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        echo ($request);
        $json = $request->getJson();
        $obj = json_decode($json);
        if ($obj->id_categorie != 3){
            $p = new Taille($obj->id_produit);
            $p->setName($obj->nom);
            $p->setid_categorie($obj->id_categorie);
            $p->setPrice($obj->prix);
            $p->setImage($obj->image);
            $p->setDesc($obj->description);
            $p->setStock($obj->stock);
            $p->setcolor($obj->couleur);
            $p->setTaille($obj->taille);
            array_push($res, $p);
        }
        else {
            $p = new Product(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
            $p->setName($obj->name);
            $p->setid_categorie($obj->category);
            $p->setPrice($obj->price);
            $p->setImage($obj->image);
            $p->setDesc($obj->description);
            $p->setStock($obj->stock);
            $p->setcolor($obj->couleur);
        }
        
        

        $ok = $this->products->save($p); 
        return $ok ? $p : false;
    }
   
}

?>