<template>
  <div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="closeModal()"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal">
        <!-- <div class="inner">
          
        </div> -->
        <div class="info-nation">
          <div v-for="(item, index) in countryInfo" :key="index" class="md:flex justify-between">
            <ul class="info">
              <li class="md:text-left name"><strong>Country:</strong> <span>{{ item.name.common }}</span></li>
              <li class="md:text-left capital"><strong>Capital:</strong> <span>{{ item.capital[0] }}</span></li>
              <li class="md:text-left population"><strong>Population:</strong> <span>{{ numberWithCommas(item.population) }}</span></li>
              <li class="md:text-left region"><strong>Region:</strong> <span>{{ item.region }}</span></li>
              <li class="md:text-left subregion"><strong>Subregion:</strong> <span>{{ item.subregion }}</span></li>
            </ul>
            <p class="flags md:text-left">
              <img
                class="border mx-auto mt-5 md:table md:ml-auto md:mt-0"
                :src="item.flags.png"
                :alt="item.capital[0]"
              />
            </p>
          </div>
        </div>
        <div class="chart">
          <chart :dataChart="dataChart" :options="options" />
        </div>
        <button class="button" @click="closeModal()">Close</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import chart from "../components/chartjs.vue";
export default {
  props: ["countryCode", "isOpen"],
  components: {
    chart,
  },
  data() {
    return {
      showModal: true,
      countryInfo: [],
      dataChart: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "Total Cases",
            borderColor: "#3e95cd",
          },
          {
            data: [],
            label: "Total Deaths",
            borderColor: "#994414",
          },
          {
            data: [],
            label: "Total recovered",
            borderColor: "#08732D",
          },
        ],
      },
      options: {
        title: {
          display: true,
          // text: "Chart",
        },
        animation: {
          delay: 1000, // change delay to suit your needs.
        },
        tension:10,
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async created() {
    if (this.countryCode.length > 0) {
      await axios
        .all([
          axios.get(process.env.VUE_APP_LINK_COUNTRY + this.countryCode),
          axios.get(
            process.env.VUE_APP_LINK_CHART +
              this.countryCode +
              "/status/confirmed"
          ),
          axios.get(
            process.env.VUE_APP_LINK_CHART + this.countryCode + "/status/deaths"
          ),
          axios.get(
            process.env.VUE_APP_LINK_CHART +
              this.countryCode +
              "/status/recovered"
          ),
        ])
        .then(
          axios.spread((res, confirmed, deaths, recovered) => {
            // console.log(this.dataChart);
            return (
              (this.countryInfo = res.data),
              (this.dataChart.labels = confirmed.data.map((x) =>
                new Date(x.Date).toLocaleDateString("en-US")
              )),
              (this.dataChart.datasets[0].data = confirmed.data.map(
                (y) => y.Cases
              )),
              (this.dataChart.datasets[1].data = deaths.data.map(
                (y) => y.Cases
              )),
              (this.dataChart.datasets[2].data = recovered.data.map(
                (y) => y.Cases
              ))
            );
          })
        )
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #cc2e5d, #ff5858);
  border-radius: 8px;

  color: #fff;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}
.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  z-index: 99;
  background-color: #fff;
  /* border-radius: 16px; */
  padding: 25px;
  max-height: 100vh;
  overflow: auto;
}

.modal .inner {
  overflow: auto;
  height: 100%;
  width: 100%;
}

.modal h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

.modal p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>