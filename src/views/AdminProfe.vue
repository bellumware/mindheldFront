<template>
<v-container>


  <menu-options></menu-options>
  <div class="content">
    <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">

      {{resultOperation.message}}
    </v-alert>


    <v-btn color="primary" @click="dialog = !dialog; cleanTeacher()" style="margin-left: 10%">
      <v-icon>person_add</v-icon>
      <span>&nbsp; Registrar Profesor</span>
    </v-btn>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{action}} profesor</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="teacherForm" lazy-validation>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Número Identificación*"
                    required
                    :readonly="isReadOnly"
                    :rules="[rules.required]"
                    v-model="teacher.personId"
                    prepend-inner-icon="fingerprint"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Primer nombre*"
                    required
                    :rules="[rules.required]"
                    v-model="teacher.firstName"
                    prepend-inner-icon="library_books"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Segundo nombre"
                    required v-model="teacher.secondName"
                    prepend-inner-icon="library_books"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Primer apellido*"
                    required
                    :rules="[rules.required]"
                    v-model="teacher.firstSurname"
                    prepend-inner-icon="library_books"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 sm6>
                    <v-text-field label="Segundo apellido"
                    v-model="teacher.secondSurname"
                    prepend-inner-icon="library_books"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Dirección"
                    hint="Dirección del lugar de residencia"
                    :rules="[rules.required]"
                    v-model="teacher.address"
                    prepend-inner-icon="place"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email*"
                    hint="ejemplo@ejemplo.com"
                    required
                    :rules="[rules.required]"
                    v-model="teacher.email"
                    prepend-inner-icon="email"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
            <small>*Indica que es un campo requerido</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="cleanTeacher()">Limpiar</v-btn>
            <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
            <v-btn color="primary" @click="saveTeacher()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Confirmación</span>
        </v-card-title>
        <v-card-text>
          <span class="text--primary">¿Esta seguro/a de querer elminar al profesor {{this.teacher.fullName}}?</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="deleteTeacher()">
            Si
          </v-btn>
          <v-btn color="primary" text @click="confirmDialog = false; cleanTeacher()">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-card class="mx-auto dataTable">
    <v-card-title>
      Profesores
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          No hay datos registrados.
        </v-alert>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip rounded
            color='warning'
            v-on="on"
            @click="editItem(item)">
              <v-icon small color='white'>
                edit
              </v-icon>
            </v-chip>
          </template>
          <span>Editar</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip rounded color='red' @click="openConfirmDialog(item)" v-on="on">
              <v-icon small color='white'>
                delete
              </v-icon>
            </v-chip>

          </template>
          <span>Eliminar</span>
        </v-tooltip>
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
      dialog: false,
      confirmDialog: false,
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      teacher: {
        personId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        address: null,
        email: null,

      },
      resultOperation: {
        messageType: 'info',
        message: null,
        visible: false
      },
      search: '',
      headers: [

        {
          text: 'Nombre',
          value: 'fullName'
        },
        {
          text: 'Documento',
          value: 'personId'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Dirección',
          value: 'address'
        },
        {
          text: 'Acciones',
          value: 'action',
          sortable: false
        }
      ],
      items: [],
      action: CREATE
    }
  },
  computed: {
    ...mapState('auth', ['token']),
    isReadOnly() {
      return this.action === EDIT
    }
  },
  methods: {
    ...mapActions('teacherm', ['saveTeacherAction', 'getTeachers', 'editTeacherAction', 'deleteTeacherAction']),
    async saveTeacher() {
      if(this.$refs.teacherForm.validate()){
        if (this.action === EDIT) {
          this.resultOperation = await this.editTeacherAction(this.teacher)
        } else if (this.action === CREATE) {
          this.resultOperation = await this.saveTeacherAction(this.teacher)
        }
        this.cleanTeacher()
        this.searchTeachers()
        this.dialog = false
      }
    },
    cleanTeacher() {
      this.teacher = {
        personId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        address: null,
        email: null,
      }
      this.action = CREATE
    if (this.$refs.teacherForm)
      this.$refs.teacherForm.reset()
    },
    editItem(teacherToEdit) {
      this.teacher = teacherToEdit
      this.action = EDIT
      this.dialog = true
    },
    openConfirmDialog(teacherToDelete){
      this.teacher = teacherToDelete
      this.confirmDialog = true
    },
    async deleteTeacher(){
      this.resultOperation = await this.deleteTeacherAction(this.teacher)
      this.cleanTeacher()
      this.searchTeachers()
      this.confirmDialog = false
    },
    async searchTeachers() {
      this.items = await this.getTeachers()
    }
  },
  async mounted() {
    this.searchTeachers()
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
