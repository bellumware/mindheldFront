<template>
<v-app>
  <v-content>
    <loading-dialog :loading="this.loading"></loading-dialog>
    <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>

import LoadingDialog from '@/components/LoadingDialog'
import menuOptions from '@/components/Menu'
import Login from '@/views/Login'
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'app',
  components: {
    LoadingDialog,
    Login,
    menuOptions
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('auth', ['isLogged']),
    ...mapMutations(['setLoading'])
  },
  mounted() {
    if (this.isLogged) {
      this.$router.push('/index')
    }
  }
};
</script>
