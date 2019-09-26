<template>
<v-container>
  <div class="display-2" style="margin-bottom: 5%">

    <div v-if="!studentSelected">
      <v-card class="mx-auto dataTable">
        <v-card-title>
          Estudiantes
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template slot="no-data">
            <v-alert :value="true" color="warning" icon="warning">
              No hay datos registrados.
            </v-alert>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip rounded color='primary' v-on="on" @click="viewDetail(item)">
                  <v-icon small color='white'>
                    visibility
                  </v-icon>
                </v-chip>
              </template>
              <span>Ver Detalle</span>
            </v-tooltip>
          </template>
          <template v-slot:item.photoUrl="{ item }">
            <v-avatar v-if="item.photoUrl" size="36px">
              <img :src="item.photoUrl" srcset lazy-src></img>
            </v-avatar>
            <v-avatar v-else color="indigo" size="36px">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </template>

          <template v-slot:item.enabled="{ item }">
            <div v-if="item.enabled">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-chip class="ma-2" color="green" text-color="white" v-on="on">
                    <v-icon colo>done</v-icon>
                  </v-chip>
                </template>
                <span>Activo</span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-chip class="ma-2" color="red" text-color="white" v-on="on">
                    <v-icon>highlight_off</v-icon>
                  </v-chip>
                </template>
                <span>Inactivo</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div v-if="studentSelected">
      <v-row>
        <v-col sm="12" md="1">
        <v-btn color="primary" @click="studentSelected = null">
          <v-icon>arrow_back_ios</v-icon>
          volver
        </v-btn>
        </v-col>
        <v-col>
        <v-btn color="primary" @click="exportData()">
          <v-icon>file_copy</v-icon>
          Generar excel
        </v-btn>
        </v-col>
      </v-row sm="12" md="11">
      <v-row align="center" justify="center">
        <v-col sm="10" md="2">
          <v-avatar size="240">
            <v-img :src="studentSelected.student.photo" :aspect-ratio="16/9">
            </v-img>
          </v-avatar>
        </v-col>
        <v-col md="5" sm="12">
          <v-row justify="start">
            <v-col class="title" cols="12">Estudiante</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="4">Identificación:</v-col>
            <v-col class="subtitle-2" cols="7">{{ studentSelected.student.personId }}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="4">Nombre:</v-col>
            <v-col class="subtitle-2" cols="7">{{ studentSelected.student.fullName }}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="4">Edad:</v-col>
            <v-col class="subtitle-2" cols="7">{{ studentSelected.student.age}}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="4">Fecha de nacimiento:</v-col>
            <v-col class="subtitle-2" cols="7">{{ studentSelected.student.birthDate }}</v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="5">
          <v-row justify="start">
            <v-col class="title" cols="12">Acudiente</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="3">Identificación:</v-col>
            <v-col class="subtitle-2" cols="8">{{ studentSelected.parents[0].personId }}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="3">Nombre:</v-col>
            <v-col class="subtitle-2" cols="8">{{ studentSelected.parents[0].fullName }}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="3">Email:</v-col>
            <v-col class="subtitle-2" cols="8">{{ studentSelected.parents[0].email }}</v-col>
            <v-col class="text-left mr-4 mb-2 subtitle-2" tag="strong" cols="3">Dirección:</v-col>
            <v-col class="subtitle-2" cols="8">{{ studentSelected.parents[0].address }}</v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="5">
          <div v-if="gamesPlayed">
            <apexchart type=radar height=350 :options="gamesPlayed" :series="gamesPlayed.series" />
          </div>
        </v-col>
        <v-col sm="12" md="5">
          <div v-if="hoursPlayed">
            <apexchart type=bar height=380 :options="hoursPlayed" :series="hoursPlayed.series" />
          </div>
        </v-col>

        <v-col sm="12" md="5" v-if="gamesStatistics" v-for="(gameStatistics, i) in gamesStatistics" :key="i">
          <div v-if="gameStatistics">
            <apexchart type=line width=600 :options="gameStatistics" :series="gameStatistics.series" />
          </div>
        </v-col>

        <v-col sm="12" md="5">
          <div v-if="observationsPerMonth">
            <apexchart type=line width=600 :options="observationsPerMonth" :series="observationsPerMonth.series" />
          </div>
        </v-col>
        <v-col sm="12" md="5">
          <div v-if="observationsPerUser">
            <apexchart type=donut width=380 :options="observationsPerUser" :series="observationsPerUser.series" />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>


</v-container>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
import XLSX from 'xlsx'
import {
  mapActions
} from 'vuex'
//Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      gamesPlayed: null,
      hoursPlayed: null,
      observationsPerMonth: null,
      observationsPerUser: null,
      gamesStatistics: null,
      search: '',
      headers: [

        {
          text: 'Foto',
          value: 'photoUrl'
        },
        {
          text: 'Nombre',
          value: 'fullName'
        },
        {
          text: 'Activo',
          value: 'enabled'
        },
        {
          text: 'Acciones',
          value: 'action',
          sortable: false
        }
      ],
      items: [],
      studentSelected: null
    }
  },
  methods: {
    ...mapActions('statisticsm', ['getStudentsCreatedStatistic', 'getStudentsOrGamesEnabledStatistic', 'getGamesStatisticsByStudent', 'getStudentObservationStatistic', 'getGamesResults']),
    ...mapActions('studentm', ['getStudents', 'getStudent']),
    async setGamesChartsValues() {
      var result = await this.getGamesStatisticsByStudent(this.studentSelected.student.personId)
      this.gamesPlayed = result.gamesPLayed
      this.hoursPlayed = result.hoursPlayed
      this.gamesStatistics = await this.getGamesResults(this.studentSelected.student.personId)
    },
    async setObservationsStatistics() {
      var result = await this.getStudentObservationStatistic(this.studentSelected.student.personId)
      this.observationsPerMonth = result.observationsPerMonth
      this.observationsPerUser = result.observationsPerUser
    },
    async searchStudents() {
      this.items = await this.getStudents()
    },
    async viewDetail(student) {
      this.studentSelected = await this.getStudent(student.personId)
      this.setGamesChartsValues()
      this.setObservationsStatistics()
      this.$forceUpdate();
    },
    createData() {
      var dataToExport = []
      this.gamesStatistics.forEach(function(value, index) {
        var gameResult = {
          Actividad: value.title.text,
          Aciertos: null,
          Desaciertos: null,
        }
        value.series[0].data.forEach(function(value2, index) {
          gameResult.Aciertos = value2
          gameResult.Desaciertos = value.series[1].data[index]
          dataToExport.push(gameResult)
        })
      })
      let data = XLSX.utils.json_to_sheet(dataToExport)
      console.log(data);
      data['E1'] = {
        v: 'Actividad',
        t: 's'
      }
      data['F1'] = {
        v: 'Cantidad de ingresos',
        t: 's'
      }
      data['G1'] = {
        v: 'Cantidad de horas',
        t: 's'
      }
      var lastCell = ''
      this.gamesPlayed.series[0].data.forEach((value, index) =>{
        data[`E${index + 2}`] = {
          v: this.gamesPlayed.labels[index],
          t: 's'
        }
        data[`F${index + 2}`] = {
          v: this.gamesPlayed.series[0].data[index],
          t: 'n'
        }
        data[`G${index + 2}`] = {
          v: this.hoursPlayed.series[0].data[index],
          t: 'n'
        }
        lastCell = `G${index + 2}`
      })
      data["!ref"] = `A1:${lastCell}`
      return data
    },
    async exportData() {
      var data = this.createData()
      const workbook = XLSX.utils.book_new()
      const filename = `${this.studentSelected.student.personId}-Datos`
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    }
  },
  async mounted() {
    this.searchStudents()
  }

}
</script>
