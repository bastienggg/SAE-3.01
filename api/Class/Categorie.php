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
class Categorie implements JsonSerializable {
    private int $id; // id de la categorie
    private string $name; // nom de la categeorie
    


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
        return ["id_categorie" => $this->id, "nom" => $this->name,];
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name): self
    {
        $this->name = $name;
        return $this;
    }



    

    

}
    

?>