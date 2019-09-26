<template>

    <v-form @submit.prevent="$emit('login')" v-model="valid">

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Inicio de sesión Mindheld</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                  <v-text-field
                      label="Usuario"
                      prepend-icon="account_circle"
                      v-model="user.username"
                      :rules="[rules.required]"
                    ></v-text-field>

                    <v-text-field
                     :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                     :rules="[rules.required, rules.min]"
                     :type="showPassword ? 'text' : 'password'"
                     prepend-icon="lock"
                     name="input-10-2"
                     label="Contraseña"
                     hint="Almenos 3 caracteres"
                     v-model="user.password"
                     class="input-group--focused"
                     @click:append="showPassword = !showPassword"
                   ></v-text-field>
              </v-card-text>
              <v-card-actions >

                <v-row>
                  <v-col xs12 md6 justify="center">
                    <v-btn type="submit"
                           color="primary">
                           Iniciar Sesión
                    </v-btn>
                  </v-col>
                  <v-col xs12 md6 justify="center">
                    <v-btn @click="toStudentPicker()" color="primary">
                           Ingresar como estudiante
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

</template>

<script>

  export default{
    props:{
      user: {
        type: Object,
        required: true,
        validator: user => {
          if(!user.hasOwnProperty('username') || !user.hasOwnProperty('password')){
            console.warn('Usuario no valido')
            return false
          }
          return true
        }
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
      toStudentPicker(){
        this.$router.push('/studentPicker')
      }
    }

  }

</script>

<style lang="stylus">



</style>
