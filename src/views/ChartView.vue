<template>
  <div>
    <ChartForm />
    <Chart />
  </div>
</template>

<script>
import ChartForm from "@/components/ChartForm";
import Chart from "@/components/Chart";

export default {
  name: 'ChartView',
  components: {
    ChartForm,
    Chart,
  }
}
</script>
