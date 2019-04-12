
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

var choose = ""
var wins = 0

function setUsers() {
    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val())
        if (snapshot.val() == null) {
            database.ref("/player1/").set({
                name: $("#uname").val()
            })
            $("#player1").html($("#uname").val())
            $(".score").html("welcome,   " + $("#uname").val() +"  !"+ "<br>" + "waiting for Player2")
        }/* else if (snapshot.val().player2 == undefined) {
            database.ref("/player2/").set({
                name: $("#uname").val()
            })
            $("#player1").html($("#uname").val())
        }*/
    })
}


$("form").on("submit", function (e) {
    e.preventDefault()
    setUsers()
    $("#signin").addClass("d-none")
    $("#gameZone").removeClass("d-none")

})
