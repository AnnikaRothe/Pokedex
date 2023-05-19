function loadPokemonHTML(i) {
  return `
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
  <h1 class="name" id="pokemonName${i}">Charmander</h1>
  </div>
                
                
            
            <div class="mainCardImage">
       <img   src="" id="pokemonImage${i}">
        </div>
        </div>

       
    `;
}
