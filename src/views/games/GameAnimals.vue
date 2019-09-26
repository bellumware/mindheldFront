<template>
<v-container>

  <v-alert outlined color="primary" icon="contact_support">
    <div class="title">
      <p>Selecciona el animal que se repite.</p>
    </div>
  </v-alert>
  <v-row align="center" justify="center" v-if="animal">
    <v-col sm="12" md="2">
      <v-card width="150" style="margin-bottom: 5%" >
        <v-img :src="animal.photo" width="150" height="150" class="grey darken-4"></v-img>
        <v-card-title class="title">{{animal.name}}</v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row align="center" justify="center" v-if="animal">
    <v-col sm="12" md="2"
      v-for="(animalToPick, i) in animals"
      :key="i"
      justify="space-between">
      <v-card  width="150" style="margin-bottom: 5%" @click="pickAnimal(animalToPick)">
        <v-img :src="animalToPick.photo"width="150" height="150" class="grey darken-4"></v-img>
        <v-card-title class="title">{{animalToPick.name}}</v-card-title>
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
      animals: [
        {name: 'León', photo: require('@/assets/images/gameAnimals/lion.png')},
        {name: 'Oso', photo: require('@/assets/images/gameAnimals/bear.png')},
        {name: 'Abeja', photo:require('@/assets/images/gameAnimals/bee.png')},
        {name: 'Perro', photo:require('@/assets/images/gameAnimals/dog.jpg')},
        {name: 'Tiburón', photo:require('@/assets/images/gameAnimals/shark.jpg')},
        {name: 'Paloma', photo:require('@/assets/images/gameAnimals/bird.png')},
      ],
      animal: null,
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
    selectAnimal(){
      this.animal = this.animals[Math.floor((Math.random() * 5) + 0)]
      this.animals = this.shuffle(this.animals)
    },
    pickAnimal(animalToPick){
      if(animalToPick === this.animal){
        this.alert = {type: "success", message: "Correcto", value: true}
        this.selectAnimal()
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
    this.selectAnimal()
  }

}
</script>
