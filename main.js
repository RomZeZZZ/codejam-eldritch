'use strict'

import ancients from './assets/Ancients/index.js';
import difficulties from './data/difficulties.js';
import ancientsData from './data/ancients.js';
import cardsBlue from './data/mythicCards/blue/index.js';
import cardsBrown from './data/mythicCards/brown/index.js';
import cardsGreen from './data/mythicCards/green/index.js';


let stages = {
    'first' :{
        title: 'Первая стадия',
        firstColour: 'Green',
        firstValue: 0,
        secondColour: 'Brown',
        secondValue: 0,
        thirdColour: 'Blue',
        thirdValue: 0
    },
    'second' :{
        title: 'Вторая стадия',
        firstColour: 'Green',
        firstValue: 0,
        secondColour: 'Brown',
        secondValue: 0,
        thirdColour: 'Blue',
        thirdValue: 0
    },
    'third' :{
        title: 'Третья стадия',
        firstColour: 'Green',
        firstValue: 0,
        secondColour: 'Brown',
        secondValue: 0,
        thirdColour: 'Blue',
        thirdValue: 0
    }
};


let mainContainer = document.querySelector('.main-container');
let body = document.querySelector('body'),
    headerText = document.createElement('h1'),
    startMenu = document.createElement('button'),
    headerContainer = document.createElement('div'),
    ancient,
    playMode;
headerContainer.classList.add('headerContainer');
body.insertBefore(headerContainer, body.firstChild);
headerText.classList.add('header');
startMenu.classList.add('startMenu');
startMenu.textContent = 'В НАЧАЛО';
headerText.textContent = 'Choose Ancient';
headerContainer.appendChild(headerText);
headerContainer.appendChild(startMenu);

startMenu.addEventListener('click', () => {
    location.reload();
})

for (let key in ancients) {
    let oImg = document.createElement("img");
    oImg.setAttribute('src', `${ancients[key]}`);
    oImg.setAttribute('id', `${key}`);
    oImg.classList.add('ancients-card');
    mainContainer.appendChild(oImg);
}
function changeNumber(color){
    let circles = document.getElementsByClassName(`circle ${color}`);
    for (let circle of circles) {
        let value = +circle.innerHTML;
        //console.log(`${color} ${value}`);
        if (value <= 0) {
            continue;
        }
        circle.innerHTML = `${value-1}`;
        break;
    }
}
function changeCard(cards) {
    if(cards.length == 0) {
        console.log('FINISH');
    }
    else {
        let color = cards[0].color;
        let cardUrl =  cards[0].cardFace;
    
        let image = document.querySelector('.ancients-card-holder');
        image.setAttribute('src', `${cardUrl}`);
        changeNumber(color);
        
        console.log(cardUrl, cards);
        
        cards.splice(0, 1);
    }
}
function createDake() {
    let cards = makeGameModeDeck(playMode);
    console.log(cards);

    if (!document.querySelector('.card-container')) {
        let div = document.createElement("div");
        div.classList.add('card-container');
        mainContainer.appendChild(div);
        
        let cardContainer = document.querySelector('.card-container');
        
        let oImg = document.createElement("img");
        oImg.classList.add('ancients-card-holder');
        oImg.setAttribute('src', `./assets/mythicCardBackground.png`);
        cardContainer.appendChild(oImg);

        cardContainer.addEventListener('click', () => {
            changeCard(cards);
        });
    }

}

function playModeFunc () {
    playMode = this.textContent; //Выбранный режим
    this.style = 'border: 4px solid  darkred; transform: scale(1.1);';
    headerText.textContent = 'Сreate a deck';
    document.querySelectorAll('.difficultiesText').forEach(element => {
        element.removeEventListener('click', playModeFunc);
    });
    let stageContainer = document.createElement('div');
    stageContainer.classList.add('stageContainer');
    document.querySelector('.difficultiesTextContainer').appendChild(stageContainer);

    ['first','second','third'].forEach(element => {
        let stageContainerIn = document.createElement('div');
        stageContainerIn.classList.add('stageContainerIn');
        stageContainer.appendChild(stageContainerIn);
        let stageTitle = document.createElement('h2');
        stageTitle.textContent = `${stages[element].title}`;
        stageTitle.style = 'color: #c63b3b;';
        stageContainerIn.appendChild(stageTitle);
        
        let circleGreen = document.createElement('div');
        circleGreen.classList.add('circle');
        circleGreen.classList.add('green');
        circleGreen.style = `color: ${stages[element].firstColour};`;
        circleGreen.textContent = `${stages[element].firstValue}`;
        stageContainerIn.appendChild(circleGreen);

        let circleRed = document.createElement('div');
        circleRed.classList.add('circle');
        circleRed.classList.add('brown');
        circleRed.style = `color: ${stages[element].secondColour};`;
        circleRed.textContent = `${stages[element].secondValue}`;
        stageContainerIn.appendChild(circleRed);

        let circleBlue = document.createElement('div');
        circleBlue.classList.add('circle');
        circleBlue.classList.add('blue');
        circleBlue.style = `color: ${stages[element].thirdColour};`;
        circleBlue.textContent = `${stages[element].thirdValue}`;
        stageContainerIn.appendChild(circleBlue);
    });

    let make = document.createElement('button');
    make.classList.add('difficultiesText');
    make.textContent = 'ЗАМЕШАТЬ КОЛОДУ';
    document.querySelector('.difficultiesTextContainer').appendChild(make);
    make.addEventListener('click', createDake, { once: true });
}

document.querySelectorAll('.ancients-card').forEach(element => element.addEventListener("click", (e) => {
    ancient = e.target.id; //Выбранный древний
    document.querySelectorAll('.ancients-card').forEach(element => {
        if (element != e.target) {
            element.style = 'display: none';
        }
       e.target.style = 'width: 30%; margin: 0';
       headerText.textContent = 'Choose play mode';
    });
    let difficultiesContainer = document.createElement('div');
    difficultiesContainer.classList.add('difficultiesTextContainer');
    mainContainer.appendChild(difficultiesContainer);
    let difficultesButtonContainer = document.createElement('div');
    difficultesButtonContainer.classList.add('difficultesButtonContainer');
    difficultiesContainer.appendChild(difficultesButtonContainer);
    difficulties.forEach(element => {
        let difficultiesText = document.createElement('button');
        difficultiesText.classList.add('difficultiesText');
        difficultiesText.textContent = `${element.name}`;
        difficultesButtonContainer.appendChild(difficultiesText);
       });
    document.querySelectorAll('.difficultiesText').forEach(element => element.addEventListener('click', playModeFunc));
    
}, { once: true }));



function getTotalCardsOfAncient(ancient) {
    let total = {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0
    };
   ancientsData.forEach(element => {
        if (element.id == ancient) {
            total.greenCards += element.firstStage.greenCards;
            total.blueCards += element.firstStage.blueCards;
            total.brownCards += element.firstStage.brownCards;

            total.greenCards += element.secondStage.greenCards;
            total.blueCards += element.secondStage.blueCards;
            total.brownCards += element.secondStage.brownCards;
            
            total.greenCards += element.thirdStage.greenCards;
            total.blueCards += element.thirdStage.blueCards;
            total.brownCards += element.thirdStage.brownCards;
        }
    });
   return total;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getCards(cardType, total) {
    let gameModeDeck = [];
    let easy = [];

    cardType.forEach(element => {
        if (element.difficulty == 'easy') {
            easy.push({
                id: element.id,
                cardFace: element.cardFace,
                difficulty: 'easy',
                color: element.color
            });
        }
    });
    if (easy.length >= total) {
        while (gameModeDeck.length < total) {
            let randomNumber = getRndInteger(0, easy.length - 1);
            if (!gameModeDeck.includes(easy[randomNumber])) {
            gameModeDeck.push(easy[randomNumber]);
            }
        }
    } else {
        easy.forEach(element => {
            gameModeDeck.push(element);
        })
        
        let normal = [];
        cardType.forEach(element => {
            if (element.difficulty == 'normal') {
                normal.push({
                    id: element.id,
                    cardFace: element.cardFace,
                    difficulty: 'normal',
                    color: element.color
                });
            }
        });
        while (gameModeDeck.length < total) {
            let randomNumber = getRndInteger(0, normal.length - 1);
            if (!gameModeDeck.includes(normal[randomNumber])) {
            gameModeDeck.push(normal[randomNumber]);
            }
        }
    }
    return gameModeDeck;
}

function getCardsForRounds(round, greenCards, brownCards, blueCards) {
    let firstRound = [];
    while (firstRound.length < stages[round].firstValue) {
        let randomNumber = getRndInteger(0, greenCards.length - 1);
        if (!firstRound.includes(greenCards[randomNumber])) {
            firstRound.push(greenCards[randomNumber]);
            greenCards.splice(randomNumber, 1); //delete selected card
        }
    }
    
    while (firstRound.length  < stages[round].firstValue + stages[round].secondValue) {
        let randomNumber = getRndInteger(0, brownCards.length - 1);
        if (!firstRound.includes(brownCards[randomNumber])) {
            firstRound.push(brownCards[randomNumber]);
            brownCards.splice(randomNumber, 1);
        }
 
    }
    while (firstRound.length  < stages[round].firstValue + stages[round].secondValue + stages[round].thirdValue) {
        let randomNumber = getRndInteger(0, blueCards.length - 1);
        if (!firstRound.includes(blueCards[randomNumber])) {
            firstRound.push(blueCards[randomNumber]);
            blueCards.splice(randomNumber, 1);
        }
    }
    return firstRound;
}

function countCards () {
    let arr = [];
    ['first','second','third'].forEach(e => {
        arr.push(stages[e].firstValue);
        arr.push(stages[e].secondValue); 
        arr.push(stages[e].thirdValue); 
    });
    document.querySelectorAll('.circle').forEach((element, index) => {
        element.textContent = `${arr[index]}`;
    });
}
function reorderCards(cards) {
    let _from = 0;
    let _to = cards.length - 1;
    for (let i = 0; i<8; i++){
        _to = getRndInteger(_from, _to);
        cards.splice(_to, 0, cards.splice(_from, 1)[0]);
    }
    return cards
  };


function makeGameModeDeck(playMode) {
    let totalCards,
        blueCards,
        brownCards,
        greenCards;
    switch (playMode) {
        case 'Очень Низкий':  //Очень легкий уровень сложности: из набора берутся все карты со снежинками, если карт не хватает то добираются обычные карты
            totalCards = getTotalCardsOfAncient(ancient);
            blueCards = getCards(cardsBlue, totalCards.blueCards);
            brownCards = getCards(cardsBrown, totalCards.brownCards);
            greenCards = getCards(cardsGreen, totalCards.greenCards);
            break;
        case 'Низкий':
            break;
    }
                
    ancientsData.forEach(element => {
        if (element.id == ancient) {
            ['first','second','third'].forEach(e => {
                stages[e].firstValue = element[e + 'Stage'].greenCards;
                stages[e].secondValue = element[e + 'Stage'].brownCards;
                stages[e].thirdValue = element[e + 'Stage'].blueCards; 
            });
        }
    });

    countCards();

    let firstRound = reorderCards(getCardsForRounds('first', greenCards, brownCards, blueCards));
    let secondRound = reorderCards(getCardsForRounds('second', greenCards, brownCards, blueCards));
    let thirdRound = reorderCards(getCardsForRounds('third', greenCards, brownCards, blueCards));
    return firstRound.concat(secondRound, thirdRound);
}