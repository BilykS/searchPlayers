import { Component, Vue } from 'vue-property-decorator'
import PlayerList from '@/store/modules/player-list/player-list'
import { Player } from '~/store/modules/player-list/interface/player-list-interface'
@Component({
  name: 'search',
})
export default class Search extends Vue {
  private className: string = 'b-search'
  private query: string = ''
  private searchItemIndex: number = 0
  private searchItemLength: number = 0
  private isResult: boolean = false

  public get getAutoCompleteList(): Player[] {
    return PlayerList.getAutoCompleteList
  }

  public get isShowResult(): boolean {
    return this.getAutoCompleteList.length > 0 && this.isResult
  }

  private initNavigation() {
    const itemsWrap = document.querySelector('.js-search-result')
    if (itemsWrap) {
      const items = itemsWrap.querySelectorAll('.js-search-result-item').length
      this.searchItemLength = items
    }
  }

  private handlerUpArrow() {
    if (this.searchItemIndex === 0) {
      this.searchItemIndex = this.searchItemLength - 1
    } else {
      this.searchItemIndex--
    }
  }

  private handlerUpDown() {
    if (this.searchItemIndex === this.searchItemLength - 1) {
      this.searchItemIndex = 0
    } else {
      this.searchItemIndex++
    }
  }

  private async searchAutoCompleteInFocus(): Promise<void> {
    if (this.getAutoCompleteList.length === 0) {
      await this.searchAutoComplete()
    }
    this.setResultState(true)
  }

  private async searchAutoComplete(): Promise<void> {
    if (this.query.length > 2) {
      await PlayerList.loadAutoCompleteList(this.query)
      this.setResultState(true)
      this.initNavigation()
    }
  }

  private async submitSearch(): Promise<void> {
    if (this.query.length > 2) {
      await PlayerList.loadPlayers(this.query)
      this.hiddenResult()
    }
  }

  private viewAccount() {
    const account: Player = this.getAutoCompleteList[this.searchItemIndex]
    if (account) {
      this.$router.push({
        path: `/account/${account.spa_id}-${account.name}`,
      })
    }
  }

  private addClickOnBody() {
    document.addEventListener('click', this.clickOnBody)
  }

  private clickOnBody() {
    // @ts-ignore
    const target: Element = event.target
    if (
      target.classList.contains('js-search-form') ||
      target.closest('.js-search-form')
    ) {
      this.showResult()
    } else {
      this.hiddenResult()
    }
  }

  private handlerPeriled() {
    const searchQuery: string = (this.$route.query?.search as string) || ''
    this.query = searchQuery
    this.submitSearch()
  }

  private setResultState(state: boolean) {
    this.isResult = state
  }

  private hiddenResult() {
    this.setResultState(false)
  }

  private showResult() {
    this.setResultState(true)
  }

  private mounted() {
    this.handlerPeriled()
    this.addClickOnBody()
  }
}
