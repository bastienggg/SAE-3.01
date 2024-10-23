<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Commande.php");


class CommandeRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }



    // public function permet de retourner un Categorie
    public function find($id): ?Commande{
        /*
            La façon de faire une requête SQL ci-dessous est "meilleur" que celle vue
            au précédent semestre (cnx->query). Notamment l'utilisation de bindParam
            permet de vérifier que la valeur transmise est "safe" et de se prémunir
            d'injection SQL.
        */
        $requete = $this->cnx->prepare("select * from Commande where id_order=:value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $p = new Commande($answer->id_order);
        $p->setStatut($answer->statut);
        
        $p->setIdclient($answer->id_client);
        return $p;
    }


    // public function permet de retourner tout les Categories
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Commande");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $p = new Commande($obj->id_order);
            $p->setStatut($obj->statut);
            
            $p->setIdclient($obj->id_client);
            array_push($res, $p);
        }
       
        return $res;
    }



    public function getOrderDetailsById($id_order): ?Commande {
        $requete = $this->cnx->prepare("
            SELECT c.id_order, c.statut, c.id_client, cp.id_produit, cp.quantite, p.nom, p.prix
            FROM Commande c
            JOIN Commande_produit cp ON c.id_order = cp.id_order
            JOIN Produit p ON cp.id_produit = p.id_produit
            WHERE c.id_order = :id_order
        ");
        $requete->bindParam(':id_order', $id_order);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        if (empty($answer)) return null;

        $commande = new CommandeDetail($answer[0]->id_order);
        $commande->setStatut($answer[0]->statut);
        
        $commande->setIdclient($answer[0]->id_client);

        $orderDetails = [];
        foreach ($answer as $obj) {
            $detail = [
                'id_produit' => $obj->id_produit,
                'Nom du produit' => $obj->nom,
                'Prix du produit' => $obj->prix,
                'couleur' => $obj->couleur,
                'taille' => $obj->taille,
                'stock' => $obj->stock,
                'quantity' => $obj->quantite,
                
            ];
            array_push($orderDetails, $detail);
            
        }
        $commande->setOrderDetails($orderDetails);

        return $commande;
    }



    // public function Insert($commande)
    public function save($commande){
        $requete = $this->cnx->prepare("insert into Commande (statut, id_client) values (:statut, :id_client)");
        $statut = $commande->getStatut();
        $id_client = $commande->getIdclient();
        $requete->bindParam(':statut', $statut);
        $requete->bindParam(':id_client', $id_client);
        $answer = $requete->execute(); // an insert query returns true or false. $answer is a boolean.

        if ($answer){
            $id = $this->cnx->lastInsertId(); // retrieve the id of the last insert query
            $commande->setId($id); // set the commande id to its real value.
            return true;
        }
          
        return false;
    }

    public function saveOrderDetails($commande) {
        $requete = $this->cnx->prepare("
            INSERT INTO Commande_produit (id_order, id_produit, prix, quantite) 
            VALUES (:id_order, :id_produit, :prix, :quantite)
        ");
        $id_order = $commande->getId();
        $orderDetails = $commande->getOrderDetails();
        $requete->bindParam(':id_order', $id_order);
        foreach ($orderDetails as $detail) {
            $id_produit = $detail['id_produit'];
            $quantite = $detail['quantity'];
            $prix = $detail['price'];
            $requete->bindParam(':id_produit', $id_produit);
            $requete->bindParam(':prix', $prix);
            $requete->bindParam(':quantite', $quantite);
            $requete->execute();
        }
        

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


