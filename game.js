var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Your Level is: "+level);
        nextSequence();
        started=true;
        
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    

    checkAnswer(userClickedPattern.length-1);
    console.log(gamePattern);
    console.log(userClickedPattern);
    
})


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Your Level is: "+level);
    var n=Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[n];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);

    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    /*var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();*/
}




function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed")
    },100)
}


function checkAnswer(currenLevel){
    if(userClickedPattern[currenLevel]==gamePattern[currenLevel]){
        //console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        //console.log("Lose");
        startOver();
    }
    

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


