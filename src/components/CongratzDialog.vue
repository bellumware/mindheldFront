<template>
  <v-container>
  <v-row justify="center">
      <v-dialog v-model="show" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Felicitaciones lo conseguiste</v-card-title>
          <v-card-text>
              <v-img :src="congratz"width="250" height="250" class="grey darken-4"></v-img>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="finish()">Volver a jugar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
  <script>
    export default {
      props:{
        show: {
          type: Boolean,
          required: true
        }
      },
      data(){
        return{
          congratz: require('@/assets/images/congratz.jpg'),
        }
      },
      methods: {
        finish(){
          this.$emit('playAgain')
        }
      }
    }
  </script>
