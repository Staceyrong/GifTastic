var topics = ["Taylor Swift", "Lady Gaga", "Katy Perry", "Michael Jackson","Rihanna","Ariana Grande","Justin Bieber","Harry Styles"];
// displaySingerInfo function re-renders the HTML to display the appropriate content
function displaySingerInfo() {

var singer = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
singer + "&api_key=WyVksPpJllymGFe3yUOLsJI2ZHUtrKp1&limit=10";

 // Creating an AJAX call for the specific singer button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response.data;
    for (var j = 0; j < results.length; j++){
        var singerDiv = $("<div class = 'singer'>");

        var p = $("<p>").text("Rating: " + results[j].rating);
        singerDiv.append(p);
        var image = $("<img class ='gif'>");
        image.attr("src",results[j].images.fixed_height_still.url);
        singerDiv.append(image);
        $("#singer-view").prepend(singerDiv);
    }
  });
        $("#singer-view").empty();
}

 
$('body').on('click', '.gif', function() {
  var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});
// Function for displaying singer data
function renderButtons() {
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of singers
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    // Adding a class of singer-btn to our button
    a.addClass("singer-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}


// This function handles events where an singer button is clicked
$("#add-singer").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var singer = $("#singer-input").val().trim();

  // Adding singer from the textbox to our array
  topics.push(singer);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "singer-btn"
$(document).on("click", ".singer-btn", displaySingerInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();