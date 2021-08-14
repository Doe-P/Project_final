<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນການເຄື່ອນໄຫວກິດຈະກຳ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-card-title primary-title class="justify-center">
            <v-row justify="center" class="sub-text">
              <v-col cols="6">
                <v-select
                  :items="Year_select"
                  v-model="Year_value_select"
                  label="ເລືອກປີ"
                  @input="Isselect($event)"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6" class="pt-7">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                      :disabled="isChecked"
                      @click="Clear_all"
                    >
                      <v-icon>clear_all</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
                </v-tooltip>
                <span class="mx-3"></span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                      :disabled="isChecked"
                      @click.prevent="DataActivitys"
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
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                      :disabled="isChecked_download"
                      @click.prevent="downloadActivity_PDF"
                    >
                      <v-icon>file_download</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ດາວໂຫຼດ File PDF</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
        <v-card width="100%" class="my-5" v-show="isChecked_download == false">
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="myDataActivity"
              class="elevation-10 table-content"
              :loading="loading"
            >
              <template v-slot:top>
                <v-toolbar>
                  <v-toolbar-title>
                    <span class="text-table-bar">ລວມສະມາຊິກທັງໝົດ:</span>
                  </v-toolbar-title>
                  <v-divider class="px-1 mr-2" inset vertical></v-divider>
                  <v-toolbar-text class="mt-5">
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          label="ລວມ"
                          outlined
                          dense
                          readonly
                          :value="CountTotal"
                          suffix="ສະຫາຍ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          label="ຍິງ"
                          outlined
                          dense
                          readonly
                          :value="CountWomen"
                          suffix="ສະຫາຍ"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="3">
                        <v-text-field
                          label="ຈຳນວນຄັ້ງ"
                          outlined
                          dense
                          readonly
                          :value="myDataActivity.length"
                          suffix="ຄັ້ງ"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-toolbar-text>
                </v-toolbar>
              </template>
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.acti_title }}</td>
                  <td>{{ item.place }}</td>
                  <td>{{ item.date_acti | formatDate }}</td>
                  <td>{{ item.result }}</td>
                  <td>{{ item.women }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dateformat from "dateformat";
export default {
  name: "ReceiveReport",
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຫົວຂໍ້ກິດຈະກຳ", value: "acti_title", sortable: true },
        { text: "ສະຖານທີ່", value: "place", sortable: true },
        { text: "ວັນທີ", value: "date_acti", sortable: false },
        {
          text: "ຈຳນວນສະມາຊິກເຂົ້າຮ່ວມ(ສະຫາຍ)",
          value: "result",
          sortable: false,
        },
        { text: "ຍິງ(ສະຫາຍ)", value: "women", sortable: false },
      ],
      Year_select: [],
      Year_start: null,
      Year_value_select: null,
      isChecked: true,
      isChecked_download: true,
      myDataActivity: [],
      loading: true,
    };
  },

  mounted() {
    this.setYear_select();
  },
  computed: {
    CountTotal() {
      var getResult = this.myDataActivity.map((item) => item.result);
      var Total = parseInt(
        getResult.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return Total;
    },
    CountWomen() {
      var getWomen = this.myDataActivity.map((item) => item.women);
      var Total = parseInt(
        getWomen.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return Total;
    },
  },

  methods: {
    setYear_select() {
      // let object = [];
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        this.Year_select.push(i);
      }
    },
    Isselect(value) {
      if (value != "") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    Clear_all() {
      this.isChecked = true;
      this.isChecked_download = true;
      this.Year_value_select = null;
      this.myDataActivity = [];
    },

    //=================

    async DataActivitys() {
      if (this.Year_value_select) {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/reportActivity/year/${this.Year_value_select}`
          );
          this.myDataActivity = response.data;
          this.loading = false;
          this.isChecked_download = false;
        } catch (err) {
          console.log(err);
        }
      }
    },

    //===============

    downloadActivity_PDF() {
      if (this.Year_value_select) {
        var row = [];
        for (let i in this.myDataActivity) {
          row[i] = {
            index: parseInt(i) + 1,
            acti_title: this.myDataActivity[i].acti_title,
            place: this.myDataActivity[i].place,
            date_acti: dateformat(
              this.myDataActivity[i].date_acti,
              "dd/mm/yyyy"
            ),
            result: this.myDataActivity[i].result,
            women: this.myDataActivity[i].women,
          };
        }
        // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຫົວຂໍ້ກິດຈະກຳ", dataKey: "acti_title" },
          { title: "ສະຖານທີ່", dataKey: "place" },
          { title: "ວັນທີ", dataKey: "date_acti" },
          { title: "ຈຳນວນສະມາຊິກເຂົ້າຮ່ວມ", dataKey: "result" },
          { title: "ຍິງ", dataKey: "women" },
          { title: "ໝາຍເຫດ", dataKey: "note" },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.3, 3.3, 7.8, 3.3);

        // Table
        doc.autoTable({
          columns,
          body: row,
          bodyStyles: {
            overflow: "linebreak",
            tableWidth: "auto",
            //fileColor: [0, 0, 0],
            lineWidth: 0.01,
          },
          margin: { left: 0.3, top: 3.4, right: 0.3 },
          styles: { font: "Saysettha OT" },
          columnWidth: "auto",
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
          .setFontSize(14)
          .text("ລາຍງານຂໍ້ມູນເຄື່ອນໄຫວກິດຈະກຳ", 4, 2.75, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ປະຈຳປີ: ${this.Year_value_select}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ເຄື່ອນໄຫວກິດຈະກຳທັງໝົດ ຈຳນວນ: ${this.myDataActivity.length}`,
            0.5,
            3.2,
            {
              align: "left",
              maxWidth: "7.5",
            }
          )
          .text(
            `ລວມສະມາຊິກທັງໝົດ:..${this.CountTotal}.ສະຫາຍ, ຍິງ:.${this.CountWomen}.ສະຫາຍ`,
            7.5,
            3.2,
            {
              align: "right",
              maxWidth: "7.5",
            }
          );
        doc.setFontSize(11);
        doc.text("ເລຂາຊາວໜຸ່ມ", 0.7, 35.5 - 25, null, null, "left");
        doc.text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານຂໍ້ມູນການເຄື່ອນໄຫວກິດຈະກຳ-${dateformat(
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
.text-table-bar {
  font-family: "boonhome-400";
  font-size: 18px;
}
</style>
