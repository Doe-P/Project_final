<template>
  <div id="Educationlevel">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="700">
          <v-data-table
            :headers="headers"
            :items="myData_memberType"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="elevation-3 table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນປະເພດສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-3 mr-5" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາປະເພດສະມາຊິກ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="txt_memberType_search"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      @click="open_form_add"
                      small
                      fab
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມຂໍ້ມູນລະດັບການສຶກສາ</span>
                </v-tooltip>
              </v-toolbar>
            </template>

            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>{{ item.typemember_id }}</td>
                <td>{{ item.typemember }}</td>
                <td>{{ item.money }}</td>
                <td>
                  <v-icon color="update" small @click="edit_memberType_item(item.typemember_id)">update</v-icon>
                  <span class="ma-1"></span>
                  <v-icon color="delete" small @click="delete_memberType_item(item.typemember_id)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- form add education level -->
        <formAdd />
        <!-- form edit education level -->
        <formEdit />
      </v-row>
      <!-- Dialog confirm delete data -->
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="confirm_dialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template>
              <v-card>
                <v-toolbar color="primary" height="45" dark>
                  <v-toolbar-title class="header-message">
                    <v-icon>info</v-icon>
                    ຂໍ້ຄວາມ
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text-center mt-5 text-message">
                  ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ຫຼືບໍ່?
                </v-card-text>
                <v-card-actions class="justify-space-between text-message-btn">
                  <v-btn text @click="confirm_dialog = false" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="confirm_delete_item"
                    >ຕົກລົງ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import formAdd from "@/components/membertype-form/formAdd.vue";
import formEdit from "@/components/membertype-form/formEdit.vue";
import axios from "axios";
export default {
  name: "Educationlevel",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      confirm_dialog: false,
      form_edit_dialog: false,
      searchData: null,
      get_id:null,
      myData_memberType: [],
      headers: [
        { text: "ລະຫັດປະເພດສະມາຊິກ", align: "Left", value: "typemember_id" },
        { text: "ຊື່ປະເພດສະມາຊິກ", value: "typemember", sortable: false },
        { text: "ຈຳນວນເງີນສະຕິ (ກີບ)", value: "money", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.getAll_dataTypeMember();
  },
  watch: {
    reload_data() {
      this.getAll_dataTypeMember();
    },
  },
  computed: {
    reload_data() {
      return this.getAll_dataTypeMember() ;
    },
  
  },
  methods: {
    //edit data education level
    edit_memberType_item(id) {
      this.$store.dispatch({
        type: "clickShow_memType_formEdit",
        id:id,
      });
    },
    //delete data education level
    delete_memberType_item(id) {
      this.confirm_dialog = true;
      this.get_id=id;
    },
    // open form add
    open_form_add() {
      this.$store.dispatch({
        type: "clickShow_memType_formAdd",
      });
    },
    // get all data type member
    async getAll_dataTypeMember() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname+"/api/v1/type-members"
        );
        this.myData_memberType = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // delete data
   async confirm_delete_item(){
     try{
       await axios.delete(`${this.$store.getters.myHostname}/api/v1/type-members/${this.get_id}`).then(()=>{
          this.confirm_dialog=false;
          this.Msg_done("ລົບຂໍ້ມູນສຳເລັດແລ້ວ");
          location.reload();
       })
     }catch(err){
       this.confirm_dialog=false;
       this.Msg_fail("ລົບຂໍ້ມູນປະເພດສະມາຊິກບໍ່ສຳເລັດ")
       console.log(err);
     }
    },
      // message done
    Msg_done(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "success",
        micon: "check_circle",
        message: text,
      });
    },
    //message fail
    Msg_fail(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: text,
      });
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
.text-content {
  font-family: "boonhome-400";
}
.header-message,
.text-message-btn {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.text-message {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
