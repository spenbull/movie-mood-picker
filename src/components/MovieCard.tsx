import type { Movie } from "../types"

type Props = {
  movie: Movie
  onToggle: (movie: Movie) => void
}

export default function MovieCard({ movie, onToggle }: Props) {
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <button onClick={() => onToggle(movie)}>
        Add to Watchlist
      </button>
    </div>
  )
}