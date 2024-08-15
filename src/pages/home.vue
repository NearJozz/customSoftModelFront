<template>
    <v-container class="fill-height">
      <v-responsive
        class=" fill-height mx-auto"
        max-width="1200"
      >
    <v-row class="bg-red my-4">
        <v-app-bar :elevation="2" rounded>
          <v-app-bar-title>User Crud</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn class="bg-white" density="comfortable" icon="mdi-plus" @click="showForm=true"></v-btn>
          </v-col>
        </v-app-bar>
      </v-row>

      <v-row class="bg-red py-4">
        <v-col cols="12">
          <v-data-table-server
            class="pa-2"
            height="70svh"
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="rows"
            :items-length="rows.length"
            :loading="loading"
            item-value="name"
            fixed-header
            >
            <template v-slot:item.files="value">
              <v-btn class="mr-3 bg-green" size="small" density="default" icon="mdi-upload" @click="()=>selectUploadToRow(value.item)"></v-btn>
              <v-btn class="mr-3 bg-blue" size="small" density="default" icon="mdi-download" @click="()=>downloadFile(value.item)"></v-btn>
            </template>
            <template v-slot:item.options="value">
              <v-btn class="mr-3 bg-orange" size="small" density="default" icon="mdi-pencil" @click="()=>selectEditRow(value.item)"></v-btn>
              <v-btn class="bg-red" size="small" density="default" icon="mdi-delete" @click="()=>selectDeleteRow(value.item)"></v-btn>
            </template>
          </v-data-table-server><!-- @update:options="loadItems" -->
        </v-col>
      </v-row>
  </v-responsive>
      <v-dialog
          v-model="showForm"
          width="auto"
        >
        <formUser @cancelFx="cancelFx" @saveFx="saveFx" @updateFx="updateFx" :context="contextSelect"></formUser>
      </v-dialog>
      <v-dialog
          v-model="confirmDeleteView"
          width="auto"
        >
        <dialogConfirm title="Delete User" body="Are you sure delete this user?" @fxCancel="cancelDeleteFx" @fxConfirm="confirmDeleteFx"></dialogConfirm>
      </v-dialog>
      <v-dialog
          v-model="uploadView"
          width="auto"
        >
        <uploadFileCmp @fxCancel="cancelFileUpload" @fxConfirm="confirmFileUpload"/>
      </v-dialog>
    </v-container>

</template>
<script>
import { defineComponent } from 'vue'
import formUser from '@/components/FormUser/formUser.vue'
import dialogConfirm from '@/components/DialogConfim/dialogConfim.vue'
import uploadFileCmp from '@/components/uploadFileCmp/uploadFileCmp.vue'
import { useUsersStore } from '@/stores/UsersStore'
export default defineComponent({
  name: 'home',
  components:{formUser,dialogConfirm,uploadFileCmp},
  setup(){
    let UserSt=useUsersStore()
    return {UserSt}
  },
  data(){
    return{
      uploadView:false,
      confirmDeleteView:false,
      showForm:false,
      loading:false,
      itemsPerPage:10,
      headers:[
        {
            title: 'Name',
            align: 'start',
            sortable: true,
            key: 'name',
        },
        {
          title: 'Email',
          align: 'start',
          sortable: true,
          key: 'email',
        },
        {
          title: 'Files',
          align: 'start',
          sortable: true,
          key: 'files',
        },
        {
          title: 'Options',
          align: 'start',
          sortable: true,
          key: 'options',
        },
      ],
      contextSelect:null,
      contextDelete:null,
    }
  },
  computed:{
    rows(){
      return this.UserSt.UsersList
    }
  },
  methods:{
    cancelFx(){
      this.showForm=false;
      this.contextSelect=null
    },
    async saveFx(data){
      try{
        this.showForm=false;
        console.log(data);
        this.loading=true;
        await this.UserSt.CrearUsuario(data)
        this.contextSelect=null
        this.loading=false;
      }catch(err){
        console.log("Error al crear Usuario",err)
      }
    },
    async updateFx(data){
      try{
        this.showForm=false;
        console.log(data);
        this.loading=true;
        await this.UserSt.ActualizarUsuario(this.contextSelect.ide,data)
        this.contextSelect=null
        this.loading=false;
      }catch(err){
        console.log("Error al crear Usuario",err)
      }
    },
    async confirmDeleteFx(){
      try{
        this.confirmDeleteView=false;
        this.loading=true;
        this.UserSt.EliminarUsuario(this.contextDelete.ide);
        this.loading=false;
        this.contextDelete=null;
      }catch(err){
       console.log(err);
      }
    },
    async cancelDeleteFx(){
      this.contextDelete=null;
      this.confirmDeleteView=false;
    },
    async selectEditRow(data){
      try{
        console.log(data)
        this.loading=true;
        let doc=await this.UserSt.LeerUsuario(data.ide)
        this.contextSelect=doc;
        this.loading=false;
        this.showForm=true;
      }catch(err){
        console.log(err);
      }
    },
    async selectDeleteRow(data){
      this.confirmDeleteView=true
      this.contextDelete=data;
    },
    async selectUploadToRow(data){
      this.contextSelect=data;
      this.uploadView=true;
    },
    async cancelFileUpload(){
      this.uploadView=false;
      this.contextSelect=null;
    },
    async confirmFileUpload(file){
      try{
        this.uploadView=false;
        this.loading=true;
        console.log(file)
        console.log(this.contextSelect)
        await this.UserSt.SubirArchivoUsuario(this.contextSelect.ide,file)
        this.loading=false;
      }catch(err){
        console.log(err);
      }
    },
    async downloadFile(item){
      console.log(item)
      await this.UserSt.DescargarArchivo(item.ide)

  }

  },
  async mounted(){
    this.loading=true
    try{
      await this.UserSt.LeerUsuarios()
      this.loading=false
    }catch(err){
      console.log(err);
    }
  }
})
</script>
<style scoped>
</style>
