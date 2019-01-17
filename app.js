const appId = '1ca7c14f'
const appKey = '6ad5a627d4938d3b00d919649e31dc4d'
const url = 'https://api.edamam.com/search?'

var searchIngredients = [];

// CORS Anywhere is a node.js proxy
$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = window.location.protocol === 'http:' ? 'http:' : 'https:'
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
      // options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
  })

$(document).ready(function(){
    $('.modal').modal();
  });

function displayRecipes() {
    // url: 'https://api.edamam.com/search?q=' + searchIngredients + '&app_id=1ca7c14f&app_key=6ad5a627d4938d3b00d919649e31dc4d'
  // url: `${url}q=${searchIngredients}&app_id=${appId}&app_key=${appKey}`
	$.ajax({
		url: 'https://api.edamam.com/search?q=' + searchIngredients + '&app_id=1ca7c14f&app_key=6ad5a627d4938d3b00d919649e31dc4d'
	}).then(function(response) {
		
		var intCalories = (response.hits[0].recipe.calories)/(response.hits[0].recipe.yield);
		var calories = (Math.floor(intCalories));
		var results = response.hits;

		$('#displayRecipe').html('');

		for (i = 0; i < results.length; i++) {
			var intCalories = (results[i].recipe.calories)/(results[i].recipe.yield);
			var calories = (Math.floor(intCalories));
			var recipeDiv = $('<div>');
			var recipeImage = $('<img>');
			var recipeCaption = $('<div>');
			var recipeBtnDiv = $('<div>');
            var caloriesP = $('<p>');
            
			recipeCaption.addClass('caption');
			recipeCaption.append($('<div>').text(results[i].recipe.label).addClass('recipeName'));
			recipeCaption.addClass('text-center');
			caloriesP.text(calories + ' calories per serving');
			recipeCaption.append(caloriesP)
			recipeBtnDiv.append($('<a>').append($('<button>').addClass('btn recipeBtn').text('Go to recipe')).attr('href',results[i].recipe.url).attr('target','_blank'));
            // favoriteBtnDiv.addClass('heart fa fa-heart-o').toggleClass('heart fa fa-heart-o');
            var activityBtn = $('<button>').text('Fun Activity').addClass('btn');
            // var favoriteBtn = $('far fa-heart')
            // favoriteBtnDiv.addClass('far fa-heart');
            let favoriteBtn = $('<span>').addClass('glyphicon glyphicon-heart-empty')
            // recipeBtnDiv.append(favoriteBtnDiv.addClass('heart fa fa-heart-o'));
            
            recipeBtnDiv.append(activityBtn);
            recipeBtnDiv.append(favoriteBtn);
			recipeCaption.append(recipeBtnDiv);
			recipeImage.attr('src', results[i].recipe.image);
			recipeDiv.addClass('thumbnail col-md-4 recipe');
			recipeDiv.append(recipeImage);
			recipeDiv.append(recipeCaption);
			$('#displayRecipe').prepend(recipeDiv);

			if (calories < 100) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal1');
			} else if (calories >= 100 && calories < 500) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal2');
			} else if (calories >= 500 && calories < 1000) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal3');
			} else if (calories >= 1000 && calories < 1500) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal4');
			} else if (calories >= 1500 && calories < 2000) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal5');
			} else if (calories >= 2000) {
				activityBtn.addClass('modal-trigger').attr('href', '#modal6');
			};
		};
		$('#numIngredients').html(searchIngredients.length);
		for (var j = 0; j < searchIngredients.length; j++) {
			var ingredientDiv = $('<div>').text(searchIngredients[j]).addClass('currentIngredient');
			var ingredientClose = $('<button>').text('X').addClass('ingredientListBtn btn').attr('name', searchIngredients[j]);
			ingredientDiv.append(ingredientClose);
			$('#ingredients-list').prepend(ingredientDiv);
		};
	});
};

$('#ingredientsSearchBtn').on('click', function(event){
	event.preventDefault();
	var ingredient = $('#ingredientsSearchBar').val().trim();
	//var ingredientStr = String(ingredient);

	searchIngredients.push(ingredient);
	$('#ingredientsSearchBar').val('');
	$('#ingredients-list').empty();
	displayRecipes();
	console.log(searchIngredients);
});

$(document).on('click', '.ingredientListBtn', function() {
	var searchName = this.name;

	for (var k=searchIngredients.length-1; k>=0; k--) {
    	if (searchIngredients[k] === searchName) {
        searchIngredients.splice(k, 1);
         break;      
    	};
	};
	console.log(searchIngredients)
	$('#ingredients-list').empty();
	$('#displayRecipe').empty();
	if (searchIngredients.length >= 1) {
	displayRecipes();
	} else {
		$('#numIngredients').html('0');
		var recipeBckGound = $('<img>').attr('src', 'images/MainPic.jpg').addClass('recipeDisplayBckGround img-responsive');
		$('#displayRecipe').append(recipeBckGound);
};
})