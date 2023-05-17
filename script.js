let loadedPokemon = 21; // so viele werden am Stück geladen
let currentLoadedPokemon = 1;
let listOfLoadedPokemons = [];

async function loadPokemons() {
  for (let i = currentLoadedPokemon; i < loadedPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    listOfLoadedPokemons.push(currentPokemon);
    document.getElementById("mainContainer").innerHTML += loadPokemonHTML(
      i,
      currentPokemon,
      response,
      url
    );
    loadPokemonInfo(i);
  }
}

function loadPokemonInfo(i) {
  // Name anzeigen
  document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon["name"];
  //Bild einfügen
  document.getElementById(`pokemonImage${i}`).src =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  //Nummer hinzufügen
  document.getElementById(`pokemonID${i}`).innerHTML += currentPokemon["id"];
  //Typen hinzufügen
  document.getElementById(`pokemonType${i}`).innerHTML =
    currentPokemon["types"][0]["type"]["name"];
}
