import type { Movie } from "../types"

// API key and base URL are loaded from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// Fetch movies from TMDb based on selected genres, page, and optional mood filtering
export async function fetchMoviesByGenres(
  genreIds: number[],
  page: number = 1,
  mood?: string
): Promise<Movie[]> {
  // Base URL for TMDb discover endpoint
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`

  // Apply custom filtering logic based on mood
  if (mood === "nostalgic") {
    // Restrict to movies from 1980–1999
    url += "&primary_release_date.gte=1980-01-01&primary_release_date.lte=1999-12-31"
    // Focus on drama and romance for nostalgic feel
    url += "&with_genres=18,10749"
    // Exclude R-rated content for safer results
    url += "&certification_country=US&certification.lte=PG-13"
  
  } else if (mood === "sad") {
    // Use selected genres but remove comedy to keep tone consistent
    url += `&with_genres=${genreIds.join(",")}`
    url += "&without_genres=35" 
  
  } else {
    // Default behavior: fetch movies based on selected genres
    url += `&with_genres=${genreIds.join(",")}`
  }

  // Make API request
  const res = await fetch(url)

  // Handle failed requests
  if (!res.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data = await res.json()

  // Transform API response into Movie type used in the app
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

// Fetch cast and director information for a specific movie
export async function fetchMovieCredits(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`

  const res = await fetch(url)

  // Handle failed requests
  if (!res.ok) {
    throw new Error("Failed to fetch credits")
  }

  const data = await res.json()

  // Extract top 5 cast members
  const cast = data.cast.slice(0, 5).map((c: any) => c.name)

  // Find the director from crew list
  const director = data.crew.find((c: any) => c.job === "Director")?.name

  return { cast, director }
}