<template>
  <div id="Section">
    <v-container fluid>
      <v-card class="ma-10">
        <v-data-table
          :headers="headers"
          :items="myData_section"
          loading="true"
          loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
          :search="searchData"
          class="header-col"
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>
                <span class="text-header">ຂໍ້ມູນຈຸ</span>
              </v-toolbar-title>
              <v-divider class="px-3 mr-5" inset vertical></v-divider>
              <v-text-field
                name="txt_search"
                label="ຄົ້ນຫາຈຸ"
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
                <span class="text-tooltip">ເພີ່ມຂໍ້ມູນຈຸ</span>
              </v-tooltip>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr class="table-content">
              <td>{{ item.sect_id }}</td>
              <td>{{ item.sect_name }}</td>
              <td>{{ item.unit_name }}</td>
              <td>{{ item.date_sect | formatDate }}</td>
              <td>{{ item.status_sect }}</td>
              <td>
                <v-icon
                  color="update"
                  small
                  @click="edit_section_item(item.sect_id, item.fund_name)"
                  >update</v-icon
                >
                <span class="ma-1"></span>
                <v-icon color="delete" small @click="getSectionID(item.sect_id)"
                  >delete</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <!-- Form add section -->
      <formAdd />
      <!-- Form edit section -->
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
                  <v-btn text color="primary" @click="delete_section_item"
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
import formAdd from "@/components/section-form/formAdd.vue";
import formEdit from "@/components/section-form/formEdit.vue";
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
      searchData: null,
      myUnitnames: [],
      myData_section: [],
      getSect_id: null,
      headers: [
        { text: "ລະຫັດຈຸ", align: "Left", value: "sect_id" },
        { text: "ຊື່ຈຸ", value: "sect_name", sortable: true },
        { text: "ຊື່ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ວັນເດືອນປີຂະຫຍາຍຈຸ", value: "date_sect", sortable: false },
        { text: "ສະຖານະຈຸ", value: "status_sect", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
    };
  },
  mounted() {
    this.getData_Sections();
  },
  watch: {
    reload_data() {
      this.getData_Sections();
    },
  },
  computed: {
    reload_data() {
      return this.getData_Sections();
    },
  },
  methods: {
    //edit data section
    edit_section_item(value, fund_name) {
      this.$store.dispatch({
        type: "clickShow_sect_formEdit",
        id: value,
        name: fund_name,
      });
    },
    async delete_section_item() {
      try {
        await axios
          .delete(
            `${this.$store.getters.myHostname}/api/v1/sections/${this.getSect_id}`
          )
          .then(() => {
            this.confirm_dialog = false;
            this.Msg_done("ລົບຂໍ້ມູນສຳເລັດແລ້ວ");
            location.reload();
          });
      } catch (err) {
        console.log(err);
        this.confirm_dialog = false;
        this.Msg_fail("ລົບຂໍ້ມູນບໍ່ສຳເລັດ");
      }
    },
    getSectionID(id) {
      this.confirm_dialog = true;
      this.getSect_id = id;
    },
    //open form add
    open_form_add() {
      this.$store.dispatch({
        type: "clickShow_sect_formAdd",
      });
    },
    // get all data sections
    async getData_Sections() {
      try {
        const response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/sections"
        );
        this.myData_section = response.data;
      } catch (err) {
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
