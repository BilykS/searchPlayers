import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators'
import store from '@/store/store'
import { Player } from '@/store/modules/player-list/interface/player-list-interface'
import SearchModule from '~/store/services/search/search'

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'PlayerList',
})
class PlayerList extends VuexModule {
  private playerList: Player[] = []
  private autoCompleteList: Player[] = []

  public get getAutoCompleteList(): Player[] {
    return this.autoCompleteList
  }

  public get getPlayerList(): Player[] {
    return this.playerList
  }

  @Mutation
  private setPlayerList(payload: Player[]) {
    this.playerList = payload
  }

  @Mutation
  private setAutoCompleteList(payload: Player[]) {
    this.autoCompleteList = payload
  }

  @Mutation
  private setCleanAutoCompleteList() {
    this.autoCompleteList = []
  }

  @Action
  public async loadAutoCompleteList(query: string): Promise<void> {
    const result = await SearchModule.loadAutoCompleteList(query)
    this.setAutoCompleteList(result)
  }

  @Action
  public async loadPlayers(query: string): Promise<void> {
    const result = await SearchModule.loadPlayers(query)
    this.setPlayerList(result)
  }

  @Action
  public async cleanAutoCompleteList(): Promise<void> {
    this.setCleanAutoCompleteList()
  }
}

export default getModule(PlayerList)
