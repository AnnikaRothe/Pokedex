let loadedPokemon = 21; // so viele werden am Stück geladen
let currentLoadedPokemon = 1;
let listOfLoadedPokemon = [];
let loading = false; //damit beim mehrmaligen Drücken des Buttons die Funktion nicht mehrmals ausgeführt wird, bevor der Ladevorgang beendet ist
/**
 * 
 * this function loads the pokemons
 * 
 */
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
    listOfLoadedPokemon.push(currentPokemon);
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
  loading = false;
}

//Funktion um die runtergeladenen Infos anzuzeigen
function showPokemons(i) {
  // Name anzeigen und ersten Buchstaben in Großbuchstaben umwandeln
  let pokemonNameElement = document.getElementById(`pokemonName${i}`);
  let name = currentPokemon["name"];
  let capitalizedFirstLetter = name.charAt(0).toUpperCase() + name.slice(1);
  pokemonNameElement.innerHTML = capitalizedFirstLetter;

  // Bild einfügen
  document.getElementById(`pokemonImage${i}`).src =
    currentPokemon["sprites"]["other"]["home"]["front_default"];

  // Nummer(ID) hinzufügen
  document.getElementById(`pokemonID${i}`).innerHTML += currentPokemon["id"];

  // Typen hinzufügen
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
  if (!loading) {
    loading = true;
    // Speichert die Anzahl der bisher geladenen Pokémon
    currentLoadedPokemon = loadedPokemon;

    // Erhöht die Anzahl der zu ladenden Pokémon um 21
    loadedPokemon += 21;

    // Ruft die Funktion auf, um weitere Pokémon zu laden
    loadPokemons();
  }
}

function filter() {
  // Den eingegebenen Suchtext abrufen und in Kleinbuchstaben umwandeln
  let search = document.getElementById("search").value;
  search = search.toLowerCase();

  // Den Hauptcontainer leeren, um Platz für die neuen Ergebnisse zu machen
  document.getElementById("mainContainer").innerHTML = "";

  // Durch die Liste der geladenen Pokémon iterieren
  for (let i = 0; i < listOfLoadedPokemon.length; i++) {
    // Den Namen des aktuellen Pokémon in Kleinbuchstaben abrufen
    let pokemon = listOfLoadedPokemon[i]["name"].toLowerCase();
    currentPokemon = listOfLoadedPokemon[i];

    // Überprüfen, ob der Name des Pokémon den Suchtext enthält
    if (listOfLoadedPokemon[i]["name"].includes(search)) {
      // Das HTML für das gefundene Pokémon zum Hauptcontainer hinzufügen
      document.getElementById("mainContainer").innerHTML += loadPokemonHTML(
        i,
        pokemon
      );

      // Den Typ des Pokémon laden und anzeigen
      loadPokemonType(i, currentPokemon);

      // Die Informationen des Pokémon anzeigen
      showPokemons(i, currentPokemon);
    }
  }
}

function checkSecondType(currentPokemon) {
  // Überprüfen, ob das aktuelle Pokemon zwei Typen hat
  if (currentPokemon["types"].length === 2) {
    // Wenn das Pokemon zwei Typen hat, HTML-Code für beide Typen generieren
    return /*html*/ `        
      <img src="img/${currentPokemon["types"][0]["type"]["name"]}.png" class="categorieIcon">
      <img src="img/${currentPokemon["types"][1]["type"]["name"]}.png" class="categorieIcon">
      `;
  } else {
    // Wenn das Pokemon nur einen Typ hat, HTML-Code für den einen Typ generieren
    return /*html*/ `
      <img src="img/${currentPokemon["types"][0]["type"]["name"]}.png" class="categorieIcon">
      `;
  }
}

function openOverlayCard(i) {
  // Die Overlay-Karte anzeigen
  document.getElementById("cardOverlay").style.display = "flex";
  // Das Scrollen des Body-Elements deaktivieren
  document.body.style.overflow = "hidden";

  // Alle Elemente mit der Klasse "header" auswählen
  let headerElements = document.getElementsByClassName("header");

  // Für jedes Header-Element die Position und das Z-Index zurücksetzen
  for (let i = 0; i < headerElements.length; i++) {
    headerElements[i].style.position = "static";
    headerElements[i].style.zIndex = "initial";
  }

  // Body-Margin-Top zurücksetzen
  document.body.style.marginTop = "0";

  // Aktuelles Pokemon aus der Liste abrufen
  currentPokemon = listOfLoadedPokemon[i - 1];

  // Overlay-Karte aktualisieren
  updateOverlayCard(i, currentPokemon);
}

function updateOverlayCard(i, currentPokemon) {
  // Den Pokemon-Typ des aktuellen Pokemons abrufen
  let pokemonType = currentPokemon["types"][0]["type"]["name"];

  // HTML-Code für die Overlay-Karte mit den aktuellen Pokemon-Daten generieren
  document.getElementById("cardOverlay").innerHTML = generateOverlayCardHTML(
    i,
    currentPokemon
  );

  // Das Element mit der ID "cardOverlayBack" auswählen
  let cardOverlayBack = document.getElementById("cardOverlayBack");

  // Vorherige Hintergrundfarben entfernen
  cardOverlayBack.classList.remove(
    "fire",
    "water",
    "grass",
    "electric",
    "rock",
    "ground",
    "bug",
    "poison",
    "flying",
    "psychic",
    "fighting",
    "ghost",
    "ice",
    "dragon",
    "dark",
    "steel",
    "fairy"
  );

  // Hintergrundfarbe des aktuellen Pokemon-Typs zur Overlay-Karte hinzufügen
  cardOverlayBack.classList.add(pokemonType);

  // Statistikdaten des aktuellen Pokemons rendern
  let statsData = renderPokemonStats(i);

  // Buttons der Overlay-Karte aktualisieren
  showCardButtons(i);

  // Moves des aktuellen Pokemons rendern
  renderPokemonMoves(i, currentPokemon);
}

function closeOverlayCard() {
  document.getElementById("cardOverlay").style.display = "none";
  document.body.style.overflow = "scroll";
  document.getElementById("mainContainer").style.marginTop = "100px";
}

function showCardButtons(i) {
  // Holt die Referenzen auf die Link- und Rechts-Buttons
  let leftButton = document.getElementById("left");
  let rightButton = document.getElementById("right");

  // Setzt das onclick-Attribut des linken Buttons
  leftButton.setAttribute(
    "onclick",
    `openOverlayCard(${
      i === 1 ? listOfLoadedPokemon.length : i - 1
    }); event.stopPropagation();`
  );

  // Setzt das onclick-Attribut des rechten Buttons
  rightButton.setAttribute(
    "onclick",
    `openOverlayCard(${
      i >= listOfLoadedPokemon.length ? 1 : i + 1
    }); event.stopPropagation();`
  );
}

function renderPokemonMoves(i, currentPokemon) {
  // Definieren der aktuellen Sektion, in diesem Fall "moves"
  let currentSection = "moves";

  // Zugriff auf das Moves-Container-Element
  let movesContainer = document.getElementById("sectionCards");

  // Leeren des Moves-Containers, indem der Inhalt gelöscht wird
  movesContainer.innerHTML = "";

  // Erstellen eines Container-Div-Elements für die Moves
  let moveDivContainer = document.createElement("div");

  // Hinzufügen der CSS-Klasse "moveContainer" zum Container-Div-Element
  moveDivContainer.classList.add("moveContainer");

  // Schleife zum Durchlaufen der Moves des aktuellen Pokemons
  for (let k = 0; k < listOfLoadedPokemon[i - 1]["moves"].length; k++) {
    // Extrahieren des Namens des aktuellen Moves
    let move = listOfLoadedPokemon[i - 1]["moves"][k]["move"]["name"];

    // Hinzufügen des HTML-Codes für eine Move-Karte zum Container-Div-Element
    moveDivContainer.innerHTML += `
      <div class="moveCard" id="moveCard">
      <div class="move">${move}</div>
      </div>        
      `;
  }

  // Hinzufügen des Container-Div-Elements zum Moves-Container
  movesContainer.appendChild(moveDivContainer);
}

function renderPokemonAbility(i, currentPokemon) {
  // Definieren der aktuellen Sektion, in diesem Fall "ability"
  let currentSection = "ability";

  // Zugriff auf das Ability-Container-Element
  let abilityContainer = document.getElementById("sectionCards");

  // Leeren des Inhalts des Ability-Containers
  abilityContainer.innerHTML = "";

  // Erstellen eines Container-Div-Elements für die Abilities
  let abilityDivContainer = document.createElement("div");

  // Hinzufügen der CSS-Klasse "abilityContainer" zum Container-Div-Element
  abilityDivContainer.classList.add("abilityContainer");

  // Schleife zum Durchlaufen der Abilities des aktuellen Pokemons
  for (let j = 0; j < listOfLoadedPokemon[i - 1]["abilities"].length; j++) {
    // Extrahieren des Namens der aktuellen Ability
    let ability = listOfLoadedPokemon[i - 1]["abilities"][j]["ability"]["name"];

    // Hinzufügen des HTML-Codes für eine Ability-Karte zum Container-Div-Element
    abilityDivContainer.innerHTML += `
      <div class="abilityCard" id="moveCard">
      <div class="ability">${ability}</div>
      </div>
      
      `;
  }

  // Hinzufügen des Container-Div-Elements zum Ability-Container
  abilityContainer.appendChild(abilityDivContainer);
}

function renderPokemonStats(i) {
  // Ein leeres Array, um die Statistikdaten zu speichern
  let datas = [];
  // Überprüfung, ob das Pokemon Statistikdaten hat
  if (listOfLoadedPokemon[i - 1]["stats"].length > 0) {
    // Schleife zum Durchlaufen der Statistikdaten des Pokemons
    for (let j = 0; j < listOfLoadedPokemon[i - 1]["stats"].length; j++) {
      // Extrahieren der Basisstatistik für den aktuellen Statistikwert
      let stats = listOfLoadedPokemon[i - 1].stats[j].base_stat;
      // Hinzufügen der Basisstatistik zum `datas`-Array
      datas.push(stats);
    }
  }
  // Rückgabe des `datas`-Arrays mit den Statistikdaten
  return datas;
}
