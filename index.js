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
    const ticketPrice = 10; // Fixed price per ticket
  
    // Show loading indicator
    function showLoading() {
      loadingPlaceholder.style.display = "block";
      filmList.innerHTML = ""; // Clear the movie list while loading
    }
  
    // Hide loading indicator
    function hideLoading() {
      loadingPlaceholder.style.display = "none";
    }
  
    // Fetch and display the movie list
    function fetchMovies() {
      showLoading(); // Show loading placeholder before fetching
      fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
          hideLoading(); // Hide loading once data is fetched
          if (movies.length === 0) {
            loadingPlaceholder.textContent = "No movies available!";
          }
          movies.forEach(movie => {
            const li = document.createElement("li");
            li.textContent = movie.title;
            li.classList.add("film-item");
            li.addEventListener("click", () => displayMovieDetails(movie));
  
            // Show sold-out if needed
            if (movie.capacity - movie.tickets_sold === 0) {
              li.classList.add("sold-out");
            }
            filmList.appendChild(li);
          });
        })
        .catch(error => {
          console.error("Error fetching movies:", error);
          loadingPlaceholder.textContent = "Failed to load movies. Please try again.";
        });
    }
  
    // Display movie details with smoother transitions
    function displayMovieDetails(movie) {
      showLoading(); // Show loading state when a movie is clicked
  
      // Preload the movie poster image to avoid flickering
      const img = new Image();
      img.src = movie.poster;
      img.onload = () => {
        // Once image is loaded, update movie details
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
  
        // Hide loading state after all content is loaded
        hideLoading();
  
        // Attach event listener for ticket purchase
        buyTicketButton.onclick = () => handleBuyTicket(movie);
      };
    }
  
    // Handle ticket purchase
    function handleBuyTicket(movie) {
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      if (ticketsAvailable > 0) {
        const numPeople = parseInt(prompt(`How many people are buying tickets for "${movie.title}"?`), 10);
  
        if (isNaN(numPeople) || numPeople <= 0) {
          alert("Invalid input. Please enter a valid number.");
          return;
        }
  
        const totalCost = numPeople * ticketPrice;
  
        if (numPeople > ticketsAvailable) {
          alert(`Not enough tickets available! Only ${ticketsAvailable} ticket(s) left.`);
          return;
        }
  
        // Update tickets sold
        fetch(`http://localhost:3001/films/${movie.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tickets_sold: movie.tickets_sold + numPeople,
          }),
        })
          .then(() => {
            availableTickets.textContent = movie.capacity - (movie.tickets_sold + numPeople);
            alert(`Purchase successful! You bought ${numPeople} ticket(s) for $${totalCost}.`);
  
            // Update UI to show sold-out if necessary
            if (movie.capacity - (movie.tickets_sold + numPeople) === 0) {
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
          })
          .catch((error) => {
            console.error("Error updating movie:", error);
            alert("Something went wrong. Please try again later.");
          });
      }
    }
  
    // Initialize app by fetching movies
    fetchMovies();
  });
  