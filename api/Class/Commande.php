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
    private string $statut ; //statut de la commande
    private string $date; // date de la commande
    private string $id_client; // id du client
    


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
        return ["id" => $this->id, "statut" => $this->statut, "date" => $this->date, "id_client" => $this->id_client];
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
    public function getIdClient(): string
    {
        return $this->id_client;
    }

    /**
     * Set the value of id_client
     */ 
    public function setIdClient(string $id_client): self
    {
        $this->id_client = $id_client;
        return $this;
    }

    


    

    

}

class CommandeDetail extends Commande {
    private array $orderDetails;

    public function __construct(int $id){
        parent::__construct($id);
    }

    public function JsonSerialize(): mixed{
        return ["id" => $this->getId(), "statut" => $this->getStatut(), "date" => $this->getdate(), "id_client" => $this->getIdClient(), "orderDetails" => $this->orderDetails];
    }

    /**
     * Get the value of orderDetails
     */ 
    public function getOrderDetails(): array
    {
        return $this->orderDetails;
    }

    /**
     * Set the value of orderDetails
     */ 
    public function setOrderDetails(array $orderDetails): self
    {
        $this->orderDetails = $orderDetails;
        return $this;
    }
}