<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Commande.php");

/**
 *  Classe CommandeRepository
 * 
 *  Cette classe représente le "stock" de Commande.
 *  Toutes les opérations sur les Commande doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class CommandeRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    // public function permet de retourner un Commande
    public function find($id): ?Commande{
        $requete = $this->cnx->prepare("select * from Commande where id_commande=:value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $p = new Commande($answer->id_commande);
        $p->setStatut($answer->statut);
        $p->setPrix($answer->prix);
        $p->setDate($answer->date);
        $p->setIdclient($answer->id_client);
        return $p;
    }

    // public function permet de retourner tout les Commandes
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Commande");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $p = new Commande($obj->id_commande);
            $p->setStatut($obj->nom);
            $p->setPrix($obj->prix);
            $p->setDate($obj->date);
            $p->setIdclient($obj->id_client);
            array_push($res, $p);
        }
       
        return $res;
    }

    // public function Insert($commande)
    public function save($commande){
        $requete = $this->cnx->prepare("insert into Commande (statut, prix, date, Id_Client) values (:statut , :prix, :date, :id_client)");
        $name = $commande->getName();
        $idcat = $commande->getid_produit();
        $requete->bindParam(':name', $name );
        $answer = $requete->execute(); // an insert query returns true or false. $answer is a boolean.

        if ($answer){
            $id = $this->cnx->lastInsertId(); // retrieve the id of the last insert query
            $commande->setId($id); // set the commande id to its real value.
            return true;
        }
          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($commande){
        // Not implemented ! TODO when needed !
        return false;
    }
}
