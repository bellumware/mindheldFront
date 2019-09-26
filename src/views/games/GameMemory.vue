<template>
<v-container>

  <v-alert outlined color="primary" icon="contact_support">
    <div class="title">
      <p>Recuerda los animales iguales.</p>
    </div>
  </v-alert>
  <v-row align="center" justify="center" >
    <v-col sm="12" md="2"
      v-for="(animalToPick, i) in animals"
      :key="i"
      justify="space-between">
      <v-card  width="150" style="margin-bottom: 5%" v-if="animalToPick.value">
        <v-img :src="animalToPick.photo"width="150" height="150" class="grey darken-4"></v-img>
        <v-card-title class="title">{{animalToPick.name}}</v-card-title>
      </v-card>
      <v-card  width="150" height="200"
      style="margin-bottom: 5%"
      @click="pickAnimal(animalToPick)"
      color="grey"
      v-else>
      </v-card>
    </v-col>
  </v-row>
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
      animals: [],
      animal: null,
      trys: {success: 0, fails: 0}
    }
  },
  computed:{
    finished(){
      for(var i=0; i < this.animals.length; i++){
        if(!this.animals[i].value)
          return false
      }
      return true
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
      this.reset()
    },
    reset(){
      this.animals = [
          {name: 'León', photo:require('@/assets/images/gameAnimals/lion.png'), value: false},
          {name: 'Oso', photo:require('@/assets/images/gameAnimals/bear.png'), value: false},
          {name: 'Abeja', photo:require('@/assets/images/gameAnimals/bee.png'), value: false},
          {name: 'Perro', photo:require('@/assets/images/gameAnimals/dog.jpg'), value: false},
          {name: 'Tiburón', photo:require('@/assets/images/gameAnimals/shark.jpg'), value: false},
          {name: 'Paloma', photo:require('@/assets/images/gameAnimals/bird.png'), value: false},
          {name: 'León', photo:require('@/assets/images/gameAnimals/lion.png'), value: false},
          {name: 'Oso', photo:require('@/assets/images/gameAnimals/bear.png'), value: false},
          {name: 'Abeja', photo:require('@/assets/images/gameAnimals/bee.png'), value: false},
          {name: 'Perro', photo:require('@/assets/images/gameAnimals/dog.jpg'), value: false},
          {name: 'Tiburón', photo:require('@/assets/images/gameAnimals/shark.jpg'), value: false},
          {name: 'Paloma', photo:require('@/assets/images/gameAnimals/bird.png'), value: false},
      ]
      this.animals = this.shuffle(this.animals)
      this.animal = null
    },
    async pickAnimal(animalToPick){
      console.log(`Animal picked ${animalToPick.name}`);
      animalToPick.value = true
      if(this.animal){
        this.compareAnimals(animalToPick)
      }else{
        this.animal = animalToPick
      }
    },
    compareAnimals(animalToPick){
      console.log(`animal: ${this.animal.name} animalTopick: ${animalToPick.name}`);
      if(this.animal.name === animalToPick.name){
        this.animal = null
        this.trys.success += 1
      }else{
        this.animal.value = false
        this.animal = animalToPick
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
