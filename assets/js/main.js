const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 5;
let offset = 0;
const maxPokemons = 151; // limited to the first generation

function convertPokemonToLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.id}</span>
      <span class="name">${pokemon.name}</span>
      <div class="details">
        <ol class="types">${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  if (offset + limit >= maxPokemons) {
    const newLimit = maxPokemons - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
