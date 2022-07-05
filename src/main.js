
const imgPokemon = document.querySelector('.screen-mid_poke-display')
const labelPokemonCounter = document.querySelector('.screen-mid_poke-number-display')
const labelPokemonName = document.querySelector('.pokedex-left_label-pokemon-name')
const labelPokemonDesc = document.querySelector('.poke_right-description-text')
const pokedexLights = document.querySelectorAll('.pokedex_light')
const pokedexDetector = document.querySelector('.pokedex_detector')
const containerBtnsBlue = document.querySelector('#containerBtnsBlue')



// const pokemons = []
// const getPokemon = async (num) => {
//     try {
//         //Setup a mini fetch-timer.
//         let time = 0;
//         let intervalFetch = setInterval(() => time++, 1);
//         intervalFetch;

//         //Fetch Pokemons URL
//         const url = `https://pokeapi.co/api/v2/pokemon/`;

//         //Fetch pokemons and push into array
//         for (let i = 1; i <= num; i++) {
//             const res = await fetch(`${url}${i}`);
//             const data = await res.json();
//             pokemons.push(data);
//         }

//         //Log fetch time in console.
//         clearInterval(intervalFetch);
//         console.log(`Pokemons Fetched! in ${(time / 1000).toFixed(2)} seconds.`);
//         console.log(pokemons)



//     } catch (err) {
//         new Error(err, "NOT gonna catch them all today.");
//     }
// };

// Get all Pokemons Count, so you know last Pokemon.
labelPokemonCounter.classList.add('hide')
let totalPokemons;

async function getCount() {

    try {
        const url = 'https://pokeapi.co/api/v2/pokemon/'

        const res = await fetch(url)
        if (!res.ok) throw new Error(`Couldn't Fetch anything bitch`)
        const data = await res.json()
        totalPokemons = data.count
        // console.log(`-----> Count of total Pokemons ${totalPokemons}`)


    }
    catch (e) {
        console.log(e)
    }
}
let pokemon;
async function getPokemon(id) {

    try {
        const url = 'https://pokeapi.co/api/v2/pokemon/'
        const res = await fetch(`${url}${id}`)
        if (!res.ok) new Error(`Couldn't Fetch anything bitch`)
        const data = await res.json()
        pokemon = data
        // console.log(pokemon)
        updateUI()
        clearInterval
    }
    catch (e) {
        console.log(e)
    }

}

getCount()

let lights;
function updateUI() {

    let id = pokemon.id
    imgPokemon.setAttribute('src', pokemon?.sprites?.front_default)
    labelPokemonName.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    labelPokemonCounter.classList.remove('hide')
    labelPokemonCounter.textContent = id.toString().padStart(3, '0')

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
const btnNum = document.querySelector('.poke_right-btn-blue')
const btnNums = Array.from(document.querySelectorAll('.poke_right-btn-blue')) //nodelist doesn't have indexof 

btnNums.forEach(btn => {
    btn.setAttribute('data-value', btnNums.indexOf(btn))
})


let numPokemon = ''; //global Pokemon Number

containerBtnsBlue.addEventListener('click', (e) => {

    numPokemon += e.target.dataset.value
    console.log(`Numpokemon Value: ${numPokemon}`)
    console.log(`length: ${numPokemon.length}`)
    if (numPokemon.length === 3) {
        getPokemon(+numPokemon)
        numPokemon = ''
    }
    if (numPokemon.length === 2) {
        getPokemon(+numPokemon.padStart(3, '0'))
    }
})


