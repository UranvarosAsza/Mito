<template>
  <div class="selectFlightPage">
    <nav class="navbar">leaving from {{ origin }} to {{ destination }}</nav>
    <div class="seletFlightHeader">
      <div class="icon">
        <svg
          version="1.1"
          id="svg2"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          sodipodi:docname="plane.svg"
          inkscape:version="0.48.4 r9939"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="50px"
          height="50px"
          viewBox="0 0 1200 1200"
          enable-background="new 0 0 1200 1200"
          xml:space="preserve"
        >
          <path
            id="path16765"
            inkscape:connector-curvature="0"
            d="M321,1164h120l269.28-480.06H1020c0,0,180,0,180-83.94c0-84-180-84-180-84
                H710.28L441,36H321l149.28,480H255.06L120,395.94H0l96.06,204L0,804h120l135.06-120.06h215.22L321,1164z"
          />
        </svg>
      </div>
      <h1 class="selectFlight">Select flight</h1>
    </div>
    <SumPanel :show="panelVisibility"></SumPanel>
    <div class="view">
      <SidePanel></SidePanel>
      <div class="flightInfotmation">
        <div class="departures">
          <div class="flights">
            <p class="flightHeader">outbound {{ origin }} to {{ destination }}</p>
            <p class="tableheader">{{ headerDate }}</p>
            <div class="listOfFlights">
              <div class="tickets">
                <div>
                  <div class="flight" v-for="(flight, index) in departuringFlights" :key="index">
                    {{ flight.departureDate }}
                  </div>
                </div>
                <div class="ticket" v-for="(ticket, rowIndex) in ticketCategory" :key="rowIndex">
                  {{ ticket.category }}
                  <button
                    class="ticketData"
                    :class="{
                      selectedTicket: clickedItem[0] === columnIndex && clickedItem[1] === rowIndex
                    }"
                    v-for="(flight, columnIndex) in departuringFlights"
                    :key="columnIndex"
                    @click="setTicketSelected(columnIndex, rowIndex)"
                  >
                    $ {{ ticket.price }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="returnFlights">
          <div v-if="returnSelected">
            <div class="flights">
              <h2>Return fligts on {{ returningDateCroped }}:</h2>
              <p class="flightHeader">inbound {{ destination }} to {{ origin }}</p>
              <div class="listOfFlights">
                <div class="tickets">
                  <div class="flightsData">
                    <div class="flight" v-for="(flight, index) in departuringFlights" :key="index">
                      {{ flight.departureDate }}
                    </div>
                  </div>
                  <div class="ticket" v-for="(ticket, rowIndex) in ticketCategory" :key="rowIndex">
                    {{ ticket.category }}
                    <button
                      class="ticketData"
                      :class="{
                        selectedTicket:
                          clickedReturnItem[0] === columnIndex && clickedReturnItem[1] === rowIndex
                      }"
                      v-for="(flight, columnIndex) in departuringFlights"
                      :key="columnIndex"
                      @click="setReturnTicketSelected(columnIndex, rowIndex)"
                    >
                      $ {{ ticket.price }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <VueDatePicker
              v-model="returning"
              placeholder="Return"
              class="formElement"
              @update:model-value="returnBooking"
            ></VueDatePicker>
            <!--:min-date="allowedReturndate"-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dep from '../assets/flights.json'
import SidePanel from '../components/SidePanel.vue'
import SumPanel from '../components/SumPanel.vue'

export default {
  components: { VueDatePicker, SidePanel, SumPanel },
  data() {
    return {
      origin: localStorage.getItem('previousOrigin'),
      destination: localStorage.getItem('previousDestination'),
      returning: localStorage.getItem('previousReturn') ?? '',
      departure: localStorage.getItem('previousDeparture'),
      returnSelected: false,
      departuringFlights: dep.departures,
      numberOfRemainingTickets: 0,
      ticketCategory: dep.prices,
      ticketData: dep.prices,
      selected: false,
      clickedItem:
        [
          parseInt(localStorage.getItem('selectedTicketX')),
          parseInt(localStorage.getItem('selectedTicketY'))
        ] ?? [],
      clickedReturnItem:
        [
          parseInt(localStorage.getItem('selectedReturnTicketX')),
          parseInt(localStorage.getItem('selectedReturnTicketY'))
        ] ?? [],
      sumIsVisible: false
    }
  },
  mounted() {
    this.starterReturnValueOverrite()
    localStorage.setItem('panelShow', 'false')
    this.showSumPanel()
  },
  methods: {
    setReturnTicketSelected(columnIndex: number, rowIndex: number) {
      this.clickedReturnItem = [columnIndex, rowIndex]
      const seletedReturnFlight = this.departuringFlights[columnIndex].departureDate
      const selectedReturnTicketPrice = this.ticketData[rowIndex].price
      localStorage.setItem('selectedReturnTicketX', columnIndex)
      localStorage.setItem('selectedReturnTicketY', rowIndex)
      localStorage.setItem('selectedReturnFlight', seletedReturnFlight)
      localStorage.setItem('selectedReturnTicket', selectedReturnTicketPrice)
    },
    setTicketSelected(columnIndex: number, rowIndex: number) {
      this.clickedItem = [columnIndex, rowIndex]
      const seletedDepartureFlight = this.departuringFlights[columnIndex].departureDate
      const selectedDepartureTicketPrice = this.ticketData[rowIndex].price
      localStorage.setItem('selectedTicketX', columnIndex)
      localStorage.setItem('selectedTicketY', rowIndex)
      localStorage.setItem('selectedFlight', seletedDepartureFlight)
      localStorage.setItem('selectedTicket', selectedDepartureTicketPrice)
    },
    starterReturnValueOverrite() {
      if (localStorage.getItem('previousReturn')) {
        this.returnSelected = true
      } else {
        this.returnSelected = false
      }
    },
    returnBooking() {
      this.returnSelected = true
    },
    showSumPanel() {
      console.log('showpanel: ', localStorage.getItem('panelShow'))
    }
  },
  computed: {
    headerDate() {
      const localDate = new Date(this.departure).toLocaleDateString()
      /*const nextDay = new Date(this.departure);
                    nextDay.setDate(nextDay.getDate()+1)
                    const prevDay = new Date(this.departure);
                    prevDay.setDate(prevDay.getDate()-1)
                    const days = [prevDay.toLocaleDateString(), localDate, nextDay.toLocaleDateString()]*/
      return localDate
    },
    allowedReturndate() {
      if (this.departure) {
        const returndateMin = new Date(this.departure)
        return returndateMin.setDate(returndateMin.getDate() + 1)
      } else {
        let nextDay = new Date()
        nextDay.setDate(nextDay.getDate() + 1)
        return nextDay
      }
    },
    panelVisibility() {
      const hidePanel = localStorage.getItem('hidePanel')
      if (hidePanel === 'true') {
        return true
      } else {
        return false
      }
    },
    departureDate() {
      return new Date(JSON.stringify(localStorage.getItem('previousDeparture')))
    },
    returningDateCroped() {
      const convertedDate = new Date(this.returning)
      return convertedDate.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.tableheader {
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
}

.selectFlightPage {
  background-color: rgb(242, 242, 242);
}
.view {
  display: flex;
}
.seletFlightHeader {
  display: flex;
  background-color: transparent;
}
svg {
  fill: white;
}
.selectFlight {
  text-transform: uppercase;
  color: rgb(6, 3, 141);
  font-size: 20;
}
.navbar {
  padding: 10px;
  display: flex;
  background-color: rgb(6, 3, 141);
  color: white;
  min-height: 50px;
  font-size: 20px;
  text-transform: uppercase;
}
.flightsData {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.ticketData {
  color: black;
  font-weight: bold;
  font-size: 16px;
  background-color: white;
  border: solid 3px rgb(205, 35, 142);
  padding: 6px 12px;
  min-width: 100px;
  margin: 10px;
}
.selectedTicket {
  color: white;
  background-color: rgb(205, 35, 142);
}
.ticket {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
}

.tickets {
  display: flex;
  align-items: center;
}

.flightInfotmation {
  flex: 1;
}
.departures,
.returnFlights {
  padding: 10px;
}
.title {
  color: white;
}
.flights {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: rgb(53, 50, 50);
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
}
.flight {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  color: rgb(0, 0, 0);
  padding: 18px 20px;
  min-width: 100px;
  margin: 10px;
}
svg {
  margin-left: 200px;
  margin-top: 10px;
  padding: 10px;
  fill: rgb(6, 3, 141);
}
</style>
