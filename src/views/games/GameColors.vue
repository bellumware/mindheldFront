<template>
<v-container>

  <v-alert outlined color="primary" icon="contact_support">
    <div class="title">
      <p>Selecciona el nombre del color.</p>
    </div>
  </v-alert>
  <v-row align="center" justify="center" v-if="color">
    <v-col sm="12" md="2">
      <v-card width="150" height="150" style="margin-bottom: 5%" :color="color.value">
      </v-card>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col sm="12" md="2"
      v-for="(colorToPick, i) in colors"
      :key="i"
      justify="space-between">
      <v-card  width="150" style="margin-bottom: 5%" @click="pickColor(colorToPick)">
        <v-card-title class="title">{{colorToPick.name}}</v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-alert dismissible v-if="alert"
    text
    prominent
    v-model="alert.value"
    :type="alert.type"
    transition="scale-transition">
    {{alert.message}}
  </v-alert>
  <modal :show="finished" @playAgain="playAgain"></modal>
</v-container>
</template>


<script>
import {mapActions} from 'vuex'
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
      colors: [
        {name: 'Rojo', value: 'red'},
        {name: 'Verde', value: 'green'},
        {name: 'Azul', value: 'blue'},
        {name: 'Naranja', value: 'orange'},
        {name: 'Amarillo', value: 'yellow'},
        {name: 'Morado', value: 'purple'},
        {name: 'Negro', value: 'black'},
        {name: 'Rosado', value: 'pink'},
      ],
      color: null,
      alert: null,
      trys: {success: 0, fails: 0}
    }
  },
  computed:{
    finished(){
      return (this.trys.success + this.trys.fails === 10)
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
    },
    reset(){
      this.color = this.colors[Math.floor(Math.random() * 8)]
      this.colors = this.shuffle(this.colors)
    },
    pickColor(colorToPick){
      if(colorToPick === this.color){
        this.alert = {type: "success", message: "Correcto", value: true}
        this.reset()
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
