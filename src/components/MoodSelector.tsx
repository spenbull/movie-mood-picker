import type { Mood } from "../types"

// List of available moods that users can select
const moods: Mood[] = ["happy", "sad", "nostalgic", "anxious", "bored"]

// Component receives a callback function to handle mood selection
type Props = {
  onSelect: (mood: Mood) => void
}

export default function MoodSelector({ onSelect }: Props) {
  return (
    <>
      {/* Render a button for each mood */}
      {moods.map((mood) => (
        <button
          key={mood}
          // Trigger parent handler when a mood is selected
          onClick={() => onSelect(mood)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #d1d5db",
            background: "#f9fafb",
            color: "#111827",
            cursor: "pointer",
            fontWeight: "500"
          }}
          // Change button appearance on hover for better user feedback
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563eb"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f9fafb"
            e.currentTarget.style.color = "#111827"
          }}
        >
          {/* Capitalize mood label for display */}
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </button>
      ))}
    </>
  )
}