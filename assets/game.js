
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

function setPlayer1Name() {
    $("#player1").html($("#uname").val())
    $(".score").html("welcome,   " + $("#uname").val() + "  !" + "<br>" + "waiting for Player2")

}
function setPlayer2Name() {
    $("#player2").html($("#uname").val())
    $(".score").html("welcome,   " + $("#uname").val() + "  !" + "<br>" + "Let's gooooo")
}



function checkUsers() {
    if (player1 == null) {
        player1 = $("#uname").val()
        database.ref("/player1/").set({
            name: player1,
            wins: 0,
            losses: 0,
            choice: null
        })
        setPlayer1Name()

    } else if (player2 == null) {
        player2 = $("#uname").val()
        database.ref("/player2/").set({
            name: $("#uname").val(),
            wins: 0,
            losses: 0,
            choice: null
        })
        setPlayer2Name()
    }
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

