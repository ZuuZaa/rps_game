
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
        alert("1")
        $("#player1").html($("#uname").val())
        $("#player2").html("waiting for Player2")
        $(".score").html("welcome,   " + $("#uname").val() + "  !")
        $("#player1img").attr("src", "assets/images/emoji-clipart-595626-5131388.png")
    }
    
}
function setPlayer2Name() {
    alert("2")
    $("#player1").html(player1.name)
    $("#player1img").attr("src", "assets/images/emoji-clipart-595626-5131388.png")
    $("#player2").html($("#uname").val())
    $(".score").html("welcome,   " + $("#uname").val() + "  !" + "<br>" + "Let's gooooo")
    $("#player2img").attr("src", "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png")
}
function nameSet() {

    if (player2 != null && key2 == null) {
        $("#player2").html(player2.name)
        $("#player2img").attr("src", "assets/images/1495750744Winking-emoticon-emoji-Clipart-info.png")
        alert("player 2 is ready")
    }

}

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val())
    if (snapshot.val()) {
        if (snapshot.val().player1) {
            player1 = snapshot.val().player1
            choice1 = snapshot.val().player1.choice
        }
        if (snapshot.val().player2) {
            player2 = snapshot.val().player2
            choice2 = snapshot.val().player2.choice
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
    alert("my-btn")
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

})

