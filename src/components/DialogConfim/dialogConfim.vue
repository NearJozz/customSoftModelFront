<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
        <div>{{ title }}</div>
        <div class="text-medium-emphasis">
          {{ body }}
        </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text="cancel"
        variant="text"
        @click="$emit('fxCancel')"
      >
      </v-btn>
      <v-btn
        text="confirm"
        variant="text"
        @click="$emit('fxConfirm')"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IndexPage',
  components:{},
  props:{
    title:{type:String,default:''},
    body:{type:String,default:''}
  },
  data(){
    return{

    }
  },
  methods:{

  }
})
</script>
<style scoped>
</style>
