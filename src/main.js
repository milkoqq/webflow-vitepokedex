
const imgPokemon = document.querySelector('.screen-mid_poke-display')

const labelPokemonCounter = document.querySelector('.screen-mid_poke-number-display')
const labelPokemonName = document.querySelector('.pokedex-left_label-pokemon-name')
const labelPokemonDesc = document.querySelector('.poke_right-description-text')

const pokedexLights = document.querySelectorAll('.pokedex_light')
const pokedexDetector = document.querySelector('.pokedex_detector')

const containerBtnsBlue = document.querySelector('#containerBtnsBlue')
const btnNum = document.querySelector('.poke_right-btn-blue')
const btnNums = Array.from(document.querySelectorAll('.poke_right-btn-blue')) //nodelist doesn't have indexof 

function init() {
    labelPokemonCounter.classList.add('hide')
    // labelPokemonDesc.textContent = 'Hello there! Welcome to the world of pokémon! My name is Oak! This is your pokédex a tool to find any pokémon..'
    typeWrite('Hello there! Welcome to the world of pokémon! My name is Oak! This is your pokédex a tool to find any pokémon..', labelPokemonDesc, 20)
}

function typeWrite(str, element, speed) {
    let i = 0;
    if (i < str.length) {
        element.innerHTML += str.charAt(i);
        i++;
        setTimeout(typeWrite, speed);
    }
}


let pokemon; // Global Pokemon Object
let lights;
let lastPokemon = '898' // probably, for now.
let numPokemon = ''; // Global Pokemon Number

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

<<<<<<< Updated upstream
btnNums.forEach(btn => {
    btn.setAttribute('data-value', btnNums.indexOf(btn))
})

=======

let numPokemon = ''; //global Pokemon Number
>>>>>>> Stashed changes

containerBtnsBlue.addEventListener('click', (e) => {

    numPokemon += e.target.dataset.value
    labelPokemonDesc.textContent = `Seeking pokemon...... ${numPokemon}`
    wait(2)
        .then(() => {
            if (numPokemon.length > 3) {
                labelPokemonDesc.textContent = 'Invalid Pokemon ID.....'
                numPokemon = ''

            }
            getPokemon(+numPokemon)
            numPokemon = ''
        })
        .catch((e) => console.log(e))

})


init()