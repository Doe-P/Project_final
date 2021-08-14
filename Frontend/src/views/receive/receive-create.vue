<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title class="header">
              ຮັບເງິນສະຕິຊາວໜຸ່ມ
            </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="Data_members"
            class="elevation-3 table-content"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ...."
            show-select
            :single-select="single_select"
            v-model="selected"
            @input="Isselected($event)"
            :search="searchData"
            item-key="member_id"
            :items-per-page="itemsPerPage"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນສະມາຊິກ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="searchData"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-container fluid class="pa-0">
                <v-row>
                  <v-col cols="5">
                    <v-select
                      class="mt-5 mx-4"
                      :items="myFoundations"
                      v-model="fund_selected"
                      label="ເລືອກຮາກຖານ"
                      outlined
                      dense
                      @input="selected_foundation"
                      v-show="User.status == 'Admin'"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider></v-divider>
            </template>
            <!----- number of rows --->
            <template #body="{ items, headers }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td v-for="(n, t) in headers" :key="t">
                    {{ n.value === "index" ? index + 1 : item[n.value] }}
                  </td>
                </tr>
              </tbody>
            </template>

            <!-------------->
          </v-data-table>
          <v-card-text>
            <v-form class="text-form">
              <v-row class="mx-10">
                <v-col cols="6">
                  <v-text-field
                    label="ລະຫັດການຮັບເງິນສະຕິ"
                    :value="$store.getters.getCustomID"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-if="myswitch == false"
                    label="ເລກທີໃບຮັບເງິນ"
                    outlined
                    dense
                    :rules="[required('ເລກທີໃບຮັບເງິນ')]"
                    v-model="recive_NO"
                  ></v-text-field>
                  <v-text-field
                    v-else
                    label="ເລກທີໃບຮັບເງິນ"
                    :value="MyID"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-card
                    class="elevation-1 justify-center"
                    color="primary darken-0"
                    dark
                  >
                    <v-switch
                      label="Auto ID"
                      v-model="myswitch"
                      class="my-0 px-5"
                    ></v-switch>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="Years"
                    v-model="select_year"
                    label="ສົກຮຽນ"
                    outlined
                    dense
                    @input="Quaterly"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ຮາກຖານ"
                    :value="fund_selected"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ຈຳນວນເງິນທັງໝົດ"
                    :value="formatPrice(CalculateMoney) || currency('ກີບ')"
                    readonly
                    outlined
                    dense
                    suffix="ກີບ"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ຈຳນວນເງິນ 50%"
                    :value="formatPrice(CalculateMoney / 2)"
                    readonly
                    outlined
                    dense
                    suffix="ກີບ"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <span>ເລືອກງວດທີ່ຕ້ອງຊຳລະ</span>
                  <v-radio-group v-model="time_selected" row>
                    <v-radio
                      :disabled="quater_A"
                      label="ງວດທີ I"
                      value="ງວດທີ I"
                    ></v-radio>
                    <v-radio
                      :disabled="quater_B"
                      label="ງວດທີ II"
                      value="ງວດທີ II"
                    ></v-radio>
                    <v-radio
                      :disabled="quater_all"
                      label="ໝົດປີ"
                      value="ໝົດປີ"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="menu1"
                    v-model="receive_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="receive_date_format"
                        label="ວັນທີ"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          recevie_date = parseReceive_date(receive_date_format)
                        "
                        v-on="on"
                        readonly
                        outlined
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="calendar"
                      ref="picker"
                      v-model="receive_date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      locale="lao"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="text-form justify-end">
            <v-btn text @click="$router.push('/receive-money')" color="error">
              ຍົກເລີກ
            </v-btn>
            <v-btn
              @click.prevent="SaveRecive"
              :disabled="isChecked"
              color="primary"
              >ບັນທຶກ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import dateformat from "dateformat";
export default {
  name: "ReceiveCreate",
  data() {
    return {
      itemsPerPage:20,
      //Valid input
      required(propertyType) {
        if (this.myswitch == false) {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        }
      },
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ເງິນສະຕິ", value: "money", sortable: false },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
      ],
      Data_members: [],
      selected: [],
      Member_selected: [],
      isChecked: true,
      searchData: null,
      loading: true,
      single_select: false,
      myswitch: true,
      // date
      receive_date: new Date().toISOString().substr(0, 10),
      receive_date_menu: false,
      receive_date_format: null,
      time_selected: "ງວດທີ I",
      select_year: null,
      Year_start: null,
      Years: [],
      //
      myFoundations: [],
      myFoundations_all: [],
      fund_selected: null,
      getFound_ID: null,
      getMemberID: [],
      MyID: null,
      moneyTopay: 0.0,
      ///------
      recive_NO: null,
      month: 0,
      quater_all: false,
      quater_A: false,
      quater_B: false,
    };
  },
  created() {
    this.myDatamembers();
    this.AutoReciveID();
  },

  mounted() {
    this.setYear_select();
    this.getMaxID();
    this.getFoundations();
   // this.select_year = this.Years[0];
    this.receive_date_format = dateformat(Date.now(), "dd-mm-yyyy");
    this.Quaterly();
  },
  watch: {
    receive_date() {
      this.receive_date_format = this.formatReceive_date(this.receive_date);
    },
    User() {
      this.myDatamembers();
      this.getFound_ID = this.User.fund_id;
      this.Quaterly();
    },
  },
  computed: {
    ReceiveDateFormatted() {
      return this.formatReceive_date(this.receive_date);
    },
    User() {
      return this.$store.getters["User/getmyUser"];
    },
    // calculate money in  times
    CalculateMoney() {
      var calMoney = 0.0;
      var getmon = this.Data_members.map((n) => n.money);
      var moneyTotal = parseInt(
        getmon.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      console.log(moneyTotal);
      switch (String(this.time_selected)) {
        case "ງວດທີ I": {
          calMoney = moneyTotal * 6;
          break;
        }
        case "ງວດທີ II": {
          calMoney = moneyTotal * 6;
          break;
        }
        case "ໝົດປີ": {
          calMoney = moneyTotal * 12;
          break;
        }
      }
      return calMoney;
    },
    getMonth() {
      let month = 0;
      if (String(this.time_selected) == "ງວດທີ I") {
        month = 6;
      } else if (String(this.time_selected) == "ງວດທີ II") {
        month = 6;
      } else {
        month = 12;
      }
      return month;
    },
  },
  methods: {
    // certificate date
    formatReceive_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseReceive_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    Isselected(val) {
      if (val != "") {
        this.MemberID();
        this.isChecked = false;
      } else {
        this.getMemberID = [];
        this.isChecked = true;
      }
    },
    MemberID() {
      this.selected = this.Data_members;
      this.getMemberID = this.selected.map((item) => item.member_id);
    },
    setYear_select() {
      // let object = [];
      let str = "";
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        let n = i - 1;
        str = (n.toString() + "-" + i.toString()).toString();
        this.Years.push(str);
      }
    },
    // get max id from foundation
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/getReceiveMoney/MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "N0001",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    //get foundations

    async getFoundations() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/foundations"
        );
        this.myFoundations_all = response.data;
        this.myFoundations = this.myFoundations_all.map(
          (item) => item.fund_name
        );
      } catch (err) {
        console.log("Error:" + err);
      }
    },
    selected_foundation() {
      for (let i in this.myFoundations_all) {
        if (
          String(this.fund_selected).valueOf() ==
          String(this.myFoundations_all[i].fund_name).valueOf()
        ) {
          this.getFound_ID = this.myFoundations_all[i].fund_id;
          this.myDatamembers();
        }
      }
    },
    //get data member
    async myDatamembers() {
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      this.Data_members = [];
      if (user_status == "Admin") {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/api/v1/getMembers/ReceiveMoney/${this.getFound_ID}`
          );
          this.Data_members = response.data;
          this.loading = false;
        } catch (err) {
          console.log("Admin Error:", err);
        }
      } else if (user_status == "User") {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/api/v1/getMembers/ReceiveMoney/${fund_id}`
          );
          this.Data_members = response.data;
          this.loading = false;
          for (let i in this.myFoundations_all) {
            if (
              String(fund_id).valueOf() ==
              String(this.myFoundations_all[i].fund_id).valueOf()
            ) {
              this.fund_selected = this.myFoundations_all[i].fund_name;
            }
          }
        } catch (err) {
          console.log("User Error:", err);
        }
      }
    },
    // auto id for NO recive
    AutoReciveID() {
      if (this.myswitch == true) {
        var val = Math.floor(1000 + Math.random() * 9000);
        var d = parseInt(Date.now());
        var autoID = val + "-" + dateformat(d, "yyyymmdd");
        console.log(autoID);
        this.MyID = autoID;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async SaveRecive() {
      const id = this.$store.getters.getCustomID;
      let my_arr = [];
      if (this.myswitch == true) {
        for (let i in this.getMemberID) {
          my_arr[i] = {
            receive_id: id,
            quarterly: this.time_selected,
            year: this.select_year,
            mtotal: this.CalculateMoney,
            date: this.receive_date,
            fund_id: this.getFound_ID,
            user_name: this.User.username,
            member_id: this.getMemberID[i],
            receive_NO: this.MyID,
            qty_month: this.getMonth,
          };
        }
      } else {
        for (let i in this.getMemberID) {
          my_arr[i] = {
            receive_id: id,
            quarterly: this.time_selected,
            year: this.select_year,
            mtotal: this.CalculateMoney,
            date: this.receive_date,
            fund_id: this.getFound_ID,
            user_name: this.User.username,
            member_id: this.getMemberID[i],
            receive_NO: this.recive_NO,
            qty_month: this.getMonth,
          };
        }
      }

      try {
        await axios
          .post(this.$store.getters.myHostname + "/api/v1/newReceive-Money", {
            data: my_arr,
          })
          .then(() => {
            this.$router.push("/receive-money");
            location.reload();
            this.Msg_done("ບັນທຶກຂໍ້ມູນການຈ່າຍເງີນສະຕິສຳເລັດ");
          });
      } catch (err) {
        this.Msg_fail("ບັນທຶກຂໍ້ມູນການຈ່າຍເງີນສະຕິ ບໍ່ສຳເລັດ");
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
    // get quaterly
    async Quaterly() {
      let fund_id = "";
      if (this.User.status == "Admin") {
        fund_id = this.getFound_ID;
      } else {
        fund_id = this.User.fund_id;
      }
      try {
        await axios
          .get(
            `${this.$store.getters.myHostname}/api/v1/getQuarterly/fundID/${this.select_year}&${fund_id}`
          )
          .then((response) => {
            const myQuaterly = response.data;
            console.log(JSON.stringify(myQuaterly));
            if (myQuaterly) {
              for (let i in myQuaterly) {
                if (String(myQuaterly[i].quarterly).valueOf() == "ງວດທີ I") {
                  this.quater_A = true;
                  this.time_selected = "ງວດທີ II";
                } else if (
                  String(myQuaterly[i].quarterly).valueOf() == "ໝົດປີ"
                ) {
                  this.quater_all = true;
                  this.quater_A = true;
                  this.quater_B = true;
                  this.time_selected = "";
                } else {
                  this.quater_all = true;
                  this.quater_A = true;
                  this.quater_B = true;
                }
              }
              this.time_selected = "";
            } else {
              this.quater_all = false;
              this.quater_A = false;
              this.quater_B = false;
              console.log("ss");
            }
          });
      } catch (err) {
        console.log(err);
        this.quater_all = false;
        this.quater_A = false;
        this.quater_B = false;
        this.time_selected = "ງວດທີ I";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-content,
.text-tooltip,
.text-form {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header,
.table-footer {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.header,
.calendar {
  font-family: "boonhome-400";
  font-size: 18px;
}
</style>
