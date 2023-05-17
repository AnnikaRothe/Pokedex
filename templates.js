function loadPokemonHTML(i) {
  return `
    <div class="mainCard" >
            <div class="cardHeadline">
                <h1 class="pokenumber" id="pokemonID${i}">#</h1>
               
                <div class="typeCard" id="typeCard${i}">
                    <div>
                    <div>
                    <h1 class="description" id="pokemonName${i}">#</h1>
                </div>
                    
                    <img src="" class="categorieIcon" id="pokemonType${i}">
                    </div>
                </div>
            </div>
            <div class="mainCardImage">
       <img   src="" id="pokemonImage${i}">
        </div>
        </div>

       
    `;
}
