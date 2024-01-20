var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttons = $(".btn");
var clicks = 0;
var lose = false ;

buttons.on("click", function (evt) {

    if (clicks == gamePattern.length) {
        clicks = 0;
    } else {
        clicks++;
        var userChosenColor = evt.currentTarget.id;
        var userChosenButton = $("." + userChosenColor);
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenButton);
        console.log(userClickedPattern);
        sound(userChosenColor);

        if (userClickedPattern.length == gamePattern.length) {
            nextSequence();
        }
    }


});

$(document).on("keypress", function () {
    if(lose == true) {
        resetStats() ;
    }
    if (level == 0) {
        lose = false ;
        console.log("start") ;
        $("h1").text("Level " + level);
        nextSequence();
        level = 1;
    }

})

function resetStats() {
    gamePattern = [] ;
    userClickedPattern = [] ;
    level = 0 ;
    clicks = 0 ;
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    var chosenButton = $("." + randomChosenColor);
    level++;
    $("h1").text("Level " + level);
    randomPattern(randomChosenColor, chosenButton);
    return randomNumber;
}


function randomPattern(color, chosBtn, level) {

    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
        setTimeout(function () {
            gamePattern.push(color);
            animatePress(chosBtn);
            console.log(gamePattern);
            sound(color);
            userClickedPattern = [];
        }, 1000);

    } else {
        lose = true ;
        $("h1").text("Game Over, Press Any Key to Restart");
        var lostSound = new Audio("./sounds/wrong.mp3");
        lostSound.play();
        wrongAnimateBackground();

    }
}

function animatePress(button) {
    button.addClass("pressed");
    console.log(button);
    setTimeout(function () {
        button.removeClass("pressed");
    }, 100);
}

function wrongAnimateBackground() {
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100)
}

function sound(color) {
    switch (color) {
        case "red":
            var redSound = new Audio("./sounds/red.mp3");
            redSound.play();
            break;

        case "blue":
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;

        case "green":
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;

        case "yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        default:
            console.log(randomChosenColor);
            break;
    }
}
