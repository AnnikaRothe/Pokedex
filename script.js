let loadedPokemon = 21; // so viele werden am Stück geladen
let currentLoadedPokemon = 1;
let listOfLoadedPokemons = [];

// Funktion zum Laden von Pokémon-Daten
async function loadPokemons() {
  // Schleife für das Laden von Pokémon-Daten von currentLoadedPokemon
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
    showPokemons(i);
    loadPokemonType(i, currentPokemon);
  }
}

//Funktion um die runtergeladenen Infos anzuzeigen
function showPokemons(i) {
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

function loadMorePokemons() {
  //sponsored by ChatGPT
  currentLoadedPokemon = loadedPokemon; // Speichert die Anzahl der bisher geladenen Pokémon
  loadedPokemon += 21; // Erhöht die Anzahl der zu ladenden Pokémon um 21
  loadPokemons(); // Ruft die Funktion auf, um weitere Pokémon zu laden

  if (!isLoading) {
    // Überprüft, ob bereits ein Ladevorgang im Gange ist
    isLoading = true; // Setzt isLoading auf true, um anzuzeigen, dass ein Ladevorgang gestartet wurde
    loadButton.disabled = true; // Deaktiviert den Load Button, um mehrfaches Klicken zu verhindern

    const start = loadedCount; // Speichert den Startindex für das Laden neuer Pokémon-Karten
    const end = Math.min(loadedCount + 3, pokemonData.length); // Berechnet den Endindex für das Laden neuer Pokémon-Karten

    for (let i = start; i < end; i++) {
      const newCard = createPokemonCard(pokemonData[i]); // Erzeugt eine neue Pokémon-Karte
      pokemonList.appendChild(newCard); // Fügt die neue Pokémon-Karte zur Liste hinzu
      loadedCount++; // Erhöht den Zähler der geladenen Pokémon-Karten
    }

    isLoading = false; // Setzt isLoading wieder auf false, um anzuzeigen, dass der Ladevorgang abgeschlossen ist
    loadButton.disabled = false; // Aktiviert den Load Button wieder
  }
}
