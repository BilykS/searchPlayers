import PlayerList from '@/store/modules/player-list/player-list'
import { Component, Vue } from '~/node_modules/vue-property-decorator'
import {
  Player,
  RankSolo,
} from '~/store/modules/player-list/interface/player-list-interface'
@Component({
  name: 'TablePlayers',
})
export default class TablePlayers extends Vue {
  private tableHeaders: string[] = ['id', 'name', 'battles', 'wins']
  private get getPlayerList(): Player[] {
    return PlayerList.getPlayerList
  }

  private percentage(partialValue: number, totalValue: number): number {
    return (100 * partialValue) / totalValue
  }

  private isRankExp(payload: RankSolo): number {
    return payload ? payload.battles_count || 0 : 0
  }

  private isRankWins(payload: RankSolo): number {
    const battles: number = this.isRankExp(payload)
    const wins: number = payload ? payload.wins || 0 : 0
    return this.percentage(wins, battles) || 0
  }
}
