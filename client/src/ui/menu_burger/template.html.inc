<div
  class="absolute flex flex-col justify-between w-screen h-screen sm:w-1/2 md:w-2/6 sm:border-r-2 sm:border-black sm:border-solid z-50 bg-white"
  id="burger"
>
  <div>
    <div class="flex justify-between items-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        class="hover:cursor-pointer"
        id="close-menu"
      >
        <path
          d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
          fill="black"
        />
      </svg>

      <div class="flex flex-row gap-4 uppercase">
        <p class="hover:cursor-pointer">Mon compte</p>
        <p class="hover:cursor-pointer">Panier {{Nb}}</p>
      </div>
    </div>
    <div
      class="flex flex-row gap-4 p-4 border-b-2 border-black border-solid w-full uppercase"
    >
      <p class="hover:cursor-pointer active:font-extrabold">Femme</p>
      <p class="hover:cursor-pointer active:font-extrabold">homme</p>
      <p class="hover:cursor-pointer active:font-extrabold">enfants</p>
      <p class="hover:cursor-pointer active:font-extrabold">zara pre-owned</p>
    </div>
    <ul class="flex flex-col list-none p-8 gap-4">
      <li
        class="uppercase hover:cursor-pointer active:font-extrabold"
        id="menu-burger-item"
      >
        ///nouveautés
      </li>
      <li
        class="uppercase hover:cursor-pointer active:font-extrabold"
        id="menu-burger-item"
      >
        tout voir
      </li>
      <!-- insertion des catégories en dynamique -->
    </ul>
  </div>
  <div class="w-full p-4">
    <input
      type="text"
      class="border-solid border-black border-2 p-2 text-right w-full text-xs md:hidden"
      placeholder="RECHERCHER"
      id="searchbar"
    />
  </div>
</div>
