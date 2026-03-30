export interface RankSolo {
  exp?: number
  // eslint-disable-next-line camelcase
  premium_exp?: number
  frags?: number
  // eslint-disable-next-line camelcase
  battles_count?: number
  wins?: number
}

export interface PlayerStatistics {
  clan?: object
  pvp: RankSolo
  pve?: RankSolo
  club?: object
  // eslint-disable-next-line camelcase
  rank_solo?: RankSolo
  // eslint-disable-next-line camelcase
  rank_old_solo?: object
}

export interface Player {
  name: string
  // eslint-disable-next-line camelcase
  spa_id: number
  hidden: boolean
  statistics?: PlayerStatistics
}

export interface SearchResult {
  status: string
  data: Player[]
}

export interface PlayerListResult {
  data: SearchResult
}
