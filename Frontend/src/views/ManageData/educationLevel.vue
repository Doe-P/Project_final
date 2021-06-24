<template>
  <div id="Educationlevel">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="700">
          <v-data-table
            :headers="headers"
            :items="myData_edu_level"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="header-col"
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
                <td>{{ item.edulevel_id }}</td>
                <td>{{ item.edulevel_name }}</td>
                <td>
                  <v-icon small @click="edit_edulevel_item">edit</v-icon>
                  <span class="ma-1"></span>
                  <v-icon small @click="delete_edulevel_item">delete</v-icon>
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
                <v-form v-model="valid_add">
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
                <v-formb v-model="valid_edit">
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
                </v-formb>
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
export default {
  name: "Educationlevel",
  data() {
    return {
      confirm_dialog: false,
      form_add_dialog: false,
      form_edit_dialog: false,
      searchData: null,
      myData_edu_level: [{ edulevel_id: 1 }],
      headers: [
        { text: "ລະຫັດລະດັບການສຶກສາ", align: "Left", value: "edulevel_id" },
        { text: "ລະດັບການສຶກສາ", value: "edulevel", sortable: false },
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
    };
  },
  mounted() {
        this.$store.dispatch({
      type: "doCustomID",
      id: "",
      str: "EL0001",
    });
  },
  methods: {
    //edit data education level
    edit_edulevel_item() {
      this.form_edit_dialog = true;
    },
    //delete data education level
    delete_edulevel_item() {
      this.confirm_dialog = true;
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
</style>
