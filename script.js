let loadedPokemon = 21; // so viele werden am Stück geladen
let currentLoadedPokemon = 1;
let listOfLoadedPokemons = [];

// Funktion zum Laden von Pokémon-Daten
async function loadPokemons() {
  // Schleife für das Laden von Pokémon-Daten von currentLoadedPokemon bis loadedPokemon
  for (let i = currentLoadedPokemon; i < loadedPokemon; i++) {
    // URL für die Anfrage an die PokeAPI erstellen, um Daten für das aktuelle Pokémon zu erhalten
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    // Auf die Antwort der Anfrage warten und speichern
    let response = await fetch(url);
    // Die erhaltenen Daten in das currentPokemon-Objekt umwandeln
    currentPokemon = await response.json();
    // Um die geladenen Pokémon-Daten in der Konsole anzuzeigen (nur so sehe ich den Pfad zu den verschiedenen Infos/Dateien )
    console.log("Loaded Pokemon", currentPokemon);
    // Das currentPokemon-Objekt der Liste der geladenen Pokémon hinzufügen
    listOfLoadedPokemons.push(currentPokemon);
    // Das HTML für das geladene Pokémon generieren und zum mainContainer hinzufügen
    document.getElementById("mainContainer").innerHTML += loadPokemonHTML(
      i,
      currentPokemon,
      response,
      url
    );
    loadPokemonInfo(i);
    loadPokemonType(i, currentPokemon);
  }
}

//Funktion um die runtergeladenen Infos anzuzeigen
function loadPokemonInfo(i) {
  // Name anzeigen
  document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon["name"];
  //Bild einfügen
  document.getElementById(`pokemonImage${i}`).src =
    currentPokemon["sprites"]["other"]["home"]["front_default"];
  //Nummer hinzufügen
  document.getElementById(`pokemonID${i}`).innerHTML += currentPokemon["id"];
  //Typen hinzufügen
  document.getElementById(`pokemonType${i}`).innerHTML =
    currentPokemon["types"][0]["type"]["name"];
}

// Funktion um den Typ den Pokémon Typ zu laden und anzuzeigen
function loadPokemonType(i, currentPokemon) {
  // Schleife, um alle Typen des aktuellen Pokémon zu durchlaufen
  for (let j = 0; j < currentPokemon["types"].length; j++) {
    // Den Namen des aktuellen Typs des Pokémon in einer Variable speichern
    let pokemonType = currentPokemon["types"][j]["type"]["name"];

    // Das HTML für das Typsymbol des Pokémon zum Element mit der ID `typeCard${i}` hinzufügen
    document.getElementById(`typeCard${i}`).innerHTML += `
      <div>${fromImageToIcon(pokemonType)}</div>
      `;
  }
}

// Funktion zum Abrufen des HTML-Codes für das Typsymbol des Pokémon
function fromImageToIcon(pokemonType) {
  // Das HTML für das Typsymbol des Pokémon zurückgeben
  return `
<img src="img/${pokemonType}.png" class="categorieIcon"></img>
`;
}
