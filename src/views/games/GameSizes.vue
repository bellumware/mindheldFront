6
<template>
<v-container>

  <v-alert outlined color="primary" icon="contact_support">
    <div class="title">
      <p>Selecciona la figura con el mismo tamaño</p>
    </div>
  </v-alert>
  <v-row align="center" justify="center" v-if="figure">
    <v-col sm="12" md="2">
      <v-card width="150" style="margin-bottom: 5%">
        <v-img :src="figure.photo" width="150" :height="figure.height" class="grey darken-4"></v-img>
      </v-card>
    </v-col>
      <v-col sm="1" md="1" >
        <v-card width="10"  height="300"  style="margin-bottom: 5%" color="grey" v-if="!mobile">
        </v-card>
        <v-card width="300"  height="10"  style="margin-bottom: 5%" color="grey" v-else>
        </v-card>
      </v-col>
    <v-col sm="12" md="2" v-for="(figureToPick, i) in figures" :key="i" justify="space-between">
      <v-card width="150" style="margin-bottom: 5%" @click="pickFigure(figureToPick)">
        <v-img :src="figureToPick.photo" width="150" :height="figureToPick.height" class="grey darken-4"></v-img>
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
      figures: [],
      figure: null,
      alert: null,
      mobile: false,
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
    reset() {
      var figuresArray = [
        require('@/assets/images/gameSizes/circle.jpg'),
        require('@/assets/images/gameSizes/triangle.jpg'),
        require('@/assets/images/gameSizes/square.jpg'),
      ]
      this.figures = []
      this.figure = {
        photo: figuresArray[Math.floor(Math.random() * 3)],
        height: (Math.floor(Math.random() * 70) + 150)
      }
      for(var i = 0; i <2 ; i++){
        var size = this.figure.height + (Math.floor(Math.random() * 30) + 50)
        if(i > 0)
          size = this.figure.height - (Math.floor(Math.random() * 30) + 50)
        this.figures.push({
          photo: this.figure.photo,
          height: size
        })
      }
      this.figures.push({
        photo: this.figure.photo,
        height: this.figure.height
      })
      this.figures = this.shuffle(this.figures)
    },
    pickFigure(figureToPick) {
      console.log();
      if (figureToPick.height === this.figure.height) {
        this.alert = {type: "success", message: "Correcto", value: true}
        this.reset()
        this.trys.success += 1
      }else{
        this.alert = {type: "error", message: "Incorrecto", value: true}
        this.trys.fails += 1
      }
      this.checkResult()
    },
    resize(){
      this.mobile = (window.innerWidth < 960);
    },    
    playAgain(e){
      this.trys = {success: 0, fails: 0}
      this.alert.value = false
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
    this.resize()
  }

}
</script>
