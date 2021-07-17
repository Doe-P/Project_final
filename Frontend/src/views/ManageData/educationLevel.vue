<template>
  <div id="Educationlevel">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="700" class="my-card-tatble">
          <v-data-table
            :headers="headers"
            :items="myData_edu_level"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="elevation-3 header-col"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນລະດັບການສຶກສາ</span>
                </v-toolbar-title>
                <v-divider class="px-3 mr-5" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາລະດັບການສຶກສາ"
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
                      @click="form_add_dialog = true"
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
                <td>{{ item.level_id }}</td>
                <td>{{ item.level_name }}</td>
                <td>
                  <v-icon
                    color="update"
                    small
                    @click="edit_edulevel_item(item.level_id, item.level_name)"
                    >update</v-icon
                  >
                  <span class="ma-1"></span>
                  <v-icon
                    color="delete"
                    small
                    @click="delete_edulevel_item(item.level_id)"
                    >delete</v-icon
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- form add education level -->
        <template>
          <v-dialog
            v-model="form_add_dialog"
            persistent
            max-width="500px"
            transition="dialog-transition"
          >
            <v-card>
              <v-toolbar color="primary" height="45" dark>
                <v-toolbar-title class="header-message">
                  ເພີ່ມຂໍ້ມູນລະດັບການສຶກສາ
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text-content">
                <v-form
                  v-model="valid_add"
                  @submit.prevent="SaveData_educationlevel"
                >
                  <v-text-field
                    label="ລະຫັດລະດັບການສຶກສາ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="ວຸດທິການສຶກສາ"
                    v-model="txt_edulevel_name"
                    required
                    counter="30"
                    :rules="[
                      required('ວຸດທິການສຶກສາ'),
                      minLength('ວຸດທິການສຶກສາ', 5),
                      maxLength('ວຸດທິການສຶກສາ', 30),
                    ]"
                  ></v-text-field>
                  <v-btn @click="form_add_dialog = false" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <span></span>
                  <v-btn
                    type="submit"
                    color="primary"
                    class="mx-10"
                    :disabled="!valid_add"
                    >ບັນທຶກ</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
        <!-- form edit education level -->
        <template>
          <v-dialog
            v-model="form_edit_dialog"
            persistent
            max-width="500px"
            transition="dialog-transition"
          >
            <v-card>
              <v-toolbar color="primary" height="45" dark>
                <v-toolbar-title class="header-message">
                  ແກ້ໄຂຂໍ້ມູນລະດັບການສຶກສາ
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text-content">
                <v-form
                  v-model="valid_edit"
                  @submit.prevent="Update_data_education"
                >
                  <v-text-field
                    label="ວຸດທິການສຶກສາ"
                    v-model="txt_edulevel_name_edit"
                    required
                    counter="30"
                    :rules="[
                      required('ວຸດທິການສຶກສາ'),
                      minLength('ວຸດທິການສຶກສາ', 5),
                      maxLength('ວຸດທິການສຶກສາ', 30),
                    ]"
                  ></v-text-field>
                  <v-btn @click="form_edit_dialog = false" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <span></span>
                  <v-btn
                    type="submit"
                    color="primary"
                    class="mx-10"
                    :disabled="!valid_edit"
                    >ບັນທຶກ</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
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
                  <v-btn text color="primary" @click="Delete_Data_education"
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
import axios from "axios";
export default {
  name: "Educationlevel",
  data() {
    return {
      confirm_dialog: false,
      form_add_dialog: false,
      form_edit_dialog: false,
      searchData: null,
      myData_edu_level: [],
      headers: [
        { text: "ລະຫັດລະດັບການສຶກສາ", align: "Left", value: "level_id" },
        { text: "ລະດັບການສຶກສາ", value: "level_name", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      minLength(propertyType, minlength) {
        return (v) =>
          (v && v.length >= minlength) ||
          `${propertyType}ຕ້ອງຫຼາຍກວ່າຫຼືເທົ່າກັບ ${minlength}`;
      },
      maxLength(propertyType, maxlength) {
        return (v) =>
          (v && v.length <= maxlength) ||
          `${propertyType}ຕ້ອງໜ້ອຍກວ່າຫຼືເທົ່າກັບ ${maxlength}`;
      },
      // valid form
      valid_add: false,
      valid_edit: false,
      //----addd-----
      txt_edulevel_name: null,
      //----edit-----
      txt_edulevel_name_edit: null,
      get_id: null,
      delete_id: null,
    };
  },
  mounted() {
    this.getMaxID();
    this.getData_edulevel();
  },
  watch: {
    reload_data() {
      this.getData_edulevel();
    },
  },
  computed: {
    reload_data() {
      return this.getData_edulevel();
    },
  },
  methods: {
    //edit data education level
    async edit_edulevel_item(id, name) {
      this.form_edit_dialog = true;
      this.txt_edulevel_name_edit = name;
      this.get_id = id;
    },
    //delete data education level
    async delete_edulevel_item(id) {
      this.confirm_dialog = true;
      this.delete_id = id;
    },
    // get all data education level
    async getData_edulevel() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/education-levels"
        );
        this.myData_edu_level = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // save data
    async SaveData_educationlevel() {
      try {
        await axios
          .post(this.$store.getters.myHostname + "/api/v1/education-levels", {
            level_id: this.$store.getters.getCustomID,
            level_name: this.txt_edulevel_name,
          })
          .then(() => {
            this.form_add_dialog = false;
            this.Msg_done("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
            location.reload();
          });
      } catch (err) {
        this.form_add_dialog = false;
        this.Msg_fail("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
        console.log(err);
      }
    },
    // Update data education
    async Update_data_education() {
      try {
        await axios
          .put(
            `${this.$store.getters.myHostname}/api/v1/education-levels/${this.get_id}`,
            {
              level_name: this.txt_edulevel_name_edit,
            }
          )
          .then(() => {
            this.form_edit_dialog = false;
            this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
            location.reload();
          });
      } catch (err) {
        this.form_edit_dialog = false;
        this.Msg_fail("ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ");
        console.log(err);
      }
    },
    // delete data
    async Delete_Data_education() {
      try {
        await axios
          .delete(
            `${this.$store.getters.myHostname}/api/v1/education-levels/${this.delete_id}`
          )
          .then(() => {
            this.confirm_dialog = false;
            this.Msg_done("ລົບຂໍ້ມູນສຳເລັດແລ້ວ");
            location.reload();
          });
      } catch (err) {
        this.confirm_dialog = false;
        this.Msg_fail("ບໍ່ສາມາດລົບລະຫັດ" + this.delete_id + "ນີ້ໄດ້");
        console.log(err);
      }
    },
    // get max id
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/Degree-MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "D0001",
            });
          });
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
.text-search,
.text-content {
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
.my-card-tatble {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
