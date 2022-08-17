var more = false;

function view (){
    var cards = document.querySelectorAll(".cards");
    var buttonText = document.getElementById("view_more");

    console.log(cards);

    if(more===false){
        for(let i=4; i<cards.length; i++){
            // console.log(cards[i]);
            cards[i].setAttribute("style", "display:visible");
        }
        buttonText.innerHTML = "View less";
        more = true;
    } else {
        for(let i=(cards.length-1); i>3; i--){
            // console.log(cards[i]);
            cards[i].setAttribute("style", "display:none");
        }
        buttonText.innerHTML = "View more";
        more = false;
    }

}