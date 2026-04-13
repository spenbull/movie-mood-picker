export type Movie = {
    id: number
    title: string
    overview: string
    posterPath: string
    backdropPath: string
    voteAverage: number
    releaseDate: string
    genreIds: number[]
  }
  
  export type Genre = {
    id: number
    name: string
  }
  
  export type Mood = "happy" | "sad" | "nostalgic" | "anxious" | "bored"