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
            <div v-if="isResultCalculated">Sun rises: {{sunrise | formatTime}}</div>
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
            <div v-if="isResultCalculated">Sun sets: {{sundown | formatTime}}</div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group>
            <b-form-datepicker v-model="date"></b-form-datepicker>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group>
            <div v-if="isResultCalculated">Length of day: {{dayLength}}</div>
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
import eventBus from '../main.js'

export default {
  name: 'MapForm',
  data: function() {
    return {
        latitude: '59.436962',
        longitude: '24.753574',
        date: new Date(),
        sunrise: '',
        sundown: '',
        dayLength: '',
        isResultCalculated: false,
      };
  },
  methods: {
    onSubmit: function() {
      const times = this.$suncalc.getTimes(new Date(this.date), this.latitude, this.longitude)
      let difference = Math.abs(times.sunset - times.sunrise) / 1000
      const hours = Math.floor(difference / 3600) % 24
      difference -= hours * 3600;
      const minutes = Math.floor(difference / 60) % 60

      this.sunrise = times.sunrise
      this.sundown = times.sunset
      this.dayLength =`${hours}h ${minutes}min`

      this.isResultCalculated = true
      eventBus.$emit('sendFormToMap', {lat: this.latitude, lng: this.longitude})
    }
  },
  mounted() {
    eventBus.$on('sendMapToForm', (data) => {
      this.latitude = data.lat
      this.longitude = data.lng
    })
  },
  filters: {
    formatTime (time) {
      const hours = time.getHours() < 10 ? '0' + time.getHours() : '' + time.getHours()
      const minutes = time.getMinutes() < 10 ? time.getMinutes() + '0' : time.getMinutes() + ''
      return `${hours}:${minutes}`
    }
  }
}
</script>

<style scoped>
.d-block {
  text-align: left;
}
.submit {
  margin: 30px 0;
  float: right;
}
div {
  text-align: left;
}
</style>
