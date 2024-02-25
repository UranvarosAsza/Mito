<!--TODO V-bind line: 18  -->
<template>
    
<div class="selectFlightPage">
    <nav class="navbar">leaving from {{ origin }} {{ destination }}</nav>
    <div class="seletFlightHeader">
        <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" version="1.0">
        <metadata id="metadata9"/>
        <path id="path5724" d="M 247.51404,152.40266 139.05781,71.800946 c 0.80268,-12.451845 1.32473,-40.256266 0.85468,-45.417599 -3.94034,-43.266462 -31.23018,-24.6301193 -31.48335,-5.320367 -0.0693,5.281361 -1.01502,32.598388 -1.10471,50.836622 L 0.2842717,154.37562 0,180.19575 l 110.50058,-50.48239 3.99332,80.29163 -32.042567,22.93816 -0.203845,16.89693 42.271772,-11.59566 0.008,0.1395 42.71311,10.91879 -0.50929,-16.88213 -32.45374,-22.39903 2.61132,-80.35205 111.35995,48.50611 -0.73494,-25.77295 z" fill-rule="evenodd"/>
        </svg>
        <h1 class="selectFlight">Select flight</h1>
    </div>
    <div class="view">
            <SidePanel></SidePanel>
        
        
        <div class="flightInfotmation">
            <div class="departures">
                <div class="flights">
                    
                    <p class="flightHeader">outbound {{ origin }} -> {{ destination }}</p>
                    <p class="tableheader">{{ headerDates }}</p>
                    <div class="listOfFlights" >
                        <div class="tickets">
                            <div>
                                <div class="flight" v-for="(flight, index) in departuringFlights" :key="index">{{ flight.departureDate }} </div>
                            </div>
                                <div class="ticket" v-for="(ticket, rowIndex) in ticketCategory" :key="rowIndex"> {{ ticket.category }}
                                    <button class="ticketData" :class="{selectedTicket: clickedItem[0]=== columnIndex &&  clickedItem[1]=== rowIndex}" v-for="(flight, columnIndex ) in departuringFlights" :key="columnIndex" @click="setTicketSelected(columnIndex, rowIndex)"> $ {{ ticket.price }}
                                    </button>

                                </div>
                        </div>                  
                    </div>

                </div>
            </div>
            <div class="returnFlights">
                <div v-if="returnSelected">
                    <div class="flights">
                        <h2>Return fligts on {{ returningDateCroped }}: </h2>
                        <p class="flightHeader">inbound  {{ destination }} -> {{ origin }}</p>
                        <div class="listOfFlights" >
                            <div class="tickets">
                                <div class="flightsData">
                                    <div class="flight" v-for="(flight, index) in departuringFlights" :key="index">{{ flight.departureDate }} </div>
                                </div>
                                    <div class="ticket" v-for="(ticket, rowIndex) in ticketCategory" :key="rowIndex"> {{ ticket.category }}
                                        <button class="ticketData" :class="{selectedTicket: clickedReturnItem[0]=== columnIndex &&  clickedReturnItem[1]=== rowIndex}" v-for="(flight, columnIndex ) in departuringFlights" :key="columnIndex" @click="setReturnTicketSelected(columnIndex, rowIndex)"> $ {{ ticket.price }}
                                
                                        </button>

                                    </div>
                            </div>                  
                        </div>
                    </div>
                </div>
                <div v-else>
                    <VueDatePicker v-model="returning"  placeholder="Return" class="formElement" 
                    @update:model-value ="returnBooking" ></VueDatePicker> <!--:min-date="allowedReturndate"-->
                </div>
            </div>
        </div>
    </div>
    
    
</div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dataJson from "../assets/datasheet.json";
import dep from "../assets/flights.json";
import SidePanel from "../components/SidePanel.vue";

    export default{
        components: {VueDatePicker,SidePanel},
        data(){
            return {

                origin: localStorage.getItem("previousOrigin"),
                destination: localStorage.getItem("previousDestination"),
                returning: localStorage.getItem("previousReturn") ?? "",
                departure: localStorage.getItem("previousDeparture"),
                returnSelected: false,
                departuringFlights: dep.departures,
                numberOfRemainingTickets: 0,
                ticketCategory: dep.prices,
                ticketData: dep.prices,
                selected: false,
                clickedItem: [],
                clickedReturnItem: []
            }
        },
        mounted() {
                this.starterReturnValueOverrite();
        },
        methods:{
            setReturnTicketSelected(columnIndex: number, rowIndex: number){
                this.clickedReturnItem = [columnIndex, rowIndex];
                const seletedReturnFlight = this.departuringFlights[columnIndex].departureDate
                const selectedReturnTicketPrice = this.ticketData[rowIndex].price
                localStorage.setItem("selectedReturnFlight", seletedReturnFlight)
                localStorage.setItem("selectedReturnTicket", selectedReturnTicketPrice)
            },
            setTicketSelected(columnIndex: number, rowIndex: number){
                this.clickedItem = [columnIndex, rowIndex];
                const seletedDepartureFlight = this.departuringFlights[columnIndex].departureDate
                const selectedDepartureTicketPrice = this.ticketData[rowIndex].price

                localStorage.setItem("selectedFlight", seletedDepartureFlight)
                localStorage.setItem("selectedTicket", selectedDepartureTicketPrice)

            },
            resetData(){
                localStorage.setItem("previousOrigin", "");
                localStorage.setItem("previousDestination", "");
                localStorage.setItem("previousDeparture", "");
                localStorage.setItem("previousReturn", "");

            },
            starterReturnValueOverrite(){
                if( localStorage.getItem("previousReturn")){
                    this.returnSelected=true;
                }else{
                    this.returnSelected=false;
                }
            },
            returnBooking(){
                this.returnSelected =true;
            }
        },
        computed:{
            headerDates(){
                const localDate = new Date(this.departure).toLocaleDateString()
                const nextDay = new Date(this.departure);
                nextDay.setDate(nextDay.getDate()+1)
                const prevDay = new Date(this.departure);
                prevDay.setDate(prevDay.getDate()-1)
                const days = [prevDay.toLocaleDateString(), localDate, nextDay.toLocaleDateString()]
                return days
            },
            allowedReturndate(){
                if(this.departure){
                    const returndateMin  = new Date( this.departure )
                    return returndateMin.setDate(returndateMin.getDate() + 1)
                }else{
                    let nextDay = new Date();
                    nextDay.setDate(nextDay.getDate() + 1)
                    return nextDay
                }
                
                
            },
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
.selectFlightPage{
    background-color: rgb(242, 242, 242);
}
    .view{
        display: flex;
    }
    .seletFlightHeader{
        display: flex;
    }
    svg{
        fill: white;
    }
    .selectFlight{
        text-transform: uppercase;  
        color: rgb(6, 3, 141);
        font-size: 20;
    }
   .navbar{
    display: flex;
    background-color: rgb(6, 3, 141);
    color : white;
    min-height: 50px;
    font-size: 20px;
   }
   .flightsData{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
   }
    .ticketData{
        color: black;
        font-weight: bold;
        font-size: 16px;
        background-color: white;
        border: solid 3px rgb(205,35,142);
        padding: 6px 12px;
        min-width: 100px;
        margin: 10px;
        
    }
    .selectedTicket{
        color: white;
        background-color: rgb(205,35,142);

    }
    .ticket{
        text-align: center;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        justify-content: space-evenly;
        display: flex;
        flex-direction: column;
    }

    .tickets{
        display: flex;
        align-items: center;
        
    }
    
    .flightInfotmation{
        flex: 1;
          
    }
    .departures, .returnFlights{
       
        padding: 10px
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
        font-size: 16px;
        border-radius: 5px;
        padding: 10px;
       
    }
    .flight{
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 12px;
        color : rgb(0, 0, 0);
        padding: 18px 20px;
        min-width: 100px;
        margin: 10px;
    }
</style>
