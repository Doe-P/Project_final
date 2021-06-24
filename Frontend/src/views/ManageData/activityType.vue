<template>
  <div id="activityType">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="700">
          <v-data-table
            :headers="headers"
            :items="myData_activityType"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນປະເພດກິດຈະກຳ</span>
                </v-toolbar-title>
                <v-divider class="px-3 mr-5" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາປະເພດກິດຈະກຳ"
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
                      v-bind="attrs"
                      v-on="on"
                      @click="form_add_dialog = true"
                      small
                      fab
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມປະເພດກິດຈະກຳ</span>
                </v-tooltip>
              </v-toolbar>
            </template>

            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>{{ item.actiType_id }}</td>
                <td>{{ item.actiType_name }}</td>
                <td>
                  <v-icon small @click="edit_actiType_item">edit</v-icon>
                  <span class="ma-1"></span>
                  <v-icon small @click="delete_actiType_item">delete</v-icon>
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
                <v-toolbar-title class="text-header-dialog">
                  ເພີ່ມຂໍ້ມູນປະເພດກິດຈະກຳ
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text-content mt-5">
                <v-form v-model="valid_add">
                  <v-text-field
                    label="ລະຫັດປະເພດກິດຈະກຳ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="ປະເພດກິດຈະກຳ"
                    v-model="txt_actiType_name"
                    required
                    counter="30"
                    :rules="[
                      required('ປະເພດກິດຈະກຳ'),
                      minLength('ປະເພດກິດຈະກຳ', 5),
                      maxLength('ປະເພດກິດຈະກຳ', 30),
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
                <v-toolbar-title class="text-header-dialog">
                  ແກ້ໄຂຂໍ້ມູນປະເພດກິດຈະກຳ
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text-content">
                <v-form v-model="valid_edit">
                  <v-text-field
                    label="ປະເພດກິດຈະກຳ"
                    v-model="txt_actiType_name_edit"
                    required
                    counter="30"
                    :rules="[
                      required('ປະເພດກິດຈະກຳ'),
                      minLength('ປະເພດກິດຈະກຳ', 5),
                      maxLength('ປະເພດກິດຈະກຳ', 30),
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
  name: "activityType",
  data() {
    return {
      confirm_dialog: false,
      form_add_dialog: false,
      form_edit_dialog: false,
      searchData: null,
      myData_activityType: [{ actiType_id: 1 }],
      headers: [
        { text: "ລະຫັດປະເພດກິດຈະກຳ", align: "Left", value: "actiType_id" },
        { text: "ຊື່ປະເພດກິດຈະກຳ", value: "actiType_name", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
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
      str: "AT0001",
    });
  },
  methods: {
    //edit data education level
    edit_actiType_item() {
      this.form_edit_dialog = true;
    },
    //delete data education level
    delete_actiType_item() {
      this.confirm_dialog = true;
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
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
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
