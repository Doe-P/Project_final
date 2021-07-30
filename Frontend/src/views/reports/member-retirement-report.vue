<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
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
                  <v-form class="text-content" v-model="valid">
                    <v-row>
                      <v-col cols="6">
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
                              :rules="[required('ວັນທີເລີ່ມຕົ້ນ')]"
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
                              dense
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
                      <v-col cols="6">
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
                              :rules="[required('ວັນທີສຸດທ້າຍ')]"
                              v-model="end_date_format"
                              label="ຫາວັນທີ"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              @blur="end_date = parseEnd_date(end_date_format)"
                              v-on="on"
                              readonly
                              :error-messages="message"
                              outlined
                              dense
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
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        class="button-action"
                        v-on="on"
                        v-bind="attrs"
                        color="primary"
                        :disabled="valid == false"
                        @click.prevent="setShow_button"
                      >
                        <v-icon>clear_all</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
                  </v-tooltip>
                  <span class="ma-2"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        class="button-action"
                        v-on="on"
                        v-bind="attrs"
                        color="primary"
                        :disabled="!valid"
                        @click.prevent="getDataRetirememt_byDate"
                      >
                        <v-icon>table_view</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                  </v-tooltip>
                  <span class="ma-2"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        class="button-action"
                        v-on="on"
                        v-bind="attrs"
                        color="primary"
                        :disabled="!valid"
                        @click.prevent="downloadPDF_byDate"
                      >
                        <v-icon>file_download</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ດາວໂຫຼດ file PDF</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header"
                    >ລາຍງານລາຍຊື່ສະມາຊິກທີ່ພົ້ນກະສຽນ</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content">
                    <v-select
                      :items="Foundations"
                      v-model="select_found"
                      label="ເລືອກຮາກຖານ"
                      outlined
                      dense
                      @change="getFound_ID"
                    ></v-select>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          :items="Years"
                          v-model="year_selected"
                          label="ເລືອກປີ"
                          append-icon="today"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="6" class="pt-7 align-content-end">
                        <v-card-actions class="justify-end">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                              <v-btn
                                class="button-action"
                                v-on="on"
                                v-bind="attrs"
                                color="primary"
                                :disabled="isChecked_butShow"
                                @click.prevent="clearData_a"
                              >
                                <v-icon>clear_all </v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
                          </v-tooltip>
                          <span class="ma-2"></span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                              <v-btn
                                class="button-action"
                                v-on="on"
                                v-bind="attrs"
                                color="primary"
                                :disabled="isChecked_butShow"
                                @click.prevent="getDataRetirememt"
                              >
                                <v-icon>table_view </v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                          </v-tooltip>
                          <span class="ma-2"></span>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                              <v-btn
                                class="button-action"
                                v-on="on"
                                v-bind="attrs"
                                color="primary"
                                :disabled="isChecked_down"
                                @click.prevent="downloadPDF_byYear"
                              >
                                <v-icon>file_download </v-icon>
                              </v-btn>
                            </template>
                            <span class="text-tooltip">ດາວໂຫຼດ file PDF</span>
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

        <v-card
          v-if="isChecked_table == true"
          width="100%"
          color="blue-grey lighten-4"
          class="my-5"
          light
        >
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="DataRetirement"
              class="elevation-5 table-content"
              loading="true"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.NO_Ask }}</td>
                  <td>{{ item.member_name }}</td>
                  <td>{{ item.surname }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.sect_name }}</td>
                  <td>{{ item.unit_name }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.reason }}</td>
                  <td>{{ item.date_retire | formatDate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>

        <v-card
          v-else
          width="80%"
          color="blue-grey lighten-4"
          class="my-5"
          light
        >
          <v-card-text>
            <v-data-table
              :headers="headers_byDate"
              :items="DataRetirement_byDate"
              class="elevation-5 table-content"
              loading="true"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.total }}</td>
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
import dateformat from "dateformat";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "MemberRetirementReport",
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ເລກທີ", value: "retire_NO", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ຈຸ", value: "sect_name", sortable: false },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
        { text: "ເຫດຜົນ", value: "reason", sortable: false },
        { text: "ວັນທີ", value: "date_retire", sortable: false },
      ],
      headers_byDate: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
        {
          text: "ຈຳນວນສະມາຊິກທີ່ຍົກຍ້າຍ (ສະຫາຍ)",
          value: "total",
          sortable: false,
        },
        { text: "ຍິງ (ສະຫາຍ)", value: " women", sortable: false },
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
      valid: false,
      message: "",
      Years: [],
      start_year: 2000,
      isChecked: true,
      select_found: "",
      year_selected: null,
      Foundations: [],
      Foundations_all: [],
      ///
      isChecked_butShow: true,
      isChecked_down: true,
      //
      DataRetirement: [],
      //
      isChecked_table: true,
      DataRetirement_byDate: [],
    };
  },
  created() {
    this.getFoundations();
  },

  mounted() {
    this.setYear();
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
      return this.formatStart_date(this.start_date);
    },
    EndDateFormatted() {
      return this.formatEnd_date(this.end_date);
    },
  },
  methods: {
    setShow_button() {
      this.valid = false;
      this.start_date_format = null;
    },
    //clear

    clearData_a() {
      this.select_found = null;
      this.year_selected = this.Years[0];
      this.DataRetirement = [];
      this.isChecked_butShow = true;
      this.isChecked_down = true;
    },
    // start date
    formatStart_date(date) {
      this.message = "";
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
      this.message = "";
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseEnd_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
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
      for (let i = y; i >= this.start_year; i--) {
        this.Years.push(i);
      }
      this.year_selected = this.Years[0];
    },
    async getFoundations() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/foundations"
        );
        this.Foundations_all = response.data;
        this.Foundations = this.Foundations_all.map((i) => i.fund_name);
      } catch (err) {
        console.log(err);
      }
    },
    //-------------
    getFound_ID() {
      if (this.select_found && this.year_selected) {
        this.isChecked_butShow = false;
      }
    },
    //------------

    async getDataRetirememt() {
      try {
        if (this.select_found && this.year_selected) {
          for (let i in this.Foundations_all) {
            if (
              String(this.select_found) ==
              String(this.Foundations_all[i].fund_name)
            ) {
              const id = this.Foundations_all[i].fund_id;
              let response = await axios.get(
                this.$store.getters.myHostname +
                  `/reportRetireMen/year/fundID/${this.year_selected}/${id}`
              );
              this.DataRetirement = response.data;
              this.isChecked_down = false;
              this.isChecked_table = true;
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getDataRetirememt_byDate() {
      if (this.start_date_format && this.end_date_format) {
        try {
          let response = await axios.get(
            `${this.$store.getters.myHostname}/reportRetireMen/between/Date/${this.start_date}/${this.end_date}`
          );
          this.DataRetirement_byDate = response.data;
          this.isChecked_table = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    //-------------------

    downloadPDF_byYear() {
      if (this.select_found && this.year_selected) {

        const getresult = this.DataRetirement.map(item => item.result);
        const getwomen = this.DataRetirement.map(item => item.women);
        const getdate = this.DataRetirement.map(item => item.date_retire);
        let row =[];
        for(let i in getdate){
          row[i]={
            index:parseInt(i)+1,
            member_name:this.DataRetirement[i].member_name,
            surname:this.DataRetirement[i].surname,
            gender:this.DataRetirement[i].gender,
            sect_name:this.DataRetirement[i].sect_name,
            unit_name:this.DataRetirement[i].unit_name,
            reason:this.DataRetirement[i].reason,
            date_retire:dateformat(this.DataRetirement[i].date_retire,"dd/mm/yyyy")
          }
        }
        // table columns
        const columns = [
           { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຊື່", dataKey: "member_name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ຈຸ", dataKey: "sect_name" },
          { title: "ໜ່ວຍ", dataKey: "unit_name" },
          { title: "ເຫດຜົນ", dataKey: "reason" },
          { title: "ວັນທີ", dataKey: `date_retire` },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "l",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3.2, 11.2, 3.2);
        
        // Table
        doc.autoTable({
          columns,
          body: row,
          margin: { left: 0.5, top: 3.3, right: 0.5 },
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
          .text("ລາຍງານລາຍຊື່ສະມາຊິກທີ່ພົ້ນກະສຽນ", 6, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
           .text(`ຮາກຖານ: ${this.select_found}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ປະຈຳປີ: ${this.year_selected}`, 0.5, 3.1, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ລວມສະມາຊິກພົ້ນກະສຽນທັງໝົດ:..${getresult}..ສະຫາຍ, ຍິງ:.${getwomen}.ສະຫາຍ`, 11, 3.1, {
            align: "right",
            maxWidth: "7.5",
          });
        doc.setFontSize(12).text("ຜູ້ສັງລວມ", 10.9, 32 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານຈຳນວນສະມາຊິກທີ່ພົ້ນກະສຽນ-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
    },

    //=================

      downloadPDF_byDate() {
      if (this.start_date_format && this.end_date_format) {
        let row =[];
        for(let i in this.DataRetirement_byDate){
          row[i]={
            index:parseInt(i)+1,
            fund_name:this.DataRetirement_byDate[i].fund_name,
            total:this.DataRetirement_byDate[i].total,
            women:this.DataRetirement_byDate[i].women,
          }
        }
        // table columns
        const columns = [
           { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຮາກຖານ", dataKey: "fund_name" },
          { title: "ລວມສະມາຊິກທັງໝົດ", dataKey: "total" },
          { title: "ຍິງ", dataKey: "women" },
        ];

        //set format PDF
        const doc = new jsPDF({
          orientation: "p",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3.3, 7.7, 3.3);
        
        // Table
        doc.autoTable({
          columns,
          body: row,
          margin: { left: 0.5, top: 3.4, right: 0.5 },
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
          .addImage("nation.png", "PNG", 3.9, 0.25, 0.8, 0.8)
          .setFontSize(11)
          .text("ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ", 4.2, 1.4, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ", 4.2, 1.6, {
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
          .text("ເລກທີ............/ຄຊປປລ ມຊ", 7.5, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            7.5,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(14)
          .text("ລາຍງານຂໍ້ມູນການພົ້ນກະສຽນ", 4, 2.8, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
           .text(`ປະຈຳວັນທີ: ${this.start_date_format} ຫາ ${this.end_date_format}`, 4, 3.1, {
            align: "center",
            maxWidth: "7.5",
           })
        doc.setFontSize(12).text("ຜູ້ສັງລວມ", 7, 35 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານຂໍ້ມູນການພົ້ນກະສຽນ-${dateformat(
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
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
.button-action:hover{
  transition-delay: 2ms;
  transform: translateY(-8px);
}
</style>
