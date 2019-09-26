<template>
<v-container>

  <menu-options></menu-options>

  <div class="content">

    <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">
      {{resultOperation.message}}
    </v-alert>
    <v-btn color="primary" @click="dialog = !dialog; cleanStudent()" style="margin-left: 10%">
      <v-icon>person_add</v-icon>
      <span>&nbsp; Registrar Estudiante</span>
    </v-btn>

    <v-layout justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false; resultOperation.visible = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{action}} estudiante</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <div align="center" style="margin-top: 3em;">
            <v-switch v-model="student.enabled" label="Activar o inactivar estudiante" color="success" class="dataTable" v-if="this.isReadOnly">
            </v-switch>
            <v-stepper v-model="e1" class="dataTable" wrap align-center>
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step=1 :editable="isReadOnly">Datos del estudiante</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step=2 :editable="isReadOnly">Datos del acudiente</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step=3 :editable="isReadOnly">Observaciones</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step=1>

                  <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">
                    {{resultOperation.message}}
                  </v-alert>

                  <!--Student registry (Step 1)-->
                  <v-card elevation="5" class="mb-12 scroll" color="grey lighten-5" height="600px">
                    <v-form ref="studentForm" lazy-validation>
                      <v-container class="overflow-y-auto">
                        <image-input :photoObject="student.photoObject" @photoObjectChange="photoObjectChange">
                          <div slot="activator">
                            <v-layout wrap>
                              <v-flex xs12>
                                <v-avatar size="250px" v-ripple v-if="!student.photoObject" class="grey lighten-3 mb-3">
                                  <span>Click para seleccionar imagen*</span>
                                </v-avatar>
                                <v-avatar size="250px" v-ripple v-else class="mb-3">
                                  <img :src="student.photoObject.imageURL" alt="avatar">
                                </v-avatar>
                              </v-flex>

                              <v-flex xs12>
                                <v-chip small label v-if="student.photoObject" color="primary" @click="logAvatar()">
                                  {{student.photoObject.fieldName}}
                                </v-chip>
                              </v-flex>
                            </v-layout>
                          </div>
                        </image-input>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-text-field label="Número Identificación*" required :readonly="isReadOnly" :rules="[rules.required]" v-model="student.personId" prepend-inner-icon="fingerprint"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field label="Primer nombre*" required :rules="[rules.required]" v-model="student.firstName" prepend-inner-icon="library_books"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field label="Segundo nombre" required v-model="student.secondName" prepend-inner-icon="library_books"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field label="Primer apellido*" required :rules="[rules.required]" v-model="student.firstSurname" prepend-inner-icon="library_books"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 sm6>
                              <v-text-field label="Segundo apellido" v-model="student.secondSurname" prepend-inner-icon="library_books"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="student.birthDate" persistent full-width width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field v-model="student.birthDate" label="Fecha de nacimiento" prepend-inner-icon="event" readonly v-on="on" required :rules="[rules.required]"></v-text-field>
                                </template>
                                <v-date-picker v-model="student.birthDate" scrollable locale="es-co">
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="dateModal = false">Cancelar</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog.save(student.birthDate)">Seleccionar</v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <small>*Indica que es un campo requerido</small>
                      </v-container>

                    </v-form>
                  </v-card>

                  <div align="left">
                    <v-btn color="primary" @click="resultOperation.visible = false ;nextStep()">
                      Continuar
                    </v-btn>
                  </div>
                </v-stepper-content>

                <v-stepper-content step=2 editable>

                  <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">
                    {{resultOperation.message}}
                  </v-alert>
                  <!-- Student's parent registry (Step 2)-->
                  <v-card elevation="5" class="mb-12 scroll" color="grey lighten-5" height="500px">
                    <v-form ref="parentForm" lazy-validation>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Número Identificación*"
                            required
                            :readonly="isReadOnly"
                            :rules="[rules.required]"
                            v-model="parent.personId"
                            prepend-inner-icon="fingerprint"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Primer nombre*"
                            required
                            :rules="[rules.required]"
                            v-model="parent.firstName"
                            prepend-inner-icon="library_books"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Segundo nombre"
                            v-model="parent.secondName"
                            prepend-inner-icon="library_books"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Primer apellido*"
                            required
                            :rules="[rules.required]"
                            v-model="parent.firstSurname"
                            prepend-inner-icon="library_books"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 sm6>
                            <v-text-field label="Segundo apellido"
                            v-model="parent.secondSurname"
                            prepend-inner-icon="library_books"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Dirección"
                            hint="Dirección del lugar de residencia"
                            :rules="[rules.required]"
                            v-model="parent.address"
                            prepend-inner-icon="place"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Email*"
                            hint="ejemplo@ejemplo.com"
                            required
                            :rules="[rules.required]"
                            v-model="parent.email"
                            prepend-inner-icon="email"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Indica que es un campo requerido</small>
                    </v-form>
                  </v-card>

                  <div align="left">
                    <v-btn color="primary" @click="nextStep()">
                      Continuar
                    </v-btn>
                    <v-btn text @click="stepBack()">
                      Atras
                    </v-btn>
                  </div>
                </v-stepper-content>

                <v-stepper-content step=3>

                  <v-alert dismissible text prominent v-model="resultOperation.visible" :type="resultOperation.messageType" transition="scale-transition">
                    {{resultOperation.message}}
                  </v-alert>
                  <v-card elevation="5" class="mb-12 scroll" color="grey lighten-5" height="400px">
                    <div align="left">
                      <v-alert outlined color="primary" icon="contact_support">
                        <div class="title">
                          <p>Observaciones</p>
                        </div>
                        <div>
                          <p>
                            El diligenciamiento de las observaciones es opcional para la creación del estudiante,
                            no obstante podra crear observaciones y visualizarlas a la hora de editar un estudiante.
                          </p>
                          <p>
                            Debe tener en cuenta que las observaciones tienen un máximo de cuatro mil (4000) caracteres.
                          </p>
                        </div>
                      </v-alert>
                    </div>
                    <v-form ref="observationForm" lazy-validation>
                      <v-textarea label="Observación"
                      @change="v => observation= v"
                      color="primary"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      haped counter clearable clear-icon="cancel"></v-textarea>
                    </v-form>

                    <v-btn color="primary" @click="observationsDialog = true"
                    v-if="isReadOnly">
                      Ver observaciones
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card>

                  <div align="left">
                    <v-btn color="primary" @click="nextStep()">
                      Finalizar
                    </v-btn>
                    <v-btn text @click="stepBack()">
                      Atras
                    </v-btn>
                  </div>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>

  <v-dialog v-model="observationsDialog" width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Observaciones realizadas al estudiante</span>
      </v-card-title>
      <v-card-text>

        <div class="text-center d-flex pb-4">
          <v-btn color="primary" text @click="all()">expandir todos</v-btn>
          <v-btn color="primary" text @click="none()">cerrar todos</v-btn>
        </div>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(obs,i) in observations" :key="i">
            <v-expansion-panel-header>
              <v-row no-gutters>
                <v-col cols="4">
                  <v-chip class="ma-2" color="primary" outlined pill>
                    <v-icon left>mdi-account-circle-outline</v-icon>
                    {{obs.userName}}
                  </v-chip>
                </v-col>
                <v-col cols="6" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <v-row>
                      <v-col cols="6">{{obs.observationDate}}</v-col>
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
              <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p align="justify">{{obs.observation}}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-alert v-if="!observations || observations.length < 1" text outlined color="deep-orange" icon="mdi-fire">
          <p>Este estudiante no posee observaciones aun.</p>
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="observationsDialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card class="mx-auto dataTable">
    <v-card-title>
      Estudiantes
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
            <v-chip rounded color='warning' v-on="on" @click="editItem(item)">
              <v-icon small color='white'>
                edit
              </v-icon>
            </v-chip>
          </template>
          <span>Editar</span>
        </v-tooltip>
      </template>
      <template v-slot:item.photoUrl="{ item }">
        <v-avatar v-if="item.photoUrl" size="36px">
          <img :src="item.photoUrl" srcset lazy-src contain @error="photoError(item)"></img>
        </v-avatar>
        <v-avatar v-else color="indigo" size="36px">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
      </template>

      <template v-slot:item.observationsCount="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip rounded color='primary' v-on="on" @click="viewObservations(item)">
              {{item.observationsCount}}
            </v-chip>
          </template>
          <span>Ver observaciones</span>
        </v-tooltip>
      </template>

      <template v-slot:item.enabled="{ item }">
        <div v-if="item.enabled">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip class="ma-2" color="green" text-color="white" v-on="on">
                <v-icon colo>done</v-icon>
              </v-chip>
            </template>
            <span>Activo</span>
          </v-tooltip>
        </div>
        <div v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip class="ma-2" color="red" text-color="white" v-on="on">
                <v-icon>highlight_off</v-icon>
              </v-chip>
            </template>
            <span>Inactivo</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import menuOptions from '@/components/Menu'
import imageInput from '@/components/ImageInput.vue'
import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

const EDIT = 'Editar'
const CREATE = 'Registrar'

export default {
  components: {
    menuOptions,
    imageInput
  },
  data() {
    return {
      dialog: false,
      dateModal: false,
      confirmDialog: false,
      observationsDialog: false,
      e1: 1,
      offsetTop: 0,
      rules: {
        required: value => !!value || 'Este campo es requerido.',
        min: v => v.length >= 3 || 'Minimo 3 caracteres'
      },
      photoBackup: null,
      student: {
        fullName: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        birthDate: null,
        photo: null,
        photoObject: null,
        enabled: true,
      },
      parent: {
        personId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        address: null,
        email: null,
      },
      observation: null,
      observations: null,
      resultOperation: {
        messageType: 'info',
        message: null,
        visible: false
      },
      search: '',
      headers: [

        {
          text: 'Foto',
          value: 'photoUrl'
        },
        {
          text: 'Nombre',
          value: 'fullName'
        },
        {
          text: 'Activo',
          value: 'enabled'
        },
        {
          text: 'Observaciones',
          value: 'observationsCount'
        },
        {
          text: 'Acciones',
          value: 'action',
          sortable: false
        }
      ],
      panel: [],
      items: [],
      action: CREATE
    }
  },
  computed: {
    ...mapState('auth', ['token']),
    isReadOnly() {
      return this.action === EDIT
    },
    switchLabel() {
      console.log(this.student.enabled);
      return `Estudiante ${this.student.enabled ? 'Activo' : 'Inactivo'}`
    },
  },
  methods: {
    ...mapActions('studentm', ['saveStudentAction', 'getStudents', 'getStudent', 'editStudentAction', 'deleteStudentAction']),
    logAvatar() {
      console.log(this.student.photoObject);
      console.log(this.student.photoObject.base64);
    },
    async saveStudent() {
      let studentObject = {
        student: this.student,
        parents: [this.parent],
        observations: [{
          observation: this.observation,
          studentId: this.student.personId,
        }],
        enabled: this.student.enabled
      }
      this.photoBackup = this.student.photoObject.imageURL
      console.log(studentObject.observations);
      if (this.student.photoObject.base64) {
        studentObject.student.photo = this.student.photoObject.base64
      }
      if (this.action === EDIT) {
        this.resultOperation = await this.editStudentAction(studentObject)
      } else if (this.action === CREATE) {
        studentObject.enabled = true
        this.resultOperation = await this.saveStudentAction(studentObject)
      }
      if (this.resultOperation.messageType === "success") {
        this.cleanStudent()
        this.searchStudents()
        this.dialog = false
        this.resultOperation.visible = true
      }
    },
    cleanStudent() {
      this.student = {
        personId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        birthDate: null,
        photo: null,
        photoObject: null,
        enabled: false,
      }
      this.parent = {
        personId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        address: null,
        email: null,
      }
      this.e1 = 1
      this.observation = null
      this.action = CREATE
      this.resultOperation.visible = false
      if (this.$refs.studentForm)
        this.$refs.studentForm.reset()
      if (this.$refs.parentForm)
        this.$refs.parentForm.reset()
      if (this.$refs.observationForm)
        this.$refs.observationForm.reset()
    },
    async editItem(studentToEdit) {
      this.resultOperation.visible = false
      let result = await this.getStudent(studentToEdit.personId)
      this.student = result.student
      this.student.photo = result.student.photo
      this.student['photoObject'] = {
        imageURL: result.student.photo,
        fieldName: 'Imagen del estudiante'
      }
      this.student['enabled'] = result.enabled
      this.parent = result.parents[0]
      this.observations = result.observations
      this.action = EDIT
      this.dialog = true
      this.observation = null
    },
    async viewObservations(studentToView) {
      let result = await this.getStudent(studentToView.personId)
      this.observations = result.observations
      this.observationsDialog = true
      this.none()
    },
    openConfirmDialog(studentToDelete) {
      this.student = studentToDelete
      this.confirmDialog = true
    },
    async deleteStudent() {
      this.resultOperation = await this.deleteStudentAction(this.student)
      this.cleanStudent()
      this.searchStudents()
      this.confirmDialog = false
    },
    async searchStudents() {
      this.items = await this.getStudents()
    },
    nextStep() {
      this.resultOperation = {
        messageType: 'info',
        message: null,
        visible: false
      }
      switch (Number.parseInt(this.e1)) {
        case 1:
          if (!this.student.photoObject || !this.student.firstName || !this.student.personId || !this.student.birthDate || !this.student.firstSurname) {
            this.resultOperation = {
              messageType: 'error',
              message: 'Verifique los campos obligatorios del estudiante antes de ir al siguiente paso.',
              visible: true
            }
            this.$refs.studentForm.validate()
          } else {
            this.e1 = 2
          }
          break
        case 2:
          if (!this.parent.address || !this.parent.personId || !this.parent.firstName || !this.parent.firstSurname || !this.parent.email) {
            this.resultOperation = {
              messageType: 'error',
              message: 'Verifique los campos obligatorios del pariente antes de ir al siguiente paso.',
              visible: true
            }
            this.$refs.parentForm.validate()
          } else {
            this.e1 = 3
          }
          break
        case 3:
          this.saveStudent()
          break
      }
    },
    stepBack() {
      this.e1 -= 1
      this.resultOperation.visible = false
    },
    async photoError(item) {
      console.log('error on photo');
      item.photoUrl = (this.photoBackup) ? this.photoBackup : 'http://localhost:8085/photos/404.jpg'
    },
    all() {
      this.panel = [...Array(this.observations.length).keys()].map((k, i) => i)
    },
    none() {
      this.panel = []
    },
    photoObjectChange(newPhoto){
      this.student.photoObject = newPhoto
      this.$forceUpdate();
    }
  },
  async mounted() {
    this.searchStudents()
    this.cleanStudent()
  },
  onScroll(e) {
    this.offsetTop = e.target.scrollTop
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

.scroll {
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0.2em;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1565C0;
  border-radius: 10px;
}
</style>
