var cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var cardSuites = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];

var deck = [];

$(document).ready(function(){
    
    $("#card-table").on("click", "ul#deck li", onCardClick);
        
    createDeck();

   // $("ul#deck li").on("click", onCardClick);

    $("#shuffle-button").on("click", onShuffleClick);
});

function onCardClick(){

    var val = $(this).attr("data-card-value");
    var suit = $(this).attr("data-card-suit");
    var weight = $(this).attr("data-card-weight");

    // console.log("CLICKED", this, $(this), val, suit, weight);

    var card = $(this).data();

    console.log("clicked", card);

var p = $("<p></p>").text(card.value + " of " + card.suite);

    $("div#selected-card").empty().append(p);

}

function onShuffleClick(){
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

function displayDeck()
{
    var ul = $("<ul></ul>")
                .attr("id","deck");

    var template = $("#card-template").html();

    console.log("LI template", template);

    deck.forEach(function(card, index){
            // console.log("card", index, card);

             var li = $(template)
                        .addClass(card.suite.toLowerCase());
                    
            var suitSpan = $("span.card-suit", li);
            var suitSpanBottom = $("span.card-suit-bottom", li);

            switch(card.suite){
                case "Diamonds":
                    suitSpan.html("&diamondsuit;");
                    suitSpanBottom.html("&diamondsuit;");
                    break;

                case "Hearts":
                    suitSpan.html("&hearts;");
                    suitSpanBottom.html("&hearts;");                    
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
            
            $("span.card-value", li)
                    .text(card.value);    

            li.attr("data-card-value", card.value)
                .attr("data-card-suit", card.suite)
                .attr("data-card-weight", card.weight);
            
            li.data(card);
                
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