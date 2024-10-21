<div
  class="flex flex-col items-center md:items-start xl:items-end justify-between p-8 md:flex-row md:gap-10"
  id="{{id}}"
>
  <img
    class="rounded-xl md:w-1/2 xl:w-3/4"
    src="{{image}}"
    alt="photo du produit"
  />

  <div class="hidden xl:flex flex-col gap-2 mr-10">
    <img class="w-40 rounded-sm" src="{{image}}" alt="photo du produit" />
    <img class="w-40 rounded-sm" src="{{image}}" alt="photo du produit" />
    <img class="w-40 rounded-sm" src="{{image}}" alt="photo du produit" />
    <img class="w-40 rounded-sm" src="{{image}}" alt="photo du produit" />
    <img class="w-40 rounded-sm" src="{{image}}" alt="photo du produit" />
  </div>

  <div
    class="hidden md:flex md:flex-col md:h-full md:w-full md:border-solid md:border-2 md:border-black"
  >
    <div class="border-solid border-2 border-black p-6">
      <div class="flex flex-row w-full justify-between items-center mb-8">
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl uppercase">{{nom}}</h1>
          <p class="text-xl uppercase">{{prix}}€</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="33"
          viewBox="0 0 17 22"
          fill="none"
          class="m-4 hover:cursor-pointer"
        >
          <path
            d="M2.28351 1.63454V19.4837L7.29173 15.4775C7.7266 15.1297 8.26691 14.9403 8.82379 14.9403C9.38068 14.9403 9.92099 15.1297 10.3559 15.4775L15.3641 19.4821V1.63454H2.28351ZM1.46597 0H16.1816C16.3984 0 16.6064 0.086105 16.7597 0.239373C16.913 0.392641 16.9991 0.600517 16.9991 0.817271V21.1837C16.9989 21.3374 16.9553 21.4881 16.8733 21.6182C16.7913 21.7483 16.6742 21.8526 16.5356 21.9192C16.3969 21.9858 16.2422 22.0119 16.0894 21.9946C15.9365 21.9772 15.7917 21.9171 15.6715 21.8211L9.33393 16.7541C9.18907 16.6384 9.00918 16.5754 8.82379 16.5754C8.6384 16.5754 8.45852 16.6384 8.31365 16.7541L1.97612 21.8211C1.8559 21.9171 1.71105 21.9772 1.55819 21.9946C1.40534 22.0119 1.25069 21.9858 1.11202 21.9192C0.973352 21.8526 0.856287 21.7483 0.774281 21.6182C0.692275 21.4881 0.648656 21.3374 0.648438 21.1837V0.817271C0.648438 0.600517 0.734571 0.392641 0.887888 0.239373C1.04121 0.086105 1.24915 0 1.46597 0Z"
            fill="black"
          />
        </svg>
      </div>
      <p class="my-8 text-xl">
        Nous travaillons avec des programmes de suivi pour garantir le respect
        de nos standards dans environementaux
      </p>
      <p class="text-l uppercase hover:cursor-pointer my-4">
        Voir disponibilité en magazin
      </p>
      <p class="text-l uppercase hover:cursor-pointer my-4">
        Livraison echange et retour
      </p>
    </div>
    <div class="flex flex-col border-solid border-2 border-black p-6">
      <p class="text-xl">Couleur: {{couleur}} | 8062/310</p>
      <div class="flex flex-row gap-3 my-4" id="fiche-product-color"></div>
      <p>
        Ces tailles ne seront pas forcement disponible dans cette couleur
        cependant elle seront disponibles dans une autre des couleurs
        disponibles
      </p>
      <div
        class="flex flex-row flex-wrap w-full items-center justify-center my-8 gap-4"
        id="fiche-product-size"
      ></div>
    </div>
    <div
      class="flex items-center justify-center p-4 border-solid border-2 border-black text-white bg-black hover:text-black hover:bg-white hover:cursor-pointer"
      id="ajouter"
      data-name="{{nom}}"
      data-clr="{{couleur}}"
    >
      <p class="text-2xl uppercase text-center">Ajouter</p>
    </div>
  </div>

  <div
    class="flex flex-col border-solid border-2 border-black m-8 w-full p-4 gap-6 md:hidden"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="flex flex-col gap-2">
        <h4 class="text-xl uppercase">{{nom}}</h4>
        <p class="text-l uppercase">{{prix}}€</p>
      </div>

      <div
        class="flex flex-row gap-2 overflow-y-hidden"
        id="fiche-product-color"
      ></div>
    </div>
    <div class="flex flex-row w-full justify-between items-center">
      <p
        class="text-xl uppercase py-2 border-solid border-2 border-black w-3/4 text-center hover:cursor-pointer text-white bg-black hover:text-black hover:bg-white"
        id="ajouter"
        data-name="{{nom}}"
        data-clr="{{couleur}}"
      >
        Ajouter
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="22"
        viewBox="0 0 17 22"
        fill="none"
        class="m-4 hover:cursor-pointer"
      >
        <path
          d="M2.28351 1.63454V19.4837L7.29173 15.4775C7.7266 15.1297 8.26691 14.9403 8.82379 14.9403C9.38068 14.9403 9.92099 15.1297 10.3559 15.4775L15.3641 19.4821V1.63454H2.28351ZM1.46597 0H16.1816C16.3984 0 16.6064 0.086105 16.7597 0.239373C16.913 0.392641 16.9991 0.600517 16.9991 0.817271V21.1837C16.9989 21.3374 16.9553 21.4881 16.8733 21.6182C16.7913 21.7483 16.6742 21.8526 16.5356 21.9192C16.3969 21.9858 16.2422 22.0119 16.0894 21.9946C15.9365 21.9772 15.7917 21.9171 15.6715 21.8211L9.33393 16.7541C9.18907 16.6384 9.00918 16.5754 8.82379 16.5754C8.6384 16.5754 8.45852 16.6384 8.31365 16.7541L1.97612 21.8211C1.8559 21.9171 1.71105 21.9772 1.55819 21.9946C1.40534 22.0119 1.25069 21.9858 1.11202 21.9192C0.973352 21.8526 0.856287 21.7483 0.774281 21.6182C0.692275 21.4881 0.648656 21.3374 0.648438 21.1837V0.817271C0.648438 0.600517 0.734571 0.392641 0.887888 0.239373C1.04121 0.086105 1.24915 0 1.46597 0Z"
          fill="black"
        />
      </svg>
    </div>
  </div>
</div>
