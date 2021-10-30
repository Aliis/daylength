<template>
  <div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import eventBus from '../main.js'


export default {
  name: 'Map',
  data: function() {
    return {
      latitude: '',
      longitude: '',
      center: [59.436962, 24.753574]
    };
  },
  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map('mapContainer').setView(this.center, 5)
      delete L.Icon.Default.prototype._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 10,
        minZoom: 2,
        maxNativeZoom: 19
      }).addTo(mapDiv)


      const marker = L.marker();

      function onMapClick(e) {
        eventBus.$emit('sendMapToForm', {lat: e.latlng.lat, lng: e.latlng.lng})
        marker.setLatLng(e.latlng);
        marker.addTo(mapDiv)
      }

      eventBus.$on('sendFormToMap', (data) => {
        marker.setLatLng(data)
        marker.addTo(mapDiv)
        var latLngs = [ marker.getLatLng() ];
        var markerBounds = L.latLngBounds(latLngs);
        mapDiv.fitBounds(markerBounds);
      })
      mapDiv.on('click', onMapClick)
    },
  },
  mounted() {
    this.setupLeafletMap();

  },
}
</script>

<style scoped>
  #mapContainer {
    height: 400px;
  }
</style>
