<?php
/**
 *  Class Product
 * 
 *  Représente un produit avec uniquement 3 propriétés (id, name, category)
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Product doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class Product implements JsonSerializable {
    private int $id; // id du produit
    private string $name; // nom du produit
    private string $desc; // description du produit
    private float $price; // prix du produit
    private string $image; // image du produit
    private string $stock; // stock du produit
    private string $color ; // couleur du produit
    
    private int $id_categorie; // id de la catégorie du produit


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
     *  Define how to convert/serialize a Product to a JSON format
     *  This method will be automatically invoked by json_encode when apply to a Product
     * 
     *  En français : On sait qu'on aura besoin de convertir des Product en JSON pour les
     *  envoyer au client. La fonction json_encode sait comment convertir en JSON des données
     *  de type élémentaire. A savoir : des chaînes de caractères, des nombres, des booléens
     *  des tableaux ou des objets standards (stdClass). 
     *  Mais json_encode ne saura pas convertir un objet de type Product dont les propriétés sont
     *  privées de surcroit. Sauf si on définit la méthode JsonSerialize qui doit retourner une
     *  représentation d'un Product dans un format que json_encode sait convertir (ici un tableau associatif)
     * 
     *  Le fait que Product "implémente" l'interface JsonSerializable oblige à définir la méthode
     *  JsonSerialize et permet à json_encode de savoir comment convertir un Product en JSON.
     * 
     *  Parenthèse sur les "interfaces" : Une interface est une classe (abstraite en générale) qui
     *  regroupe un ensemble de méthodes. On dit que "une classe implémente une interface" au lieu de dire 
     *  que "une classe hérite d'une autre" uniquement parce qu'il n'y a pas de propriétés dans une "classe interface".
     * 
     *  Voir aussi : https://www.php.net/manual/en/class.jsonserializable.php
     *  
     */
    public function JsonSerialize(): mixed{
        return ["id_produit" => $this->id, "nom" => $this->name, "description" => $this->desc, "id_categorie" => $this->id_categorie, "prix" => $this->price, "image" => $this->image, "stock" => $this->stock, "couleur" => $this->color];
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

    /**
     * Get the value of id_produit
     */ 
    public function getid_categorie()
    {
        return $this->id_categorie;
    }

    /**
     * Set the value of id_produit
     *
     * 
     */ 
    public function setid_categorie(int $id_categorie): self
    {
        $this->id_categorie = $id_categorie;
        return $this;
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

    /**
     * Get the value of desc
     */ 
    public function getDesc()
    {
        return $this->desc;
    }

    /**
     * Set the value of desc
     *
     * 
     */ 
    public function setDesc($desc): self
    {
        $this->desc = $desc;
        return $this;
    }

    /**
     * Get the value of price
     */ 
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */ 
    public function setPrice($price): self
    {
        $this->price = $price;
        return $this;
    }

    /**
     * Get the value of image
     */ 
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set the value of image
     *
     * @return  self
     */ 
    public function setImage($image): self
    {
        $this->image = $image;
        return $this;
    }

    /**
     * Get the value of stock
     */ 
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * Set the value of stock
     *
     * @return  self
     */ 
    public function setStock($stock): self
    {
        $this->stock = $stock;
        return $this;
    }

    /**
     * Get the value of color
     */ 
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set the value of color
     *
     * @return  self
     */ 
    public function setColor($color): self
    {
        $this->color = $color;
        return $this;
    }

    

}
    
class Taille extends Product {
    private string $taille; // taille du produit

    public function __construct(int $id){
        parent::__construct($id);
    }

    public function JsonSerialize(): mixed{
        return ["id_produit" => $this->getId(), "nom" => $this->getName(), "description" => $this->getDesc(), "id_categorie" => $this->getid_categorie(), "prix" => $this->getPrice(), "image" => $this->getImage(), "stock" => $this->getStock(), "couleur" => $this->getColor(), "taille" => $this->getTaille()];
    }
    /**
     * Get the value of taille
     */ 
    public function getTaille()
    {
        return $this->taille;
    }

    /**
     * Set the value of taille
     *
     * @return  self
     */ 
    public function setTaille($taille): self
    {
        if ($taille == null){
            $taille = "Taille unique";
        }
        $this->taille = $taille;
        return $this;
    }
}


class option_couleur implements JsonSerializable {
    private string $name; // nom du produit avec option
    private string  $couleur ; // couleur du produit avec option
    
    
    public function __construct(string $name){
        $this->name = $name;
    }

    public function JsonSerialize(): mixed{
        return ["nom" => $this->name, "couleur" => $this->couleur];
    }

    /**
     * Get the value of name
     */ 
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get the value of couleur
     */ 
    public function getColor(): string
    {
        return $this->couleur;
    }

    /**
     * Set the value of couleur
     *
     * @return  self
     */ 
    public function setColor(string $couleur): self
    {
        $this->couleur = $couleur;
        return $this;
    }


}

class option_taille extends option_couleur {
    private string $taille; // taille du produit avec option

    public function __construct(string $name){
        parent::__construct($name);
    }

    public function JsonSerialize(): mixed{
        return ["nom" => $this->getName(), "couleur" => $this->getColor(), "taille" => $this->getTaille()];
    }

    /**
     * Get the value of taille
     */ 
    public function getTaille(): string
    {
        return $this->taille;
    }

    /**
     * Set the value of taille
     *
     * @return  self
     */ 
    public function setTaille(string $taille): self
    {
        $this->taille = $taille;
        return $this;
    }
}

?>