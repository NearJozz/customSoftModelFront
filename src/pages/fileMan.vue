<template>
  <v-container class="fill-height">
  <v-responsive
    class=" fill-height mx-auto pt-10"
    max-width="800"

  >
  <v-row class="bg-red ">
        <v-app-bar :elevation="0" rounded>
          <v-app-bar-title>File Manager</v-app-bar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
  </v-row>
<v-row>
  <v-col cols='12'>
    <div class="ma-5 mt-10">
      <FileItem v-for="(item,i) in elems" :item="item" :index="i" :path="'/'" :parent="item.name" :fxAdd="addItem" :fxEdit="renameItem" :fxDel="deleteItem"></FileItem>
    </div>
  </v-col>
</v-row>
  </v-responsive>
    <v-dialog
        v-model="mirror"
        width="auto"
      >
      <FormFile @cancelFx="cancelForm" @saveFx="saveForm"></FormFile>
    </v-dialog>
  </v-container>
</template>

<script>
import FileItem from '@/components/FileTree/FileTree.vue';
import FormFile from '@/components/FormUser/formUser.vue'
import datas from '@/assets/Filestrc.json'
export default {
  components: { FileItem,FormFile },
  setup(){
    let elems=[datas]
    return {elems}

  },
  data() {
    return {
      mirror:false,
      files: [
        { id: 1, name: 'root', type: 'directory', children: [] },
      ],
      context:null,
    };
  },
  methods: {
    addItem(item,path,name,type) {
      this.mirror=true
      this.context={item:item,path:path}
      console.log('rootEv add',item,path)

    },
    renameItem(item,path,name) {
      console.log('rootEv rena',item,path,name)
      this.elems.forEach((dItem)=>{
        this.updateItem(dItem.children,item,name)
      })
    },
    deleteItem(item) {
      console.log('rootEv del',item)
      let tmp=this.elems;
      tmp.forEach((dItem)=>{
        this.deleteItemFn(dItem.children,item)
      })
      this.loadData()
    },
    saveForm(data){
      this.mirror=false
      let nItem={id:new Date().getTime(), name:data.name,type:data.type}
      if(data.type=='folder'){
        nItem.children=[]
      }
      console.log("taste",nItem)
      if(this.context.path.length>1){
        console.log("hay path interno")
        this.elems.forEach((dItem)=>{
          this.findItem(dItem,this.context,nItem)
        })
      }else{
        console.log("no hay path interno",nItem)
        this.elems[0].children.push(nItem)
      }
    },
    cancelForm(){
      this.context=null;
      this.mirror=false;
    },
    findItem(current,itemSearch,newData){
      if(current.name==itemSearch.item.name){
        console.log("Encontrado")
        if(!current.children){
          current.children=[]
        }
        console.log(newData)
        current.children.push(newData)
      }else{
        if(current.children){
          current.children.forEach((nItem)=>{
            this.findItem(nItem,itemSearch,newData)
          })
        }
      }
    },
    updateItem(current,itemSearch,newData){
      current.forEach((item)=>{
        if(item.name==itemSearch.name && item.id==itemSearch.id){
          item.name=newData
          return;
        }else{
          if(item.children){
            this.updateItem(item.children,itemSearch,newData)
          }
        }
      })
    },
    deleteItemFn(current,itemSearch){
      let del=null
      console.log(current,itemSearch)
      current.forEach((item,i)=>{
        if(item.id==itemSearch.id){
          del=i;
          console.log("encontrado")
          return
        }else{
          if(item.children){
            this.deleteItemFn(item.children,itemSearch)
          }
        }
      })
      if(del!=null){
        console.log("borrando",current[del])
        current.splice(del,1)
      }
    },
    loadData(){
      let tmp=this.elems;
      this.elems=[];
      for(let i in tmp){
        this.elems.push(tmp[i])
      }
    }
  },
  mounted(){
    console.log(this.elems)
  }
};
</script>
