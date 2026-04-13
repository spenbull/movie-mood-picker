# Movie Mood Picker

## Live Demo

https://movie-mood-picker.vercel.app/

---

## Overview

Movie Mood Picker is a single-page web application built with React and TypeScript that helps users discover movies based on their current mood. Instead of searching manually, users select how they’re feeling, and the app fetches relevant movie recommendations using the TMDb API.

The application focuses on creating a clean, intuitive user experience while demonstrating strong use of API integration, state management, and modern React development practices.

---

## Features

- Mood-based movie recommendations (Happy, Sad, Nostalgic, Anxious, Bored)
- Refresh button to load new movie suggestions
- Like/unlike movies with persistent state
- Watchlist with add/remove functionality (stored in local storage)
- Movie details modal including:
  - Description
  - Rating
  - Release date
  - Genres
  - Cast and director
- Smart filtering (e.g., removing comedy from sad mood)
- Responsive grid layout
- Interactive UI with hover effects and icons

---

## Technologies Used

- React (with Hooks)
- TypeScript
- TMDb API (The Movie Database)
- React Router
- Lucide React (icon library)
- Local Storage (persistent state)

---

## Project Structure

src/
  components/
  pages/
  api/
  hooks/
  utils/
  assets/

---

## How to Run the Project Locally

1. Clone the repository:

git clone https://github.com/spenbull/movie-mood-picker.git  
cd movie-mood-picker  

2. Install dependencies:

npm install  

3. Create a `.env` file in the root directory:

VITE_TMDB_API_KEY=your_api_key_here  
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3  

4. Start the development server:

npm run dev  

---

## API Usage

This project uses the TMDb API to fetch movie data.

### Endpoints Used

- `/discover/movie` for mood-based recommendations
- `/movie/{id}/credits` for cast and director information

### Data Handling

- API responses are transformed into a consistent Movie type
- Only necessary fields are used in the UI
- Results are limited for better performance and usability

---

## Additional Features

- Custom hook (`useLocalStorage`) for persistent data
- Dynamic filtering logic based on mood
- Modal UI for detailed movie viewing
- Conditional rendering for loading, error, and empty states

---

## Future Improvements

- Add search functionality
- Improve mobile responsiveness
- Add sorting/filtering options (rating, popularity)
- Use full genre API instead of static mapping
- Add user accounts for saving preferences

---

## Author

Spencer Bullock

---

## Notes

This project was created as part of the IS 537 Semester Project to demonstrate understanding of React, TypeScript, API integration, and UI/UX design.
