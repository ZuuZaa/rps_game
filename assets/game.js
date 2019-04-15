
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
var player1 = null
var player2 = null
var key1 = null
var key2 = null
var choice1 = null
var choice2 = null
var win1 = 0
var win2 = 0
var message1 = null
var message2 = null 

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

function checkUsers() {
    if (player1 == null) {
        player1 = $("#uname").val()
        database.ref("/player1/").set({
            name: player1,
            choice: choice1,
            win: win1
        })
        window.localStorage.setItem("player", "player1")
        key1 = window.localStorage.getItem("player")
        setPlayer1Name()

    } else if (player2 == null) {
        player2 = $("#uname").val()
        database.ref("/player2/").set({
            name: player2,
            choice: choice2,
            win: win2
        })
        window.localStorage.setItem("player", "player2")
        key2 = window.localStorage.getItem("player")
        setPlayer2Name()
    }
}

function setPlayer1Name() {
    if (!player2) {

        $("#player1").html($("#uname").val())
        $("#player2").html("waiting for Player2")
        $("#score").html("welcome,   " + $("#uname").val() + "  !")
        $("#player1img").attr("src", "assets/images/emoji-clipart-595626-5131388.png")
    }
}
function setPlayer2Name() {

    $("#player1").html(player1.name)
    $("#player1img").attr("src", "assets/images/emoji-clipart-595626-5131388.png")
    $("#player2").html($("#uname").val())
    $("#score").html("welcome,   " + $("#uname").val() + "  !" + "<br>" + "Let's gooooo!")
    $("#player2img").attr("src", "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png")
}
function nameSet() {

    if (player2 != null && key2 == null) {
        $("#player2").html(player2.name)
        $("#player2img").attr("src", "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png")

        if (win1 ==0 && win2 == 0 && choice1 == null && choice2 == null) {
            $("#score").html(player2.name + "   joined." + "<br>" + "Let's gooooo!")
        }else  {
            showScore()
        }
    }
}
function showImage() {
    if (key2 == null && choice1 != null && choice2 == null) {
        $("#player1img").attr("src", winners[choice1])
    }
    if (key1 == null && choice2 != null && choice1 == null) {
        $("#player2img").attr("src", winners[choice2])
    }
}
function checkScore() {
    if (choice1 != null && choice2 != null) {
        if (choice1 == "scissors" && choice2 == "rock") {
            win2++
            player2Wins()

        } else if (choice1 == "scissors" && choice2 == "paper") {
            win1++
            player1Wins()

        } else if (choice1 == "rock" && choice2 == "paper") {
            win2++
            player2Wins()

        } else if (choice1 == "rock" && choice2 == "scissors") {
            win1++
            player1Wins()

        } else if (choice1 == "paper" && choice2 == "scissors") {
            win2++
            player2Wins()

        } else if (choice1 == "paper" && choice2 == "rock") {
            win1++
            player1Wins()
        } else {
            $("#player1img").attr("src", winners[choice1])
            $("#player2img").attr("src", winners[choice2])
            $("#score").html("00PS!" + "<br>" + "DRAW  :)")
        }
    }

}
function setWins() {
    database.ref("/player1/").update({
        win: win1
    })
    database.ref("/player2/").update({
        win: win2
    })
}
function player1Wins() {
    setWins()
    $("#player1img").attr("src", winners[choice1])
    $("#player2img").attr("src", loosers[choice2])
    showScore()
}
function player2Wins() {
    setWins()
    $("#player1img").attr("src", loosers[choice1])
    $("#player2img").attr("src", winners[choice2])
    showScore()
}
function showScore() {
    $("#score").html(player1.name + ":  " + win1 + "<br>" + player2.name + ":   " + win2)
}
function resetChoices() {
    database.ref("/player1/").update({
        choice: null
    })
    database.ref("/player2/").update({
        choice: null
    })
}

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val())
    if (snapshot.val()) {
        if (snapshot.val().player1) {
            player1 = snapshot.val().player1
            choice1 = snapshot.val().player1.choice
            win1 = snapshot.val().player1.win
        }
        if (snapshot.val().player2) {
            player2 = snapshot.val().player2
            choice2 = snapshot.val().player2.choice
            win2 = snapshot.val().player2.win
        }
    }
    nameSet()
})

$("form").on("submit", function (e) {
    e.preventDefault()
    checkUsers()

    $("#signin").addClass("d-none")
    $("#welcomeText").addClass("d-none")
    $("#gameZone").removeClass("d-none")
    $("#gameButtons").removeClass("d-none")
})

$(".my-btn").on("click", function () {
    if (choice1 != null && choice2 != null) {
        if (key1 == null || key2 == null) {
            resetChoices()
        }
    }
    if (player1 != null && player2 != null) {
        if (key2 == null) {
            choice1 = $(this).data("name")
            database.ref("/player1/").update({
                choice: choice1
            })
        }
        if (key1 == null) {
            choice2 = $(this).data("name")
            database.ref("/player2/").update({
                choice: choice2
            })
        }
        showImage()
        checkScore()
    }
})
$("#send").on("submid", function (e){
    e.preventDefault()

        database.ref("messages").push({
            message: $("#newMessage").val()
        })
    var messageText = $("<div> calss='message'")
    messageText.html(message)
    $("#chat").prepend(messageText)
})

