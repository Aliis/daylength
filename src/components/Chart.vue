<template>
  <line-chart :data="chartData"></line-chart>
</template>

<script>
import eventBus from '@/main'

export default {
  name: 'Chart',
  data: function() {
    return {
      chartData: {}
    }
  },
  mounted() {
    eventBus.$on('sendFormToChart', (data) => {
      this.chartData = data
    })
  },
}
</script>
