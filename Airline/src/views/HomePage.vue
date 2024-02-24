<template>
<!--TODO: 
-ikont tenni a fejlécbe
-legördülő nem jó szélességű csak ha van selected item
-v-if-es validáció -->
<div class="formContainer"> 
  <form @submit.prevent="search">
    <div class="form-header">
      <div class="icon"> + </div>
      <h2>MITO Airline</h2>
    </div>

    <div class="flex-row">
      
      <select v-model="origin" class="formElement" >
    <option v-for="(city, index) in originCities" :key="index" :value="city">
      {{ city }}
    </option>
    </select>
  
    <select v-model="destination" class="formElement">
    <option v-for="(city, index) in destinationCities" :key="index" :value="city">
      {{ city }}
    </option>
    </select>
    </div>
    <div class="flex-row">
     
      <VueDatePicker v-model="departure" placeholder="Departure" :min-date="new Date()" required class="formElement"></VueDatePicker>
      <VueDatePicker v-model="returning" placeholder="Return" :min-date="departuteDate" class="formElement"></VueDatePicker>
   
    </div>
    <div class="flex-row">
      <div v-if="departuteDate()" class="error" > Please select departure</div>
    </div>
    <div class="flex-row">
      <button>Search</button>
    </div>
    
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
      previusDeparture: '',
      previusReurn: "",
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
      this.previousOrigin ="";
      this.previousDestination = '';
      this.previusDeparture='';
      this.previusReurn=""

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
  .error{
   color: rgb(205,35,142);
   min-width: 100px; 
  }
  .flex-row{
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .form-header{
    display: flex;
    background-color: rgb(6, 3, 141);
    color : white;
  }
  .formElement{
    
    margin: 10px;
    flex: auto;
       
  }
  button{
    margin: auto;
    margin-bottom: 15px;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    background-color: rgb(52, 52, 224);
    color : white;
    font-size: larger;
  }

  p{
    color: black;
  }
 form{
  
  position: relative;
  margin: 20px auto;
  background: white;
 }

 .formContainer{
  
  margin: auto;
 }
 .icon{
  background-image: url("../assets/plus-white.svg");
  font-size: x-large;
 }
 .cheks{
  display: none;
  background: lightgray;
 }
</style>
