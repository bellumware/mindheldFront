<template>
<div>
  <!-- slot for parent component to activate the file changer -->
  <div @click="launchFilePicker()">
    <slot name="activator"></slot>
  </div>
  <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
  <input type="file" ref="file" :name="uploadFieldName" @change="onFileChange($event.target.name, $event.target.files)" style="display:none">
  <!-- error dialog displays any potential error messages -->
  <v-dialog v-model="errorDialog" max-width="300">
    <v-card>
      <v-card-text class="subheading">{{errorText}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'image-input',
  data: () => ({
    errorDialog: null,
    errorText: '',
    uploadFieldName: 'file',
    maxSize: 1024,
  }),
  props: {
    // Use "value" to enable using v-model
    photoObject: Object,
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        console.log(this.base64Image);
        this.base64Image = reader.result;
        console.log(this.base64Image);
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    async onFileChange(fieldName, file) {
      const {
        maxSize
      } = this
      let imageFile = file[0]
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.errorDialog = true
          this.errorText = 'Please choose an image file'
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true
          this.errorText = 'Your file is too big! Please select an image under 1MB'
        } else {
          // Append file into FormData and turn file into image URL
          let formData = new FormData()
          let imageURL = URL.createObjectURL(imageFile)
          formData.append(fieldName, imageFile)

          const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
          let base64Image = await toBase64(imageFile)
          this.$emit('photoObjectChange', {
            base64: base64Image,
            fieldName: imageFile.name,
            formData,
            imageURL
          })
        }
      }
    }
  }
}
</script>
