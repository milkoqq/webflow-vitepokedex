// const { type } = require("jquery")

// DOM Manipulators
const imgPokemon = document.querySelector('.main__mid-display-img')
const imgPokemonType = document.querySelector('.pokemon__type-img')

// DOM / Text Labels
const labelPokemonCounter = document.querySelector('.main__mid-display-pokeid')
const labelPokemonName = document.querySelector('.main__pokemon-name-txt')
const labelPokemonDesc = document.querySelector('.pokedex__right-description')

const pokedexLights = document.querySelectorAll('.pokedex__light')
const pokedexDetector = document.querySelector('.main__top-detector')

// DOM / Buttons
const containerBtnsBlue = document.querySelector('.pokedex__right-btn-wrapper')
const btnNum = document.querySelector('.pokedex__right-btn-num')
const btnNums = Array.from(document.querySelectorAll('.pokedex__right-btn-num')) //nodelist doesn't have indexof 
const btnRandom = document.querySelector('.pokedex__random')
const btnUp = document.querySelector('#cross__box-top')
const btnRight = document.querySelector('#cross__box-right')
const btnBottom = document.querySelector('#cross__box-bottom')
const btnLeft = document.querySelector('#cross__box-left')



// Global Variables
let isFrontSprite = false
let pokemonFrontSprite;
let pokemonBackSprite;
let pokemon; // Global Pokemon Object
let pokemonDesc; //Global Pokemon Description
let pokemonType = ''
let lights;
let lastPokemon = 898 // probably, for now.
let lastPokemonId;
let numPokemon = ''; // Global Pokemon Number
let varTypeWrite = false // Global state of typewriting. Allows for typewriting effect to finish before next event.

// Stuff that should happen on initialization.
function init() {
    wait(4)
        .then(() => {
            typeWrite('Hello there! Welcome to the world of pokémon!💖 My name is Prof. Oak! This is your pokédex a tool to find any pokémon..', 38, labelPokemonDesc)
        })
}

// One JSON function to get em all.
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};

// Fetching Pokemon function
async function getPokemon(id) {
    try {
        pokemon = await getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, `Couldn't Fetch Pokemon`)
        let pokemonSpecies = await getJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`, `Couldn't Fetch Description`)
        let pokemonInEn = pokemonSpecies.flavor_text_entries.find(entry => entry.language.name === 'en')
        lastPokemonId = pokemon.id
        pokemonDesc = pokemonInEn.flavor_text
        pokemonFrontSprite = pokemon?.sprites?.front_default
        pokemonBackSprite = pokemon?.sprites?.back_default

        updateUI()
    }
    catch (e) {
        console.log(e)
    }

}

// Updating UI
function updateUI() {
    clearInterval(lights)
    let id = pokemon.id
    isFrontSprite = true
    imgPokemon.setAttribute('src', pokemon?.sprites?.front_default)
    labelPokemonName.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    labelPokemonCounter.classList.remove('hide')
    labelPokemonCounter.textContent = id.toString().padStart(3, '0')
    imgPokemonType.src = setAsset(pokemon.types[0].type.name)
    typeWrite(String(pokemonDesc), 15, labelPokemonDesc)
    setLights()

}

// Setting some CSS interactions
function setLights() {
    for (let i = 0; i < pokedexLights.length; i++) {

        lights = setInterval(() => {
            pokedexLights[i].classList.toggle('inner-light')
        }, (i * 1000) + 2000)

        lights

    }

}

// Promisifying setTimeout for control.
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// DOM data-value setter
btnNums.forEach(btn => {
    btn.setAttribute('data-value', btnNums.indexOf(btn))
})

//Fetch Pokemon on Click. 
containerBtnsBlue.addEventListener('click', (e) => {
    if (varTypeWrite) return
    numPokemon += e.target.dataset.value
    labelPokemonDesc.textContent = ''
    labelPokemonDesc.textContent = `Seeking pokémon...... ${numPokemon}`

    wait(2)
        .then(() => {
            if ((numPokemon.length > 3) || (numPokemon === '0') || (+numPokemon > lastPokemon)) {
                labelPokemonDesc.textContent = 'Pokémon Not Found...... Try again...'
                numPokemon = ''

            }
            if (numPokemon.length === 0) return
            getPokemon(+numPokemon)
            numPokemon = ''
        })
        .catch((e) => console.log(e))
})


//Typewriting Effect. Can be used anywhere. Variable sets the state, so nothing else is clickable while functioning. 
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

//Inserting assets according to type.
function setAsset(type) {
    switch (type) {
        case 'normal':
            return 'https://cdn2.bulbagarden.net/upload/3/39/NormalIC_Big.png';
        case 'fighting':
            return 'https://cdn2.bulbagarden.net/upload/6/67/FightingIC_Big.png';
        case 'flying':
            return 'https://cdn2.bulbagarden.net/upload/c/cb/FlyingIC_Big.png';
        case 'poison':
            return 'https://cdn2.bulbagarden.net/upload/3/3d/PoisonIC_Big.png';
        case 'ground':
            return 'https://cdn2.bulbagarden.net/upload/8/8f/GroundIC_Big.png';
        case 'rock':
            return 'https://cdn2.bulbagarden.net/upload/c/ce/RockIC_Big.png';
        case 'bug':
            return 'https://cdn2.bulbagarden.net/upload/c/c8/BugIC_Big.png';
        case 'ghost':
            return 'https://cdn2.bulbagarden.net/upload/7/73/GhostIC_Big.png';
        case 'steel':
            return 'https://cdn2.bulbagarden.net/upload/d/d4/SteelIC_Big.png';
        case 'fire':
            return 'https://cdn2.bulbagarden.net/upload/2/26/FireIC_Big.png';
        case 'water':
            return 'https://cdn2.bulbagarden.net/upload/5/56/WaterIC_Big.png';
        case 'grass':
            return 'https://cdn2.bulbagarden.net/upload/7/74/GrassIC_Big.png';
        case 'electric':
            return 'https://cdn2.bulbagarden.net/upload/4/4a/ElectricIC_Big.png';
        case 'psychic':
            return 'https://cdn2.bulbagarden.net/upload/6/60/PsychicIC_Big.png';
        case 'ice':
            return 'https://cdn2.bulbagarden.net/upload/6/6f/IceIC_Big.png';
        case 'dragon':
            return 'https://cdn2.bulbagarden.net/upload/4/48/DragonIC_Big.png';
        case 'dark':
            return 'https://cdn2.bulbagarden.net/upload/5/56/DarkIC_Big.png';
        case 'fairy':
            return 'https://cdn2.bulbagarden.net/upload/d/df/Picross_FairyIC.png';
        default:
            return 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
    }
}

// Random Pokemon handler button!
btnRandom.addEventListener('click', () => {
    wait(2).then(() => getPokemon(randomPokemon(1, lastPokemon)))

})

// Random fetch function
function randomPokemon(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Change Sprite front-to-back & vice-verca
function changeSpriteSide() {
    if (!lastPokemonId) return
    isFrontSprite === true ? imgPokemon.setAttribute('src', pokemonBackSprite) : imgPokemon.setAttribute('src', pokemonFrontSprite)
    isFrontSprite = !isFrontSprite
}

// Cross Buttons Prev/Next & Front/Back Sprites!
btnUp.addEventListener('click', () => {
    wait(2)
        .then(() => lastPokemonId === 1 ? null : getPokemon(lastPokemonId - 1))
})
btnBottom.addEventListener('click', () => {
    wait(2).then(() => lastPokemonId === lastPokemon ? null : getPokemon(lastPokemonId + 1))
})

btnLeft.addEventListener('click', () => {
    changeSpriteSide()
})

btnRight.addEventListener('click', () => {
    changeSpriteSide()
})

// Initialization
init()

