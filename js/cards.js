var cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var cardSuites = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];

var deck = [];

$(document).ready(function() {

    $("#card-table").on("click", "ul#deck > li", onCardClicked)

    createDeck();

    $("#shuffle-button").on("click", onShuffleClick);
});

function onShuffleClick() {
    console.log("SHUFFLE CLICKED");
    shuffle();
}

function onCardClicked() {

    var card = $(this).data();

    console.log("CLICKED", card);
}

function shuffle() {

    var copy = deck;

    deck = [];

    while (copy.length) {

        var randomIndex = getRandomInt(0, copy.length - 1);

        console.log("random index", randomIndex);

        deck.push(copy[randomIndex]);

        var spliced = copy.splice(randomIndex, 1);

        console.log("spliced", spliced);
    }

    console.log("every day im shufflin", deck);

    displayDeck();
}

function createDeck() {
    console.log("creating deck");

    // console.log("my template", cardTemplate);
    for (var outer = 0; outer < cardValues.length; outer++) {
        //  console.log("card value", cardValues[outer]);

        for (var inner = 0; inner < cardSuites.length; inner++) {
            //  console.log("card suite", cardSuites[inner]);

            var card = {
                suite: cardSuites[inner]
            };
            card.value = cardValues[outer];
            card.weight = outer;

            deck.push(card);
        }
    }

    console.log("completed deck", deck);

    displayDeck();
}

function displayDeck() {
    var ul = $("<ul></ul>")
        .attr("id", "deck");

    deck.forEach(function(card, index) {
        // console.log("card", index, card);

        var li = $("<li></li>")
            .addClass(card.suite.toLowerCase());

        li.data(card);

        var suitSpan = $("<span></span>")
            .addClass("card-suit");

        var suitSpanBottom = $("<span></span>")
            .addClass("card-suit-bottom");

        switch (card.suite) {
            case "Diamonds":
                suitSpan.text("[");
                suitSpanBottom.text("[");
                break;

            case "Hearts":
                suitSpan.text("{");
                suitSpanBottom.text("{");
                break;

            case "Spades":
                suitSpan.text("}");
                suitSpanBottom.text("}");
                break;

            case "Clubs":
                suitSpan.text("]");
                suitSpanBottom.text("]");
                break;
        }

        var valSpan = $("<span></span>")
            .addClass("card-value")
            .text(card.value);

        li.append(valSpan);
        li.append(suitSpan);
        li.append(suitSpanBottom);

        ul.append(li);
    });

    $("#card-table")
        .empty()
        .append(ul);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}