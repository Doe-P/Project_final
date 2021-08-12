<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-7">
          <v-card width="100%" color="teal lighten-1" dark>
            <v-card-title class="justify-center">
              <span class="text-header">ລາຍງານສະຖິຕິຊາວໜຸ່ມ</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-form v-model="valid">
                  <v-row class="text-calender">
                    <v-col cols="4">
                      <v-menu
                        ref="menu1"
                        v-model="start_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="start_date_format"
                            label="ປະຈຳວັນທີ"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="
                              start_date = parseStart_date(start_date_format)
                            "
                            v-on="on"
                            readonly
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          class="calender"
                          ref="picker"
                          v-model="start_date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          locale="lao"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        ref="menu1"
                        v-model="end_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="end_date_format"
                            label="ຫາວັນທີ"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="end_date = parseEnd_date(end_date_format)"
                            v-on="on"
                            readonly
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          class="calender"
                          ref="picker"
                          v-model="end_date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          locale="lao"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="4" class="justify-end pt-5">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green accent-3"
                            v-bind="attrs"
                            v-on="on"
                            :disabled="!valid"
                            @click="ClearAll"
                          >
                            <v-icon color="white">clear_all</v-icon>
                          </v-btn>
                        </template>
                        <span class="text-calender">ລ້າງຂໍ້ມູນ</span>
                      </v-tooltip>
                      <span class="ma-2"></span>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green accent-3"
                            v-bind="attrs"
                            v-on="on"
                            :disabled="!valid"
                            @click.prevent="getDataStatisticsMembers"
                          >
                            <v-icon color="white">assignment</v-icon>
                          </v-btn>
                        </template>
                        <span class="text-calender">ສະແດງລາຍລະອຽດ</span>
                      </v-tooltip>
                      <span class="ma-2"></span>
                      <v-tooltip bottom class="ml-3">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green accent-3"
                            v-bind="attrs"
                            v-on="on"
                            :disabled="isCheck_download"
                            @click.prevent="downloadStatisticPDF "
                          >
                            <v-icon color="white">file_download</v-icon>
                          </v-btn>
                        </template>
                        <span class="text-calender">ດາວໂຫຼດ File PDF</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-row class="justify-center mx-6">
        <v-card
          width="100%"
          color="grey lighten-4"
          v-show="isCheck_download == false"
        >
          <v-card-text>
            <div>
              <v-data-table
                :items="myData_statisticsMembers"
                class="elevation-10 table-content"
                loading-text="ກຳລັງໂຫຼດ..."
                id="myTable"
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
                      <template v-for="(headeritem, idx_2) in headersub">
                        <th
                          :rowspan="headeritem.rowspan"
                          :colspan="headeritem.colspan"
                          :key="'header2' + idx_2"
                          :style="{ textAlign: headeritem.align }"
                        >
                          {{ headeritem.text }}
                        </th>
                      </template>
                    </tr>
                    <tr>
                      <template v-for="(headeritem_3, idx_3) in headertext">
                        <th :key="'header3' + idx_3">
                          {{ headeritem_3.text }}
                        </th>
                      </template>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.fund_name }}</td>
                      <td>{{ item.age15to35 }}</td>
                      <td>{{ item.W_age15to35 }}</td>
                      <!--  -->
                      <td>{{ item.allStudent }}</td>
                      <td>{{ item.W_student }}</td>
                      <!--  -->
                      <td>{{ item.nuksueksa }}</td>
                      <td>{{ item.W_nuksueksa }}</td>
                      <!--  -->
                      <td>{{ item.teacher }}</td>
                      <td>{{ item.W_teacher }}</td>
                      <!--  -->
                      <td>{{ item.paliyaAek }}</td>
                      <td>{{ item.W_paliyaAek }}</td>
                      <!--  -->
                      <td>{{ item.paliyatho }}</td>
                      <td>{{ item.W_paliyatho }}</td>
                      <!--  -->
                      <td>{{ item.paliyaty }}</td>
                      <td>{{ item.W_paliyaty }}</td>
                      <!--  -->
                      <td>{{ item.levelOther }}</td>
                      <td>{{ item.W_levelOther }}</td>
                      <!--  -->
                      <td>{{ item.Allyouth }}</td>
                      <td>{{ item.W_youth }}</td>
                      <!--  -->
                      <td>{{ item.Kummaban }}</td>
                      <td>{{ item.W_kummaban }}</td>
                      <!--  -->
                      <td>{{ item.allwomen }}</td>
                      <!--  -->
                      <td>{{ item.phuk }}</td>
                      <td>{{ item.W_phuk }}</td>
                      <!--  -->
                      <td>{{ item.Note_out }}</td>
                      <td>{{ item.W_note_out }}</td>
                      <!--  -->
                      <td>{{ item.kern35 }}</td>
                      <td>{{ item.W_kern35 }}</td>
                      <!--  -->
                      <td>{{ item.phonkasien }}</td>
                      <td>{{ item.W_phonkasien }}</td>
                      <!--  -->
                      <td>{{ item.permmai }}</td>
                      <td>{{ item.W_permmai }}</td>
                      <!--  -->
                      <td>{{ item.section }}</td>
                      <td>{{ item.Newsection }}</td>
                      <!--  -->
                      <td>{{ item.unit }}</td>
                      <td>{{ item.newUnit }}</td>
                    </tr>
                    <tr>
                      <th
                        rowspan="1"
                        style="
                           {
                            textalign: center;
                          }
                        "
                      >
                        ລວມ
                      </th>
                      <td></td>
                      <td>{{ CountDataStatistic("age15to35") }}</td>
                      <td>{{ CountDataStatistic("W_age15to35") }}</td>
                      <td>{{ CountDataStatistic("allStudent") }}</td>
                      <td>{{ CountDataStatistic("W_student") }}</td>
                      <td>{{ CountDataStatistic("nuksueksa") }}</td>
                      <td>{{ CountDataStatistic("W_nuksueksa") }}</td>
                      <td>{{ CountDataStatistic("teacher") }}</td>
                      <td>{{ CountDataStatistic("W_teacher") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("paliyaAek") }}</td>
                      <td>{{ CountDataStatistic("W_paliyaAek") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("paliyatho") }}</td>
                      <td>{{ CountDataStatistic("W_paliyatho") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("paliyaty") }}</td>
                      <td>{{ CountDataStatistic("W_paliyaty") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("levelOther") }}</td>
                      <td>{{ CountDataStatistic("W_levelOther") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("Allyouth") }}</td>
                      <td>{{ CountDataStatistic("W_youth") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("Kummaban") }}</td>
                      <td>{{ CountDataStatistic("W_kummaban") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("allwomen") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("phuk") }}</td>
                      <td>{{ CountDataStatistic("W_phuk") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("Note_out") }}</td>
                      <td>{{ CountDataStatistic("W_note_out") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("kern35") }}</td>
                      <td>{{ CountDataStatistic("W_kern35") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("phonkasien") }}</td>
                      <td>{{ CountDataStatistic("W_phonkasien") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("permmai") }}</td>
                      <td>{{ CountDataStatistic("W_permmai") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("section") }}</td>
                      <td>{{ CountDataStatistic("Newsection") }}</td>
                      <!--  -->
                      <td>{{ CountDataStatistic("unit") }}</td>
                      <td>{{ CountDataStatistic("newUnit") }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import dateformat from "dateformat";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import html2canvas from "html2canvas";
import axios from "axios";
export default {
  name: "MembersStatisticsReport",
  data() {
    return {
      headerTitle: [
        { text: "#ລຳດັບ", rowspan: 3, colspan: 1, align: "left" },
        { text: "ພາກສ່ວນຮາກຖານ", rowspan: 3, colspan: 1, align: "left" },
        { text: "ໄວໜຸ່ມອາຍຸ 15-35ປີ", rowspan: 2, colspan: 2, align: "left" },
        {
          text: "ສັງກັດຢູ່ພາກສ່ວນຕ່າງໆ",
          rowspan: 1,
          colspan: 6,
          align: "center",
        },
        {
          text: "ວຸດທິການສຶກສາ",
          rowspan: 1,
          colspan: 8,
          align: "center",
        },
        {
          text: "ສະມາຊິກ ຊປປລ ທີ່ເປັນ",
          rowspan: 1,
          colspan: 15,
          align: "center",
        },
        {
          text: "ຈຳນວນຈຸ",
          rowspan: 2,
          colspan: 2,
          align: "center",
        },
        {
          text: "ຈຳນວນໜ່ວຍ",
          rowspan: 2,
          colspan: 2,
          align: "left",
          value: "moneyTotal",
        },
      ],
      headersub: [
        //===========

        { text: "ນັກຮຽນ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ນັກສຶກສາ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ຄູອາຈານ", rowspan: 1, colspan: 2, align: "center" },

        //==============
        { text: "ປອ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ປທ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ປຕ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ອຶ່ນໆ", rowspan: 1, colspan: 2, align: "center" },
        //=============
        { text: "ຊາວໜຸ່ມ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ກຳມະບານ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ແມ່ຍິງ", rowspan: 1, colspan: 1, align: "center" },
        { text: "ພັກ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ຖືກວິໄນ", rowspan: 1, colspan: 2, align: "center" },
        { text: "ອາຍຸ >35", rowspan: 1, colspan: 2, align: "center" },
        { text: "ຈ/ນ ພົ້ນກະສຽນ", rowspan: 1, colspan: 2, align: "center" },
        {
          text: "ສ/ຊ ເພີ່ມຂື້ນ6ເດືອນຕົ້ນປີ",
          rowspan: 1,
          colspan: 2,
          align: "center",
        },
      ],

      headertext: [
        //------ໄວໜຸ່ມ 15-35
        { text: "ລ" },
        { text: "ຍ" },

        //-------------ນັກຮຽນ

        { text: "ລ" },
        { text: "ຍ" },

        //------------ນັກສຶກສາ

        { text: "ລ" },
        { text: "ຍ" },

        //------------ອາຈານ

        { text: "ລ" },
        { text: "ຍ" },

        //------------ວຸດທິການສຶກສາ

        { text: "ລ" },
        { text: "ຍ" },

        //------------

        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------ສັງກັດ
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລ" },
        { text: "ຍ" },

        //------------
        { text: "ລວມ" },
        { text: "ເພີ່ມໃໝ່" },

        //------------
        { text: "ລວມ" },
        { text: "ເພີ່ມໃໝ່" },
      ],

      // start date
      start_date: new Date().toISOString().substr(0, 10),
      start_date_menu: false,
      start_date_format: null,
      // end date
      end_date: new Date().toISOString().substr(0, 10),
      end_date_menu: false,
      end_date_format: null,
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      // validate btn
      valid:false,
      isCheck_download: true,
      myData_statisticsMembers: [{ age15to35: 0 }],
    };
  },

  mounted() {
    this.end_date_format = dateformat(Date.now(), "dd-mm-yyyy");
  },
  watch: {
    start_date() {
      this.start_date_format = this.formatStart_date(this.start_date);
    },
    end_date() {
      this.end_date_format = this.formatEnd_date(this.end_date);
    },
  },
  computed: {
    StartDateFormatted() {
      return this.forimatStart_date(this.start_date);
    },
    EndDateFormatted() {
      return this.formatEnd_date(this.end_date);
    },
  },
  methods: {
    // start date
    formatStart_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseStart_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // end date
    formatEnd_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseEnd_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //================ count amount total in column

    CountDataStatistic(column) {
      let values = this.myData_statisticsMembers.map(
        (item) => parseInt(item[column]) || 0
      );
      return values.reduce((a, b) => a + b);
    },

    //================== get data statistics

    async getDataStatisticsMembers() {
      this.myData_statisticsMembers = [];
      if (
        this.start_date &&
        this.end_date &&
        this.end_date >= this.start_date
      ) {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/reportStatistics/Member/${this.start_date}/${this.end_date}`
          );
          this.myData_statisticsMembers = response.data;
          this.isCheck_download = false;
        } catch (err) {
          console.log(err);
          if (err) {
            this.Msg_fail("ບໍ່ມີຂໍ້ມູນ");
          }
        }
      } else {
        this.Msg_fail("ວັນທີບໍ່ຖືກຕ້ອງ");
      }
    },
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

    //================

    ClearAll() {
      this.valid = true;
      this.isCheck_download = true;
      this.start_date_format = null;
      this.end_date_format = dateformat(Date.now(), "dd-mm-yyyy");
    },

    //-------------

    downloadStatisticPDF() {
      // table columns
      const columns = [
        [
          {
            content: "ລຳດັບ",
            colSpan: 1,
            styles: { halign: "left", fillColor: [22, 160, 133] },
          },
          {
            content: "ຮາກຖານ",
            colSpan: 1,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ໄວໜຸ່ມອາຍຸ15-35ປີ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ສັງກັດຢູ່ພາກສ່ວນ",
            colSpan: 6,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ວຸດທິການສຶກສາ",
            colSpan: 8,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ສະມາຊິກ ຊປປລ ທີ່ເປັນ",
            colSpan: 15,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ຈຳນວນໜ່ວຍ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
          {
            content: "ຈຳນວນຈຸ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
        ],
        [
          {
            content: "",
            colSpan: 1,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "",
            colSpan: 1,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ນ/ຮ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ນ/ສ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ພ/ງ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ປອ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ປທ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ປຕ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ອຶ່ນໆ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ຊາວໜຸ່ມ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ກຳມະບານ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: " ແມ່ຍິງ",
            colSpan: 1,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ພັກ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ຖືກວິໄນ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ອາຍຸ>35",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ພົ້ນກະສຽນ",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "ສະມາຊິກເພີ່ມໃໝ່",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
          {
            content: "",
            colSpan: 2,
            styles: { halign: "center", fillColor: [22, 160, 150] },
          },
        ],
        [
          "",
          "",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ຍ",
          "ລ",
          "ໝ",
          "ລ",
          "ໝ",
        ],
      ];

      if (this.myData_statisticsMembers) {
        let rows = [];
        for (let i in this.myData_statisticsMembers) {
          rows[i] = [
            parseInt(i) + 1,
            this.myData_statisticsMembers[i].fund_name,
            this.myData_statisticsMembers[i].age15to35,
            this.myData_statisticsMembers[i].W_age15to35,
            this.myData_statisticsMembers[i].allStudent,
            this.myData_statisticsMembers[i].W_student,
            this.myData_statisticsMembers[i].nuksueksa,
            this.myData_statisticsMembers[i].W_nuksueksa,
            this.myData_statisticsMembers[i].teacher,
            this.myData_statisticsMembers[i].W_teacher,
            this.myData_statisticsMembers[i].paliyaAek,
            this.myData_statisticsMembers[i].W_paliyaAek,
            this.myData_statisticsMembers[i].paliyatho,
            this.myData_statisticsMembers[i].W_paliyatho,
            this.myData_statisticsMembers[i].paliyaty,
            this.myData_statisticsMembers[i].W_paliyaty,
            this.myData_statisticsMembers[i].levelOther,
            this.myData_statisticsMembers[i].W_levelOther,
            this.myData_statisticsMembers[i].Allyouth,
            this.myData_statisticsMembers[i].W_youth,
            this.myData_statisticsMembers[i].Kummaban,
            this.myData_statisticsMembers[i].W_kummaban,
            this.myData_statisticsMembers[i].allwomen,
            this.myData_statisticsMembers[i].phuk,
            this.myData_statisticsMembers[i].W_phuk,
            this.myData_statisticsMembers[i].Note_out,
            this.myData_statisticsMembers[i].W_note_out,
            this.myData_statisticsMembers[i].kern35,
            this.myData_statisticsMembers[i].W_kern35,
            this.myData_statisticsMembers[i].phonkasien,
            this.myData_statisticsMembers[i].W_phonkasien,
            this.myData_statisticsMembers[i].permmai,
            this.myData_statisticsMembers[i].W_permmai,
            this.myData_statisticsMembers[i].section,
            this.myData_statisticsMembers[i].Newsection,
            this.myData_statisticsMembers[i].unit,
            this.myData_statisticsMembers[i].newUnit,
          ];
        }

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
          body: rows,
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
          columnWidth: "wrap",
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
          .setFontSize(12)
          .text("ລາຍງານສະຖິຕິສະມາຊິກຊາວໜຸ່ມ ຄຊປປລ ມະຫາວິທະຍາໄລແຫ່ງຊາດ", 6, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ປະຈຳ 06 ເດືອນຕົ້ນ/ທ້າຍປີ....................`, 6, 3, {
            align: "center",
            maxWidth: "7.5",
          })

        doc
          .setFontSize(12)
          .text("ຜູ້ສັງລວມ", 10.9, 32 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
//         var workaroundDefinition = [
//   [{"content":"ລວມ","colSpan":4},
//    {"content":`${this.CountDataStatistic("age15to35")}`,"colSpan":0},
//    {"content":`${this.CountDataStatistic("W_age15to35")}`,"colSpan":0},
//    {"content":`${this.CountDataStatistic("allStudent")}`,"colSpan":0},
//    {"content":`${this.CountDataStatistic("W_student")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("nuksueksa")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_nuksueksa")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("teacher")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_teacher")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("paliyaAek")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_paliyaAek")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("paliyatho")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_paliyatho")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("paliyaty")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_paliyaty")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("levelOther")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_levelOther")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("Allyouth")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_youth")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("Kummaban")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_Kummaban")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("allwomen")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("phuk")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_phuk")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("Note_out")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_note_out")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("kern35")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_kern35")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("phonkasien")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_phonkasien")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("permmai")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("W_permmai")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("section")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("Newsection")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("unit")}`,"colSpan":1},
//    {"content":`${this.CountDataStatistic("newUnit")}`,"colSpan":1},
//   ],
// ];
//    doc.autoTable({ body: workaroundDefinition, margin: { left: 0.1,right: 0.1 }, bodyStyles: {
//             overflow: "linebreak",
//             tableWidth: "auto",
//             //fileColor: [0, 0, 0],
//             lineWidth: 0.01,
//           }, 
//            styles: {
//             font: "Saysettha OT",
//           },
//           }); 
        doc.save(
          `ລາຍງານສະຖິຕິສະມາຊິກຊາວໜຸ່ມ-${dateformat(
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
.text-calender,
.calender,
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
