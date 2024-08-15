<template>
        <v-card
        class="pa-5 rounded-lg"
        max-width="550"
        min-width="550"
        prepend-icon="mdi-file"
        text="Upload Files"
        title="File Manager"
      >
        <v-row>
          <v-col cols="12">
            <p class="text-center">uploadFiles</p>
            <v-file-input label="File input" variant="solo-filled" v-model="file" @update:modelValue="newFile"></v-file-input>
          </v-col>
          <v-col cols="6">
            <v-btn
              text="cancel"
              variant="text"
              @click="$emit('fxCancel')"
            >
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :disabled="ready"
              text="confirm"
              variant="text"
              @click="uploadFile"
            >
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'uploadFileCmp',
  components:{},
  data(){
    return{
      ready:true,
      file:null
    }
  },
  methods:{
    newFile(){
      console.log("nuevo archivo")
      console.log(this.file)
      this.ready=false;
    },
    uploadFile(){
      this.$emit('fxConfirm',this.file)
    }
  }
})
</script>
<style scoped>
</style>
