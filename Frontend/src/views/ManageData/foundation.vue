<template>
  <div id="Foundation">
    <v-container fluid>
      <v-card class="ma-10">
        <v-data-table
          :headers="headers"
          :items="foundation_Data"
          :search="searchData"
          :loading="loading"
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
          <template v-slot:item="{ item, index }">
            <tr class="table-content">
              <td>{{ index + 1 }}</td>
               <td>{{ item.fund_id }}</td>
              <td>{{ item.fund_name }}</td>
              <td>{{ item.date_fund | formatDate }}</td>
              <td>{{ item.status_fund }}</td>
              <td>
                <v-icon
                  small
                  color="update"
                  @click="
                    edit_found_item(
                      item.fund_id,
                      item.fund_name,
                      item.date_fund,
                      item.status_fund
                    )
                  "
                  >update</v-icon
                >
                <span class="ma-1"></span>
                <v-icon color="delete" small @click="getID_delete(item.fund_id)"
                  >delete</v-icon
                >
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
                  <v-btn text color="primary" @click="delete_found_item"
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


export default {
  name: "foundation",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      custom_id: "F0001",
      confirm_dialog: false,
      get_ID: "",
      searchData: "",
      foundation_Data: [],
      loading:true,
      headers: [
        { text: "ລຳດັບ", align: "Left", value: "No" },
         { text: "ລະຫັດ", align: "Left", value: "fund_id" },
        { text: "ຊື່ຮາກຖານ", value: "fund_name", sortable: true },
        {
          text: "ວັນເດືອນປີຂະຫຍາຍຮາກຖານ",
          value: "date_fund",
          sortable: false,
        },
        { text: "ສະຖານະຮາກຖານ", value: "status_fund", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  mounted() {
  },
  created() {
    this.getData_foundations();
  },
  watch: {
    reload_data() {
      this.getData_foundations();
    },
  },
  computed: {
   reload_data() {
      return this.getData_foundations();
    },
  
  },
  methods: {
    async delete_found_item() {
      try {
        if (this.get_ID) {
          await axios
            .delete(`${this.$store.getters.myHostname}/api/v1/foundations/${this.get_ID}`)
            .then(() => {
              this.confirm_dialog = false;
              this.Msg_done();
              this.getData_foundations();
            });
        }else{
           this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: "ບໍ່ພົບຂໍ້ມູນທີ່ຈະລົບ",
      });
        }
      } catch (err) {
        console.log(err);
        this.Msg_fail();
        this.confirm_dialog = false;
      }
    },
    //Click edit data
    edit_found_item(fid, name, date, status) {
      this.$router.push({});
      this.$store.dispatch({
        type: "clickShow_found_formEdit",
        id: fid,
        name: name,
        date: date,
        status: status,
      });
    },
    // message done
    Msg_done() {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "success",
        micon: "check_circle",
        message: "ລົບຂໍ້ມູນສຳເລັດ",
      });
    },
    //message fail
    Msg_fail() {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: "ລົບຂໍ້ມູນບໍ່ສຳເລັດ",
      });
    },
    //confirm dialog delete
    getID_delete(id) {
      this.confirm_dialog = true;
      this.get_ID = id;
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
          this.$store.getters.myHostname+"/api/v1/foundations"
        );
        this.foundation_Data = response.data;
        this.loading=false;
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
