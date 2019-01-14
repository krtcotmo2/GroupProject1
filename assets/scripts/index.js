let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
}

let createUser = (email, password) => {
     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     auth().createUserWithEmailAndPassword(email, password)
     .then(function (returnVal) {
          user.uid = returnVal.user.uid;
          db().ref(`users/${returnVal.user.uid}`).set({
               name: ``,
               email: returnVal.user.email
          })
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("errorMessage", errorMessage);
          return true;
          //db().ref(`users/${returnVal.user.uid}/lastLogin`).push(firebase.database.ServerValue.TIMESTAMP)
          //db().ref(`users/${returnVal.user.uid}/alergies`).push(``)
          //db().ref(`users/${returnVal.user.uid}/likes`).push(``)
     })
     .catch(function (error) {
          // Handle Errors here.
          errorMessage = error.message;
          sessionStorage.setItem("errorMessage", errorMessage);
     });

}

$(document).ready(function (evt) {
     
});