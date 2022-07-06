// const { type } = require("jquery")

const imgPokemon = document.querySelector('.screen-mid_poke-display')

const labelPokemonCounter = document.querySelector('.screen-mid_poke-number-display')
const labelPokemonName = document.querySelector('.pokedex-left_label-pokemon-name')
const labelPokemonDesc = document.querySelector('.poke_right-description-text')

const pokedexLights = document.querySelectorAll('.pokedex_light')
const pokedexDetector = document.querySelector('.pokedex_detector')

const containerBtnsBlue = document.querySelector('#containerBtnsBlue')
const btnNum = document.querySelector('.poke_right-btn-blue')
const btnNums = Array.from(document.querySelectorAll('.poke_right-btn-blue')) //nodelist doesn't have indexof 


let pokemon; // Global Pokemon Object
let lights;
let lastPokemon = '898' // probably, for now.
let numPokemon = ''; // Global Pokemon Number
let varTypeWrite = false // Global state of typewriting. Allows for typewriting effect to finish before next event.

// Stuff that should happen on initialization.
function init() {
    wait(0.3)
        .then(() => {
            typeWrite('Hello there! Welcome to the world of pokémon! My name is Oak! This is your pokédex a tool to find any pokémon..', 38, labelPokemonDesc)
        })

}

async function getPokemon(id) {

    try {
        const url = 'https://pokeapi.co/api/v2/pokemon/'
        const res = await fetch(`${url}${id}`)
        if (!res.ok) new Error(`Couldn't Fetch anything bitch`)
        const data = await res.json()
        pokemon = data


        // console.log(pokemon)
        updateUI()
    }
    catch (e) {
        console.log(e)
    }

}

function updateUI() {
    clearInterval(lights)
    let id = pokemon.id
    imgPokemon.setAttribute('src', pokemon?.sprites?.front_default)
    labelPokemonName.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    labelPokemonCounter.classList.remove('hide')
    labelPokemonCounter.textContent = id.toString().padStart(3, '0')
    // labelPokemonDesc.textContent = pokemon
    setLights()

}


function setLights() {
    for (let i = 0; i < pokedexLights.length; i++) {

        lights = setInterval(() => {
            pokedexLights[i].classList.toggle('inner-light')
        }, (i * 1000) + 2000)

        lights

    }

}

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

btnNums.forEach(btn => {
    btn.setAttribute('data-value', btnNums.indexOf(btn))
})


containerBtnsBlue.addEventListener('click', (e) => {
    if (varTypeWrite) return
    numPokemon += e.target.dataset.value
    labelPokemonDesc.textContent = ''
    labelPokemonDesc.textContent = `Seeking pokémon...... ${numPokemon}`
    wait(2)
        .then(() => {
            if (numPokemon.length > 3) {
                labelPokemonDesc.textContent = 'Pokémon Not Found......'
                numPokemon = ''

            }
            getPokemon(+numPokemon)
            numPokemon = ''
        })
        .catch((e) => console.log(e))

})



//Typewriting effect as needed! :)

function typeWrite(str, speed, element) {
    varTypeWrite = true
    element.textContent = ''
    let i = 0;
    function typer() {
        if (i < str.length) {
            element.textContent += str.charAt(i);
            i++;
            setTimeout(typer, speed);
        }
        element.textContent.length === str.length ? varTypeWrite = false : varTypeWrite = true // Guard clause
    }
    typer()
}

init()

