var Nightmare = require('nightmare');


var PokeGo = function() {

}

PokeGo.prototype.getPokemonNearMe = function(lon, lat, funcPokes) {
    /* set up poke url */
    this.url = "https://fastpokemap.se/#" + lon + "," + lat;
    
    /* inner function that helps to get pokemon array */
    var getPokemons = function() {
        var pokemons = document.getElementsByClassName('displaypokemon');
        var pokeArray = [];
        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            var id = parseInt(pokemon.dataset.pokeid);
            var imgUrl = pokemon.firstChild.firstChild.src;
            var expire = pokemon.childNodes[1].dataset.expire;
            pokeArray.push({id, imgUrl, expire});
        }
        return pokeArray;
    };
    
    /* scrape the url and get the pokemons! */
    var nightmare = Nightmare();
    nightmare
    .goto(this.url)
    .click('.close')
    .click('.leaflet-control-zoom-out')
    .wait()
    .evaluate(getPokemons)
    .run(function(err, nightmare) {
        if (err) return console.log(err);
        funcPokes(nightmare);
        console.log('Done!');
    })
    .end();
}


/*  POKE ELEMENT in FAST LOOKS LIKE THIS CURRENTLY

    <div class="displaypokemon hidden" data-pokeid="16">
        <div class="pokeimg">
            <img src=""></div>
        <div class="remainingtext" data-expire="1474080043108">
        </div>
    </div>
*/
module.exports = PokeGo;



