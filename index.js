// import { blueCards } from './assets/MythicCards/blue/index.js'
// import { brownCards } from './assets/MythicCards/brown/index.js'
// import { greenCards } from './assets/MythicCards/green/index.js'

const ancients = document.querySelector('.container-ancients');
const difficults = document.querySelectorAll('.difficulty');
const containerDifficults = document.querySelector('.container-difficults');
const levelOfDifficults = [
    'veryEasy',
    'easy',
    'normal',
    'high',
    'insane'
]

const img = [
    './assets/Ancients/Azathoth.png',
    './assets/Ancients/Cthulthu.png',
    './assets/Ancients/IogSothoth.png',
    './assets/Ancients/ShubNiggurath.png'
]

const GODS = ['azathoth',
    'cthulhu',
    'iogSothoth',
    'shubNiggurath'
];

img.forEach(item => {
    let ancientDiv = document.createElement('div');
    ancientDiv.classList.add('ancient');
    ancientDiv.style.backgroundImage = `url('${item}')`
    ancients.appendChild(ancientDiv);
})

difficults.forEach((item, index) => {
    item.id = levelOfDifficults[index];
})

const cardsNumber = {
    'green': 18,
    'brown': 21,
    'blue': 12,
}
const greenCards = [];
const blueCards = [];
const brownCards = [];

function decks(arr, cardsNumber, colorDeck) {
    for (let i = 1; i <= cardsNumber; i++) {
        arr.push(`./assets/mythicCards/${colorDeck}/${colorDeck}${i}.png`)
    }
    return arr;
}
decks(greenCards, cardsNumber['green'], 'green');
decks(blueCards, cardsNumber['blue'], 'blue');
decks(greenCards, cardsNumber['brown'], 'brown');

const ancient = document.querySelectorAll('.ancient');
ancient.forEach((item, index) => {
    item.id = GODS[index];
})

ancients.addEventListener('click', (event) => {
    if (!event.target.classList.contains('ancient')) {
        return
    } else {
        ancient.forEach((item) => item.classList.remove('active'));
        event.target.classList.add('active');
    }
})


containerDifficults.addEventListener('click', (event) => {
    if (!event.target.classList.contains('difficulty')) {
        return
    } else {
        difficults.forEach((item) => item.classList.remove('active'));
        event.target.classList.add('active');
    }
})