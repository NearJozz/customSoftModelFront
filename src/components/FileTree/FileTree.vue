<template>
  <div class="my-2 ">
  <v-row >
    <v-col cols="auto">
      <v-icon :icon="(item.type=='folder')?'mdi-folder':'mdi-file'" size="sm"></v-icon>
    </v-col>
    <v-col cols="auto">
      <span  v-if="!editing" style="width: 200px;">{{path}}{{ item.name }}</span>
      <v-text-field
          v-else
          style="width: 200px;"
          density="compact"
          v-model="editName"
          label="Name"
          prepend-inner-icon="mdi-close"
          append-inner-icon="mdi-content-save"
           @click:append-inner="onFinishEdit"
           @click:prepend-inner="onFinishEdit"
      ></v-text-field>
    </v-col>
    <v-col cols="auto" v-if="item.type=='folder'">
      <v-btn density="compact" icon="mdi-plus" @click="addItem"></v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn density="compact" icon="mdi-pencil" @click="setEditing"></v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn density="compact" icon="mdi-delete" @click="delItem"></v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn density="compact" :icon="(showItems)?'mdi-arrow-up':'mdi-arrow-down'"  v-if="item.type=='folder'" @click="showItems=!showItems"></v-btn>
    </v-col>
  </v-row >
    <div v-if="item.children!=undefined && showItems" class="my-2 ml-5 itembase mb-5">
      <div class="bg-grey">

      </div>
      <FileTree v-for="(el,i) in item.children" :item="el" :index="i" :path="path+item.name+'/'" :parent="item.name" :fxAdd="fxAdd" :fxEdit="fxEdit" :fxDel="fxDel" @recall="childRecall"></FileTree>
    </div>
</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IndexPage',
  components:{},
  props:{
    item:{type:Object,required:true},
    index:{type:Number,required:true},
    path:{type:String,default:'/'},
    parent:{type:String,required:true},
    fxAdd:{type:Function,required:true},
    fxEdit:{type:Function,required:true},
    fxDel:{type:Function,required:true},
  },
  data(){
    return{
      editName:'',
      editing:false,
      showItems:false
    }
  },
  methods:{
    addItem(){

      this.fxAdd(this.item,this.path)
    },
    editItem(){
      this.fxEdit(this.item,this.path,this.editName)
    },
    delItem(){
      this.fxDel(this.item)
      this.$emit('recall')
    },
    cancelEdit(){
      this.editing=false
    },
    setEditing(){
      if(!this.editing){
        this.editing=true;
        this.editName=this.item.name
      }else{
        this.editing=false;
      }
    },
    onFinishEdit(value,ev){
      this.editing=false;
      console.log(this.editName)
      this.editItem()
    },
    childRecall(){
      this.showItems=false;
    }
  }
})
</script>
<style scoped>
.itembase{
  border-bottom: 0.1em solid white;
  border-top: 0.1em solid white;
}
</style>
