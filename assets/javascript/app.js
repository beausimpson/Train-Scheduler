
// initializes the firebase database
var config = {
    apiKey: "AIzaSyC0PuR4vvyt7a8QcNnPJ8CMCqbF7CcBEmc",
    authDomain: "train-scheduler-df168.firebaseapp.com",
    databaseURL: "https://train-scheduler-df168.firebaseio.com",
    projectId: "train-scheduler-df168",
    storageBucket: "train-scheduler-df168.appspot.com",
    messagingSenderId: "688095636715"
};

firebase.initializeApp(config);

// variable to reference the database
var database = firebase.database();

// Initial Values
var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = "";

// train sound variable
var trainSound = new Audio("assets/audio/Train_Honk_Horn_2x.wav")


$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#train-frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        trainStart: firstTrain,
        frequency: trainFrequency,
    };

    // Code for handling the push
    database.ref().push({
        train: trainName,
        destination: trainDestination,
        trainStart: firstTrain,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.trainStart);
    console.log(newTrain.frequency);
    
    
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train").val("");
    $("#train-frequency").val("");
    
    // plays train sound
    trainSound.play();
    
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();
    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log("Unix First Train: " + sv.trainStart);
    console.log("Train Frequency: " + sv.frequency);
    console.log("-------------------------")

    // Assumptions
    var tFrequency = 3;

    var firstTrain = moment.unix(sv.trainStart).format("hh:mm A");
    var firstTrainConverted = moment(firstTrain, "HH:mm");
    console.log("First Train: " + firstTrain);

    var currentTime = moment(currentTime).format("hh:mm");
    console.log("Current Time: " + currentTime);


    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Differant Time: " + diffTime)

    // Time apart (remainder)
    var remainder = diffTime % tFrequency;
    console.log("Time Apart: " + remainder);

    // Minute Until Train
    var minutesTillTrain = tFrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log("-------------------------")

    // full list of items to the well
    $("tbody").append(`
        <tr>
            <td>${sv.train}</td>
            <td>${sv.destination}</td>
            <td>Every ${sv.frequency} mins</td>
            <td>${nextTrain}</td>
            <td>${minutesTillTrain}</td>
        </tr>`
    );


})

