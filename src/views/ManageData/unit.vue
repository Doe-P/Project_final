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
                <template v-slot:activator="{on, attrs}">
                   <v-btn v-on="on" v-bind="attrs" @click="open_form_add" small fab color="primary">
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
              <td>{{ item.found_name }}</td>
              <td>{{ item.unit_date }}</td>
              <td>{{ item.unit_status }}</td>
              <td>
                <v-icon small @click="edit_unit_item">edit</v-icon>
                <span class="ma-1"></span>
                <v-icon small @click="delete_unit_item">delete</v-icon>
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
            <v-card-text class="text-center mt-5 text-message"> ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ຫຼືບໍ່? </v-card-text>
            <v-card-actions class="justify-space-between text-message-btn">
              <v-btn text @click="confirm_dialog = false" color="error"
                >ຍົກເລີກ</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="message_confirm=true">ຕົກລົງ</v-btn>
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
      myData_unit: [
        {
          unit_id: 11,
          unit_name: "aa",
          found_name: "aa",
          unit_date: "1/2/1200",
          unit_status: "dd",
        }
      ],
      headers: [
        { text: "ລະຫັດໜ່ວຍ", align: "Left", value: "unit_id" },
        { text: "ຊື່ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຊື່ຮາກຖານ", value: "found_name", sortable: true },
        { text: "ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ", value: "unit_date", sortable: false },
        { text: "ສະຖານະໜ່ວຍ", value: "unit_status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {},

  methods: {
    //edit data section
    edit_unit_item() {
      this.$store.dispatch({
        type: "clickShow_unit_formEdit",
      });
    },
    delete_unit_item() {
      this.confirm_dialog = true;
    },
    //open form add
    open_form_add() {
      this.$store.dispatch({
        type: "clickShow_unit_formAdd",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header,
.text-header {
  font-family: "boonhome-400";
  font-weight:bold;
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
.header-col{
  font-family: "boonhome-400";
  font-weight: 15px;
  font-size: 30px;
}
.header-message,
.text-message-btn {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.text-message{
 font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
.text-tooltip{
   font-family: "boonhome-400";
  font-size: 14px;
}
</style>
