<template>
<v-container>


  <menu-options></menu-options>
  <div class="content">
    <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">

      {{resultOperation.message}}
    </v-alert>
  </div>

  <v-card class="mx-auto dataTable">
    <v-card-title>
      Juegos
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          No hay datos registrados.
        </v-alert>
      </template>
      <template v-slot:item.enabled="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-switch v-model="item.enabled" v-on:change="changeEnabledGame(item)" color="success"></v-switch>
          </template>
          <span>Activar o Inactivar Juego</span>
        </v-tooltip>
      </template>
      <template v-slot:item.photo="{ item }">
        <v-avatar v-if="item.photo" :size="imageSize" class="profile" tile>
          <img :src="item.photo" srcset lazy-src contain></img>
        </v-avatar>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import menuOptions from '@/components/Menu'
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

const EDIT = 'Editar'
const CREATE = 'Registrar'

export default {
  components: {
    menuOptions
  },
  data() {
    return {
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      resultOperation: {
        messageType: 'info',
        message: null,
        visible: false
      },
      search: '',
      headers: [

        {
          text: 'Foto',
          value: 'photo'
        },
        {
          text: 'Nombre',
          value: 'name'
        },
        {
          text: 'Habilitar',
          value: 'enabled'
        }
      ],
      items: [],
      action: CREATE,
      imageSize: 164,
    }
  },
  computed: {
    ...mapState('auth', ['token']),
    isReadOnly() {
      return this.action === EDIT
    }
  },
  methods: {
    ...mapActions('gamesm', ['getAllGames', 'editGame']),
    async searchGames() {
      this.items = await this.getAllGames()
    },
    changeEnabledGame(game) {
      this.editGame(game)
    },
    onResize() {
      console.log(window.innerWidth);
      this.imageSize = (window.innerWidth < 960) ?38 : 164;
    }
  },
  async mounted() {
    this.searchGames()
    this.onResize()
  }
}
</script>


<style>
.content {
  margin-top: -7em;
}

.dataTable {
  margin-top: 0.5em;
  width: 80%;
}
</style>
