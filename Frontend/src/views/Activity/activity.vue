<template>
  <div id="Activity">
    <v-container fluid>
      <v-row justify="center" class="my-7 mx-7">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_act"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ..."
            :search="searchData_act"
            class="table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນກິດຈະກຳ</span>
                </v-toolbar-title>
                <v-divider class="px-3 mr-4" inset vertical></v-divider>
                <v-text-field
                  name="txt_search"
                  label="ຄົ້ນຫາກິດຈະກຳ"
                  id="id"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="searchData_act"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      fab
                      small
                      @click="open_formAdd"
                      medium
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມຫົວຂໍ້ກິດຈະກຳ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>{{ item.acti_id }}</td>
                <td>{{ item.acti_title }}</td>
                <td>{{ item.typeAct_name }}</td>
                <td>{{ item.place}}</td>
                <td>{{ item.amount_acti }}</td>
                <td>{{ item.date_acti | formatDate}}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        small
                        @click="edit_activity_item(item.acti_id)"
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຫົວຂໍ້ກິດຈະກຳ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        small
                        @click="$router.push({name:'activity-view',params:{activity_view:item.acti_id}})"
                        >table_view</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ລາຍລະອຽດກິດຈະກຳ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- Activity form Add -->
        <formAdd />
        <!-- Activity form Edit -->
        <formEdit :myID='setID' />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import formAdd from "@/components/activity/act_formAdd.vue";
import formEdit from "@/components/activity/act_formEdit.vue";
import axios from 'axios';
export default {
  name: "Activity",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      searchData_act: null,
      loading:true,
      setID:null,
      myData_act: [
        {
          act_id: 1,
        },
      ],
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "acti_id" },
        { text: "ຫົວຂໍ້ກິດຈະກຳ", value: "acti_title", sortable: false },
        { text: "ປະເພດກິດຈະກຳ", value: "typeAct_name", sortable: true },
        { text: "ສະຖານທີ່", value: "place", sortable: true },
        { text: "ຈຳນວນເຂົ້າຮ່ວມ", value: "amount_acti", sortable: false },
        { text: "ວັນທີ", value: "date_acti", sortable: false },
        { text: "Action", value: "act_action", sortable: false },
      ],
    };
  },
  mounted() {
    this.getData_activity();
  },
  methods: {
    // open form add from component
    open_formAdd() {
      this.$store.dispatch({
        type: "clickShow_act_formAdd",
      });
    },
    // open form edit
    edit_activity_item(id) {
      this.setID=id;
      this.$store.dispatch({
        type: "clickShow_act_formEdit",
      });
    },
    // get data activity 
   async getData_activity(){
     const user_status ='admin'
     this.myData_act=[]
        if(user_status=='admin'){
          try{
          let response = await axios.get(this.$store.getters.myHostname+"/api/v1/activity");
          this.myData_act=response.data;
          this.loading=false;
        }catch(err){
          console.log(err);
        }
        }else{
           try{
          let response = await axios.get(``);
          this.myData_act=response.data;
        }catch(err){
          console.log(err);
        }
        }
    },
    
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-search,
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
