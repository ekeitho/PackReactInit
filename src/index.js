//import Monster from './monster';
import ReactDOM from 'react-dom';
import React from 'react';
import pokedex from 'simple-pokedex';
//const pokedex = require('simple-pokedex');
import PokeGo from './pokego';

var inPokemonNeededList = function(id) {
    var myPokemon = [3,5,6,26,31,45, 57,65, 71, 78, 
            82, 83, 87, 89, 91, 94, 97, 101, 
            105, 107, 108, 110, 112, 115, 122, 
            130, 131, 132, 137, 141, 144, 145, 
            146, 148, 149, 150, 151, 152, 153, 154, 156];
    return myPokemon.includes(id);
}

var onPokeSuccess = function(pokeArray) {
    var actualPokemon = [];
    
    /* filter out the pokemon we want to notify the user */
    for (var i = 0; i < pokeArray.length; i++) {
        var pokemon = pokeArray[i];
        if (inPokemonNeededList(pokemon.id)) {
            console.log(pokemon.id);
            actualPokemon.push(pokemon);
        }
    }
    
    for (var i = 0; i < actualPokemon.length; i++) {
        var pokemon = actualPokemon[i];
        var pokedexData = pokedex(pokemon.id);
        console.log(pokedexData.nameEn + " is nearby!");
    }
    
    /* do something with the results */
}

var Monster = React.createClass({
    render: function() {
        return (
            <div style={{width:"50px",height:"50px",backgroundColor:"blue"}}>
                
            </div>
        )
    },
    componentDidMount: function() {
        var poke = new PokeGo();
        poke.getPokemonNearMe(37.80693585437371, -122.41387367248537, onPokeSuccess);
    }
});


ReactDOM.render(<Monster />, document.getElementById('content'));