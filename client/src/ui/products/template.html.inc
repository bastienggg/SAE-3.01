<div
  class="w-1/3 flex flex-col items-center justify-center m-2 md:m-4 md:w-1/5 hover:cursor-pointer"
  id="{{id_catégorie}}"
>
  <img src="{{image}}" alt="photo du produit" />

  <div class="flex flex-row w-full items-start justify-between p-1 mt-2">
    <div class="flex flex-col">
      <h1 class="text-l sm:text-xl md:text-2xl">{{nom}}</h1>
      <p class="text-s sm:text-m md:text-l">{{prix}}</p>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
    >
      <path
        d="M10.6021 0H0.707614C0.318882 0 0 0.315845 0 0.707614V15.5493L5.65484 9.89445L11.3097 15.5493V0.707614C11.3097 0.315845 10.9938 0 10.6021 0Z"
        fill="black"
        fill-opacity="0.2"
      />
    </svg>
  </div>
</div>
