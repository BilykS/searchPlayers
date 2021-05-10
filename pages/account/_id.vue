<template>
  <div class="container">
    <h1>name: {{ account.name }}</h1>
    <template v-if="isPvp">
      <h2>Statistics</h2>
      <h3>Pvp</h3>
      <table>
        <tbody>
          <tr v-for="(item, index) in AccountStatisticPvp" :key="index">
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="isPve">
      <h3>Pve</h3>
      <table>
        <tbody>
          <tr v-for="(item, index) in AccountStatisticPve" :key="index">
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="isRankSolo">
      <h3>Rank Solo</h3>
      <table>
        <tbody>
          <tr v-for="(item, index) in AccountStatisticRankSolo" :key="index">
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchModule from '~/store/services/search/search'
import {
  Player,
  RankSolo,
} from '~/store/modules/player-list/interface/player-list-interface'
@Component({
  name: 'account-page',
})
export default class AccountPage extends Vue {
  private account: Player = {
    name: '',
    spa_id: 0,
    hidden: false,
    statistics: {
      pvp: {},
      pve: {},
      rank_solo: {},
    },
  }

  private AccountStatisticPvp: string[] | any[] = []
  private AccountStatisticPve: string[] | any[] = []
  private AccountStatisticRankSolo: string[] | any[] = []

  private get getAccountParams(): string {
    return this.$route.params.id
  }

  private get getAccountName(): string {
    return this.getAccountParams.split('-')[1]
  }

  private get getAccountId(): number {
    return Number(this.getAccountParams.split('-')[0])
  }

  private get isStatistics(): boolean {
    return !!this.account.statistics
  }

  private get isPvp() {
    return this.isStatistics && this.account.statistics?.pvp
      ? Object.keys(this.account.statistics?.pvp).length !== 0
      : false
  }

  private get isPve(): boolean {
    return this.isStatistics && this.account.statistics?.pve
      ? Object.keys(this.account.statistics?.pve).length !== 0
      : false
  }

  private get isRankSolo(): boolean {
    return this.isStatistics && this.account.statistics?.rank_solo
      ? Object.keys(this.account.statistics?.rank_solo).length !== 0
      : false
  }

  private getAccountInfo(accounts: Player[]): void {
    this.account = accounts.find(
      (account) => account.spa_id === this.getAccountId
    ) as Player
  }

  private async getSearchAccount(): Promise<void> {
    const result = await SearchModule.loadPlayers(this.getAccountName)
    this.getAccountInfo(result)
  }

  private parseStatistics(): void {
    if (this.isPvp) {
      this.AccountStatisticPvp = Object.entries(
        this.account.statistics?.pvp as RankSolo
      )
    }
    if (this.isPve) {
      this.AccountStatisticPve = Object.entries(
        this.account.statistics?.pve as RankSolo
      )
    }
    if (this.isRankSolo) {
      this.AccountStatisticRankSolo = Object.entries(
        this.account.statistics?.rank_solo as RankSolo
      )
    }
  }

  private async created() {
    await this.getSearchAccount()
    this.parseStatistics()
  }
}
</script>
