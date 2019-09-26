<template>
  <v-container>
    <div align="center" class="display-2" style="margin-bottom: 5%">
      <v-alert v-if="!studentsToPick || studentsToPick.length < 1" text outlined color="deep-orange" icon="mdi-fire">
        <h1 class="headline">No hay estudiantes registrados aun.</h1>
      </v-alert>
      <v-alert v-else text color="info">
        <h1 class="headline">¡Seleccionate!</h1>
      </v-alert>
    </div>
    <v-fade-transition mode="out-in">
      <v-row no-gutters>
        <v-col sm="12" md="2"
        v-for="(studentToPick, i) in studentsToPick"
        :key="i"
        justify="space-between">
          <v-card width="300" style="margin-bottom: 5%">
            <v-img :src="studentToPick.photoUrl" height="250" width="300" class="grey darken-4"></v-img>
            <v-card-title class="title">{{studentToPick.fullName}}</v-card-title>
            <v-card-actions>
              <v-btn color="primary" @click="studentPickedEmitter(studentToPick)">
                <v-icon>emoji_people</v-icon>
                Soy yo
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>


<script>
export default{
  props:{
    studentsToPick: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showPassword: false,
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      valid: false
    }
  },
  methods:{
    studentPickedEmitter(studentPicked){
      this.$emit('studentPicked', studentPicked)
    }
  }

}
</script>
