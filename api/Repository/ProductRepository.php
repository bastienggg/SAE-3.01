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
        
        if ($answer->id_categorie != 3){
            $p = new Taille($answer->id_produit);
            $p->setName($answer->nom);
            $p->setid_categorie($answer->id_categorie);
            $p->setPrice($answer->prix);
            $p->setImage($answer->image);
            $p->setDesc($answer->description);
            $p->setStock($answer->stock);
            $p->setcolor($answer->couleur);
            $p->setTaille($answer->taille);
            return $p;
        }
        else {
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
        
    }


    // public function permet de retourner tout les Produits
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Produit");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
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
            }
            else {
                $p = new Product($obj->id_produit);
                $p->setName($obj->nom);
                $p->setid_categorie($obj->id_categorie);
                $p->setPrice($obj->prix);
                $p->setImage($obj->image);
                $p->setDesc($obj->description);
                $p->setStock($obj->stock);
                $p->setcolor($obj->couleur);
            }
            
            
            array_push($res, $p);
        }
       
        return $res;
    }
    
    public function findByName($name){
        $requete = $this->cnx->prepare("select id_categorie, nom, couleur, taille from Produit where nom=:value");
        $requete->bindParam(':value', $name);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        
        foreach ($answer as $obj){
            if ($obj->id_categorie != 3){
                $p = new option_taille($obj->nom);
                $p->setName($obj->nom);
                $p->setcolor($obj->couleur);
                $p->setTaille($obj->taille);
    
                
            }
            else {
                $p = new option_couleur($obj->nom);
                $p->setName($obj->nom);
                $p->setcolor($obj->couleur);
            }
            array_push($res, $p);
        }
        return $res;
    }

    //public function permet de retourner tout les Produits d'une catégorie
    public function findAllByCategory($category): array {
        $requete = $this->cnx->prepare("select * from Produit where id_categorie=:value");
        $requete->bindParam(':value', $category);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach($answer as $obj){
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
            }
            else {
                $p = new Product($obj->id_produit);
                $p->setName($obj->nom);
                $p->setid_categorie($obj->id_categorie);
                $p->setPrice($obj->prix);
                $p->setImage($obj->image);
                $p->setDesc($obj->description);
                $p->setStock($obj->stock);
                $p->setcolor($obj->couleur);
            }
            array_push($res, $p);
        }
        return $res;
    }

    // public function Insert($product)
    public function save($product){
        $requete = $this->cnx->prepare("insert into Produit (nom, description, prix, couleur, taille, image, stock, id_categorie ) values (:name, :id_produit)");
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