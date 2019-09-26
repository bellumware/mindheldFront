<template>
<v-container>

  <menu-options></menu-options>

  <div class="content" style="width: 70%; margin-left: 15%">
    <v-alert outlined color="primary" icon="contact_support">
      <div class="title">
        <p>Noticias</p>
      </div>
      <div>
        <p>
          Seccion que mostrara las noticias que el administrador(es) publiquen en la pagina.
        </p>
      </div>
    </v-alert>
    <v-btn color="primary"
      @click="dialog = !dialog; cleanNew()"
      v-if="role === 'ADMIN'" >
      <v-icon>announcement</v-icon>
      <span>&nbsp; Crear Noticia</span>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Crear Noticia</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="newsForm" lazy-validation>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Titulo*"
                  required
                  :rules="[rules.required]"
                  v-model="newToCreate.newTitle"
                  prepend-inner-icon="description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Noticia*"
                  @change="v => newToCreate.newBody= v"
                  color="primary"
                  required
                  :rules="[rules.required]"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  haped counter clearable clear-icon="cancel"></v-textarea>
                </v-flex>
                <span>Color de la noticia</span>
                <v-color-picker
                  v-model= "newToCreate.color"
                  :hide-inputs="true"
                  mode.sync="hex"
                  class="mx-auto"></v-color-picker>
              </v-layout>
            </v-form>
          </v-container>
          <small>*Indica que es un campo requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cleanNew()">Limpiar</v-btn>
          <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
          <v-btn color="primary" @click="saveNew()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-select
          v-model="quantity"
          :hint="`mostrar las ${quantity.number} ultimas noticias`"
          :items="pickItems"
          item-text="number"
          item-value="value"
          label="quantity"
          persistent-hint
          v-on:change="getAllNews"
          return-object
          single-line
        ></v-select>
    <v-timeline align-top :dense="dense">
      <v-timeline-item v-for="(newItem, i) in news" :key="i" :color="newItem.color" fill-dot>
        <v-card :color="newItem.color" dark>
          <v-card-title class="title">{{newItem.newTitle}}</v-card-title>
          <v-card-text class="white text--primary">
            <p>{{newItem.newBody}} </p>
            <p>{{newItem.newDate.substring(0,10)}}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

  </div>


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
      dense: false,
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      pickItems: [
        {number: '1', value: 1},
        {number: '2', value: 2},
        {number: '3', value: 3},
        {number: '4', value: 4},
        {number: 'todas', value: 0},
      ],
      quantity: {number: '2', value: 2},
      news: [],
      newToCreate: {
        newTitle: null,
        newBody: null,
        color: '#2F41FA',
      }
    }
  },
  computed: {
    ...mapState('auth', ['token', 'role']),
    isReadOnly() {
      return this.action === EDIT
    }
  },
  methods: {
    ...mapActions('newsm', ['getAllNewsApi', 'create']),
    async getAllNews() {
      this.news = await this.getAllNewsApi(this.quantity.value)
    },
    changeNews(item){
      this.quantity = item
      this.getAllNews()
    },
    cleanNew(){
      this.newToCreate = {
        newTitle: null,
        newBody: null,
        color: '#2F41FA',
      }
      if(this.$refs.newsForm)
        this.$refs.newsForm.reset()
    },
    async saveNew(){
      if(this.$refs.newsForm.validate()){
        await this.create(this.newToCreate)
        this.cleanNew()
        this.getAllNews()
        this.dialog = false
      }

    },
    onResize() {
      this.dense = (window.innerWidth < 960);
    }
  },
  async mounted() {
    this.getAllNews()
    this.onResize()
  },
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
