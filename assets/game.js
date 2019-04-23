
var config = {
    apiKey: "AIzaSyBLfCqhvx1G4i0txTA0jdInGbWGGcAVbKc",
    authDomain: "https://rpsgame-b1e16.firebaseapp.com",
    databaseURL: "https://rpsgame-b1e16.firebaseio.com",
    projectId: "rpsgame-b1e16",
    storageBucket: "rpsgame-b1e16.appspot.com",
    messagingSenderId: "204863265882"
};
firebase.initializeApp(config);

var database = firebase.database()
var player1 = false
var player2 = false
var key = null
var choice1 = " "
var choice2 = " "
var img1 = "assets/images/emoji-clipart-595626-5131388.png"
var img2 = "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png"
var score = " "
var win1 = 0
var win2 = 0
var message = null
var bool = "true"


var winners = {
    rock: "assets/images/rock-paper-scissors-emoji-cartoon-027-512.png",
    paper: "assets/images/rock-paper-scissors-emoji-cartoon-019-512.png",
    scissors: "assets/images/rock-paper-scissors-emoji-cartoon-014-512.png"
}
var loosers = {
    rock: "assets/images/drawing-emoji-paper-4.png",
    paper: "assets/images/rock-paper-scissors-emoji-cartoon-025-512.png",
    scissors: "assets/images/rock-paper-scissors-emoji-cartoon-009-512.png"
}

window.onload = function () {
    database.ref().set(
       {chat: 0 }
    )
}

database.ref().on("value", function (snapshot) {
    if (snapshot.val().player1) {
        player1 = snapshot.val().player1
        choice1 = player1.choice
        win1 = player1.win
        img1 = player1.img
        bool = snapshot.val().bool
        message =snapshot.val().chat
        score = snapshot.val().score
    }
    if (snapshot.val().player2) {
        player2 = snapshot.val().player2
        choice2 = player2.choice   
        win2 = player2.win
        img2 = player2.img
        bool = snapshot.val().bool
        score = snapshot.val().score
        message =snapshot.val().chat
    }
    setName()
    messageMaker()
})

function setUsers() {
        if (!player1) {
            database.ref("/player1/").set({
                name: $("#uname").val(),
                choice: choice1,
                win: win1,
                img: img1
            })
            key = "first"
        } else if (!player2) {
            database.ref("/player2/").set({
                name: $("#uname").val(),
                choice: choice2,
                win: win2,
                img: img2
            })
            database.ref().update({
                score: "Weolcome,   " + player2.name + "!" + "<br>" + "Let's goooooo!"
            })
            key = "second"
        }
    }

function setName() {
    if (!player2) {
        $("#player1").html($("#uname").val())
        $("#player2").html("waiting for Player2")
        $("#score").html("welcome,   " + $("#uname").val() + "  !")
        $("#player1img").attr("src", img1)
    } else {
        $("#player1").html(player1.name)
        $("#player1img").attr("src", img1)
        $("#player2").html(player2.name)
        $("#score").html(score)
        $("#player2img").attr("src", img2)
        $("#chatBox").removeClass("d-none")
    }
}

function player1wins() {
    console.log("player1wins")
    win1++
    console.log(win1)
    database.ref("/player1/").update({
        win: win1,
        img: winners[choice1]
    })
    database.ref("/player2/").update({
        img: loosers[choice2]
    })
    database.ref().update({
        score: player1.name + "  wins." + "<br>" + player1.name +": "+ win1 + "<br>" + player2.name + ": " + win2
    })
}
function player2wins() {
    console.log("player2wins")
    win2++
    database.ref("/player2/").update({
        win: win2,
        img: winners[choice2]
    })
    database.ref("/player1/").update({
        img: loosers[choice1]
    })
    database.ref().update({
        score: player2.name + "  wins." + "<br>" + player1.name +": "+ win1 + "<br>" + player2.name + ": " + win2
    })
}
function setWin() {
    if (choice1 != " " && choice2 != " ") {
        if (choice1 == "rock" && choice2 == "scissors") {
            player1wins()
        } else if (choice1 == "scissors" && choice2 == "paper") {
            player1wins()
        } else if (choice1 == "paper" && choice2 == "rock") {
            player1wins()
        } else if (choice2 == "rock" && choice1 == "scissors") {
            player2wins()
        } else if (choice2 == "scissors" && choice1 == "paper") {
            player2wins()
        } else if (choice2 == "paper" && choice1 == "rock") {
            player2wins()
        } else {
            database.ref().update({
                score: "DRAW"
            })
            database.ref("/player1/").update({
                img: winners[choice1]
            })
            database.ref("/player2/").update({
                img: winners[choice2]
            })
        }
        setTimeout( reset, 5000)
    }
}

function reset() {
   btn()
    database.ref().update({
        score: "Let's play again ;)"
    })
    database.ref("/player1/").update({
        img: "assets/images/emoji-clipart-595626-5131388.png",
        choice: " "
    })
    database.ref("/player2/").update({
        img: "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png",
        choice: " "
    })
}  
function messageMaker(){
    if (message != 0) {
        $("#chat").empty()
        for (i in message){
            console.log(i)
            var messageBox = $("<div>")
            messageBox.addClass("message-box")
            messageBox.html(message[i].name + ":    " + message[i].message)
            $("#chat").prepend(messageBox)
        }
    }
}
function btn(){
    if ($(".my-btn").attr("data-value") == "true") {
        database.ref().update({
            boll: "false"
        })    
    }else {
        database.ref().update({
            boll: "true"
        })
    }
   $(".my-btn").attr("data-value", bool)
}

$("form").on("submit", function (e) {
    e.preventDefault()
    setUsers()
    setName()
    $("#signin").addClass("d-none")
    $("#welcomeText").addClass("d-none")
    $("#gameZone").removeClass("d-none")
    $("#gameButtons").removeClass("d-none")
})

$(".my-btn").on("click", function () {
    if (player2) {
        if ($(this).attr("data-value") == "true") {
            if (key == "first") {
                database.ref("/player1/").update({
                    choice: $(this).data("name")
                })
                btn()
                $("#player1img").attr("src", winners[choice1])
            } else if (key == "second") {
                database.ref("/player2/").update({
                    choice: $(this).data("name")
                })
                btn()
                $("#player2img").attr("src", winners[choice2])
            }
            setWin()
        }
    }
})

$("#chatform").on("submit", function(){
    if (key == "first"){
        database.ref("/chat/").push({
            name: player1.name,
            message: $("#newMessage").val()
        })
    }else if (key == "second"){
        database.ref("/chat/").push({
            name: player2.name,
            message: $("#newMessage").val()
        })
    }  
    $("#newMessage").val("")
})
