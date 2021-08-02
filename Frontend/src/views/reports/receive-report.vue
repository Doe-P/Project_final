<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນການຮັບເງິນສະຕິ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-card-title primary-title class="justify-center">
            <v-row justify="center" class="sub-text">
              <v-col cols="10">
                <v-row>
                  <v-col cols="8">
                    <v-select
                      :items="Year_select"
                      v-model="Year_value_select"
                      label="ເລືອກສົກຮຽນ"
                      @input="Isselect($event)"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="pt-5">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="button-action"
                          v-on="on"
                          v-bind="attrs"
                          color="primary"
                          :disabled="isChecked"
                          @click="Clear_All"
                        >
                          <v-icon>clear_all</v-icon>
                        </v-btn>
                      </template>
                      <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
                    </v-tooltip>
                    <span class="ma-2"></span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="button-action"
                          v-on="on"
                          v-bind="attrs"
                          color="primary"
                          :disabled="isChecked"
                          @click.prevent="getDate_receive"
                        >
                          <v-icon>table_view</v-icon>
                        </v-btn>
                      </template>
                      <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                    </v-tooltip>
                    <span class="ma-2"></span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="button-action"
                          color="primary"
                          :disabled="isChecked_download"
                          v-on="on"
                          v-bind="attrs"
                          @click.prevent="download_Receive_PDF"
                        >
                          <v-icon>file_download</v-icon>
                        </v-btn>
                      </template>
                      <span class="text-tooltip">ດາວໂຫຼດ File PDF</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-row>
    </v-container>
    <v-row class="justify-center mx-6">
      <v-card width="100%" color="grey lighten-4">
        <v-card-text>
          <v-data-table
            :items="myData_receive"
            class="elevation-10 table-content"
            loading-text="ກຳລັງໂຫຼດ..."
          >
            <template v-slot:body="{ items }">
              <thead>
                <tr>
                  <template v-for="(headeritem, idx_1) in headerTitle">
                    <th
                      :rowspan="headeritem.rowspan"
                      :colspan="headeritem.colspan"
                      :key="'header1' + idx_1"
                      :style="{ textAlign: headeritem.align }"
                    >
                      {{ headeritem.text }}
                    </th>
                  </template>
                </tr>
                <tr>
                  <template v-for="(headeritem_2, idx_2) in headersub">
                    <th :key="'header2' + idx_2">{{ headeritem_2.text }}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td class="mx-0">{{ item.fund_name }}</td>
                  <td class="mx-0">{{ item.quarterly }}</td>
                  <td class="mx-0">{{ item.date | formatDate }}</td>
                  <td>{{ item.student }}</td>
                  <td>{{ item.student_W }}</td>
                  <td>{{ formatPrice(item.student_Mn) }}</td>
                  <td>{{ item.teacher }}</td>
                  <td>{{ item.teacher_W }}</td>
                  <td>{{ formatPrice(item.teacher_Mn) }}</td>
                  <td>{{ formatPrice(item.money_total) }}</td>
                  <td>{{ formatPrice(item.money_total / 2) }}</td>
                </tr>
                <tr>
                  <td colspan="11"></td>
                  <td class="pt-5">
                    <v-text-field
                      label="ລວມເງີນສະຕີທັງໝົດ"
                      outlined
                      dense
                      readonly
                      :value="formatPrice(Summoney)"
                      suffix="ກີບ"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import dateformat from "dateformat";
import "jspdf-autotable";
export default {
  name: "ReceiveReport",
  data() {
    return {
      headerTitle: [
        { text: "#ລຳດັບ", rowspan: 0, colspan: 0, align: "left" },
        { text: "ຮາກຖານ", rowspan: 0, colspan: 0, align: "left" },
        { text: "ງວດທີ", rowspan: 4, colspan: 0, align: "left" },
        { text: "ວັນທີຮັບ", rowspan: 4, colspan: 0, align: "left" },
        {
          text: "ນັກຮຽນ ແລະ ນັກສຶກສາ",
          rowspan: 1,
          colspan: 3,
          align: "center",
        },
        { text: "ພະນັກງານຄູອາຈານ", rowspan: 1, colspan: 3, align: "center" },
        {
          text: "ລວມເງິນທັງໝົດ (ກີບ)",
          rowspan: 2,
          colspan: 1,
          align: "center",
        },
        {
          text: "ລວມເງິນທັງໝົດ (-50%)(ກີບ)",
          rowspan: 2,
          colspan: 1,
          align: "left",
          value: "moneyTotal",
        },
      ],
      headersub: [
        { text: "ລວມ" },
        { text: "ຍິງ" },
        { text: "ລວມເງີນສະຕິ (ກີບ)" },
        ///////////
        { text: "ລວມ" },
        { text: "ຍິງ" },
        { text: "ລວມເງີນສະຕິ (ກີບ)" },
      ],
      Year_select: [],
      Year_start: null,
      Year_value_select: null,
      isChecked: true,
      myData_receive: [],
      isChecked_download:true,
    };
  },

  mounted() {
    this.setYear_select();
  },

  computed: {
    Summoney() {
      var getmoneyTotal = this.myData_receive.map(
        (item) => item.money_total / 2
      );
      var Total = parseInt(
        getmoneyTotal.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return Total;
    },
  },
  methods: {
    Clear_All() {
      this.isChecked = true;
      this.Year_value_select = null;
      this.myData_receive = [];
      this.isChecked_download=true;
    },

    //=================

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
      } else {
        this.isChecked = true;
      }
    },

    //================

    async getDate_receive() {
      if (this.Year_value_select) {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/reportReceive_money/year/${this.Year_value_select}`
          );
          this.myData_receive = response.data;
          this.isChecked_download=false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    //=============

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    //=====================

    download_Receive_PDF() {
      if (this.Year_value_select) {
        let row = [];
        for (let i in this.myData_receive) {
          row[i] = [
             parseInt(i) + 1,
           this.myData_receive[i].fund_name,
            this.myData_receive[i].quarterly,
           dateformat(this.myData_receive[i].date, "dd/mm/yyyy"),
           this.myData_receive[i].student,
           this.myData_receive[i].student_W,
          this.formatPrice(this.myData_receive[i].student_Mn),
           this.myData_receive[i].teacher,
           this.myData_receive[i].teacher_W,
            this.formatPrice(this.myData_receive[i].teacher_Mn),
            this.formatPrice(this.myData_receive[i].money_total),
           this.formatPrice(
              parseInt(this.myData_receive[i].money_total) / 2
            ),
          ];
        }
        // table columns
        const columns = [
          [
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "",
            },

            {
              title: "",
            },
            {
              title: "ນັກຮຽນແລະນັກສຶກສາ",
            },
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "ພະນັກງານຄູອາຈານ",
            },
            {
              title: "",
            },
            {
              title: "ລວມເງິນທັງໝົດ",
            },
            {
              title: "ລວມເງິນທັງໝົດ(ຫັກ 50%)",
            },
          ],
          [
            {
              title: "ລຳດັບ",
            },
            {
              title: "ຮາກຖານ    ",
            },
            {
              title: "ງວດທີ",
            },
            {
              title: "ວັນທີ      ",
            },
            ////
            {
              title: "ລວມ",
            },
            {
              title: "ຍິງ",
            },
            {
              title: "ລວມເງິນສະຕິ",
            },
            ////
            {
              title: "ລວມ",
            },
            {
              title: " ຍິງ",
            },
            {
              title: "ລວມເງີນສະຕິ",
            },
          ],
        ];
        //set format PDF
        const doc = new jsPDF({
          orientation: "l",
          unit: "in",
          format: "A4",
        });
       
        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.1, 3.2, 11.2, 3.2);

        // Table
        doc.autoTable({
          head: columns,
          body: row,
          bodyStyles: {
            overflow: "linebreak",
            tableWidth: "auto",
            //fileColor: [0, 0, 0],
            lineWidth: 0.01,
          },
          margin: { left: 0.1, top: 3.3, right: 0.1 },
          styles: {
            font: "Saysettha OT",
          },
          columnWidth:'auto'
          /*
           overflow: "linebreak",
            tableWidth: "auto",
            fileColor: [0, 0, 0],
            lineWidth: 0.01,

          */
        });

        //set font text header
        doc.addFont("Saysettha OT");
        doc.setFont("Saysettha OT");
        doc
          .addImage("nation.png", "PNG", 5.6, 0.25, 0.8, 0.8)
          .setFontSize(11)
          .text("ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ", 6, 1.4, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ", 6.2, 1.6, {
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
          .text("ເລກທີ............/ຄຊປປລ ມຊ", 11.2, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            11.2,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(14)
          .text("ລາຍງານຂໍ້ມູນການຈ່າຍເງິນສະຕິຊາວໜຸ່ມ", 6, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ປະຈຳປີ: ${this.Year_value_select}`, 0.5, 3.1, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ລວມຈຳນວນເງິນສະຕິທີ່ຮັບມາທັງໝົດ: ${this.formatPrice(this.Summoney)} ກີບ`, 11, 3.1, {
            align: "right",
            maxWidth: "7.5",
          });

        doc
          .setFontSize(12)
          .text("ຜູ້ສັງລວມ", 10.9, 32 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານຂໍ້ມູນການຈ່າຍເງີນສະຕິ-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
}
.sub-text,
.text-tooltip,
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
.button-action:hover {
  transition-delay: 2ms;
  transform: translateY(-8px);
}
</style>
