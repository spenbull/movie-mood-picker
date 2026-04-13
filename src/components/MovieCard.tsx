import type { Movie } from "../types"

// Props include the movie data and a function to handle watchlist toggling
type Props = {
  movie: Movie
  onToggle: (movie: Movie) => void
}

export default function MovieCard({ movie, onToggle }: Props) {
  return (
    <div>
      {/* Display movie title */}
      <h3>{movie.title}</h3>

      {/* Display a short description of the movie */}
      <p>{movie.overview}</p>

      {/* Button to add/remove movie from watchlist */}
      <button onClick={() => onToggle(movie)}>
        Add to Watchlist
      </button>
    </div>
  )
}