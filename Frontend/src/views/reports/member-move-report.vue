<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-7">
          <v-card width="100%" color="blue-grey lighten-4" light>
            <v-card-title class="justify-center">
              <span class="text-header">ລາຍງານຂໍ້ມູນຍົກຍ້າຍ</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-form v-model="valid">
                  <v-row>
                    <v-col cols="6">
                      <v-card color="grey lighten-4" class="elevation-10" light>
                        <v-card-title>
                          <span class="sub-text" color="blue"
                            >ລາຍງານຈຳນວນສະມາຊິກທີ່ຍົກຍ້າຍ</span
                          >
                        </v-card-title>
                        <v-card-text class="sub-text">
                          <v-select
                            :items="Year_select"
                            v-model="Year_value_select"
                            label="ເລືອກສົກຮຽນ"
                            @input="Isselect($event)"
                            @change="getDataMove_NObyYear"
                            outlined
                            dense
                          ></v-select>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                @click.prevent="clear_all"
                                :disabled="isChecked_clear"
                                color="primary"
                                class="elevation-1 button-action"
                              >
                                <v-icon>clear_all</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
                          </v-tooltip>
                          <span class="mx-3"></span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                              <v-btn
                                v-on="on"
                                v-bind="attrs"
                                @click.prevent="getData_by_Years"
                                :disabled="isChecked"
                                color="primary"
                                class="elevation-1 button-action"
                              >
                                <v-icon>table_view</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                          </v-tooltip>
                          <span class="mx-3"></span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-on="on"
                                v-bind="attrs"
                                @click.prevent="printData_memberYear"
                                :disabled="isChecked_button1"
                                color="primary"
                                class="elevation-1 button-action"
                              >
                                <v-icon>file_download</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ດາວໂຫຼດໄຟສ໌</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card color="grey lighten-4" class="elevation-10" light>
                        <v-card-title>
                          <span class="sub-text"
                            >ລາຍງານລາຍຊື່ສະມາຊິກທີ່ຍົກຍ້າຍ</span
                          >
                        </v-card-title>
                        <v-card-text class="sub-text">
                          <v-row>
                            <v-col cols="6">
                              <v-select
                                :items="Foundation"
                                v-model="fund_select"
                                label="ເລືອກຮາກຖານ"
                                @change="getDataMove_NObyFound"
                                outlined
                                dense
                                :disabled="User.status == 'User'"
                              ></v-select>
                            </v-col>
                            <v-col cols="6">
                              <v-select
                                :items="myMove_No"
                                v-model="move_NO"
                                label="ເລືອກເລກທີໃບຍົກຍ້າຍ"
                                @input="isselect_($event)"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-on="on"
                                v-bind="attrs"
                                @click.prevent="getData_by_No"
                                :disabled="isChecked_"
                                color="primary"
                                class="elevation-1 button-action"
                              >
                                <v-icon>table_view</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                          </v-tooltip>
                          <span class="mx-3"></span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-on="on"
                                v-bind="attrs"
                                @click.prevent="downloadData_memberYear"
                                :disabled="isChecked_button2"
                                color="primary"
                                class="elevation-1 button-action"
                              >
                                <v-icon>file_download</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ດາວໂຫຼດໄຟສ໌</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>

          <!---- Table 1 --->
          <v-card
            v-show="isShow"
            width="80%"
            color="blue-grey lighten-4"
            class="my-5"
            light
          >
            <v-card-text>
              <v-data-table
                :headers="headers_Year"
                :items="DataMove_Years"
                class="elevation-0 table-content"
                item-key="id"
                :loading="loading"
                transition="slide-y-transition"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.result }}</td>
                    <td>{{ item.women }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>

          <!---- Table 2 --->
          <v-card
            v-show="isShow_bill"
            width="100%"
            color="blue-grey lighten-4"
            class="my-5"
            light
          >
            <v-card-text>
              <v-data-table
                :headers="headers_Bill"
                :items="DataMove_Bill"
                class="elevation-0 table-content"
                item-key="id"
                :loading="loading2"
              >
                <!----- number of rows --->
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.member_name }}</td>
                    <td>{{ item.surname }}</td>
                    <td>{{ item.gender }}</td>
                    <td>{{ item.typemember }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.sect_name }}</td>
                    <td>{{ item.unit_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.date_move | formatDate }}</td>
                  </tr>
                </template>

                <!-------------->
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dateformat from "dateformat";
export default {
  name: "MemberMoveReport",
  data() {
    return {
      headers_Year: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
        {
          text: "ຈຳນວນທັງໝົດ (ສະຫາຍ)",
          value: "membermove_total",
          sortable: false,
        },
        { text: "ຍິງ (ສະຫາຍ)", value: "membermove_female", sortable: false },
      ],
      headers_Bill: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: false },
        { text: "ເຫດຜົນ", value: "reason", sortable: false },
        { text: "ຈຸ", value: "sect_name", sortable: false },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
        { text: "ວັນທີອອກ", value: "date_move", sortable: false },
      ],
      Year_select: [],
      Year_start: null,
      Year_value_select: null,
      isChecked: true,
      isChecked_: true,
      DataMove_Years: [],
      move_NO: null,
      loading: true,
      loading2: true,
      isShow: false,
      myMove_No: [],
      isShow_bill: false,
      DataMove_Bill: [],
      Foundation: [],
      Foundation_all: [],
      fund_select: null,
      fund_id: null,
      getMoves_NO: [],
      //
      isChecked_button1: true,
      isChecked_button2: true,
      isChecked_clear: true,
    };
  },
  created() {
    this.setYear_select();
    this.getFoundations();
  },

  mounted() {
    this.getmember_moveNO();
  },
  watch: {
    User() {
      this.getmember_moveNO();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
  },
  methods: {
    async getDataMove_NObyYear() {
      this.myMove_No = [];
      try {
        if (this.User.status == "User") {
          await axios
            .get(
              `${this.$store.getters.myHostname}/reportMove/moveNO/get/${this.User.fund_id}&${this.Year_value_select}`
            )
            .then((response) => {
              this.myMove_No = response.data.map((item) => item.move_NO);
              for (let i in this.Foundation_all) {
                if (
                  String(this.User.fund_id) ==
                  String(this.Foundation_all[i].fund_id)
                ) {
                  this.fund_select = this.Foundation_all[i].fund_name;
                }
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //----------------
    async getDataMove_NObyFound() {
      this.myMove_No = [];
      for (let i in this.Foundation_all) {
        if (
          String(this.fund_select) == String(this.Foundation_all[i].fund_name)
        ) {
          this.fund_id = this.Foundation_all[i].fund_id;
          try {
            await axios
              .get(
                `${this.$store.getters.myHostname}/reportMove/moveNO/get/${this.fund_id}&${this.Year_value_select}`
              )
              .then((response) => {
                this.myMove_No = response.data.map((item) => item.move_NO);
              });
          } catch (err) {
            console.log(err);
          }
        }
      }
    },

    //----------------------

    async getmember_moveNO() {
      this.myMove_No = [];
      try {
        if (this.User.status == "Admin") {
          await axios
            .get(
              `${this.$store.getters.myHostname}/reportMove/moveNO/get/${this.fund_id}&${this.Year_value_select}`
            )
            .then((response) => {
              this.myMove_No = response.data.map((item) => item.move_NO);
            });
        } else {
          await axios
            .get(
              `${this.$store.getters.myHostname}/reportMove/moveNO/get/${this.User.fund_id}&${this.Year_select[0]}`
            )
            .then((response) => {
              this.myMove_No = response.data.map((item) => item.move_NO);
              for (let i in this.Foundation_all) {
                if (
                  String(this.User.fund_id) ==
                  String(this.Foundation_all[i].fund_id)
                ) {
                  this.fund_select = this.Foundation_all[i].fund_name;
                }
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getFoundations() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/foundations"
        );
        this.Foundation_all = response.data;
        this.Foundation = this.Foundation_all.map((item) => item.fund_name);
      } catch (err) {
        console.log(err);
      }
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
        this.Year_select.push(str);
      }
    },
    Isselect(value) {
      if (value != "") {
        this.isChecked = false;
        this.isChecked_clear = false;
        this.move_NO = null;
      } else {
        this.isChecked = true;
      }
    },
    isselect_(value) {
      if (value != "") {
        this.isChecked_ = false;
      } else {
        this.isChecked_ = true;
      }
    },
    async getData_by_Years() {
      this.DataMove_Years = [];
      this.isShow_bill = false;
      if (this.Year_value_select) {
        this.move_NO = null;
        await axios
          .get(
            this.$store.getters.myHostname +
              `/reportMove/year/${this.Year_value_select}`
          )
          .then((response) => {
            if (response) {
              this.DataMove_Years = response.data;
              this.loading = false;
              this.isShow = true;
              this.isChecked_button1 = false;
            } else {
              this.Msg_fail("ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຕ້ອງການ");
            }
          });
      }
    },

    async getData_by_No() {
      this.isShow_bill = true;
      this.DataMove_Bill = [];
      if (this.move_NO) {
        try {
          await axios
            .get(
              this.$store.getters.myHostname +
                `/reportMove/moveNO/${this.move_NO}`
            )
            .then((response) => {
              this.DataMove_Bill = response.data;
              this.loading2 = false;
              this.isChecked_button2 = false;
              this.isChecked = true;
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    // print data member move by year
    printData_memberYear() {
      if (this.Year_value_select) {
        var getResult = this.DataMove_Years.map((item) => item.result);
        var memberTotal = parseInt(
          getResult.reduce(function (a, b) {
            return a + b;
          }, 0)
        );

        // table columns
        const columns = [
          { title: "ຮາກຖານ", dataKey: "fund_name" },
          { title: "ຈຳນວນສະມາຊິກ", dataKey: "result" },
          { title: "ຍິງ", dataKey: "women" },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3, 7.8, 3);

        // Table
        doc.autoTable({
          columns,
          body: this.DataMove_Years,
          margin: { left: 0.5, top: 3.2, right: 0.5 },
          styles: { font: "Saysettha OT" },
          columnWidth: {
            fund_name: { columnWidth: 33 },
            result: { columnWidth: 33 },
            women: { columnWidth: 33 },
          },
        });

        //set font text header
        doc.addFont("Saysettha OT");
        doc.setFont("Saysettha OT");
        doc
          .addImage("nation.png", "PNG", 3.6, 0.25, 0.8, 0.8)
          .setFontSize(11)
          .text("ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ", 4, 1.4, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ", 4, 1.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ມະຫາວິທະຍາໄລແຫ່ງຊາດ", 0.5, 1.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text("ຄະນະບໍລິຫານງານຊາວໜຸ່ມ ມຊ", 0.5, 2.2, {
            align: "left",
            maxWidth: "7.5",
          })
          .text("ເລກທີ............/ຄຊປປລ ມຊ", 7.7, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            7.7,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(12)
          .text("ລາຍງານຂໍ້ມູນການຍົກຍ້າຍ", 4, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .text(`ປະຈຳສົກຮຽນ: ${this.Year_value_select}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ລວມສະມາຊິກທັງໝົດ:..${memberTotal}..`, 7.5, 2.9, {
            align: "right",
            maxWidth: "7.5",
          });
        doc.text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານຈຳນວນສະມາຊິກທີ່ຍົກຍ້າຍ-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
    },
    // print data member move by move NO
    downloadData_memberYear() {
      var year = "";
      if (this.Year_value_select) {
        year = this.Year_value_select;
      } else {
        year = this.Year_select[0];
      }

      if (this.move_NO) {
        let reason = this.DataMove_Bill.map((item) => item.reason);
        let date = this.DataMove_Bill.map((date) => date.date_move);

        // table columns
        const columns = [
          { title: "ຊື່", dataKey: "member_name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ປະເພດສະມາຊິກ", dataKey: "typemember" },
          { title: "ຈຸ", dataKey: "sect_name" },
          { title: "ໜ່ວຍ", dataKey: "unit_name" },
          { title: "ຮາກຖານ", dataKey: "fund_name" },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3.2, 7.8, 3.2);

        // Table
        doc.autoTable({
          columns,
          body: this.DataMove_Bill,
          margin: { left: 0.5, top: 3.2, right: 0.5 },
          styles: { font: "Saysettha OT" },
          columnWidth: {
            member_name: { columnWidth: 15 },
            surname: { columnWidth: 15 },
            gender: { columnWidth: 5 },
            typemember: { columnWidth: 10 },
            sect_name: { columnWidth: 15 },
            unit_name: { columnWidth: 15 },
            fund_name: { columnWidth: 15 },
          },
        });

        //set font text header
        doc.addFont("Saysettha OT");
        doc.setFont("Saysettha OT");
        doc
          .addImage("nation.png", "PNG", 3.6, 0.25, 0.8, 0.8)
          .setFontSize(11)
          .text("ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ", 4, 1.4, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ", 4, 1.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ມະຫາວິທະຍາໄລແຫ່ງຊາດ", 0.5, 1.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text("ຄະນະບໍລິຫານງານຊາວໜຸ່ມ ມຊ", 0.5, 2.2, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ເລກທີ.${this.move_NO}./ຄຊປປລ ມຊ`, 7.7, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            7.7,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(12)
          .text("ລາຍງານ ລາຍຊື່ສະມາຊິກຍົກຍ້າຍ", 4, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(10)
          .text(`ປະຈຳສົກຮຽນ: ${year}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ເຫດຜົນ: ${reason[0]}`, 0.5, 3.1, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ວັນທີຍົກຍ້າຍ:..${dateformat(date[0], "dd/mm/yyyy")}`,
            7.5,
            3.1,
            {
              align: "right",
              maxWidth: "7.5",
            }
          );

        doc
          .setFontSize(12)
          .text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານລາຍຊື່ສະມາຊິກທີ່ຍົກຍ້າຍ-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
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
    clear_all() {
      this.Year_value_select = null;
      this.move_NO = null;
      this.isShow = false;
      this.isShow_bill = false;
      this.isChecked = true;
      this.isChecked_ = true;
      this.isChecked_button1 = true;
      this.isChecked_button2 = true;
      this.isChecked_clear = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
}
.sub-text {
  font-family: "boonhome-400";
  font-size: 18px;
}
.button-action:hover {
  transition-delay: 2ms;
  transform: translateY(-10px);
}
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
