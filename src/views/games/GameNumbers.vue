<template>
<v-container>

  <v-alert outlined color="primary" icon="contact_support">
    <div class="title">
      <p>Selecciona los numeros en orden ascendente</p>
    </div>
  </v-alert>
  <v-row align="center" justify="center">
    <v-col sm="12" md="4" v-for="(numberToPick, i) in numbers" :key="i" justify="space-between">
      <v-card width="150" style="margin-bottom: 5%" @click="pickNumber(numberToPick)" v-if="numberToPick">
        <v-img :src="numberToPick.photo" width="150" height="150" class="grey darken-4"></v-img>
      </v-card>
    </v-col>
  </v-row>
  <v-alert dismissible v-if="alert" text prominent v-model="alert.value" :type="alert.type" transition="scale-transition">
    {{alert.message}}
  </v-alert>
  <modal :show="finished" @playAgain="playAgain"></modal>
</v-container>
</template>


<script>
import {
  mapActions
} from 'vuex'
import modal from '@/components/CongratzDialog'

export default {
  components: {
    modal
  },
  props:{
    gameId:{
      type: Number
    },
    studentId:{
      type: String
    }
  },
  data() {
    return {
      numbers: [],
      number: 0,
      alert: null,
      trys: {success: 0, fails: 0}
    }
  },
  computed:{
    finished(){
      return (this.number === 9)
    }
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    playAgain(e){
      this.trys = {success: 0, fails: 0}
      this.alert.value = false
      this.reset()
    },
    reset() {
      this.number = 0
      this.numbers = []
      for (var i = 1; i < 10; i++) {
        this.numbers.push({
          value: i,
          photo: require(`@/assets/images/gameNumbers/${i}.png`)
        })
      }
      this.numbers = this.shuffle(this.numbers)
      this.alert = {type: "success", message: "Correcto", value: false}
    },
    pickNumber(numberToPick) {
      if ((this.number + 1) === numberToPick.value) {
        this.number += 1
        this.numbers.splice(this.numbers.indexOf(numberToPick), 1)
        this.numbers.push(null)
        this.alert = {type: "success", message: "Correcto", value: true}
        this.trys.success += 1
      }else{
        this.alert = {type: "error", message: "Incorrecto", value: true}
        this.trys.fails += 1
      }
      this.checkResult()
    },
    checkResult(){
      if(this.finished){
        this.$emit('saveResult', {
          success: this.trys.success,
          fails: this.trys.fails,
          game: {gameId: this.gameId },
          student: {studentId: this.studentId}

        })
      }
    }
  },
  mounted() {
    this.reset()
  }

}
</script>
