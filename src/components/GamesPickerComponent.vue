<template>
  <v-container>
    <div align="center" class="display-2" style="margin-bottom: 5%">


      <v-alert v-if="!gamesToPick || gamesToPick.length < 1" text outlined color="deep-orange" icon="mdi-fire">
        <h1 class="headline">No hay juegos habilitados en el momento.</h1>
      </v-alert>
      <v-alert v-else text color="info">
        <h1 class="headline">{{infoText}}</h1>
      </v-alert>
    </div>
    <v-btn v-if="!gameToPlay"
     color="primary"
     style="margin-bottom: 5%"
     @click="backToStudentsPick()">
      <v-icon>arrow_back_ios</v-icon>
      Volver a seleccionar estudiante
    </v-btn>
    <v-fade-transition mode="out-in" v-if="!gameToPlay">
      <v-row no-gutters>
        <v-col sm="12" md="2"
        v-for="(gameToPick, i) in gamesToPick"
        :key="i"
        justify="space-between">
          <v-card width="300" style="margin-bottom: 5%">
            <v-img :src="gameToPick.photo" height="250" width="300" class="grey darken-4"></v-img>
            <v-card-title class="title">{{gameToPick.name}}</v-card-title>
            <v-card-actions>
              <v-btn color="primary" @click="playGame(gameToPick)">
                <v-icon>games</v-icon>
                jugar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
    <v-btn v-if="gameToPlay"
     color="primary"
     style="margin-bottom: 5%"
     @click="backToGamesPick()">
      <v-icon>arrow_back_ios</v-icon>
      Volver a seleccionar juegos
    </v-btn>
    <v-flex v-if="gameToPlay">
      <component  :is="gameToPlay.url"
                  :gameId="gameToPlay.gameId"
                  :studentId="this.studentPicked.personId"
                  @saveResult="saveResult">
      </component>
    </v-flex>
  </v-container>
</template>


<script>
import gameAnimals from '@/views/games/GameAnimals'
import gameNumbers from '@/views/games/GameNumbers'
import gameSizes from '@/views/games/GameSizes'
import gameColors from '@/views/games/GameColors'
import gameMemory from '@/views/games/GameMemory'
import {mapActions} from 'vuex'

export default{
  props:{
    gamesToPick: {
      type: Array,
      required: true
    },
    gameToPlay:{
      type: Object
    },
    studentPicked: {
      type: Object,
      required: true
    }
  },
  components: {
    gameAnimals,
    gameNumbers,
    gameSizes,
    gameColors,
    gameMemory
  },
  computed:{
    infoText(){
      return (this.gameToPlay)
        ? `Jugando ${this.gameToPlay.name}`
        : `¡Hola ${this.studentPicked.fullName} Selecciona el juego!`
    }
  },
  methods:{
    ...mapActions('statisticsm', ['saveGameResult']),
    async saveResult(gameResult){
      await this.saveGameResult(gameResult)
    },
    playGame(gamePicked){
      this.$emit('gamePicked', gamePicked)
    },
    backToGamesPick(){
      this.$emit('backToGamesPick', null)
    },
    backToStudentsPick(){
      this.$emit('backToStudentsPick', null)
    }
  }

}
</script>
