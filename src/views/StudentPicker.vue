<template>
<v-container>

  <div style="width: 100%;" class="content">
    <menu-options @leaving="leaving"></menu-options>
    <student-picker-comp :studentsToPick="studentsToPick" @studentPicked="pickStudent" v-if="!studentPlaying"></student-picker-comp>

    <game-picker-comp :gamesToPick="gamesToPick"
    :gameToPlay="gameToPlay"
    :studentPicked="studentPlaying"
     @gamePicked="pickGame"
     @backToGamesPick="backToGamesPick"
     @backToStudentsPick="backToStudentsPick"
     v-else>
    </game-picker-comp>
  </div>


</v-container>
</template>

<script>
import menuOptions from '@/components/Menu'
import studentPickerComp from '@/components/StudentsPickerComponent'
import gamePickerComp from '@/components/GamesPickerComponent'
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'



export default {
  components: {
    menuOptions,
    studentPickerComp,
    gamePickerComp
  },
  data() {
    return {
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      studentsToPick: [],
      gamesToPick: [],
      gameToPlay: null,
    }
  },
  computed: {
    ...mapState('auth', ['token', 'role']),
    ...mapState('studentm', ['studentPlaying']),
    ...mapState('gamesm', ['gameHistory'])
  },
  methods: {
    ...mapActions('studentm', ['getStudentsPublic']),
    ...mapActions('gamesm', ['getGamesEnabled', 'startPlaying', 'endPlaying']),
    ...mapMutations('auth', ['logout']),
    async searchStudents() {
      this.studentsToPick = await this.getStudentsPublic()
    },
    async searchGames() {
      this.gamesToPick = await this.getGamesEnabled()
    },
    pickStudent(studentPicked) {
      this.$store.commit('studentm/setStudentPlaying', studentPicked)
    },
    async pickGame(gamePicked) {
      this.gameToPlay = gamePicked
      var gameHist = {
          gameId: gamePicked.gameId,
          studentId: this.studentPlaying.personId
      }
      gameHist = await this.startPlaying(gameHist)
      this.$store.commit('gamesm/setGameHistory', gameHist)
    },
    async backToGamesPick(value){
      this.gameToPlay = null
      await this.endPlaying(this.gameHistory)
      this.$store.commit('gamesm/setGameHistory', null)
    },
    backToStudentsPick(value){
      this.$store.commit('studentm/setStudentPlaying', null)
    },
    async leaving(e) {
      await this.endPlaying(this.gameHistory)
      this.$store.commit('studentm/setStudentPlaying', null)
      this.$store.commit('gamesm/setGameHistory', null)
      return
    }
  },
  async mounted() {
    this.logout()
    this.searchStudents()
    this.searchGames()
    console.log(window);
    if (this.$route.path === '/studentPicker') {
      window.onbeforeunload = this.leaving
      window.onpopstate = this.leaving
      window.onclose = this.leaving
    }

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
