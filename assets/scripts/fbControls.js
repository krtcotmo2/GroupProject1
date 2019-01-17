// Initialize Firebase
var config = {
     apiKey: "AIzaSyD6Nj832K7rintWA1i4Ed5_uL3X0biL26c",
     authDomain: "authtest-a5cb5.firebaseapp.com",
     databaseURL: "https://authtest-a5cb5.firebaseio.com",
     projectId: "authtest-a5cb5",
     storageBucket: "",
     messagingSenderId: "107856118302"
};
firebase.initializeApp(config);

const db = firebase.database;
const auth = firebase.auth;