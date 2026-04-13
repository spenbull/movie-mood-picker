import type { Movie } from "../types"
import MovieCard from "./MovieCard"

type Props = {
  movies: Movie[]
  onToggle: (movie: Movie) => void
}

export default function MovieList({ movies, onToggle }: Props) {
  return (
    <div>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onToggle={onToggle} />
      ))}
    </div>
  )
}