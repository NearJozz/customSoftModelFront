<template>
        <v-card
        class="pa-5 rounded-lg"
        max-width="550"
        min-width="550"
        :prepend-icon="(type=='folder')?'mdi-folder':'mdi-file'"
        title="Create new File/Folder"
      >
      <v-text-field
          density="compact"
          v-model="name"
          :rules="[Rules.Required]"
          label="Name"
        >
        </v-text-field>
        <v-radio-group v-model="type">
          <v-radio label="File" value="file"></v-radio>
          <v-radio label="Folder" value="folder"></v-radio>
        </v-radio-group>
        <v-row>
          <v-col cols="3">
            <v-btn
              class="mt-2 bg-red"
              text="cancel"
              @click="cancelFx"
              block>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-btn
              class="mt-2 bg-green"
              text="save"
              @click="saveFx"
              block>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'formFile',
  components:{},
  setup(){
    let Rules={
      Required:value => (value!="")?true:`Required field!`,
      PassRule:value =>(value.length >= 8)?true:`The Password must be at least 8 characters.`,
      Email:email => (/.+@.+\..+/.test(email))?true:`you must fill a valid Email`,
    }
    return {Rules}

  },
  data(){
    return{
      name:"",
      type:"folder"
    }
  },
  methods:{
    cancelFx(){
      this.$emit('cancelFx')
    },
    saveFx(){
      this.$emit('saveFx',{name:this.name,type:this.type})
    }
  }
})
</script>
<style scoped>
</style>
