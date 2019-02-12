var cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var cardSuites = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];

var deck = [];

$(document).ready(function(){
    createDeck();

    $("#shuffle-button").on("click", onShuffleClick);
});

function onShuffleClick(){
    console.log("SHUFFLE CLICKED");
    shuffle();
}

function shuffle(){

    var copy = deck;

    deck = [];

    while(copy.length){
        
        var randomIndex = getRandomInt(0, copy.length - 1);

        console.log("random index", randomIndex);

        deck.push(copy[randomIndex]);
        
        var spliced = copy.splice(randomIndex, 1);

        console.log("spliced", spliced);
    }

    console.log("every day im shufflin", deck);

    displayDeck();
}

function createDeck(){
    console.log("creating deck");

    // var cardTemplate = $("#card-template").html();

    // console.log("my template", cardTemplate);
    for(var outer = 0;outer < cardValues.length; outer++){
        //  console.log("card value", cardValues[outer]);

        for(var inner = 0; inner < cardSuites.length;inner++){
            //  console.log("card suite", cardSuites[inner]);
            
            var card = {
                suite: cardSuites[inner]
            };            
            card.value = cardValues[outer];
            card.weight = outer;

            //  var li = $("<li></li>")
            //             .addClass(card.suite.toLowerCase());
            
            // if(card.suite == "Diamonds"){
            //     li.text("[");
            // } else if(card.suite == "Hearts"){
            //     li.text("{");
            // } else if(card.suite == "Spades"){
            //     li.text("}");
            // } else{
            //     li.text("]");
            // }
            // var valSpan = $("<span></span>")
            //                     .addClass("card-value")
            //                     .text(card.value);

            // li.append(valSpan);   
            
            // li.append(suitSpanBottom);
           
            // $(".card-suite", li).text(card.suite);
            // $(".card-value", li).text(card.value);
            // $(".card-weight", li).text(card.weight);

            // card.element = li;

            // ul.append(li);

            deck.push(card);
        
        }
    }

    // $("#card-table").append(ul);
    // console.log("completed deck", deck);

    displayDeck();
}   

function displayDeck(){
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
            
            $("span.card-value", li).text(card.value);    
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