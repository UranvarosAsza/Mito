<template>
    <div class="SumPanel">
        <div class="sumCard">
            <div class="sumHeader">
                Thanks for buying your tickets at mito airlines
            </div>
            <div class="flights">
                
            </div>
            <div class="total">
                <div class="totalValue">Total: {{ total }}</div>
                <RouterLink class="endme" :to="{name: 'HomePage' }" @click="resetData">   No, thanks (reset)</RouterLink>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

 export default{
        components: {RouterLink, RouterView},
        data(){
            return {
                total: localStorage.getItem("totalPrice"),
                origin:      localStorage.getItem("previousOrigin"),
                destination: localStorage.getItem("previousDestination"),
                returning: localStorage.getItem("previousReturn") ,
                departure: localStorage.getItem("previousDeparture"),
                ticketPrice : localStorage.getItem("selectedTicket") ,
                returnRicketPrice: localStorage.getItem("selectedReturnTicket")
            }
            
        }, 
        computed: {
        },
        methods:{
            resetData(){
                localStorage.setItem("previousOrigin", "")
                localStorage.setItem("previousDestination", "")
                localStorage.setItem("previousReturn", "")
                localStorage.setItem("previousDeparture", "")
                localStorage.setItem("selectedReturnTicket", "")
            },
            hidePanel(){
                localStorage.setItem("hidePanel", "true")

            }
        }
    }

</script>

<style>
    .SumPanel{
        display: flex;
        justify-content: center; 
    }
    .sumHeader{
      
        padding: 10px;
        height: 50px;
        text-transform: uppercase;  
        font-size: 20px;
        background-color: lightgrey;
        color: rgb(6, 3, 141);
    }
    .sumCard{
        
        background-color: white;
        border-radius: 5px;
        width: 60%;
        font-size: 16px;
        text-transform: uppercase;  
    }   
    .total{
        display: flex;
        justify-content: space-between;
    }
    .totalValue{
        flex: 1;
        padding: 10px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(0, 0, 0);
    }
    .endme{
        justify-content: center;
        background-color: transparent;
        padding: 10px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(205,35,142);
    }
</style>