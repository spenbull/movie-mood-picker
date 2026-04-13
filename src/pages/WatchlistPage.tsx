import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Movie } from "../types"
import Header from "../components/Header"
import { useState } from "react"
import { genreMap } from "../utils/genreMap"
import { fetchMovieCredits } from "../api/tmdb"
import { Heart, Star, X } from "lucide-react"


export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useLocalStorage<Movie[]>("watchlist", [])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [liked, setLiked] = useLocalStorage<number[]>("liked", [])
  const [credits, setCredits] = useState<{
    cast: string[]
    director: string
  } | null>(null)

  const removeMovie = (id: number) => {
    setWatchlist(watchlist.filter((m) => m.id !== id))
  }

  const toggleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((m) => m !== id))
    } else {
      setLiked([...liked, id])
    }
  }

  return (
    <div>
      <Header count={watchlist.length} />

    <h1 style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
        Your Watchlist
    </h1>

      {watchlist.length === 0 && (
        <p style={{ textAlign: "center" }}>No movies saved yet.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >
        {watchlist.map((m) => {
        return (
            <div
            key={m.id}
            onClick={async () => {
                setSelectedMovie(m)
              
                try {
                  const data = await fetchMovieCredits(m.id)
                  setCredits(data)
                } catch {
                  console.error("Failed to fetch credits")
                }
              }}
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
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"
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
                        removeMovie(m.id)
                    }}
                    style={{
                        border: "none",
                        background: "#ef4444",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                    >
                    <X size={14} />
                    Remove
                </button>
            </div>
            </div>
        )
        })}
      </div>
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
                <X/>
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
                    onClick={() => removeMovie(selectedMovie.id)}
                    style={{
                        border: "none",
                        background: "#ef4444",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                    >
                    <X size={16} />
                    Remove
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
    
    </div>
  )
}