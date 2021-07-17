<template>
  <div id="Unit">
    <v-container fluid>
      <v-card class="ma-10">
        <v-data-table
          :headers="headers"
          :items="myData_unit"
          loading="true"
          loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
          :search="searchData"
          class="header-col"
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>
                <span class="text-header">ຂໍ້ມູນໜ່ວຍ</span>
              </v-toolbar-title>
              <v-divider class="px-3 mr-5" inset vertical></v-divider>
              <v-text-field
                name="txt_search"
                label="ຄົ້ນຫາໜ່ວຍ"
                id="txt_search"
                single-line
                hide-details
                append-icon="search"
                v-model="searchData"
                class="text-search"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-on="on"
                    v-bind="attrs"
                    @click="open_form_add"
                    small
                    fab
                    color="primary"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <span class="text-tooltip">ເພີ່ມຂໍ້ມູນໜ່ວຍ</span>
              </v-tooltip>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr class="table-content">
              <td>{{ item.unit_id }}</td>
              <td>{{ item.unit_name }}</td>
              <td>{{ item.fund_name }}</td>
              <td>{{ item.date_unit | formatDate }}</td>
              <td>{{ item.status_unit }}</td>
              <td>
                <v-icon color="update" small @click="edit_unit_item(item.unit_id)">update</v-icon>
                <span class="ma-1"></span>
                <v-icon color="delete" small @click="getID_delete(item.unit_id)">delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <!-- Form add unit -->
      <formAdd />
      <!-- Form edit unit -->
      <formEdit />
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
                  <v-btn text color="primary" @click="delete_unit_item"
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
import formAdd from "@/components/unit-form/formAdd.vue";
import formEdit from "@/components/unit-form/formEdit.vue";
import axios from "axios";
export default {
  name: "Section",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      confirm_dialog: false,
      form_edit_dialog: false,
      searchData: null,
      myfoundnames: [],
      myData_unit: [],
      id_delete:"",
      headers: [
        { text: "ລະຫັດໜ່ວຍ", align: "Left", value: "unit_id" },
        { text: "ຊື່ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຊື່ຮາກຖານ", value: "fund_name", sortable: true },
        { text: "ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ", value: "date_unit", sortable: false },
        { text: "ສະຖານະໜ່ວຍ", value: "status_unit", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.getData_Units();
  },
  watch: {
    reload_Data() {
      this.getData_Units();
    },
  },
  computed: {
    reload_Data() {
      return this.getData_Units();
    },
  },
  methods: {
    //edit data section
    edit_unit_item(value) {
      this.$store.dispatch({
        type: "clickShow_unit_formEdit",
        id:value,
      });
    },
    getID_delete(id) {
      this.confirm_dialog = true;
      this.id_delete= id;
    },
    //open form add
    open_form_add() {
      this.$store.dispatch({
        type: "clickShow_unit_formAdd",
      });
    },
    // get unit data from api
    async getData_Units() {
      try {
        let response = await axios.get(this.$store.getters.myHostname+"/api/v1/units");
        this.myData_unit = response.data;
      } catch (err) {
        console.log(err);
        this.Msg_fail("ມີບັນຫາຂັດຂ້ອງໃນການສະແດງຂໍ້ມູນ");
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
    // delete data
  async  delete_unit_item(){
     try{
        await axios.delete(`${this.$store.getters.myHostname}/api/v1/units/${this.id_delete}`).then(()=>{
        this.confirm_dialog=false
        this.Msg_done("ລົບຂໍ້ມູນສຳເລັດ")
        this.getData_Units();
      })
     }catch(err){
       console.log(err);
       this.confirm_dialog=false;
       this.Msg_fail("ລົບຂໍ້ມູນບໍ່ສຳເລັດ")
     }
    }
  },
};
</script>

<style lang="scss" scoped>
.table-header,
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-search {
  font-family: "boonhome-400";
  font-weight: 10px;
}
.table-content {
  font-family: "boonhome-400";
  font-weight: 15px;
}
.header-col {
  font-family: "boonhome-400";
  font-weight: 15px;
  font-size: 30px;
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
