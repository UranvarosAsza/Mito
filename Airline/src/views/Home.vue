<template>
<!--TODO: ikont tenni a fejlécbe -->
<div class="formContainer"> 
  <form @submit.prevent="search">
    <div>
      <div class="icon"></div>
      <h2><p>MITO Airline</p></h2>
    </div>

    <select v-model="origin" >
    <option v-for="(city, index) in originCities" :key="index" :value="city">
      {{ city }}
    </option>
    </select>
    <select v-model="destination" >
    <option v-for="(city, index) in destinationCities" :key="index" :value="city">
      {{ city }}
    </option>
    </select>
    <VueDatePicker v-model="departure" placeholder="Departure" :min-date="new Date()" required></VueDatePicker>
    <VueDatePicker v-model="returning" placeholder="Return" :min-date="departuteDate" ></VueDatePicker>
    <button>Search</button>
  </form> 
  
  <div class="cheks">
    <p>checks:</p>
    <p>{{ origin }}</p>
    <p>{{ destination }}</p>
    <p>{{ departuteDate }}</p>
    <p>{{ returning }}</p>
  </div>
  
</div>
</template>

<script lang="ts">

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import JsonData  from '../assets/datasheet.json';


export default {
  components: { VueDatePicker },
  data() {
    return {
      previousOrigin: '',
      previousDestination: '',

      departure: Date,
      returning: Date,
      flights: JsonData.Flights,
      origin: '',
      destination: ''
    }
  },
  methods: {
    storeFormAfterRefresh(){
      localStorage.setItem(this.previousOrigin, this.origin )

    },
    search(){
      console.log(this.origin, this.destination, this.departure, this.returning)
    },
    selectedOriginChange(selectedValue: string){
      console.log( selectedValue);
      this.origin = selectedValue;
    },
  },
  computed: {
    
    departuteDate(){
      return this.departure
    },
    fileteredCities(){
      return   this.flights.filter( flight  => flight.Origin === this.origin)

    },
    originCities(){
      const distinctOriginCities = new Set(this.flights.map(flight => flight.Origin));
      return Array.from(distinctOriginCities);
    },
    destinationCities(){

      return this.flights.filter( flight  => flight.Origin === this.origin).map(flight => flight.Dest)

    }
  }
}

</script>

<style>
  p{
    color: black;
  }
 form{
  max-width: 800;
  margin: 20px auto;
  background: white;
  padding: 20px;
 }

 .formContainer{
  
  margin: auto;
 }
 
 .cheks{
  background: lightgray;
 }

 VueDatePicker{
 
 }
</style>
