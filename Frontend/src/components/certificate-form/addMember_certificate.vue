<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-dialog
          v-model="$store.getters.getaddMember_certificate.isShow"
          persistent
          :overlay="false"
          max-width="100%"
          transition="dialog-transition"
          scrollable
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header">
                ເພີ່ມສະມາຊິກທີ່ຕ້ອງຍ້ອງຍໍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="myData_members"
                class="elevation-3 mt-5 table-content"
                :single-select="single_select"
                show-select
                item-key="member_id"
                :loading="loading"
                loading-text="ກຳລັງໂຫຼດ.."
                :search="search_members"
                full-width
                @input="selectData($event)"
              >
                <template v-slot:top>
                  <v-container>
                    <v-text-field
                      label="ຄົ້ນຫາຂໍ້ມູນສະມາຊິກ"
                      append-icon="search"
                      hide-details
                      single-line
                      v-model="search_members"
                    ></v-text-field>
                  </v-container>
                </template>

                <!-- <template #body="{ items, headers }">
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td v-for="n in headers" :key="n">
                        {{ n.value === "index" ? index + 1 : item[n.value] }}
                      </td>
                    </tr>
                  </tbody>
                </template> -->
              </v-data-table>
            </v-card-text>
            <v-card-actions class="justify-end btn_text">
              <v-btn text color="error" @click="close_dialog">ຍົກເລີກ</v-btn>
              <v-btn
                @click.prevent="SaveData_Certificate"
                :disabled="checked"
                color="primary"
                >ບັນທືກ</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddmemberCertificate",
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ລະດັບການສຶກສາ", value: "level_name", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
      ],
      myData_members: [
        {
          member_id: 1,
        },
        {
          member_id: 2,
        },
      ],
      search_members: null,
      selected: [],
      single_select: false,
      checked: true,
      loading: true,
      getmemberID: [],
    };
  },

  created() {
    this.getData_member();
  },

  watch: {
    User() {
      this.getData_member();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
  },
  methods: {
    selectData(value) {
      if (value != "") {
        this.filter_member_ID();
        this.checked = false;
      } else {
        this.getmemberID = [];
        this.checked = true;
      }
    },
    close_dialog() {
      this.$store.dispatch({
        type: "doClickAddmember_certificate",
        data: "",
      });
    },
    filter_member_ID() {
      this.getmemberID = [];
      this.getmemberID = this.selected.map((a) => a.member_id);
    },
    // get data member
    async getData_member() {
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      try {
        if (user_status == "Admin") {
          await axios
            .get(this.$store.getters.myHostname + "/api/v1/getMembers")
            .then((response) => {
              this.myData_members = response.data;
              this.loading = false;
            });
        } else {
          await axios
            .get(
              this.$store.getters.myHostname + `/api/v1/getMember/${fund_id}`
            )
            .then((response) => {
              this.myData_members = response.data;
              this.loading = false;
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async SaveData_Certificate() {
      let getData_certificate = this.$store.getters.getaddMember_certificate
        .mydata;
      let total = this.getmemberID.length;
      let mydata_obj = [];
      if (getData_certificate) {
        for (let i in this.getmemberID) {
          mydata_obj[i] = {
            certific_id: getData_certificate[0],
            typeCerti_id: getData_certificate[1],
            certific_NO: getData_certificate[2],
            title: getData_certificate[3],
            amount_cert: total,
            locate: getData_certificate[4],
            date_sign: getData_certificate[5],
            sign_by: getData_certificate[6],
            member_id: this.getmemberID[i],
          };
        }
        console.log(mydata_obj);
        try {
          await axios
            .post(this.$store.getters.myHostname + "/api/v1/new-certificate", {
              data: mydata_obj,
            })
            .then(() => {
              this.Msg_done("ບັນທຶກຂໍ້ມູນການຍ້ອງຍໍສຳເລັດ");
              location.reload();
            });
        } catch (err) {
          this.Msg_fail("ການບັນທຶກຂໍ້ມູນຍ້ອງຍໍຜິດພາດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຄືນໃໝ່");
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
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
}
.table-content,
.btn_text {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
