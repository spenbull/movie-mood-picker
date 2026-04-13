import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"

// Props include the number of items in the watchlist
type Props = {
  count: number
}

export default function Header({ count }: Props) {
  // Get current route to highlight active link
  const location = useLocation()

  // Dynamically style navigation links based on current page
  const linkStyle = (path: string) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#111827" : "#6b7280",
    fontWeight: location.pathname === path ? "600" : "500",
    borderBottom: location.pathname === path ? "2px solid #2563eb" : "none",
    paddingBottom: "4px"
  })

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "10px"
      }}
    >

      {/* Logo and app name (clickable, routes to home page) */}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}
        >
          {/* Circular logo image */}
          <img
            src={logo}
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #e5e7eb"
            }}
          />

          {/* Application title */}
          <h2 style={{ margin: 0, fontWeight: "700" }}>
            MovieMood
          </h2>
        </div>
      </Link>

      {/* Navigation links */}
      <nav style={{ display: "flex", gap: "20px" }}>
        {/* Home link */}
        <Link to="/" style={linkStyle("/")}>
          Home
        </Link>

        {/* Watchlist link with conditional count display */}
        <Link to="/watchlist" style={linkStyle("/watchlist")}>
          {count > 0 ? `Watchlist (${count})` : "Watchlist"}
        </Link>
      </nav>
    </header>
  )
}