<template>
  <div class="formContainer">
    <form @submit.prevent="search">
      <div class="form-header">
        <div class="icon">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2>MITO Airline</h2>
      </div>

      <div class="flex-row">
        <select v-model="origin" class="formElement">
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
        <VueDatePicker
          v-model="departure"
          placeholder="Departure"
          :min-date="new Date()"
          class="formElement"
          :class="{ isErrorWithDate: isErrorDate }"
          required
        ></VueDatePicker>
        <VueDatePicker
          v-model="returning"
          placeholder="Return"
          :min-date="departuteDate"
          class="formElement"
        ></VueDatePicker>
      </div>
      <div class="flex-row">
        <div v-if="!departure" class="error">Please select departure</div>
      </div>
      <div class="flex-row">
        <button>
          <RouterLink :to="{ name: 'SelectFlight' }" @click="search">Search</RouterLink>
        </button>
        <RouterView />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import JsonData from '../assets/datasheet.json'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: { VueDatePicker, RouterLink, RouterView },
  data() {
    return {
      flights: JsonData.Flights,
      origin: localStorage.getItem('previousOrigin') ?? '',
      destination: localStorage.getItem('previousDestination') ?? '',
      departure: localStorage.getItem('previousDeparture') ?? '',
      returning: localStorage.getItem('previousReurn') ?? '',
      errDate: true
    }
  },
  methods: {
    search() {
      localStorage.setItem('previousOrigin', this.origin)
      localStorage.setItem('previousDestination', this.destination)
      localStorage.setItem('previousDeparture', this.departure)
      localStorage.setItem('previousReturn', this.returning)

      console.log(this.origin, this.destination, this.departure, this.returning)
    },
    selectedOriginChange(selectedValue: string) {
      console.log(selectedValue)
      this.origin = selectedValue
    }
  },
  computed: {
    isErrorDate() {
      if (this.departure) {
        return false
      } else {
        return true
      }
    },
    departuteDate() {
      return this.departure
    },
    fileteredCities() {
      return this.flights.filter((flight) => flight.Origin === this.origin)
    },
    originCities() {
      const distinctOriginCities = new Set(this.flights.map((flight) => flight.Origin))
      return Array.from(distinctOriginCities)
    },
    destinationCities() {
      return this.flights
        .filter((flight) => flight.Origin === this.origin)
        .map((flight) => flight.Dest)
    }
  }
}
</script>

<style>
.error {
  padding-left: 15px;
  color: rgb(205, 35, 142);
  min-width: 100px;
}
.isErrorWithDate {
  border: solid 3px rgb(205, 35, 142);
}
.flex-row {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}
.form-header {
  display: flex;
  background-color: rgb(6, 3, 141);
  color: white;
}
.formElement {
  margin: 10px;
  flex: auto;
}
button {
  margin: auto;
  margin-bottom: 15px;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: rgb(52, 52, 224);
  color: white;
  font-size: larger;
}

p {
  color: black;
}
form {
  position: relative;
  margin: 20px auto;
  background: white;
}

.formContainer {
  margin: auto;
}
.icon {
  padding: 10px;
  color: white;
}
</style>
