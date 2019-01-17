let showError = (title, body) => {
     let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${title}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" >${body} </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
     $("body").append(mod);
     $("#exampleModal").modal('show');
     $("#exampleModal").on('hidden.bs.modal', function () {
          $(this).remove();
     });
}
let saveProfile = (uid, email, name, alergies, likes, favorites) => {
     let RetVal = true;
     sessionStorage.setItem("user", null);
     sessionStorage.setItem("errorMessage", null);
     db().ref(`users/${uid}`).set({
          name: name,
          email: email
     })
          .catch(function (error) {
               errorMessage = error.errorMessage;
               showError('Error in saving name and email');
               return;
          });

     db().ref(`users/${uid}/alergies`).set(alergies)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               showError('Error in updating allergies');
               return;
          });

     db().ref(`users/${uid}/likes`).set(likes)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               showError('Error in saving favorite ingredients');
               return;
          });
     db().ref(`users/${uid}/favorites`).set(favorites)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               showError('Error in saving favotire recipes');
               return;
          });

     //need some code that looks at any changes in the profile data and seets the user obj to that data

     sessionStorage.setItem("user", JSON.stringify(user));
     sessionStorage.setItem("errorMessage", errorMessage);


     window.location.assign("search.html");
}

let popList = (arr, lst) => {
     arr.forEach((o) => {
          $(lst).append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${o}</li>`);

     })
}
$(document).ready(function () {
     user = JSON.parse(sessionStorage.getItem("user"));

     popList(user.likes, $(".favList"));
     popList(user.alergies, $(".allergyList"));

     errorMessage = sessionStorage.getItem("errorMessage");
     $("#tboxName").val(user.name);
     $("#tboxEmail").val(user.email);

     $("#btnAddLike").on("click", function () {
          if ($("#tboxLikes").val().trim() == "") {
               return;
          }
          $(".favList").append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${$("#tboxLikes").val()}</li>`);
          user.likes.push($("#tboxLikes").val().trim());
          $("#tboxLikes").val("");
     });
     $("#btnAddAllergy").on("click", function () {
          if ($("#tboxAllergies").val().trim() == "") {
               return;
          }
          $(".allergyList").append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${$("#tboxAllergies").val()}</li>`);
          user.alergies.push($("#tboxAllergies").val().trim());
          $("#tboxAllergies").val("");
     });
     $("form").keypress(function (e) {
          if (e.which == 13) {
               var tagName = e.target.tagName.toLowerCase();
               if (tagName !== "textarea") {
                    return false;
               }
          }
     });

     $(document).on("click", "i", function (evt) {
          if ($(this).parent().parent().attr("class") == "favList") {
               let char = $(this)[0].nextSibling.data
               user.likes = user.likes.filter(function (str) {
                    return str != char;
               })
          } else {
               let char = $(this)[0].nextSibling.data
               user.alergies = user.alergies.filter(function (str) {
                    return str != char;
               })
          }
          $(this).parent().remove();
     })
     $("#btnSubmit").on("click", function (evt) {
          evt.preventDefault();
          user.name = $("#tboxName").val().trim();
          if (user.name == "") {
               let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Profile Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Please enter in your name.</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
               $("body").append(mod);
               $("#exampleModal").modal('show');
               $("#exampleModal").on('hidden.bs.modal', function () {
                    $(this).remove();
               });
               return;
          }
          let saveSuccessful = saveProfile(user.uid, user.email, $("#tboxName").val().trim(), user.alergies, user.likes, user.favorites);
          if (saveSuccessful) {
               window.location.href = 'search.html';
          } else {
               let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Update Profile Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${errorMessage}</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
               $("body").append(mod);
               $("#exampleModal").modal('show');
               $("#exampleModal").on('hidden.bs.modal', function () {
                    $(this).remove();
               });
          }
     });

});