//let user = JSON.parse(sessionStorage.getItem("user"));
//let errorMessage = sessionStorage.getItem("errorMessage");
let saveFavorite = (uid, recId, addToFaves) => {
     if(addToFaves){
          db().ref(`users/${uid}/favorites`).push(recId)
          .then(function(){
               let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Favorites Message</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Recipe has been added to your favorites.</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal').modal('show')
               $('#exampleModal').on('hidden.bs.modal', function () {
                    $(this).remove()
               });
          })
     }  else{
          let rID = recId;
          db().ref().child(`users/${uid}/favorites`).once("value", s => {
               let rId2 = rID;
               if (s.exists()) {
                 // map through objects returned from firebase Ref and to find the matching value and then remove
                 Object.keys(s.val()).map(k => {
                     // deleting the node which contains `false` as value
                     if(s.val()[k]==rId2){
                       s.ref.child(k).remove();
                       let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Favorites Message</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Recipe has been removed from your favorites.</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
                         $('body').append(mod)
                         $('#exampleModal').modal('show')
                         $('#exampleModal').on('hidden.bs.modal', function () {
                              $(this).remove()
                         });
                     }
                 })
               }
           })
     }  
}