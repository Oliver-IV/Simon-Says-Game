var buttonColours = ["red", "blue", "green", "yellow"] ;
var gamePattern = [] ;
var userChosenColour = "" ;
var userClickedPattern = [] ;
level = 0 ;

$(document).on("keypress", function(evt) {
    console.log(evt.key) ;
    nextSequence() ;
})

$(".btn").on("click", function(evt){
    
    if(level > 0) {
        userChosenColour = evt.target.id ;
        userClickedPattern.push(userChosenColour) ;
    
        console.log(userChosenColour) ;
        console.log(userClickedPattern) ;
    
        animatePress(userChosenColour) ;
        
        playSound(userChosenColour) ;
    
        checkAnswer(userClickedPattern.length - 1) ;
    }

}) ;


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour) ;

    animatePress(randomChosenColour) ;
    playSound(randomChosenColour) ;

    console.log(gamePattern)
    level++ ;
    $("h1").html("Level " + level) ;
}

function playSound(id) {
    var sound = new Audio("./sounds/" + id + ".mp3") ;
    sound.play() ;
}

function checkAnswer(index) {
    console.log(index) ;
    
    if(userClickedPattern.length == gamePattern.length) {
        if(userClickedPattern[index] == gamePattern[index]) {
            console.log("success") ;

            setTimeout(function() {
                nextSequence() ;
                userClickedPattern = [] ;
            }, 1000);

        } else {
            console.log("wrong") ;

            playSound("wrong") ;

            $("body").addClass("game-over") ;

            setTimeout(function() {
                $("body").removeClass("game-over") ;
            }, 200);

            $("h1").html("Game Over, Press AnyKey to Restart") ;

            userClickedPattern = [] ;
            gamePattern = [] ;
            level = 0 ;
        }
        
        
    }
    

}

function animatePress(colour) {
    $("#" + colour).addClass("pressed") ;

    setTimeout(function() {
        $("#" + colour).removeClass("pressed") ;
    }, 100);
}