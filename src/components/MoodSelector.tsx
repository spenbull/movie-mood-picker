import type { Mood } from "../types"

const moods: Mood[] = ["happy", "sad", "nostalgic", "anxious", "bored"]

type Props = {
  onSelect: (mood: Mood) => void
}

export default function MoodSelector({ onSelect }: Props) {
  return (
    <>
      {moods.map((mood) => (
        <button
          key={mood}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563eb"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f9fafb"
            e.currentTarget.style.color = "#111827"
          }}
        >
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </button>
      ))}
    </>
  )
}