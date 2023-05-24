function loadPokemonHTML(i) {
  return /*html*/ `
  
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
  return /*html*/ `
  <div><img class="x" src="img/x.png" alt="exit" onclick="closeOverlayCard()"></div>
      
  <div><img id="left" src="img/left.png" alt="back"></div>
  <div class="BigCard">
<div class="cardOverlay front">            
  
  <div class="cardHeadline">
      <p class="pokeNumber" id="">#${currentPokemon["id"]}</p>        
      
  </div>
  <div class="cardImgOverlay"><img src="${
    currentPokemon["sprites"]["back_shiny"]
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
  <div class="pokemonWeight"><p>  Weight:</p><div><p>${
    currentPokemon["weight"] / 10 // durch 10 teilen, da Ergebnis zu hoch
  } kg</p></div>
  </div>
  <img class="imgBack" src="${currentPokemon["sprites"]["front_shiny"]}">
  <div class="pokemonHeight"><p>Height:  </p><div><p>${
    currentPokemon["height"] / 10
  } m</p></div>
  </div>
  </div>
  
  <div>
      <h1 class="description descriptionBack" id="">${
        currentPokemon["name"]
      }</h1>        
  </div>
  <div class="sections">
  <div  onclick="renderPokemonMoves(${i}); event.stopPropagation()" id="movesSection"><h3 class= "colorSection">Moves</h3></div>
  <div  onclick="renderPokemonAbility(${i}); event.stopPropagation()" id="abilitySection"><h3 class= "colorSection">Abilities</h3></div>
  
  </div>

  <div class="sectionCards" id="sectionCards">
      
       </div>          
   </div>
</div>
</div>
<div><img id="right" src="img/right.png" alt="forward"></div>
  `;
}
