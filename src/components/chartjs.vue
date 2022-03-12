<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["dataChart", "options"],
  mounted() {
    console.log(this.dataChart);
    setTimeout(() => {
      this.renderChart(this.dataChart, this.options);
    }, 1500);
  },
};
</script>
