<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Product.php");


/**
 *  Classe ProductRepository
 * 
 *  Cette classe représente le "stock" de Product.
 *  Toutes les opérations sur les Product doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class ProductRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }



    // public function permet de retourner un Produit
    public function find($id): ?Product{
        /*
           permet de vérifier que la valeur transmise est "safe" et de se prémunir
        */
        $requete = $this->cnx->prepare("select * from Produit where id_produit=:value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $p = new Product($answer->id_produit);
        $p->setName($answer->nom);
        $p->setid_categorie($answer->id_categorie);
        $p->setPrice($answer->prix);
        $p->setImage($answer->image);
        $p->setDesc($answer->description);
        $p->setStock($answer->stock);
        $p->setcolor($answer->couleur);
        return $p;
    }


    // public function permet de retourner tout les Produits
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Produit");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $p = new Product($obj->id_produit);
            $p->setName($obj->nom);
            $p->setid_categorie($obj->id_categorie);
            $p->setPrice($obj->prix);
            $p->setImage($obj->image);
            $p->setDesc($obj->description);
            $p->setStock($obj->stock);
            $p->setcolor($obj->couleur);

            array_push($res, $p);
        }
       
        return $res;
    }
    

    // public function Insert($product)
    public function save($product){
        $requete = $this->cnx->prepare("insert into Produit (name, category) values (:name, :id_produit)");
        $name = $product->getName();
        $idcat = $product->getid_produit();
        $requete->bindParam(':name', $name );
        $requete->bindParam(':id_produit', $idcat);
        $answer = $requete->execute(); 

        if ($answer){
            $id = $this->cnx->lastInsertId(); 
            $product->setId($id); 
            return true;
        }
          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($product){
        // Not implemented ! TODO when needed !
        return false;
    }

   
    
}