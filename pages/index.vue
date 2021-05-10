<template>
  <div class="container">
    <div class="search-wrap">
      <app-search />
      <app-table-players />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import appSearch from '../components/app-search/index.vue'
import appTablePlayers from '../components/app-table-players/index.vue'
export default Vue.extend({
  components: {
    appSearch,
    appTablePlayers,
  },
})
</script>
