<?php

 

class User implements JsonSerializable {
    private int $id; // id de la commande
    private string $nom; // nom de l'utilisateur
    private string $prenom; // prenom de l'utilisateur
    private string $email; // email de l'utilisateur
    private string $password; // mot de passe de l'utilisateur
    


    public function __construct(int $id) {
        $this->id = $id;
        
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * 
     */ 
    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }


    
    public function JsonSerialize(): mixed{
        return ["id" => $this->id, "nom" => $this->nom, "prenom" => $this->prenom, "email" => $this->email, "password" => $this->password];
    }

    /**
     * Get the value of nom
     */ 
    public function getNom(): string
    {
        return $this->nom;
    }

    /**
     * Set the value of nom
     */ 
    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;
        return $this;
    }
    /**
     * Get the value of prenom
     */ 
    public function getPrenom(): string
    {
        return $this->prenom;
    }

    /**
     * Set the value of prenom
     */ 
    

    /**
     * Get the value of email
     */ 
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set the value of email
     */ 
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * Set the value of password
     */ 
    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }
}
