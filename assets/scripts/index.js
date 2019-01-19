let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
}



let logInUser = (email, password) => {
     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     auth().signInWithEmailAndPassword(email, password)
          .then(function (returnVal) {
               user.uid = returnVal.user.uid;
               //db().ref(`users/${returnVal.user.uid}/lastLogin`).push(firebase.database.ServerValue.TIMESTAMP)
               db().ref(`users/${returnVal.user.uid}`).once("value")
                    .then(function (returnVal) {
                         user.name = returnVal.val().name;
                         user.email = returnVal.val().email;
                         let likesObj = returnVal.val().likes;
                         user.likes = likesObj === undefined ? [] : Object.keys(likesObj)
                              .map(function (key) { return likesObj[key].toLowerCase(); })
                              .filter(function (el) { return el != null && el != ""; });
                         let alergyObj = returnVal.val().alergies;
                         user.alergies = alergyObj === undefined ? [] : Object.keys(alergyObj)
                              .map(function (key) { return alergyObj[key].toLowerCase(); })
                              .filter(function (el) { return el != null && el != ""; });
                         sessionStorage.setItem("user", JSON.stringify(user));
                         sessionStorage.setItem("errorMessage", errorMessage);
                         window.location.assign("search.html")
                    })
                    .catch(function (error) {
                         errorMessage = error.message;
                         sessionStorage.setItem("errorMessage", errorMessage);
                         let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Login Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${errorMessage}</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
                         $("body").append(mod);
                         $("#exampleModal").modal('show');
                         $("#exampleModal").on('hidden.bs.modal', function () {
                              $(this).remove();
                         });
                    })
          })
          .catch(function (error) {
               errorMessage = error.message;
               sessionStorage.setItem("errorMessage", errorMessage);
               let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Login Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${errorMessage}</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
               $("body").append(mod);
               $("#exampleModal").modal('show');
               $("#exampleModal").on('hidden.bs.modal', function () {
                    $(this).remove();
               });
          });
}

let createUser = (email, password) => {

     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     let retVal = auth().createUserWithEmailAndPassword(email, password)
          .then(function (returnVal) {
               user.uid = returnVal.user.uid;
               user.email = returnVal.user.email;
               db().ref(`users/${returnVal.user.uid}`).set({
                    name: ``,
                    email: returnVal.user.email
               }).then(function (data) {
                    sessionStorage.setItem("user", JSON.stringify(user));
                    sessionStorage.setItem("errorMessage", errorMessage);
                    window.location.assign("profile.html")
               }).catch(function (error) {
                    // Handle Errors here.
                    errorMessage = error.message;
                    sessionStorage.setItem("errorMessage", errorMessage);
                    let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Login Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${errorMessage}</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>`;
                    $("body").append(mod);
                    $("#exampleModal").modal('show');
                    $("#exampleModal").on('hidden.bs.modal', function () {
                         $(this).remove();
                    });
               });
               //db().ref(`users/${returnVal.user.uid}/lastLogin`).push(firebase.database.ServerValue.TIMESTAMP)
               //db().ref(`users/${returnVal.user.uid}/alergies`).push(``)
               //db().ref(`users/${returnVal.user.uid}/likes`).push(``)
          })
          .catch(function (error) {
               // Handle Errors here.
               errorMessage = error.message;
               sessionStorage.setItem("errorMessage", errorMessage);
               sessionStorage.setItem("errorMessage", errorMessage);
               let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Login Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${errorMessage}</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
               $("body").append(mod);
               $("#exampleModal").modal('show');
               $("#exampleModal").on('hidden.bs.modal', function () {
                    $(this).remove();
               });
          })

}

$(document).ready(function (evt) {

});
