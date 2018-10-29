
// initializes the firebase database
var config = {
    apiKey: "AIzaSyDV4ZXiO0ci1o2JR7CWD1D6lt1rrRe0VyQ",
    authDomain: "fir-click-counter-8b591.firebaseapp.com",
    databaseURL: "https://fir-click-counter-8b591.firebaseio.com",
    projectId: "fir-click-counter-8b591",
    storageBucket: "fir-click-counter-8b591.appspot.com",
    messagingSenderId: "731473092302"
};

firebase.initializeApp(config);

// variable to reference the database
var database = firebase.database();

