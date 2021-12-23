<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">

      <b-row>
        <b-col md="6">
          <b-form-group>
            <b-form-input type="text" v-model="latitude" placeholder="Latitude"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group>
            <b-form-datepicker v-model="startDate"></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group>
            <b-form-input type="text" v-model="longitude" placeholder="Longitude"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group>
            <b-form-datepicker v-model="endDate"></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group>
            <b-button type="submit" variant="primary" class="submit float-left">Submit</b-button>
          </b-form-group>
        </b-col>
      </b-row>

    </b-form>
  </b-container>
</template>

<script>
import eventBus from '@/main'

export default {
  name: 'ChartForm',
  data: function() {
    return {
      latitude: '59.436962',
      longitude: '24.753574',
      startDate: new Date(),
      endDate: new Date(),
    }
  },
  methods: {
    onSubmit: function() {
      const dateObj = {}
      const startDate = new Date(this.startDate)
      const endDate = new Date(this.endDate)
      const dates = this.getDaysArray(startDate, endDate)

      dates.forEach((date) => {
        const dateFormatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        dateObj[dateFormatted] = this.calculateDayLength(date)
      })

      eventBus.$emit('sendFormToChart', dateObj)
    },
    calculateDayLength: function(date) {
      const times = this.$suncalc.getTimes(new Date(date), this.latitude, this.longitude)
      let difference = Math.abs(times.sunset - times.sunrise) / 1000
      const dayInMinutes = Math.floor(difference / 60)
      return dayInMinutes
    },
    getDaysArray: function(start, endDate) {
      const dateArray = []
      let startDate = new Date(start)

      while (startDate <= endDate) {
        dateArray.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1)
      }
      return dateArray
    }
  },
}
</script>

<style scoped>
.submit {
  margin-bottom: 40px;
}
</style>
