# Flatdango

Flatdango is a movie ticket purchasing application that allows users to browse available movies, view detailed information about each movie, and purchase tickets.

---
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Movie Data Format](#movie-data-format)
- [Customization](#customization)
- [Future Enhancements](#future-enhancements)
- [Licence](#license)
- [Contact Information](#contact-information)
---
## Features

- Display a list of available movies.
- View detailed information about a selected movie, including:
  - Title
  - Runtime
  - Showtime
  - Available tickets
  - Description
  - Poster image (with a default placeholder for unavailable images).
- Highlight movies that are sold out.
- Purchase tickets with real-time updates to ticket availability.
- Visual indicators for "Sold Out" movies.
- A loading placeholder displayed while fetching the movie list.

---
## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling and layout.
- **JavaScript**: Dynamic behavior and interaction.
- **JSON Server**: Backend simulation for movie data.

---
## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- JSON Server installed globally or locally in the project directory.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flatdango.git
   cd flatdango
   ```

2. Install JSON Server if not already installed:
   ```bash
   npm install -g json-server
   ```

3. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. Open `index.html` in a browser to run the application.
---
## Project Structure

```bash
flatdango/
├── index.html       # Main HTML file
├── styles.css       # CSS for styling
├── app.js           # JavaScript for functionality
├── db.json          # Mock database for JSON Server
├── README.md        # Project documentation
└── default-poster.jpg  # Default movie poster image
```
---
## Movie Data Format

The application uses the following JSON structure for movies:

```json
{
  "id": "1",
  "title": "The Giant Gila Monster",
  "runtime": "108",
  "capacity": 30,
  "showtime": "04:00PM",
  "tickets_sold": 27,
  "description": "A giant lizard terrorizes a rural Texas community...",
  "poster": "https://example.com/poster.jpg"
}
```
---
## Customization

### Default Poster
The default poster image (`default-poster.jpg`) is used when a movie poster URL is unavailable. You can replace this file with your preferred default image.

### Styling
To customize the appearance, modify the `styles.css` file.

### API Configuration
The base URL for the JSON Server API is set to `http://localhost:3000/films`. To change it, update the `API_URL` variable in `app.js`.

---
## Future Enhancements

- Add search functionality for movies.
- Include user authentication for ticket purchasing.
- Improve responsiveness for better mobile support.
---
## License

This project is licensed under the MIT License. Feel free to use and modify it for your own purposes.

---

Enjoy using Flatdango! If you have any feedback or questions, feel free to contribute or reach out.
## Contact Information

- *Name*: Phoebe Velma Awuor
- *Email*: [awuorphoebi@gmail.com]
- *LinkedIn*: [https://www.linkedin.com/in/phoebe-velma-awuor/](#)
- *GitHub*: [https://github.com/Velma96](#)

---
---

