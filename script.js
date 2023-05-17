let currentPokemon;

async function loadAllPokemons() {
  let url = "https://pokeapi.co/api/v2/pokemon/squirtle";
  let response = await fetch(url);
  currentPokemon = await response.json();

  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["front_shiny"];
}
