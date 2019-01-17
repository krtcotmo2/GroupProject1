let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
}

let createUser =  (email, password) => {
     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     let retVal =  auth().createUserWithEmailAndPassword(email, password)
     .then(function (returnVal) {
          user.uid = returnVal.user.uid;
          db().ref(`users/${returnVal.user.uid}`).set({
               name: ``,
               email: returnVal.user.email
          }).then(function(data){
               sessionStorage.setItem("user", JSON.stringify(user));
               sessionStorage.setItem("errorMessage", errorMessage);
               window.location.assign("http://google.com")
          }) .catch(function (error) {
               // Handle Errors here.
               errorMessage = error.message;
               sessionStorage.setItem("errorMessage", errorMessage);
              return false;
          });
          //db().ref(`users/${returnVal.user.uid}/lastLogin`).push(firebase.database.ServerValue.TIMESTAMP)
          //db().ref(`users/${returnVal.user.uid}/alergies`).push(``)
          //db().ref(`users/${returnVal.user.uid}/likes`).push(``)
     })
     .catch(function (error) {
          // Handle Errors here.
          errorMessage = error.message;
          sessionStorage.setItem("errorMessage", errorMessage);
         return false;
     })

}

$(document).ready(function (evt) {
     $("#btnLogin").on("click", function (evt) {
          evt.preventDefault();
          let email = $("#tboxLogEmail").val().trim();
          let password = $("#tboxLogPass").val();
          //send username and password for auth
          createUser(email, password);
     })
});