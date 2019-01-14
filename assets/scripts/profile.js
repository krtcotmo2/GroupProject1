let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
}

let saveProfile = (uid, email, name, alergies, likes) => {
     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     db().ref(`users/${uid}`).set({
          name: name,
          email: email
     })
     .catch(function(error){
          errorMessage = error.errorMessage;
     });
     db().ref(`users/${uid}/likes`).set(likes)
     .catch(function(error){
          errorMessage = error.errorMessage;
     });
     db().ref(`users/${uid}/alergies`).set(alergies)
     .catch(function(error){
          errorMessage = error.errorMessage;
     });
     //need some code that looks at any changes in the profile data and seets the user obj to that data
     
     sessionStorage.setItem("user", JSON.stringify(user));
     sessionStorage.setItem("errorMessage", errorMessage);
}
$(document).ready(function(){
     user = JSON.parse(sessionStorage.getItem("user"));
     errorMessage - sessionStorage.getItem("errorMessage");
     //need code that will populate the the fields for the user profile coming from the user Object
});