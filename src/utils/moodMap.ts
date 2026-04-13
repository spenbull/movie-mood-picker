import type { Mood } from "../types"

export const moodToGenres: Record<Mood, number[]> = {
  happy: [35, 10751],        // Comedy, Family
  sad: [18, 10749],          // Drama, Romance
  nostalgic: [10749, 18],    // Romance, Drama
  anxious: [27, 53],         // Horror, Thriller
  bored: [28, 12]            // Action, Adventure
}