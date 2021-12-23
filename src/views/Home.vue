<template>
  <div class="home">
    <MapForm latitude="59.436962" longitude="24.753574" />
    <Map />
  </div>
</template>

<script>
import MapForm from '@/components/MapForm'
import Map from '@/components/Map'

export default {
  name: 'Home',
  components: {
    MapForm,
    Map,
  }
}
</script>
