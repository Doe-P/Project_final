<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="70%">
          <v-data-table
            :headers="headers"
            :items="userData"
            class="elevation-5 table-content"
            item-key="user_id"
            :loading="loading"
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
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.fund_name }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="edit_user_item(item.username)"
                        small
                        color="update"
                        v-on="on"
                        v-bind="attrs"
                        >restore</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ປ່ຽນລະຫັດຜ່ານ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="delete_user_item(item.id)"
                        small
                        color="delete"
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
                  <v-btn text color="primary" @click="confirmDelete"
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
  name: "RegisterView",
  data() {
    return {
      headers: [
        { text: "ລຳດັບ", value: "index", sortable: false },
        { text: "ຊື່ຜູ້ໃຊ້", value: "username", sortable: false },
        {
          text: "ຮັບຜີດຊອບຮາກຖານ",
          value: "fund_name",
          sortable: false,
        },
        { text: "ສະຖານະຜູ້ໃຊ້", value: "status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      userData: [],
      search_user: null,
      confirm_dialog: false,
      loading: true,
      getID: null,
    };
  },

  mounted() {
    this.dataUser();
  },

  methods: {
    edit_user_item(user) {
      this.$router.push({ name: "register-edit", params: { username: user } });
    },
    delete_user_item(id) {
      this.confirm_dialog = true;
      this.getID = id;
    },
    // get data
    async dataUser() {
      await axios
        .get(this.$store.getters.myHostname + "/api/v1/getUser")
        .then((response) => {
          this.userData = response.data;
          this.loading = false;
        });
    },
    async confirmDelete() {
      if (this.getID && this.confirm_dialog == true) {
        try {
          await axios
            .delete(
              `${this.$store.getters.myHostname}/api/v1/user/${this.getID}`
            )
            .then(() => {
              this.Msg_done("ລົບຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ");
              this.confirm_dialog = false;
              location.reload();
            });
        } catch (err) {
          this.Msg_fail("ລົບຂໍ້ມູນຜູ້ໃຊ້ບໍ່ສຳເລັດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ບໍ່ພົບຂໍ້ມູນໃນລະຫັດນີ້:" + this.getID);
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
