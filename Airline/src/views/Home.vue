<template>
<!--TODO: ikont tenni a fejlécbe -->
<div class="formContainer"> 
  <form @submit.prevent="search">
    <div>
      <div class="icon"></div>
      <h2><p>MITO Airline</p></h2>
    
    </div>
    <input type="text" placeholder="Origin"  v-model="origin">
    <!-- <p v-for="city in cities :key=city"> {{ city.name }}</p> -->
    <input type="text" placeholder="Destination" v-model="destination">
    <VueDatePicker v-model="departure" placeholder="Departure" required @submit="dateCheckNotPast()"></VueDatePicker>
    <VueDatePicker v-model="returning" placeholder="Return" @click="dateCheckNotPast(), dateCheckReturn()" ></VueDatePicker>
    <button>Search</button>
  </form> 
  
  <div class="cheks">
    <p>checks:</p>
    <p>{{ origin }}</p>
    <p>{{ destination }}</p>
    <p>{{ departure }}</p>
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
      departure: Date,
      returning: Date,
      cities: JsonData.cities,
      origin: '',
      destination: ''
    }
  },
  methods: {
    search(){

      console.log(this.origin, this.destination, this.departure, this.returning)
    },

  dateCheckNotPast(){

    const currentDate  = new Date();

    //if(this.departure >  currentDate){
   //   console.log('past date err')
   // }
  },
  dateCheckReturn() {
      if(this.returning !>this.departure){

        console.log('Return date must be laer then departure err')
      }else{
        console.log("else")
      }
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
