<div
  class="flex flex-col items-start justify-center border-solid border-2 border-black w-48"
>
  <div class="flex flex-row w-full">
    <p class="p-4 texte-black border-solid border-2 border-black w-full">
      id commande : {{id}}
    </p>
    <p class="p-4 texte-black border-solid border-2 border-black w-full">
      id client : {{id_client}}
    </p>
  </div>
  <p class="w-full border-solid border-2 border-black p-4">{{statut}}</p>
  <p
    class="w-full border-solid border-2 border-black p-4 border-t-4 border-b-0 text-center"
  >
    MODIFIER
  </p>
  <div class="border-solid border-2 border-t-0 border-black p-4 w-full">
    <select name="modifier" id="modifier" class="w-full" data-id="{{id}}">
      <option value="En cours">en cours</option>
      <option value="Disponible">disponible</option>
      <option value="Annulée">annulée</option>
      <option value="Retirée">retirer</option>
    </select>
  </div>
  <p
    class="w-full border-solid border-2 border-black p-4 text-center text-white bg-black hover:bg-white hover:text-black hover:cursor-pointer"
    id="valider"
    data-id="{{id}}"
  >
    Valider la modification
  </p>
</div>
