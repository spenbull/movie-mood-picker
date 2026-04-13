import type { Movie } from "../types"
import MovieCard from "./MovieCard"

// Props include a list of movies and a function to handle watchlist toggling
type Props = {
  movies: Movie[]
  onToggle: (movie: Movie) => void
}

export default function MovieList({ movies, onToggle }: Props) {
  return (
    <div>
      {/* Render a MovieCard for each movie in the list */}
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onToggle={onToggle} />
      ))}
    </div>
  )
}