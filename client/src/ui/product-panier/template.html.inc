<div class="flex flex-row justify-left items-start gap-4">
  <img src="{{image}}" alt="image du produit dans le panier" class="w-1/3" />

  <div>
    <p class="lg:mb-4 lg:text-xl">Nom : {{nom}}</p>
    <p class="lg:mb-4 lg:text-xl">Description : {{description}}</p>
    <p class="lg:mb-4 lg:text-xl">Taille : {{taille}}</p>
    <p class="lg:mb-4 lg:text-xl">Couleur : {{couleur}}</p>
    <p class="lg:mb-4 lg:text-xl">Prix : {{prix}}</p>
  </div>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 14 14"
    fill="none"
    id="delete-from-panier"
    data-id="{{id_produit}}"
    class="hover:cursor-pointer max-w-15 max-h-15"
  >
    <path
      d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
      fill="black"
    />
  </svg>
</div>
