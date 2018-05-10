var topics = ["dog", "cat", "snake", "bear"];
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
animal + "&api_key=WyVksPpJllymGFe3yUOLsJI2ZHUtrKp1&limit=10";

 // Creating an AJAX call for the specific movie button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response.data;
    for (var j = 0; j < results.length; j++){
        var animalDiv = $("<div class = 'animal'>");

        var p = $("<p>").text("Rating: " + results[j].rating);
        animalDiv.append(p);
        var image = $("<img>");
        image.attr("src",results[j].images.fixed_height.url);
        animalDiv.append(image);
        $("#animal-view").prepend(animalDiv);
    }
    
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  topics.push(animal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();