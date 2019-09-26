<template>
  <v-container align-center="true">
    <v-alert dismissible
      text
      prominent
      v-model="errorValue"
      type="error"
      transition="scale-transition">
      {{errorMessage}}
    </v-alert>
    <authentication :user="user" @login="submit"></authentication>
  </v-container>
</template>


<script>

  import ApexCharts from 'apexcharts'
  import authentication from '@/components/Authentication'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    components: {
      authentication
    },
    computed:{
      ...mapState('auth', ['error', 'errorMessage', 'isLogged']),
      ...mapMutations(['setLoading']),
      errorValue: {
        get(){
          return this.error
        },
        set(value){
          console.log(value);
          this.$store.commit("auth/setError", value)
        }
      }
    },
    data(){
      return {
        user:{
          username: '',
          password: ''
        },
        alert: false
      }
    },
    methods:{
      ...mapActions('auth', ['signIn']),
      async submit(){
        const validate = await this.$validator.validateAll()
        if(!validate){
          return false
        }
        this.$store.commit("auth/setError", false)
        await this.signIn(this.user)
        if(this.isLogged){
          this.$router.push('/index')
        }
      }
    }
  }


</script>
