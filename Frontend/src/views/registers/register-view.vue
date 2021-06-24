<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="userData"
            hide-actions
            class="elevation-1 table-content"
            item-key="user_id"
            loading="true"
            :search="search_user"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນຜູ້ໃຊ້ລະບົບ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນຜູ້ໃຊ້"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="search_user"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="$router.push('/register-create')"
                      fab
                      small
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.user_id }}</td>
                <td>{{ item.user_name }}</td>
                <td>{{ item.user_password }}</td>
                <td>{{ item.user_foundation }}</td>
                <td>{{ item.user_status }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="edit_user_item"
                        medium
                        v-on="on"
                        v-bind="attrs"
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="delete_user_item"
                        medium
                        v-on="on"
                        v-bind="attrs"
                        >delete</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ລົບຂໍ້ມູນຜູ້ໃຊ້</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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
  name: "RegisterView",
  data() {
    return {
      headers: [
        { text: "ລະຫັດ", value: "user_id", sortable: false },
        { text: "ຊື່ຜູ້ໃຊ້", value: "user_name", sortable: false },
        { text: "ລະຫັດຜ່ານ", value: "user_password", sortable: false },
        {
          text: "ຮັບຜີດຊອບຮາກຖານ",
          value: "ustatusser_foundation",
          sortable: false,
        },
        { text: "ສະຖານະຜູ້ໃຊ້", value: "user_status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      userData: [{ user_id: 1 }, { user_id: 2 }],
      search_user: null,
      confirm_dialog:false,
    };
  },

  mounted() {},

  methods: {
    edit_user_item() {
      this.$router.push("/register-edit");
    },
    delete_user_item() {
      this.confirm_dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-content,
.header-message {
  font-family: "boonhome-400";
  font-size: 18px;
}
.text-tooltip,
.text-message,
.text-message-btn {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
  color: #0779e4;
}
</style>
