<?php

/**
 *  Class Category
 * 
 * 
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe categorie doivent être converti en JSON. Voire la méthode pour plus de détails.
 */

 
/* Tu définis dans class en private les noms des colonnes de la DBB*/
class Commande implements JsonSerializable {
    private int $id; // id de la commande
    private string $statut; // statut de la commande (disponible, en cours, terminée)
    private string $prix; // prix total de la commande
    private string $date; // date de la commande
    private int $id_client; // id du client qui a passé la commande

    


    public function __construct(int $id){
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
        return ["id" => $this->id, "statut" => $this->statut, "prix" => $this->prix, "date" => $this->date, "id_client" => $this->id_client];
    }

    /**
     * Get the value of statut
     */ 
    public function getStatut(): string
    {
        return $this->statut;
    }

    /**
     * Set the value of statut
     */ 
    public function setStatut(string $statut): self
    {
        $this->statut = $statut;
        return $this;
    }

    /**
     * Get the value of prix
     */ 
    public function getPrix(): string
    {
        return $this->prix;
    }

    /**
     * Set the value of prix
     */ 
    public function setPrix(string $prix): self
    {
        $this->prix = $prix;
        return $this;
    }

    /**
     * Get the value of date
     */ 
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * Set the value of date
     */ 
    public function setDate(string $date): self
    {
        $this->date = $date;
        return $this;
    }

    /**
     * Get the value of id_client
     */ 
    public function getIdClient(): int
    {
        return $this->id_client;
    }

    /**
     * Set the value of id_client
     */ 
    public function setIdClient(int $id_client): self
    {
        $this->id_client = $id_client;
        return $this;
    }



    

    

}
    

?>