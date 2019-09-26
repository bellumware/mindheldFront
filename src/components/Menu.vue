<template>
  <v-layout
    wrap
    style="height: 200px;"
  >
    <v-layout row wrap>
     <v-flex
       xs12
       sm12
       md6
       class="my-3"
     >
         <v-app-bar
          absolute
          color="primary" dark>
          <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isLogged"></v-app-bar-nav-icon>

          <v-toolbar-title>Mindheld</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="logOut()">
            <v-icon dark>power_settings_new</v-icon>
              <span>&nbsp; Salir</span>
            </v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer
           v-model="drawer"
           absolute
           temporary
           v-if="isLogged"
         >

           <template v-slot:prepend>
        <v-list-item two-line>

          <v-list-item-content>
            <v-list-item-title>{{fullName}}</v-list-item-title>
            <v-list-item-subtitle>{{profile}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in menuAvialiable"
          :key="item.title"
          @click="goTo(item.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
         </v-navigation-drawer>
     </v-flex>
   </v-layout>


  </v-layout>
</template>

<script>

  import {mapActions, mapState, mapMutations} from 'vuex'


  export default {
      data () {
        return {
          drawer: null
        }
      },
      methods: {
        ...mapMutations('auth',['logout']),
        goTo(path){
          console.log(`go to ${path}`);
          this.$router.push(`/${path}`)
        },
        logOut(){
          console.log('Logging out');
          this.logout()
          this.$emit('leaving', null)
          this.$router.push('/login')
        }
      },
      computed: {
        ...mapState('auth', ['role', 'personData', 'isLogged']),
        menuAvialiable(){
          if(this.role === 'ADMIN'){
            return [
              { title: 'Inicio', icon: 'dashboard', action:'index' },
              { title: 'Administrar Profesores', icon: 'people', action:'adminTeachers' },
              { title: 'Administrar Estudiantes', icon: 'face', action: 'adminStudents'},
              { title: 'Administrar Juegos', icon: 'games', action: 'adminGames'},
              { title: 'Estadisticas', icon: 'show_chart', action: 'statistics'},
            ]
          }
          if(this.role === 'TEACHER'){
            return [
              { title: 'Inicio', icon: 'dashboard', action:'index' },
              { title: 'Administrar Estudiantes', icon: 'face', action: 'adminStudents'},
              { title: 'Estadisticas', icon: 'show_chart', action: 'statistics'},
            ]
          }
        },
        profile(){
          if(this.role === 'ADMIN')
            return 'Administrador'
          if(this.role === 'TEACHER')
            return 'Profesor'
          return 'perfil desconocido'
        },
        fullName(){
          return this.personData.fullName
        }
      }
    }
</script>
