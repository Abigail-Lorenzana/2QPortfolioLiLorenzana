document.getElementById("movie_form").onsubmit = function(yuh){

yuh.preventDefault()

let title = document.getElementById("title").value
let year = document.getElementById("year").value
let genre = document.getElementById("genre").value

let movie = {
title: title,
year: year,
genre: genre,
rating: selectedRating
}

let movies = JSON.parse(localStorage.getItem("movies")) || []

// Update part^^
let found = false

for(let i = 0; i < movies.length; i++){
    if (movies[i].title.toLowerCase() === title.toLowerCase()){
        movies[i].rating = Math.round((Number(movies[i].rating) + Number(selectedRating)) / 2)
        movies[i].year = year
        movies[i].genre = genre

        found = true
    }
}
if (found === false){
    movies.push(movie)
}

localStorage.setItem("movies", JSON.stringify(movies))
showMovies()
}

// Showing movie list part^^
function showMovies(){

let movieList = document.getElementById("movieList")
let movies = JSON.parse(localStorage.getItem("movies")) || []
movieList.innerHTML = ""

for(let i = 0; i < movies.length; i++){
    let movie = movies[i];
    let ratingStars = "★".repeat(Number(movie.rating));
    movieList.innerHTML += `
    <div class = "movie">
       ${movie.title} (${movie.year}) - ${movie.genre}, Rating: <span style="color: gold;">${ratingStars}</span>
        <button onclick="deleteMovie(${i})">Delete</button>
       </div> 
    `;
}
}

// Star Rating part^^
let selectedRating = 0;
const stars = document.querySelectorAll(".star");

stars.forEach(function(star){
    star.addEventListener("click", function() {
        selectedRating = parseInt(star.dataset.value);

        stars.forEach(function(s) {

            if (parseInt(s.dataset.value) <= selectedRating){
                s.style.color = "gold";
            }
            else{
                s.style.color = "#ccc"; // otherwise gray
            }
        });
    });
});

// Delete part^^
function deleteMovie(ndx){

    let movies = JSON.parse(localStorage.getItem("movies")) || []
    let confirmDelete = confirm("Are you sure you want to delete this movie?")

    if(confirmDelete){
        movies.splice(ndx,1)
        localStorage.setItem("movies", JSON.stringify(movies))
        showMovies()
    }
}
