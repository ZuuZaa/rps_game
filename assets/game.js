
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
var key = ""


function checkUsers() {
    if (player1 == null) {
        player1 = $("#uname").val()
        database.ref("/player1/").set({
            name: player1,
            wins: 0,
            losses: 0,
            choice: ""
        })
        setPlayer1Name()
        window.localStorage.setItem("player","player1")
        key = window.localStorage.getItem("player")

    } else if (player2 == null) {
        player2 = $("#uname").val()
        database.ref("/player2/").set({
            name: $("#uname").val(),
            wins: 0,
            losses: 0,
            choice: ""
        })
        setPlayer2Name()
        window.localStorage.setItem("player","player2")
        key = window.localStorage.getItem("player")
    }
}

function setPlayer1Name() {
    alert("1")
    $("#player1").html($("#uname").val())
    $("#player2").html("waiting for Player2")
    $(".score").html("welcome,   " + $("#uname").val() + "  !")
    if ( player2 != null && key == "player1") {
        $("#player2").html(player2.name)
        console.log(player2.name)
    }

}
function setPlayer2Name() {
    alert("2")
    console.log(player1.name)
    $("#player1").html(player1.name)
    $("#player2").html($("#uname").val())
    $(".score").html("welcome,   " + $("#uname").val() + "  !" + "<br>" + "Let's gooooo")
}
database.ref().on("value", function (snapshot) {
    console.log(snapshot.val())
    if (snapshot.val()) {
        if (snapshot.val().player1) {
            player1 = snapshot.val().player1
        }
        if (snapshot.val().player2) {
            player2 = snapshot.val().player2
        }
    }
})

$("form").on("submit", function (e) {
    e.preventDefault()
    checkUsers()
    
    $("#signin").addClass("d-none")
    $("#gameZone").removeClass("d-none")
})

