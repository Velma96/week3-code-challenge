document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const loadingPlaceholder = document.getElementById("loading-placeholder");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const availableTickets = document.getElementById("available-tickets");
    const soldOutLabel = document.getElementById("sold-out");
    const movieDescription = document.getElementById("movie-description");
    const buyTicketButton = document.getElementById("buy-ticket");
  
    const API_URL = "http://localhost:3001/films";
  
    // Fetch and display the movie list
    fetch(API_URL)
      .then(response => response.json())
      .then(movies => {
        loadingPlaceholder.style.display = "none"; // Remove the loading placeholder
        movies.forEach(movie => {
          const li = document.createElement("li");
          li.textContent = movie.title;
          li.classList.add("film-item");
          li.addEventListener("click", () => displayMovieDetails(movie));
          if (movie.capacity - movie.tickets_sold === 0) {
            li.classList.add("sold-out");
          }
          filmList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
  
    // Display movie details
    function displayMovieDetails(movie) {
      moviePoster.src = movie.poster;
      movieTitle.textContent = movie.title;
      movieRuntime.textContent = `${movie.runtime} mins`;
      movieShowtime.textContent = movie.showtime;
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      availableTickets.textContent = ticketsAvailable;
  
      if (ticketsAvailable === 0) {
        soldOutLabel.style.display = "inline";
        buyTicketButton.disabled = true;
      } else {
        soldOutLabel.style.display = "none";
        buyTicketButton.disabled = false;
      }
  
      movieDescription.textContent = movie.description;
  
      buyTicketButton.onclick = () => handleBuyTicket(movie);
    }
  
    // Handle ticket purchase
    function handleBuyTicket(movie) {
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      if (ticketsAvailable > 0) {
        movie.tickets_sold++;
        availableTickets.textContent = movie.capacity - movie.tickets_sold;
  
        if (movie.capacity - movie.tickets_sold === 0) {
          soldOutLabel.style.display = "inline";
          buyTicketButton.disabled = true;
  
          // Update movie list
          const movieItems = document.querySelectorAll(".film-item");
          movieItems.forEach(item => {
            if (item.textContent === movie.title) {
              item.classList.add("sold-out");
            }
          });
        }
      }
    }
  });
  