<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນການຍ້ອງຍໍ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-row>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header">ລາຍງານຂໍ້ມູນປະຈຳສົກປີ</span>
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content">
                    <v-select
                      :items="Years"
                      v-model="year_selected"
                      label="ເລືອກປີ"
                      append-icon="today"
                      @input="selectvalue($event)"
                      @change="getCertificateByYear"
                      outlined
                    ></v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
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
                  <span class="ma-2"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        v-on="on"
                        v-bind="attrs"
                        :disabled="isChecked"
                        @click.prevent="DataCertificateByYear"
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
                        color="primary"
                        v-on="on"
                        v-bind="attrs"
                        :disabled="isChecked_download"
                        @click.prevent="downloadCertificateByYear_PDF"
                      >
                        <v-icon>file_download</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ດາວໂຫຼດ File PDF</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header"
                    >ລາຍງານລາຍຊື່ສະມາຊິກທີ່ໄດ້ຮັບການຍ້ອງຍໍ</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content">
                    <v-select
                      :items="certificate_NO"
                      v-model="select_NO"
                      label="ເລືອກເລກທີໃບຍ້ອງຍໍ"
                      @input="check_select($event)"
                      @change="getCertificateTitle"
                      outlined
                    ></v-select>
                    <v-row>
                      <v-col cols="10">
                        <v-textarea
                          rows="2"
                          label="ຫົວຂໍ້ການຍ້ອງຍໍ"
                          readonly
                          :value="activity_Title"
                          outlined
                        >
                        </v-textarea>
                      </v-col>
                      <v-col cols="2" class="pt-7 align-content-end">
                        <v-card-actions class="justify-end">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                @click.prevent="downloadCertificateByNO"
                                :disabled="isChecked2"
                                color="primary"
                                v-on="on"
                                v-bind="attrs"
                              >
                                <v-icon>file_download</v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ດາວໂຫຼດ File PDF</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="100%" class="my-5" v-show="isChecked_download == false">
          <v-card-text>
            <v-data-table
              :headers="headersOne"
              :items="myDataCertificateByYear"
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
                          :value="myDataCertificateByYear.length"
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
                  <td>{{ item.certific_NO }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.sign_by }}</td>
                  <td>{{ item.date_sign | formatDate }}</td>
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
  name: "MemberRetirementReport",
  data() {
    return {
      headersOne: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ໃບຍ້ອງຍໍເລກທີ", value: "certific_NO", sortable: true },
        { text: "ເນື້ອໃນ", value: "title", sortable: true },
        { text: "ອອກໂດຍ", value: "sign_by", sortable: false },
        { text: "ວັນທີ", value: "date_sign", sortable: false },
        {
          text: "ຈຳນວນສະມາຊິກ(ສະຫາຍ)",
          value: "result",
          sortable: false,
        },
        { text: "ຍິງ(ສະຫາຍ)", value: "women", sortable: false },
      ],
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      // validate btn
      valid: false,
      Years: [],
      start_year: 2000,
      isChecked: true,
      select_NO: "",
      activity_Title: "",
      isChecked2: true,
      isChecked_download: true,
      ////
      year_selected: null,
      myDataCertificateByYear: [],
      loading: true,
      certificate_NO: [],
      getCertificate: [],
      ///
      getYear: null,
      dataCertificateReport: [],
    };
  },
  created() {
    this.CertificateNO();
  },

  mounted() {
    this.setYear();
  },

  computed: {
    CountTotal() {
      var getResult = this.myDataCertificateByYear.map((item) => item.result);
      var Total = parseInt(
        getResult.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return Total;
    },

    CountWomen() {
      var getWomen = this.myDataCertificateByYear.map((item) => item.women);
      var Total = parseInt(
        getWomen.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return Total;
    },
  },
  methods: {
    submit() {
      if (this.start_date_format > this.end_date_format) {
        this.$store.dispatch({
          type: "doClick_myMsg",
          mshow: true,
          mcolor: "error",
          micon: "error",
          message: "ຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຄືນໃໝ່",
        });
        this.message = "ກະລຸນາເລືອກວັນທີຄືນໃໝ່";
      }
    },
    setYear() {
      var now = new Date();
      var y = now.getFullYear();
      this.getYear = y;
      for (let i = y; i >= this.start_year; i--) {
        this.Years.push(i);
      }
    },
    selectvalue(val) {
      if (val != "") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    check_select(val) {
      if (val != "") {
        this.isChecked2 = false;
      } else {
        this.isChecked2 = true;
      }
    },

    //============
    Clear_all() {
      this.isChecked = true;
      this.isChecked_download = true;
      this.year_selected = null;
    },

    //==================

    async CertificateNO() {
      this.getCertificate = [];
      this.certificate_NO = [];
      var now = new Date();
      var y = now.getFullYear();
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + `/reportCertificate/CertiNO/get/${y}`
        );
        this.getCertificate = response.data;
        this.certificate_NO = this.getCertificate.map(
          (item) => item.certific_NO
        );
      } catch (err) {
        console.log(err);
      }
    },

    //=================
    async getCertificateByYear() {
      this.getCertificate = [];
      this.certificate_NO = [];
      if (this.year_selected) {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/reportCertificate/CertiNO/get/${this.year_selected}`
          );
          this.getCertificate = response.data;
          this.certificate_NO = this.getCertificate.map(
            (item) => item.certific_NO
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    //==================

    async DataCertificateByYear() {
      if (this.year_selected) {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/reportCertificate/year/${this.year_selected}`
          );
          this.myDataCertificateByYear = response.data;
          this.loading = false;
          this.isChecked_download = false;
        } catch (err) {
          console.log(err);
        }
      }
    },

    //==============

    async getCertificateTitle() {
      this.activity_Title = null;
      if (this.select_NO) {
        for (let i in this.getCertificate) {
          if (
            String(this.select_NO) == String(this.getCertificate[i].certific_NO)
          ) {
            this.activity_Title = this.getCertificate[i].title;

            try {
              let response = await axios.get(
                this.$store.getters.myHostname +
                  `/reportCertificate/member/${this.select_NO}`
              );
              this.dataCertificateReport = response.data;
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    },

    //================

    downloadCertificateByYear_PDF() {
      if (this.year_selected) {
        var row = [];
        for (let i in this.myDataCertificateByYear) {
          row[i] = {
            index: parseInt(i) + 1,
            certific_NO: this.myDataCertificateByYear[i].certific_NO,
            title: this.myDataCertificateByYear[i].title,
            sign_by: this.myDataCertificateByYear[i].sign_by,
            date_sign: dateformat(
              this.myDataCertificateByYear[i].date_sign,
              "dd/mm/yyyy"
            ),
            result: this.myDataCertificateByYear[i].result,
            women: this.myDataCertificateByYear[i].women,
          };
        }
        // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ເລກທີໃບຍ້ອງຍໍ", dataKey: "certific_NO" },
          { title: "ເນື້ອໃນ", dataKey: "title" },
          { title: "ອອກໂດຍ", dataKey: "sign_by" },
          { title: "ວັນທີ", dataKey: "date_sign" },
          { title: "ຈຳນວນສະມາຊິກເຂົ້າຮ່ວມ", dataKey: "result" },
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
        doc.setLineWidth(0.01).line(0.5, 3.3, 7.8, 3.3);

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
          margin: { left: 0.5, top: 3.4, right: 0.5 },
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
          .text(`ປະຈຳປີ: ${this.year_selected}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ເຄື່ອນໄຫວກິດຈະກຳທັງໝົດ ຈຳນວນ: ${this.myDataCertificateByYear.length}`,
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
          `ລາຍງານຂໍ້ມູນການຍ້ອງຍໍ-${dateformat(Date.now(), "dd/mm/yyyy")}.pdf`
        );
      }
    },

    //==========================

    async downloadCertificateByNO() {
      if (this.select_NO) {
        var rows = [];
        for (let i in this.dataCertificateReport) {
          rows[i] = {
            index: parseInt(i) + 1,
            name: this.dataCertificateReport[i].member_name,
            surname: this.dataCertificateReport[i].surname,
            gender: this.dataCertificateReport[i].gender,
            typemember: this.dataCertificateReport[i].typemember,
            Tounder: this.dataCertificateReport[i].fund_name,
          };
        }
        var sign_by = this.dataCertificateReport.map((item) => item.sign_by);
        var title = this.dataCertificateReport.map((item) => item.title);
        var certific_NO = this.dataCertificateReport.map(
          (item) => item.certific_NO
        );
        var date = this.dataCertificateReport.map((item) => item.date_sign);
        var amount = this.dataCertificateReport.map((item) => item.amount_cert);
        ///

        // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຊື່", dataKey: "name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ປະເພດສະມາຊິກ", dataKey: "typemember" },
          { title: "ພາກສ່ວນ", dataKey: "Tounder" },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 4, 7.8, 4);

        // Table
        doc.autoTable({
          columns,
          body: rows,
          bodyStyles: {
            overflow: "linebreak",
            tableWidth: "auto",
            //fileColor: [0, 0, 0],
            lineWidth: 0.01,
          },
          margin: { left: 0.5, top: 4.1, right: 0.5 },
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
          .text("ລາຍງານລາຍຊື່ສະມາຊິກທີ່ໄດ້ຮັບການຍ້ອງຍໍ", 4, 2.8, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(
            `ສະມາຊິກຊາວໜຸ່ມໄດ້ຮັບການຍ້ອງຍໍຈາກ:.. ${sign_by[0]}.`,
            0.7,
            3.3,
            {
              align: "left",
              maxWidth: "7.5",
            }
          )
          .text(`ເຊິ່ງມີຜົນງານ: ${title[0]}`, 0.66, 3.6, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ຂໍ້ຕົກລົງເລກທີ ${certific_NO[0]}/ຄຊປປລ,ມຊ..ລົງວັນທີ.${dateformat(
              date[0],
              "dd/mm/yyyy"
            )}. ມີສະມາຊິກທີໄດ້ຮັບການຍ້ອງຍໍທັງໝົດ: ${amount[0]} ສະຫາຍ`,
            7.1,
            3.9,
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
          `ລາຍງານລາຍຊື່ທີ່ໄດ້ຮັບການຍ້ອງຍໍ-${dateformat(
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
.sub-header {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.text-content,
.calender,
.text-tooltip,
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
