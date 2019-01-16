let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
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
               RetVal=  false;
          });
     db().ref(`users/${uid}/likes`).set(likes)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               RetVal=  false;
          });
     db().ref(`users/${uid}/alergies`).set(alergies)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               RetVal=  false;
          });
     db().ref(`users/${uid}/favorites`).set(favorites)
          .catch(function (error) {
               errorMessage = error.errorMessage;
               RetVal=  false;
          });
          
     //need some code that looks at any changes in the profile data and seets the user obj to that data

     sessionStorage.setItem("user", JSON.stringify(user));
     sessionStorage.setItem("errorMessage", errorMessage);
     return RetVal;
}
$(document).ready(function () {     
     user = JSON.parse(sessionStorage.getItem("user"));
     //TEMP CODEFOR TESTING
     user = {
          uid: `msdAQhdKTBeL1NIXLNtqaOrL7P23`,
          email: `krtcotmo2@gmail.com`,
          name: ``,
          alergies: [],
          likes: [],
          favorites: []
     }
     errorMessage - sessionStorage.getItem("errorMessage");
     
     $("#tboxEmail").val(user.email);

     $("#btnAddLike").on("click", function () {
          $(".favList").append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${$("#tboxLikes").val()}</li>`);
          user.likes.push( $("#tboxLikes").val().trim());
          $("#tboxLikes").val("");
     });
     $("#btnAddAllergy").on("click", function () {
          $(".allergyList").append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${$("#tboxAllergies").val()}</li>`);
          user.alergies.push( $("#tboxAllergies").val().trim());
          $("#tboxAllergies").val("");
     });
     $("form").keypress(function(e) {
          if (e.which == 13) {
              var tagName = e.target.tagName.toLowerCase(); 
              if (tagName !== "textarea") {
                  return false;
              }
          }
      });
     $(document).on("click", "i", function(evt){
          if($(this).parent().parent().attr("class")=="favList"){
               let char = $(this)[0].nextSibling.data
               user.likes = user.likes.filter(function(str){
                    return str != char;
               })
          }else{
               let char = $(this)[0].nextSibling.data
               user.alergies = user.alergies.filter(function(str){
                    return str != char;
               })
          }
          $(this).parent().remove();
     })

     $("#btnSubmit").on("click", function(evt){
          evt.preventDefault(); 
          user.name = $("#tboxName").val().trim();
          let saveSuccessful = saveProfile(user.uid, user.email, $("#tboxName").val().trim(), user.alergies, user.likes, user.favorites);
          if(saveSuccessful){
               window.location.href = 'searchPage.html';
          }else{
               console.log(errorMessage);
          }
     });
});