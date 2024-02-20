<template>


<form>
    <h2><p>MITO Airline</p></h2>
    <input placeholder="Origin">
    <input :placeholder="'Destination'">
    <VueDatePicker v-model="date"></VueDatePicker>
    <VueDatePicker v-model="date2"></VueDatePicker>
</form>
</template>

<script>

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  }
}

</script>
