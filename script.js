let currentPokemon;

async function renderAllPokemons() {
  let url = "https://pokeapi.co/api/v2/pokemon/squirtle";
  let response = await fetch(url);
  currentPokemon = await response.json();

  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById("pokeName").innerHTML = currentPokemon["name"];
}
