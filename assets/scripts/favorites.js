let user = JSON.parse(sessionStorage.getItem("user"));
let errorMessage = sessionStorage.getItem("errorMessage");
let saveFavorite = (uid, recId, addToFaves) => {
     if(addToFaves){
          db().ref(`users/${uid}/favorites`).push(recId)
          .then(function(){
               return true;
          })
     }  else{
          let rID = recId;
          db().ref().child(`users/${uid}/favorites`).once("value", s => {
               let rId2 = rID;
               if (s.exists()) {
                 // map through objects returned from transportationRef and map through the objects
                 Object.keys(s.val()).map(k => {
                     // deleting the node which contains `false` as value
                     if(s.val()[k]==rId2){
                       s.ref.child(k).remove()
                     }
                 })
               }
           })
     }  
}