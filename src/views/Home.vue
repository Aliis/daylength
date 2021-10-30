<template>
  <div class="home">
    <MapForm />
    <Map />
  </div>
</template>

<script>
import MapForm from "@/components/MapForm";
import Map from "@/components/Map";

export default {
  name: 'Home',
  components: {
    MapForm,
    Map,
  }
}
</script>
