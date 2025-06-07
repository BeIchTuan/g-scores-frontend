export interface ScoreLevelStats {
  subject: string
  levels: {
    EXCELLENT: number
    GOOD: number
    AVERAGE: number
    BELOW_AVERAGE: number
  }
  total: number
}
