import type { Movie } from "../types"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

export async function fetchMoviesByGenres(
  genreIds: number[],
  page: number = 1,
  mood?: string
): Promise<Movie[]> {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`

  if (mood === "nostalgic") {
    url += "&primary_release_date.gte=1980-01-01&primary_release_date.lte=1999-12-31"
    url += "&with_genres=18,10749"
    url += "&certification_country=US&certification.lte=PG-13"
  
  } else if (mood === "sad") {
    url += `&with_genres=${genreIds.join(",")}`
    url += "&without_genres=35" 
  
  } else {
    url += `&with_genres=${genreIds.join(",")}`
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data = await res.json()

  return data.results.slice(0, 10).map((m: any) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    posterPath: m.poster_path,
    backdropPath: m.backdrop_path,
    voteAverage: m.vote_average,
    releaseDate: m.release_date,
    genreIds: m.genre_ids
  }))
}

export async function fetchMovieCredits(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch credits")
  }

  const data = await res.json()

  const cast = data.cast.slice(0, 5).map((c: any) => c.name)

  const director = data.crew.find((c: any) => c.job === "Director")?.name

  return { cast, director }
}