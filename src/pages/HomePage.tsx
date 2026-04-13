import { useState } from "react"
import type { Movie, Mood } from "../types"
import MoodSelector from "../components/MoodSelector"
import { fetchMoviesByGenres } from "../api/tmdb"
import { fetchMovieCredits } from "../api/tmdb"
import { moodToGenres } from "../utils/moodMap"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Header from "../components/Header"
import { genreMap } from "../utils/genreMap"
import { RefreshCw, Film, Heart, Plus, Check,Star } from "lucide-react"

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [watchlist, setWatchlist] = useLocalStorage<Movie[]>("watchlist", [])
  const [liked, setLiked] = useLocalStorage<number[]>("liked", [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [credits, setCredits] = useState<{
    cast: string[]
    director: string
  } | null>(null)

  const handleMood = async (mood: Mood) => {
    setSelectedMood(mood)
    setPage(1)
    setLoading(true)
    setError(null)

    try {
      const genres = moodToGenres[mood]
      const data = await fetchMoviesByGenres(genres, 1, mood)
      setMovies(data)
    } catch {
      setError("Failed to fetch movies")
    }

    setLoading(false)
  }

  const toggleWatchlist = (movie: Movie) => {
    const exists = watchlist.find((m) => m.id === movie.id)

    if (exists) {
      setWatchlist(watchlist.filter((m) => m.id !== movie.id))
    } else {
      setWatchlist([...watchlist, movie])
    }
  }

  const toggleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((m) => m !== id))
    } else {
      setLiked([...liked, id])
    }
  }

  const refreshMovies = async () => {
    if (!selectedMood) return

    const nextPage = page + 1
    setPage(nextPage)
    setLoading(true)

    try {
      const genres = moodToGenres[selectedMood]
      const data = await fetchMoviesByGenres(genres, nextPage, selectedMood)
      setMovies(data)
    } catch {
      setError("Failed to refresh movies")
    }

    setLoading(false)
  }

  return (
    <div>
      <Header count={watchlist.length} />

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px"
        }}
      >
        <Film size={30} />
        Movie Mood Picker
      </h1>

      
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          padding: "25px",
          borderRadius: "14px",
          textAlign: "center",
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>What’s your mood?</h2>

        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px"
          }}
        >
         
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center"
            }}
          >
            <MoodSelector onSelect={handleMood} />
          </div>

          
          {selectedMood && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "#f3f4f6",
                padding: "12px 16px",
                borderRadius: "12px",
                marginTop: "10px"
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#111827"
                }}
              >
                Selected mood:{" "}
                {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
              </span>

              <button
                onClick={refreshMovies}
                style={{
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <RefreshCw size={18} className={loading ? "spin" : ""} />
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div style={{ textAlign: "center", color: "red", marginTop: "10px" }}>
          <p>{error}</p>
          <button onClick={() => selectedMood && handleMood(selectedMood)}>
            Retry
          </button>
        </div>
      )}

      
      {!selectedMood && (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            padding: "20px"
          }}
        >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "10px",
            color: "#111827"
          }}
        >
          Can't decide what to watch?
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            maxWidth: "500px",
            margin: "0 auto"
          }}
        >
          Just select a mood and we’ll pick something perfect for you!!!
        </p>
        </div>
      )}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading movies...
        </p>
      )}

      
      {selectedMood && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "25px",
            padding: "20px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          {movies.map((m) => {
            const isSaved = watchlist.some((w) => w.id === m.id)

            return (
              <div
                key={m.id}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer"
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.02)"
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)"
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)"
                }}

                onClick={async () => {
                  setSelectedMovie(m)

                  try {
                    const data = await fetchMovieCredits(m.id)
                    setCredits(data)
                  } catch {
                    console.error("Failed to fetch credits")
                  }
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${m.posterPath}`}
                  alt={m.title}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />

                <h3
                  style={{
                    margin: "8px 0 4px 0",
                    fontSize: "15px",
                    fontWeight: "600"
                  }}
                >
                  {m.title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px"
                  }}
                >
                  {m.overview?.slice(0, 80)}...
                </p>

                <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <Star size={14} color="#facc15" fill="#facc15" />
                    {m.voteAverage}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px"
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(m.id)
                    }}
                    style={{
                      border: "none",
                      background: "#f3f4f6",
                      padding: "6px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Heart
                      size={16}
                      color={liked.includes(m.id) ? "red" : "black"}
                      fill={liked.includes(m.id) ? "red" : "none"}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWatchlist(m)
                    }}
                    style={{
                      border: "none",
                      background: isSaved ? "#22c55e" : "#2563eb",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    {isSaved ? <Check size={14} /> : <Plus size={14} />}
                    {isSaved ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      )}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
              display: "flex",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            
            <div style={{ flex: "1", minWidth: "250px" }}>
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.posterPath}`}
                alt={selectedMovie.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            
            <div
              style={{
                flex: "2",
                padding: "20px",
                overflowY: "auto",
                position: "relative"
              }}
            >
              
              <button
                onClick={() => setSelectedMovie(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  border: "none",
                  background: "none",
                  fontSize: "20px",
                  cursor: "pointer"
                }}
              >
                ✖
              </button>

              <h2 style={{ marginBottom: "10px" }}>
                {selectedMovie.title}
              </h2>

              <p   style={{
                fontSize: "13px",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <Star size={14} color="#facc15" fill="#facc15" />
                 {selectedMovie.voteAverage} • {selectedMovie.releaseDate}
              </p>

              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "5px" }}>
                {selectedMovie.genreIds
                  .slice(0, 3)
                  .map((id) => genreMap[id] || "Unknown")
                  .join(", ")}
              </p>

              <p style={{ marginTop: "15px", lineHeight: "1.5" }}>
                {selectedMovie.overview}
              </p>
              {credits && (
                <div style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Director:
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>
                    {credits.director || "Unknown"}
                  </p>

                  <p style={{ fontSize: "14px", fontWeight: "600", marginTop: "10px" }}>
                    Cast:
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>
                    {credits.cast.join(", ")}
                  </p>
                </div>
              )}

              
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleLike(selectedMovie.id)}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Heart
                  size={18}
                  color={liked.includes(selectedMovie.id) ? "red" : "black"}
                  fill={liked.includes(selectedMovie.id) ? "red" : "none"}
                />
              </button>

                <button
                  onClick={() => toggleWatchlist(selectedMovie)}
                  style={{
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Plus size={16} />
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}