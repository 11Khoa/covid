<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["dataChart", "options"],
  mounted() {
    this.renderChart(this.dataChart, this.options);
  },
};
</script>
