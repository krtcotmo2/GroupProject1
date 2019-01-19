let errorMessage, user = {
     uid: ``,
     email: ``,
     name: ``,
     alergies: [],
     likes: [],
     favorites: []
}

if(sessionStorage.getItem("user")==undefined){
     window.location.href = 'index.html';
}else{
     let  userString = sessionStorage.getItem("user");
     user = JSON.parse(userString);
     errorMessage = sessionStorage.getItem("errorMessage");
}
