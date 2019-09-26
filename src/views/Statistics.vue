<template>
  <v-container>
    <menu-options></menu-options>
    <div class="content">
      <v-card>
        <v-tabs
          background-color="white"
          color="primary"
        >
          <v-tab>Generales</v-tab>
          <v-tab>Por estudiante</v-tab>

          <v-tab-item>
            <v-container fluid>
              <general-statistics></general-statistics>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <student-statistics></student-statistics>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </v-container>
</template>

<script>

import menuOptions from '@/components/Menu'
import generalStatistics from '@/components/GeneralStatistics'
import studentStatistics from '@/components/StudentStatistics'

export default{
  components:{
    menuOptions,
    generalStatistics,
    studentStatistics
  },

}
</script>


<style>
.content {
  margin-top: -7em;
}

.dataTable {
  margin-top: 0.5em;
  width: 80%;
}
</style>
