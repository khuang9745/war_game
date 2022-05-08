/* CARDS */
let deck = [];
let suits = ['♥', '♦', '♣', '♠'];
let names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

let makeCards = function(suits, names, values) {
  $.each(suits, function(i, cardSuit) {
    $.each(values, function(e, cardVal) {
      let card = {};
      card.suit = suits[i];
      card.name = names[e];
      card.value = values[e];
      deck.push(card);
    })
  })
};

let shuffle = function(a, b) {
  return Math.random() - .5;
};

var stack1 = [];
var stack2 = [];
let dealWar = function(deck) {
  $.map(deck, function(card, i) {
    if (i >= deck.length/2) {
      stack1.push(card);
    }
    else {
      stack2.push(card);
    }
  })
};

/* GAME START */
let table = $('div.game_table');
let startDeck = $('<div class="card stack back start_deck">');
let startButton = $('<button class="start_button">');
startButton.text(`Play`);
table.append(startDeck);
table.append(startButton);

let startGame = function() {
  $('.start_button').remove();
  $('.start_deck').remove();
  let pOne = $('<div class="pOne">');
  let pTwo = $('<div class="pTwo">');
  let status = $('<div class="status">');
  table.append(pOne);
  pOne.append($('<div class="card back">'));
  pOne.append($('<div class="info">'));
  table.append(status);
  table.append(pTwo);
  pTwo.append($('<div class="card back">'));
  pTwo.append($('<div class="info">'));
  setupDrawButton();
  makeCards(suits, names, values);
  deck.sort(shuffle);
  dealWar(deck);
}

/* GAME DYNAMICS */
var warCards = [];
let play = function() {
  let card1 = stack1.shift();
  let card2 = stack2.shift();
  $('.card').removeClass('back');
  $('.pOne .card').text(`${card1.suit} ${card1.name}`);
  $('.pTwo .card').text(`${card2.suit} ${card2.name}`);
  if (card1.value > card2.value) {
    stack1.push(card1, card2);
    $('.status').text(`Player 1 Beats Player 2`);
  }
  else if (card1.value < card2.value) {
    stack2.push(card1, card2);
    $('.status').text(`Player 2 Beats Player 1`);
  }
    else {
    warCards = [card1, card2];
    alertWar();
  }
  $('.pOne .info').text(`Player 1 - ${stack1.length} cards left`);
  $('.pTwo .info').text(`Player 2 - ${stack2.length} cards left`);
};

let alertWar = function(cards) {

  $('h1').text('This Means War!')

  $('.draw_button').hide();
  $('.war_button').show();
}

let  declareWar = function() {
  let warStack1 = stack1.splice(0, 4);
  let warStack2 = stack2.splice(0, 4);
  $('.card').removeClass('back');
  $('.pOne .card').text(`${warStack1[3].suit} ${warStack1[3].name}`);
  $('.pTwo .card').text(`${warStack2[3].suit} ${warStack2[3].name}`);
  $('.draw_button').show();
  $('.war_button').hide();
  if (warStack1[3].value > warStack2[3].value) {
    $.each(warStack2, function(i, card) {
       stack1.push(card);
    });
    $.each(warStack1, function(i, card) {
       stack1.push(card);
    });
    $.each(warCards, function(i, card) {
       stack1.push(card);
    });
    warCards = [];
 }
  else if (warStack1[3].value < warStack2[3].value)  {
    $.each(warStack2, function(i, card) {
       stack2.push(card);
    });
    $.each(warStack1, function(i, card) {
       stack2.push(card);
    });
    $.each(warCards, function(i, card) {
       stack2.push(card);
    });
    warCards = [];
  }
  else {
    $.each(warStack1, function(i, card) {
       warCards.push(card);
    });
    $.each(warStack2, function(i, card) {
       warCards.push(card);
    });
    alertWar();
  }
  $('.pOne .info').text(`Player 1 - ${stack1.length} cards left`);
  $('.pTwo .info').text(`Player 2 - ${stack2.length} cards left`);
};



/*BUTTONS & LISTENERS */
let setupDrawButton = function() {
  let buttonContainer = $('<div class="button_containter">')
  let drawButton = $('<button class="draw_button">');
  drawButton.text('Draw');
  table.append(buttonContainer);
  buttonContainer.append(drawButton);
  let warButton = $('<button class="war_button">');
  warButton.text('Play War')
  buttonContainer.append(warButton);
  warButton.hide();
  $('.draw_button').click(function() {
    play();
  })
  $('.war_button').click(function() {
    declareWar();
  })
}

let addEventListeners = function() {
  $('.start_button').click(function() {
    startGame();
  })
}

addEventListeners();
