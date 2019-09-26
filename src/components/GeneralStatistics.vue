<template>
<v-container>
  <div class="display-2" style="margin-bottom: 5%">
    <v-row align="center" justify="center">
      <v-col cols="10">
        <div v-if="studentPerMonth">
          <apexchart type=line height=350 :options="studentPerMonth" :series="studentPerMonth.series" />
        </div>
      </v-col>
      <v-col xs10 md5>
        <div v-if="studentsEnabled">
          <apexchart type=donut :width="donutWidth" :options="studentsEnabled" :series="studentsEnabled.series" />
        </div>
      </v-col>

      <v-col xs10 md5>
        <div v-if="gamesEnabled">
          <apexchart type=donut :width="donutWidth" :options="gamesEnabled" :series="gamesEnabled.series" />
        </div>
      </v-col>
    </v-row>

  </div>


</v-container>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
import {mapActions} from 'vuex'
//Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      studentPerMonth: null,
      studentsEnabled: null,
      gamesEnabled: null,
      donutWidth: 380
    }
  },
  methods: {
    ...mapActions('statisticsm', ['getStudentsCreatedStatistic', 'getStudentsOrGamesEnabledStatistic']),
    async setLineChartValues(){
      this.studentPerMonth = await this.getStudentsCreatedStatistic()
    },
    async setDonutsChartValues(){
      this.studentsEnabled = await this.getStudentsOrGamesEnabledStatistic('students')
      this.gamesEnabled = await this.getStudentsOrGamesEnabledStatistic('games')
    },
    onResize(){
      this.donutWidth = (window.innerWidth < 960) ?300 : 380;
    }
  },
  async mounted() {
    this.setLineChartValues()
    this.setDonutsChartValues()
    this.onResize()
  }

}
</script>
