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
     user = sessionStorage.getItem(JSON.parse("user"));
     errorMessage = sessionStorage.getItem("errorMessage");
}
