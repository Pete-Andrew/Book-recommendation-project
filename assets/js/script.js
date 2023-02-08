// localStorage.clear();

var time = moment();
$("#time").text(time.format("DD-MM-YYYY"));

var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

var actors = $(".actors");
var awards = $(".awards");
var rated = $(".rated");
var director = $(".director");
var IMDBrating = $(".imdb-rating");
var released = $(".released");
var fimlTitle = $(".filmTitle");
var saveButton = $("button.saveButton");
var modal = $("#myModal");
var trigger = $("#submit-button");
var closeButton = $(".close-button");
var modalCardText = $("card-text");
var filmTitle = $("#search");
var cardsForPages = $(".front-page-card");
var clearSaveHistoryButton = $("#clearHistory")

var filmArray = []; 

//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
  event.preventDefault();

  var filmTitle = $("#search").val();
  getMovieInfo(filmTitle); 
}

function getMovieInfo (filmTitle) { 
  var filmTitleWithoutSpaces = filmTitle.replaceAll(" ", "+");
  

  var filmInfo =
    "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitleWithoutSpaces;

  //Ajax turns the returned info from the API key into a usable object.
  $.ajax({
    url: filmInfo,
    method: "GET",
  }).then(function (APIResponse) {

    var poster = $("#poster1");
    poster.attr("src", APIResponse.Poster);
    
    var poster2 = $("#poster2");
    poster2.attr("src", APIResponse.Poster);

    $(".filmTitle").text(APIResponse.Title);
    $(".actors").text("Actors: " + APIResponse.Actors);
    $(".awards").text("Awards: " + APIResponse.Awards);
    $(".rated").text("Rated: " + APIResponse.Rated);
    $(".director").text("Director: " + APIResponse.Director);
    $(".imdb-rating").text("IMDB rating: " + APIResponse.imdbRating);
    $(".released").text("Release Date: " + APIResponse.Released);

    $(".card-text").text(APIResponse.Plot);
    $(".card-title").text(APIResponse.Title);

    var tempArray = JSON.parse(localStorage.getItem("filmInfo")) || [];
    
    for (var i =0; i < tempArray.length; i++) {
    if (tempArray[i].Title === APIResponse.Title) {
    return; }
    } 

    tempArray.push(APIResponse);
    localStorage.setItem("filmInfo", JSON.stringify(tempArray));
    createButton(APIResponse.Title);
    
  });
};



$(document).ready(function () {

  trigger.click(function () {
    modal.css("display", "block");
  });

  closeButton.click(function () {
    modal.css("display", "none");
  });

  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.css("display", "none");
    }
  });
});

function saveButtonClick () {
  saveButton.click(function (event) {
  
      event.preventDefault(); 
    });
  
};
saveButtonClick(); 


function dynamicallyCreateCardsFromLocalStorage() {
  var tempArray = JSON.parse(localStorage.getItem("filmInfo"));
  
   //clears the buttons list and relogs the buttons so you don't get doubled enteries.
   cardsForPages.innerHTML = "";

  // if (tempArray !== null) {  
  getMovieInfo(tempArray[0].Title); 

  for (var i =0; i < tempArray.length; i++) {
    createButton(tempArray[i].Title); 
  }
}
//on refresh dynamically create buttons for each member of the history buttons array and assign them names. 
dynamicallyCreateCardsFromLocalStorage(); 


function createButton (movieName) { 
  var tempArrayRendered = document.createElement("button"); 
  
  var trash = document.createElement("i");
  trash.classList = "fa-regular fa-circle-xmark";
  var movieDiv = document.createElement("div");


    tempArrayRendered.setAttribute("class", "saveHistory btn btn-secondary");
    
    tempArrayRendered.addEventListener("click", doSomething) 

    // tempArrayRendered.setAttribute("data-index", i);
    tempArrayRendered.textContent = movieName
    movieDiv.append(tempArrayRendered); 
    movieDiv.append(trash); 

    cardsForPages.append(movieDiv);
}

function doSomething (event) {
  
  getMovieInfo(event.target.textContent);

}

function clearSaveHistory () {
 
  clearSaveHistoryButton.click(function () {
  localStorage.clear();
  modal.css("display", "none");
  });

}

clearSaveHistory ();