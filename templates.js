function loadPokemonHTML(i) {
  return `
  
  <div class="card2" >
    <div class="mainCard" >
    <div class="cardHeadline">
    <p id="pokemonID${i}">#</p>
    <div class="typeCard" id="typeCard${i}">
        <div>
        <img src="" class="categorieIcon" id="pokemonType${i}">
        </div>
    </div>
  </div>
  <div>
  <h1 class="name" id="pokemonName${i}">#</h1>
  </div>
                
                
            
            <div class="mainCardImage">
       <img   src="" id="pokemonImage${i}" onclick="openOverlayCard(${i})">
        </div>
        </div>

       
    `;
}

function generateOverlayCardHTML(i, currentPokemon) {
  return `
  <div><img class="x" src="img/x.png" alt="exit" onclick="closeOverlayCard()"></div>
      
  <div><img class="left" id="left" src="img/left.png" alt="previousImg"></div>
  <div class="BigCard">
<div class="cardOverlay front">            
  
  <div class="cardHeadline">
      <p class="pokeNumber" id="">#${currentPokemon["id"]}</p>        
      <div class="typeCard" id="typeCard${i}">
          <div style="display:flex">
          ${checkSecondType(currentPokemon)} 
          </div>
      </div>
  </div>
  <div class="cardImgOverlay"><img src="${
    currentPokemon["sprites"]["other"]["home"]["front_default"]
  }"></div>
  <div>
      <h1 class="descriptionOverlay" id="">${currentPokemon["name"]}</h1>      
  </div>
</div>

<div class="cardOverlay back" id="cardOverlayBack" >            
  
  <div class="cardHeadline">
      <h1 class="pokeNumber" id="">#${currentPokemon["id"]}</h1>        
      <div class="typeCard" id="typeCard${i}">
          <div style="display:flex">
          ${checkSecondType(currentPokemon)} 
          </div>
      </div>
  </div>
  
  <div class="cardImgOverlay cardImgBack ">
  <div class="pokemonWeight"><h3>Weight:</h3><div><h3>${
    currentPokemon["weight"] / 10 // durch 10 teilen, da Ergebnis zu hoch
  } kg</h3></div>
  </div>
  <img class="imgBack" src="${
    currentPokemon["sprites"]["other"]["home"]["front_default"]
  }">
  <div class="pokemonHeight"><h3>Height:</h3><div><h3>${
    currentPokemon["height"] / 10
  } m</h3></div>
  </div>
  </div>
  
  <div>
      <h1 class="description descriptionBack" id="">${
        currentPokemon["name"]
      }</h1>        
  </div>
  <div class="sections">
      <div onclick="renderPokemonMoves(${i})" id="movesSection"><h3>Moves</h3></div>
      <div onclick="renderPokemonAbility(${i})" id="abilitySection"><h3>Abilities</h3></div>
  </div>

  <div class="sectionCards" id="sectionCards">
      
       </div>          
   </div>
</div>
</div>
<div><img class="right" id="right" src="img/right.png" alt="nextImg"></div>
  `;
}
