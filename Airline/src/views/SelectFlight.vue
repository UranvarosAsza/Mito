<!--TODO V-bind line: 18  -->
<template>
<div>
    <h1>Select your flight</h1>
    <h2>Departure fligts:</h2>
    <div class="flights">
        
        <p class="flightHeader">Flights from {{ origin }} to {{ destination }}</p>
        <div class="listOfFlights" >
            <div class="flight" v-for="flight in departuringFlights"> {{ flight.departureDate }}</div>
        </div>
    </div>
    <div v-if="returnSelected">
        <h2>Return fligts on {{ returningDateCroped }}: </h2>
        <div class="flights">
            <p>Flights from {{ destination }} to {{ origin }}</p>
            <div class="listOfFlights" >
                <div class="flight" v-for="flight in departuringFlights"> {{ flight.departureDate }}</div>
            </div>
        </div>
    </div>
    <div v-else>
        <VueDatePicker v-model="returning"  placeholder="Return" class="formElement"
         @update:model-value ="returnBooking"></VueDatePicker> <!--:min-date="departuteDate"-->
        
    </div>
    
    
</div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dataJson from "../assets/datasheet.json";

    export default{
        components: {VueDatePicker},
        data(){
            return {
                origin: localStorage.getItem("previousOrigin"),
                destination: localStorage.getItem("previousDestination"),
                returning: localStorage.getItem("previousReturn") ?? "",
                returnSelected: false,
                departuringFlights: [
                {
                    "origin": "Vienna",
                    "destination": "Budapest",
                    "departureDate": "10:30"
                },
                {
                    "origin": "Vienna",
                    "destination": "Budapest",
                    "departureDate": "11:30"
                },
                {
                    "origin": "Vienna",
                    "destination": "Budapest",
                    "departureDate": "12:30"
                }
                ]
            }
        },
        methods:{
            returnBooking(){
                this.returnSelected =true;
            }
        },
        computed:{
            originComp(){
                return "asd"
            },
            departureDate(){
                return new Date(JSON.stringify(localStorage.getItem("previousDeparture")) ) 
            },
            returningDateCroped(){
                const convertedDate = new Date(this.returning)               
                return convertedDate.toLocaleDateString();
            }
            
        }
    }
</script>

<style>
    .flightHeader{
        

    }
    .title{
        color : white
    }
    .flights{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        color: rgb(53, 50, 50);
        border-radius: 5px;
        padding: 10px;
       
    }
    .flight{
        
        text-align: center;
        border-radius: 5px;
        color : white;
        background-color:  rgb(53, 50, 50);
        margin: 5px; 
        padding: 5px; 
        min-width: 100px;
    }
</style>
