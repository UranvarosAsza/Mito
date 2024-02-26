<template>
  <div class="Sidepanel">
    <div class="flightsHeader">
      <p>Flights</p>
      <p>${{ totalPrice }}</p>
    </div>
    <div class="flights">
      <div class="calendar"></div>
      <div class="flightData">{{ origin }} - {{ destination }}</div>
      <div class="returnData" v-if="isRetturing">{{ destination }} - {{ origin }}</div>
    </div>

    <div class="total">
      <p>Total</p>
      <p>${{ totalPrice }}</p>
    </div>

    <button class="payButton" @click="showSumPanel">Pay now</button>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  data() {
    return {
      total: 0,
      origin: localStorage.getItem('previousOrigin'),
      destination: localStorage.getItem('previousDestination'),
      returning: localStorage.getItem('previousReturn'),
      departure: localStorage.getItem('previousDeparture'),
      ticketPrice: localStorage.getItem('selectedTicket') ?? '',
      returnRicketPrice: localStorage.getItem('selectedReturnTicket') ?? ''
    }
  },
  computed: {
    totalPrice() {
      let substringTicket = this.ticketPrice.substring(1)
      let substringreturnTicket = this.returnRicketPrice.substring(1)
      let subtotoal = parseFloat(substringTicket) + parseFloat(substringreturnTicket)
      localStorage.setItem('totalPrice', subtotoal.toString())
      return subtotoal
    },
    isRetturing() {
      if (this.returning !== null) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    showSumPanel() {
      localStorage.setItem('panelShow', 'true')
      console.log('showpanel: ', localStorage.getItem('panelShow'))
    }
  }
}
</script>

<style scoped>
.Sidepanel {
  width: 200px;
  padding-top: 10px;
  text-transform: uppercase;
  color: darkgray;
  background-color: transparent;
}
.flights {
  text-align: center;
  border-radius: 0px;
  background-color: white;
}
.flightsHeader {
  display: flex;
  justify-content: space-between;
  color: black;
  background-color: white;
}
.flightsHeader p {
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(6, 3, 141);
  height: 40px;
  margin-bottom: 10px;
}
.total p {
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  color: white;
}
.payButton {
  width: 100%;
  color: white;
  background-color: rgb(205, 35, 142);
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  margin: 0px;
  border-radius: 0px;
  padding: 0px;
  border: none;
}
</style>
