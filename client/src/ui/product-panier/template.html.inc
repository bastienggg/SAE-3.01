<div class="flex flex-row justify-left items-start gap-4">
  <img src="{{image}}" alt="image du produit dans le panier" class="w-1/3" />

  <div class="w-1/2">
    <p class="lg:mb-4 lg:text-xl">Nom : {{nom}}</p>
    <p class="hidden lg:flex lg:mb-4 lg:text-xl">
      Description : {{description}}
    </p>
    <p class="lg:mb-4 lg:text-xl">Taille : {{taille}}</p>
    <p class="lg:mb-4 lg:text-xl">Couleur : {{couleur}}</p>
    <p class="lg:mb-4 lg:text-xl">Prix : {{prix}}</p>
    <div
      class="w-min flex flex-row items-center justify-center border-solid border-2 border-black mt-2"
    >
      <div
        class="p-2 hover:cursor-pointer"
        data-id="{{id_produit}}"
        id="moin-product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="2"
          viewBox="0 0 14 2"
          fill="none"
        >
          <path d="M14 1.99805H0V-0.00195312H14V1.99805Z" fill="black" />
        </svg>
      </div>
      <p id = "quantite" class="p-2">{{nombre}}</p>
      <div
        class="p-2 hover:cursor-pointer"
        data-id="{{id_produit}}"
        id="plus-product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M14 7.99805H8V13.998H6V7.99805H0V5.99805H6V-0.00195312H8V5.99805H14V7.99805Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  </div>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    id="delete-from-panier"
    data-id="{{id_produit}}"
    class="flex flex-row hover:cursor-pointer w-full justify-right"
  >
    <path
      d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
      fill="black"
    />
  </svg>
</div>
