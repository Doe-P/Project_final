<template>
  <div id="Foundation">
    <v-container fluid>
      <v-card class="ma-10">
        <v-data-table
          :headers="headers"
          :items="foundation_Data"
          :search="searchData"
          loading="true"
          loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
          class="header-col"
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>
                <span class="table-header">ຂໍ້ມູນຮາກຖານ</span>
              </v-toolbar-title>
              <v-divider class="px-3 mr-5" inset vertical></v-divider>
              <v-text-field
                name="txt_search"
                label="ຄົ້ນຫາຮາກຖານ"
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
                    @click="form_add_dialog"
                    small
                    fab
                    color="primary"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <span class="text-tooltip">ເພີ່ມຮາກຖານ</span>
              </v-tooltip>
            </v-toolbar>
          </template>
          <!-- table content -->
          <template v-slot:item="{ item }">
            <tr class="table-content">
              <td>{{ item.fund_id }}</td>
              <td>{{ item.fund_name }}</td>
              <td>{{ date_format }}</td>
              <td>{{ item.status_fund }}</td>
              <td>
                <v-icon small @click="edit_found_item(item.fund_id,item.fund_name,date_format,item.status_fund )"
                  >edit</v-icon
                >
                <span class="ma-1"></span>
                <v-icon small @click="delete_found_item">delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <!-- Form add foundation -->
      <formAdd />
      <!-- Form edit foundation -->
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
                  <v-btn text color="primary" @click="message_confirm = true"
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
import formAdd from "@/components/foundation-form/formAdd.vue";
import formEdit from "@/components/foundation-form/formEdit.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "Foundation",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      date_format: null,
      custom_id: "F0001",
      confirm_dialog: false,
      message_confirm: false,
      searchData: null,
      foundation_Data: [],
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "found_id" },
        { text: "ຊື່ຮາກຖານ", value: "found_name", sortable: true },
        {
          text: "ວັນເດືອນປີຂະຫຍາຍຮາກຖານ",
          value: "found_date",
          sortable: false,
        },
        { text: "ສະຖານະຮາກຖານ", value: "found_status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.getData_foundations();
  },
  methods: {
    //Click edit data
    edit_found_item(id,name,date,status) {
      this.$store.dispatch({
        type: "clickShow_found_formEdit",
        id:id,
        name:name,
        date:date,
        status:status,
      });
    },
    //confirm dialog delete
    delete_found_item() {
      this.confirm_dialog = true;
    },
    // show form add
    form_add_dialog() {
      this.$store.dispatch({
        type: "clickShow_found_formAdd",
      });
    },
    async getData_foundations() {
      try {
        let response = await axios.get(
          "http://localhost:5000/api/v1/foundations"
        );
        this.foundation_Data = response.data;
        this.date_format = moment(this.foundation_Data.date_fund).format(
          "DD-MM-YYYY"
        );
      } catch (err) {
        console.log(err);
      }
    },
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
.table-content,
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
.header-col {
  font-family: "boonhome-400";
  font-weight: 15px;
  font-size: 30px;
}
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
