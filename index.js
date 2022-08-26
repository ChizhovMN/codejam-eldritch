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
    './assets/Ancients/Azathoth.jpg',
    './assets/Ancients/Cthulthu.jpg',
    './assets/Ancients/IogSothoth.jpg',
    './assets/Ancients/ShubNiggurath.jpg'
]

const GODS = ['azathoth',
    'cthulhu',
    'iogSothoth',
    'shubNiggurath'
];


const ancientsData = [
    {
        id: 'azathoth',
        name: 'azathoth',
        firstStage: {
            greenCards: 1,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 2,
            blueCards: 1,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 2,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'cthulhu',
        name: 'cthulhu',
        firstStage: {
            greenCards: 0,
            blueCards: 2,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 1,
            blueCards: 0,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 3,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'iogSothoth',
        name: 'iogSothoth',
        firstStage: {
            greenCards: 0,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 2,
            blueCards: 1,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 3,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'shubNiggurath',
        name: 'shubNiggurath',
        firstStage: {
            greenCards: 1,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 3,
            blueCards: 1,
            brownCards: 2,
        },
        thirdStage: {
            greenCards: 2,
            blueCards: 0,
            brownCards: 4,
        },
    },
]

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
        arr.push(`./assets/MythicCards/${colorDeck}/${colorDeck}${i}.jpg`)
    }
    return arr;
}

decks(greenCards, cardsNumber['green'], 'green');
decks(blueCards, cardsNumber['blue'], 'blue');
decks(brownCards, cardsNumber['brown'], 'brown');

const ancient = document.querySelectorAll('.ancient');
ancient.forEach((item, index) => {
    item.id = GODS[index];
})

const descriptionGame = {
    'veryEasy': 'Из набора берутся все карты со снежинками, если карт не хватает то добираются обычные карты',
    'easy': 'Из набора убираются карты с щупальцами',
    'normal': 'Набор остается нетронутым',
    'high': 'Из набора убираются карты со снежинками',
    'insane': 'Из набора берутся все карты со щупальцами, если карт не хватает то добираются обычные карты',
}


const difficultDesription = document.querySelector('.difficult-description');

ancients.addEventListener('click', (event) => {
    if (!event.target.classList.contains('ancient')) {
        return
    } else {
        ancient.forEach((item) => item.classList.remove('active'));
        event.target.classList.add('active');
    }
})

difficultDesription.innerHTML = descriptionGame['normal'];

containerDifficults.addEventListener('click', (event) => {
    if (!event.target.classList.contains('difficulty')) {
        return
    } else {
        difficults.forEach((item) => item.classList.remove('active'));
        event.target.classList.add('active');
        difficultDesription.innerHTML = descriptionGame[event.target.id];
    }
})

let green = [];
let blue = [];
let brown = [];



function mixDeck(id) {
    ancientsData.map((item) => {
        if (item.id === id) {
            green = [item.firstStage.greenCards, item.secondStage.greenCards, item.thirdStage.greenCards];
            blue = [item.firstStage.blueCards, item.secondStage.blueCards, item.thirdStage.blueCards];
            brown = [item.firstStage.brownCards, item.secondStage.brownCards, item.thirdStage.brownCards];
        }
    })
}

let sumOfGreenCards, sumOfBrownCards, sumOfBlueCards;


const shuffle = document.querySelector('.shuffle-button');
const deckStages = document.querySelector('.deck-stages');
const deck = document.querySelector('.deck');

let isAncient = false;
let ancientId;

function selectedAncient() {
    for (let i = 0; i < ancient.length; i++) {
        if (ancient[i].classList.contains('active')) {
            isAncient = true;
            ancientId = ancient[i].id;
            break
        } else {
            isAncient = false;
        }
    }
    return isAncient;
}

let stageContainer;
let stageText;
let dotsContainer;
let dots;

const color = ['green', 'brown', 'blue']


function madeStages() {
    for (let i = 0; i < 3; i++) {
        stageContainer = document.createElement('div');
        stageText = document.createElement('span');
        dotsContainer = document.createElement('div');

        stageContainer.classList.add('stage-container')
        stageText.classList.add('stage-text');
        dotsContainer.classList.add('dots-container')

        deckStages.appendChild(stageContainer);
        stageContainer.appendChild(stageText);
        stageContainer.appendChild(dotsContainer);

        for (let j = 0; j < 3; j++) {
            dots = document.createElement('div');
            dots.classList.add(`dots`)
            dots.classList.add(`${color[j]}`)
            dotsContainer.appendChild(dots);
            dots.innerHTML = 0;
        }
        stageText.innerHTML = `${i + 1} STAGE`;
    }
}
deck.style.display = 'none';
madeStages();


function change() {
    document.querySelectorAll('.green').forEach((item, index) => item.innerHTML = green[index])
    document.querySelectorAll('.brown').forEach((item, index) => item.innerHTML = brown[index])
    document.querySelectorAll('.blue').forEach((item, index) => item.innerHTML = blue[index])
}



const unknowCards = document.querySelector('.unknown-card');
const lastCard = document.querySelector('.last-card');

let stackOfGreenCards, stackOfBrownCards, stackOfBlueCards;

let stackOfGreen, stackOfBrown, StackOfBlue;

let stackOfFirstStage, stackOfSecondStage, stackOfThirdStage;
const uniqSnow = {
    './assets/MythicCards/green/green1.jpg': '',
    './assets/MythicCards/green/green12.jpg': '',
    './assets/MythicCards/green/green16.jpg': '',
    './assets/MythicCards/green/green17.jpg': '',
    './assets/MythicCards/green/green18.jpg': '',
    './assets/MythicCards/brown/brown11.jpg': '',
    './assets/MythicCards/brown/brown12.jpg': '',
    './assets/MythicCards/brown/brown13.jpg': '',
    './assets/MythicCards/brown/brown14.jpg': '',
    './assets/MythicCards/brown/brown21.jpg': '',
    './assets/MythicCards/blue/blue3.jpg': '',
    './assets/MythicCards/blue/blue4.jpg': '',
    './assets/MythicCards/blue/blue5.jpg': '',
    './assets/MythicCards/blue/blue10.jpg': '',
}
const uniqOctupus = {
    './assets/MythicCards/green/green2.jpg': '',
    './assets/MythicCards/green/green3.jpg': '',
    './assets/MythicCards/green/green4.jpg': '',
    './assets/MythicCards/green/green5.jpg': '',
    './assets/MythicCards/green/green6.jpg': '',
    './assets/MythicCards/brown/brown6.jpg': '',
    './assets/MythicCards/brown/brown7.jpg': '',
    './assets/MythicCards/brown/brown8.jpg': '',
    './assets/MythicCards/brown/brown9.jpg': '',
    './assets/MythicCards/brown/brown10.jpg': '',
    './assets/MythicCards/blue/blue1.jpg': '',
    './assets/MythicCards/blue/blue2.jpg': '',
    './assets/MythicCards/blue/blue6.jpg': '',
    './assets/MythicCards/blue/blue8.jpg': '',
}
const uniqGreenSnow = {
    './assets/MythicCards/green/green1.jpg': '',
    './assets/MythicCards/green/green12.jpg': '',
    './assets/MythicCards/green/green16.jpg': '',
    './assets/MythicCards/green/green17.jpg': '',
    './assets/MythicCards/green/green18.jpg': '',
},
    uniqBrownSnow = {
        './assets/MythicCards/brown/brown11.jpg': '',
        './assets/MythicCards/brown/brown12.jpg': '',
        './assets/MythicCards/brown/brown13.jpg': '',
        './assets/MythicCards/brown/brown14.jpg': '',
        './assets/MythicCards/brown/brown21.jpg': '',
    },
    uniqBLueSnow = {
        './assets/MythicCards/blue/blue3.jpg': '',
        './assets/MythicCards/blue/blue4.jpg': '',
        './assets/MythicCards/blue/blue5.jpg': '',
        './assets/MythicCards/blue/blue10.jpg': '',
    };

const uniqGreenOctupus = {
    './assets/MythicCards/green/green2.jpg': '',
    './assets/MythicCards/green/green3.jpg': '',
    './assets/MythicCards/green/green4.jpg': '',
    './assets/MythicCards/green/green5.jpg': '',
    './assets/MythicCards/green/green6.jpg': '',
},
    uniqBrownOctupus = {
        './assets/MythicCards/brown/brown6.jpg': '',
        './assets/MythicCards/brown/brown7.jpg': '',
        './assets/MythicCards/brown/brown8.jpg': '',
        './assets/MythicCards/brown/brown9.jpg': '',
        './assets/MythicCards/brown/brown10.jpg': '',
    },
    uniqBlueOctupus = {
        './assets/MythicCards/blue/blue1.jpg': '',
        './assets/MythicCards/blue/blue2.jpg': '',
        './assets/MythicCards/blue/blue6.jpg': '',
        './assets/MythicCards/blue/blue8.jpg': '',
    }

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function commonMixCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function mixStages(arr, stage = '') {
    arr = [];
    for (let i = 1; i <= green[stage - 1]; i++) {
        arr.push(stackOfGreenCards.splice(0, 1))
    }
    for (let i = 1; i <= brown[stage - 1]; i++) {
        arr.push(stackOfBrownCards.splice(0, 1));
    }
    for (let i = 1; i <= blue[stage - 1]; i++) {
        arr.push(stackOfBlueCards.splice(0, 1));
    }
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.flat();
}

function veryEasyDeck() {
    const copyUniqGreenOctupus = Object.assign({}, uniqGreenOctupus);
    const copyUniqBrownOctupus = Object.assign({}, uniqBrownOctupus);
    const copyUniqBlueOctupus = Object.assign({}, uniqBlueOctupus);

    stackOfGreenCards = [];
    stackOfBrownCards = [];
    stackOfBlueCards = [];

    for (let keys in uniqGreenSnow) {
        stackOfGreenCards.push(keys);
    }
    stackOfGreenCards = commonMixCards(stackOfGreenCards);

    if (stackOfGreenCards.length < sumOfGreenCards) {
        while (stackOfGreenCards.length < sumOfGreenCards) {
            let randomGreen = random(1, greenCards.length);
            if (`./assets/MythicCards/green/green${randomGreen}.jpg` in copyUniqGreenOctupus || `./assets/MythicCards/green/green${randomGreen}.jpg` in uniqGreenSnow) {
                continue
            } else {
                stackOfGreenCards.push(`./assets/MythicCards/green/green${randomGreen}.jpg`)
                copyUniqGreenOctupus[`./assets/MythicCards/green/green${randomGreen}.jpg`] = '';
            }
        }
    }
    else {
        while (stackOfGreenCards.length != sumOfGreenCards) {
            stackOfGreenCards.pop();
        }
    }

    for (let keys in uniqBrownSnow) {
        stackOfBrownCards.push(keys);
    }
    stackOfBrownCards = commonMixCards(stackOfBrownCards);

    if (stackOfBrownCards.length < sumOfBrownCards) {
        while (stackOfBrownCards.length < sumOfBrownCards) {
            let randomBrown = random(1, brownCards.length);
            if (`./assets/MythicCards/brown/brown${randomBrown}.jpg` in copyUniqBrownOctupus || `./assets/MythicCards/brown/brown${randomBrown}.jpg` in uniqBrownSnow) {
                continue
            } else {
                stackOfBrownCards.push(`./assets/MythicCards/brown/brown${randomBrown}.jpg`)
                copyUniqBrownOctupus[`./assets/MythicCards/brown/brown${randomBrown}.jpg`] = '';
            }
        }
    } else {
        while (stackOfBrownCards.length != sumOfBrownCards) {
            stackOfBrownCards.pop();
        }
    }

    for (let keys in uniqBLueSnow) {
        stackOfBlueCards.push(keys);
    }
    stackOfBlueCards = commonMixCards(stackOfBlueCards);

    if (stackOfBlueCards.length < sumOfBlueCards) {
        while (stackOfBlueCards.length < sumOfBlueCards) {
            let randomBlue = random(1, blueCards.length);
            if (`./assets/MythicCards/blue/blue${randomBlue}.jpg` in copyUniqBlueOctupus || `./assets/MythicCards/blue/blue${randomBlue}.jpg` in uniqBLueSnow) {
                continue
            } else {
                stackOfBlueCards.push(`./assets/MythicCards/blue/blue${randomBlue}.jpg`)
                copyUniqBlueOctupus[`./assets/MythicCards/blue/blue${randomBlue}.jpg`] = '';
            }
        }
    } else {
        while (stackOfBlueCards.length != sumOfBlueCards) {
            stackOfBlueCards.pop();
        }
    }

}

function easyDeck() {
    const copyUniqGreenOctupus = Object.assign({}, uniqGreenOctupus);
    const copyUniqBrownOctupus = Object.assign({}, uniqBrownOctupus);
    const copyUniqBlueOctupus = Object.assign({}, uniqBlueOctupus);

    stackOfGreenCards = [];
    stackOfBrownCards = [];
    stackOfBlueCards = [];



    while (stackOfGreenCards.length < sumOfGreenCards) {
        let randomGreen = random(1, greenCards.length);
        if (`./assets/MythicCards/green/green${randomGreen}.jpg` in copyUniqGreenOctupus) {
            continue
        } else {
            stackOfGreenCards.push(`./assets/MythicCards/green/green${randomGreen}.jpg`)
            copyUniqGreenOctupus[`./assets/MythicCards/green/green${randomGreen}.jpg`] = '';
        }
    }
    while (stackOfBrownCards.length < sumOfBrownCards) {
        let randomBrown = random(1, brownCards.length);

        if (`./assets/MythicCards/brown/brown${randomBrown}.jpg` in copyUniqBrownOctupus) {
            continue
        } else {
            stackOfBrownCards.push(`./assets/MythicCards/brown/brown${randomBrown}.jpg`)
            copyUniqBrownOctupus[`./assets/MythicCards/brown/brown${randomBrown}.jpg`] = '';
        }
    }
    while (stackOfBlueCards.length < sumOfBlueCards) {
        let randomBlue = random(1, blueCards.length);

        if (`./assets/MythicCards/blue/blue${randomBlue}.jpg` in copyUniqBlueOctupus) {
            continue
        } else {
            stackOfBlueCards.push(`./assets/MythicCards/blue/blue${randomBlue}.jpg`)
            copyUniqBlueOctupus[`./assets/MythicCards/blue/blue${randomBlue}.jpg`] = '';
        }
    }
}
function normalDeck() {
    stackOfGreenCards = [];
    stackOfBrownCards = [];
    stackOfBlueCards = [];

    const uniqGreen = {},
        uniqBrown = {},
        uniqBLue = {};

    while (stackOfGreenCards.length < sumOfGreenCards) {
        let randomGreen = random(1, greenCards.length);
        if (`./assets/MythicCards/green/green${randomGreen}.jpg` in uniqGreen) {
            continue
        } else {
            stackOfGreenCards.push(`./assets/MythicCards/green/green${randomGreen}.jpg`)
            uniqGreen[`./assets/MythicCards/green/green${randomGreen}.jpg`] = '';
        }
    }
    while (stackOfBrownCards.length < sumOfBrownCards) {
        let randomBrown = random(1, brownCards.length);

        if (`./assets/MythicCards/brown/brown${randomBrown}.jpg` in uniqBrown) {
            continue
        } else {
            stackOfBrownCards.push(`./assets/MythicCards/brown/brown${randomBrown}.jpg`)
            uniqBrown[`./assets/MythicCards/brown/brown${randomBrown}.jpg`] = '';
        }
    }
    while (stackOfBlueCards.length < sumOfBlueCards) {
        let randomBlue = random(1, blueCards.length);

        if (`./assets/MythicCards/blue/blue${randomBlue}.jpg` in uniqBLue) {
            continue
        } else {
            stackOfBlueCards.push(`./assets/MythicCards/blue/blue${randomBlue}.jpg`)
            uniqBLue[`./assets/MythicCards/blue/blue${randomBlue}.jpg`] = '';
        }
    }
}



function highDeck() {
    const copyUniqGreenSnow = Object.assign({}, uniqGreenSnow);
    const copyUniqBrownSnow = Object.assign({}, uniqBrownSnow);
    const copyUniqBlueSnow = Object.assign({}, uniqBLueSnow);

    stackOfGreenCards = [];
    stackOfBrownCards = [];
    stackOfBlueCards = [];


    while (stackOfGreenCards.length < sumOfGreenCards) {
        let randomGreen = random(1, greenCards.length);
        if (`./assets/MythicCards/green/green${randomGreen}.jpg` in copyUniqGreenSnow) {
            continue
        } else {
            stackOfGreenCards.push(`./assets/MythicCards/green/green${randomGreen}.jpg`)
            copyUniqGreenSnow[`./assets/MythicCards/green/green${randomGreen}.jpg`] = '';
        }
    }
    while (stackOfBrownCards.length < sumOfBrownCards) {
        let randomBrown = random(1, brownCards.length);

        if (`./assets/MythicCards/brown/brown${randomBrown}.jpg` in copyUniqBrownSnow) {
            continue
        } else {
            stackOfBrownCards.push(`./assets/MythicCards/brown/brown${randomBrown}.jpg`)
            copyUniqBrownSnow[`./assets/MythicCards/brown/brown${randomBrown}.jpg`] = '';
        }
    }
    while (stackOfBlueCards.length < sumOfBlueCards) {
        let randomBlue = random(1, blueCards.length);

        if (`./assets/MythicCards/blue/blue${randomBlue}.jpg` in copyUniqBlueSnow) {
            continue
        } else {
            stackOfBlueCards.push(`./assets/MythicCards/blue/blue${randomBlue}.jpg`)
            copyUniqBlueSnow[`./assets/MythicCards/blue/blue${randomBlue}.jpg`] = '';
        }
    }
}
function insaneDeck() {
    const copyUniqGreenSnow = Object.assign({}, uniqGreenSnow);
    const copyUniqBrownSnow = Object.assign({}, uniqBrownSnow);
    const copyUniqBlueSnow = Object.assign({}, uniqBLueSnow);

    stackOfGreenCards = [];
    stackOfBrownCards = [];
    stackOfBlueCards = [];

    for (let keys in uniqGreenOctupus) {
        stackOfGreenCards.push(keys);
    }
    stackOfGreenCards = commonMixCards(stackOfGreenCards)

    if (stackOfGreenCards.length < sumOfGreenCards) {
        while (stackOfGreenCards.length < sumOfGreenCards) {
            let randomGreen = random(1, greenCards.length);
            if (`./assets/MythicCards/green/green${randomGreen}.jpg` in uniqGreenOctupus || `./assets/MythicCards/green/green${randomGreen}.jpg` in copyUniqGreenSnow) {
                continue
            } else {
                stackOfGreenCards.push(`./assets/MythicCards/green/green${randomGreen}.jpg`)
                copyUniqGreenSnow[`./assets/MythicCards/green/green${randomGreen}.jpg`] = '';
            }
        }
    }
    else {
        while (stackOfGreenCards.length != sumOfGreenCards) {
            stackOfGreenCards.pop();
        }
    }

    for (let keys in uniqBrownOctupus) {
        stackOfBrownCards.push(keys);
    }
    stackOfBrownCards = commonMixCards(stackOfBrownCards);

    if (stackOfBrownCards.length < sumOfBrownCards) {
        while (stackOfBrownCards.length < sumOfBrownCards) {
            let randomBrown = random(1, brownCards.length);
            if (`./assets/MythicCards/brown/brown${randomBrown}.jpg` in copyUniqBrownSnow || `./assets/MythicCards/brown/brown${randomBrown}.jpg` in uniqBrownOctupus) {
                continue
            } else {
                stackOfBrownCards.push(`./assets/MythicCards/brown/brown${randomBrown}.jpg`)
                copyUniqBrownSnow[`./assets/MythicCards/brown/brown${randomBrown}.jpg`] = '';
            }
        }
    } else {
        while (stackOfBrownCards.length != sumOfBrownCards) {
            stackOfBrownCards.pop();
        }
    }

    for (let keys in uniqBlueOctupus) {
        stackOfBlueCards.push(keys);
    }
    stackOfBlueCards = commonMixCards(stackOfBlueCards);

    if (stackOfBlueCards.length < sumOfBlueCards) {
        while (stackOfBlueCards.length < sumOfBlueCards) {
            let randomBlue = random(1, blueCards.length);
            if (`./assets/MythicCards/blue/blue${randomBlue}.jpg` in copyUniqBlueSnow || `./assets/MythicCards/blue/blue${randomBlue}.jpg` in uniqBlueOctupus) {
                continue
            } else {
                stackOfBlueCards.push(`./assets/MythicCards/blue/blue${randomBlue}.jpg`)
                copyUniqBlueSnow[`./assets/MythicCards/blue/blue${randomBlue}.jpg`] = '';
            }
        }
    } else {
        while (stackOfBlueCards.length != sumOfBlueCards) {
            stackOfBlueCards.pop();
        }
    }
}


shuffle.addEventListener('click', () => {
    if (!selectedAncient()) {
        alert('ChOoSe YOUR ANCIENT!')
    } else {
        mixDeck(ancientId);
        change();
        deck.style.display = 'flex';

        sumOfGreenCards = green.reduce((acc, item) => acc + item, 0);
        sumOfBrownCards = brown.reduce((acc, item) => acc + item, 0);
        sumOfBlueCards = blue.reduce((acc, item) => acc + item, 0);

        let levelId;
        for (let i = 0; i < difficults.length; i++) {
            if (difficults[i].classList.contains('active')) {
                levelId = difficults[i].id;
                break
            }
        }
        if (levelId === 'veryEasy') veryEasyDeck();
        if (levelId === 'easy') easyDeck();
        if (levelId === 'normal') normalDeck();
        if (levelId === 'high') highDeck();
        if (levelId === 'insane') insaneDeck();

        stackOfGreen = commonMixCards(stackOfGreenCards);
        stackOfBrown = commonMixCards(stackOfBrownCards);
        stackOfBlue = commonMixCards(stackOfBlueCards);

        console.log('greenStack', stackOfGreenCards, 'brownStack', stackOfBrownCards, 'blueStack', stackOfBlueCards);

        let stage1 = mixStages(stackOfFirstStage, 1);
        let stage2 = mixStages(stackOfSecondStage, 2);
        let stage3 = mixStages(stackOfThirdStage, 3);

        console.log('firstStage', stage1);
        console.log('secondStage', stage2);
        console.log('thirdStage', stage3);

        lastCard.style.backgroundImage = 'none';
        unknowCards.style.backgroundImage = `url('./assets/mythicCardBackground.png')`;
        unknowCards.style.display = 'flex';
        unknowCards.addEventListener('click', () => {
            let OPENCARD;
            if (stage1.length > 0) {

                OPENCARD = stage1.shift();
                OPENCARD in uniqSnow ? console.log(OPENCARD, 'easy') :
                    OPENCARD in uniqOctupus ? console.log(OPENCARD, 'hard') :
                        console.log(OPENCARD, 'normal');
                lastCard.style.backgroundImage = `url('${OPENCARD}')`

                if (OPENCARD.includes('green')) document.querySelectorAll('.green')[0].innerHTML -= 1;
                if (OPENCARD.includes('brown')) document.querySelectorAll('.brown')[0].innerHTML -= 1;
                if (OPENCARD.includes('blue')) document.querySelectorAll('.blue')[0].innerHTML -= 1;

            } else if (stage2.length > 0) {

                OPENCARD = stage2.shift();
                OPENCARD in uniqSnow ? console.log(OPENCARD, 'easy') :
                    OPENCARD in uniqOctupus ? console.log(OPENCARD, 'hard') :
                        console.log(OPENCARD, 'normal');
                lastCard.style.backgroundImage = `url('${OPENCARD}')`;

                if (OPENCARD.includes('green')) document.querySelectorAll('.green')[1].innerHTML -= 1;
                if (OPENCARD.includes('brown')) document.querySelectorAll('.brown')[1].innerHTML -= 1;
                if (OPENCARD.includes('blue')) document.querySelectorAll('.blue')[1].innerHTML -= 1;
            } else if (stage3.length >= 0) {
                OPENCARD = stage3.shift();
                OPENCARD in uniqSnow ? console.log(OPENCARD, 'easy') :
                    OPENCARD in uniqOctupus ? console.log(OPENCARD, 'hard') :
                        console.log(OPENCARD, 'normal');
                lastCard.style.backgroundImage = `url('${OPENCARD}')`;

                if (OPENCARD.includes('green')) document.querySelectorAll('.green')[2].innerHTML -= 1;
                if (OPENCARD.includes('brown')) document.querySelectorAll('.brown')[2].innerHTML -= 1;
                if (OPENCARD.includes('blue')) document.querySelectorAll('.blue')[2].innerHTML -= 1;
                if (stage3.length == 0) {
                    lastCard.style.backgroundImage = `url('${OPENCARD}')`
                    console.log('ВАША КОЛОДА ПУСТА! МИЛОРРРРД.')
                    unknowCards.style.display = 'none';
                }
            }
        });
    }
});

