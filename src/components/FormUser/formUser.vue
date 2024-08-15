<template>
      <v-card
        class="pa-5 rounded-lg"
        max-width="550"
        min-width="550"
        prepend-icon="mdi-account"
        :text="FormText"
        :title="title"
      >
      <v-form validate-on="submit" @submit.prevent="submit" ref="form" :model-value="formValid">
        <v-text-field
          density="compact"
          v-model="form.Name"
          :rules="[Rules.Required]"
          label="Name"
        >
        </v-text-field>

        <v-text-field
          density="compact"
          v-model="form.Email"
          :rules="[Rules.Email]"
          label="Email"
        >
        </v-text-field>

        <v-text-field
          density="compact"
          v-model="form.Password"
          label="Password"
          :type="showPass ? 'text' : 'password'"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[Rules.PassRule]"
           @click:append="showPass = !showPass"
        >
        </v-text-field>
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
              :loading="loading"
              class="mt-2 bg-green"
              text="Submit"
              type="submit"

              block>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

    </v-card>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'formUser',
  components:{},
  setup(){
    let Rules={
      Required:value => (value!="")?true:`Required field!`,
      PassRule:value =>(value.length >= 8)?true:`The Password must be at least 8 characters.`,
      Email:email => (/.+@.+\..+/.test(email))?true:`you must fill a valid Email`,
    }
    return {Rules}
  },
  props:{

    context:{type:Object,default:null}
  },
  computed:{
    FormText(){
      return (this.typeForm=='create')?'Please fill the fields to create a new User.':'Please edit the fields that you want to update'
    },
    title(){
      return (this.typeForm=='create')?'Add User Form':'Edit User Form'
    }
  },
  data(){
    return{
      formValid:null,
      typeForm:'create',
      loading:false,
      showPass:false,
      form:{Name:'',Email:'',Password:''}
    }
  },
  methods:{
    resetForm(){
      this.form={Name:'',Email:'',Password:''}
    },
    setcontext(data){
     this.form.Name=data.name;
     this.form.Email=data.email;
     this.form.Password=data.password
    },
    cancelFx(){
      this.resetForm();
      this.$emit('cancelFx')
    },
    async submit(){
      let valid=await this.$refs.form.validate()
      console.log(valid)
      if(valid.valid){
        console.log("submit")
        if(this.typeForm=='create'){
          this.$emit('saveFx',{...this.form})
        }else{
          this.$emit('updateFx',{...this.form})
        }
      }
    }
  },
  mounted(){
    console.log("mounted")
    if(this.context!=null){
      this.setcontext(this.context)
      this.typeForm='edit';
    }else{
      this.resetForm();
      this.typeForm='create'
    }
  }
})
</script>
<style scoped>
</style>
