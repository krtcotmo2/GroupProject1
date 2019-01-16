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

     db().ref(`users/${uid}/alergies`).set(alergies)
     .catch(function (error) {
          errorMessage = error.errorMessage;
          RetVal=  false;
     });

     db().ref(`users/${uid}/likes`).set(likes)
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
     
     db().ref(`users/${user.uid}`).on("child_changed", function(childSnapshot, prevChildKey) {
          console.table([childSnapshot, prevChildKey])
     });
     return RetVal;
}

let popList = (arr, lst) =>{
     arr.forEach((o)=>{
          $(lst).append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${o}</li>`);
          
     })
}
$(document).ready(function () {     
     user = JSON.parse(sessionStorage.getItem("user"));
     //TEMP CODEFOR TESTING
     user = {
          uid: "DhKhQDlzAQgYja4cMJsI3z2mmQC3",
          email: `bkent@t-mobile.com`,
          name: `Brian Kent`,
          alergies: ["turkey"],
          likes: ["onions", "seafood"],
          favorites: []
     }
     popList(user.likes, $(".favList"));
     popList(user.alergies, $(".allergyList"));

     errorMessage = sessionStorage.getItem("errorMessage");
     $("#tboxName").val(user.name); 
     $("#tboxEmail").val(user.email);

     $("#btnAddLike").on("click", function () {
          if($("#tboxLikes").val().trim() == ""){
               return;
          }
          $(".favList").append(`<li><i class="material-icons pr-2 align-middle">delete_forever</i>${$("#tboxLikes").val()}</li>`);
          user.likes.push( $("#tboxLikes").val().trim());
          $("#tboxLikes").val("");
     });
     $("#btnAddAllergy").on("click", function () {
          if($("#tboxAllergies").val().trim() == ""){
               return;
          }
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
               //window.location.href = 'searchPage.html';
          }else{
               console.log(errorMessage);
          }
     });
     
});