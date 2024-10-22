<?php

require_once("Repository/EntityRepository.php");
require_once("Class/User.php");



class UserRepository extends EntityRepository {

    protected $users;

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }



    // public function permet de retourner un Categorie
    public function find($id): ?User{
        /*
            La façon de faire une requête SQL ci-dessous est "meilleur" que celle vue
            au précédent semestre (cnx->query). Notamment l'utilisation de bindParam
            permet de vérifier que la valeur transmise est "safe" et de se prémunir
            d'injection SQL.
        */
        $requete = $this->cnx->prepare("select * from Client where id_client=:value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $p = new User($answer->id_client);
        $p->setNom($answer->nom);
        $p->setPrenom($answer->prenom);
        $p->setEmail($answer->email);
        $p->setPassword($answer->password);
        return $p;
    }


    // public function permet de retourner tout les Categories
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Client");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $p = new User($obj->id_client);
            $p->setNom($obj->nom);
            $p->setPrenom($obj->prenom);
            $p->setEmail($obj->email);
            $p->setPassword($obj->password);
            array_push($res, $p);
        }
       
        return $res;
    }
    
    public function save($users){
        $requete = $this->cnx->prepare("insert into Client (prenom, nom, email, mdp) values (:prenom, :nom, :email, :mdp)");
        $prenom = $users->getPrenom();
        $nom = $users->getNom();
        $email = $users->getEmail();
        $password = $users->getPassword();
        $requete->bindParam(':prenom', $prenom);
        $requete->bindParam(':nom', $nom);
        $requete->bindParam(':email', $email);
        $requete->bindParam(':mdp', $password);
        $answer = $requete->execute(); // an insert query returns true or false. $answer is a boolean.

        if ($answer){
            var_dump($prenom, $nom, $email, $password);
            $id = $this->cnx->lastInsertId(); // retrieve the id of the last insert query
            $users->setId($id); // set the product id to its real value.
            return true;
        }
          
        return false;
    }
    
    public function findByEmail($email){
        
        $requete = $this->cnx->prepare("select * from Client where email=:value");
        $requete->bindParam(':value', $email);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null;
        
        $p = new User($answer->id_client);
        $p->setNom($answer->Nom);
        $p->setPrenom($answer->Prenom);
        $p->setEmail($answer->Email);
        $p->setPassword($answer->mdp);
        return $p;
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


?>

