import {
  Module,
  VuexModule,
  getModule,
  Action,
} from 'vuex-module-decorators'
import store from '~/store/store'
import axios from '~/node_modules/axios'
import {
  Player,
  SearchResult,
} from '~/store/modules/player-list/interface/player-list-interface'
import { ESearch } from '~/store/services/search/enums/search.enum'

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'Search',
})
class SearchModule extends VuexModule {
  @Action
  public async loadAutoCompleteList(
    query: string
  ): Promise<Player[]> {
    const result = await axios.get<SearchResult>(
      `${ESearch.api}/accounts/search/autocomplete/${query}/?limit=${ESearch.limit}`
    )
    return result.data.data
  }

  @Action
  public async loadPlayers(query: string): Promise<Player[]> {
    const result = await axios.get<SearchResult>(
      `${ESearch.api}/accounts/search/${query}`
    )
    return result.data.data
  }
}

export default getModule(SearchModule)
