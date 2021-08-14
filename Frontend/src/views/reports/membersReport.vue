<template>
  <div>
    <template>
      <v-card color="teal lighten-1" class="ma-5" dark>
        <v-card-title class="justify-center">
          <span class="text-title">ລາຍງານສະມາຊິກຕາມຮາກຖານ, ໜ່ວຍ ແລະ ຈຸ</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle>
          <v-row class="table-content">
            <v-col cols="4">
              <v-select
                :items="myData_foundation"
                v-model="found_selected"
                label="ລາຍງານຕາມຮາກຖານ"
                @input="ValidateBtn_Found($event)"
                @change="Search_Foundation"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="myData_unit"
                v-model="unit_selected"
                label="ເລືອກໜ່ວຍ"
                @input="ValidateBtn_Unit($event)"
                outlined
                dense
                @change="Search_Unit"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="myData_section"
                v-model="section_selected"
                label="ເລືອກຈຸ"
                @input="ValidateBtn_Sect($event)"
                outlined
                dense
                @change="Search_Section"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-actions class="justify-start">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="printFoundation"
                color="green accent-3"
                class="elevation-1 button-action"
                v-on="on"
                v-bind="attrs"
                :disabled="valid_Found"
              >
                <v-icon color="teal lighten-1">assignment</v-icon>
                <small color="primary" class="button-text">ຮາກຖານ</small>
              </v-btn>
            </template>
            <span class="text-tooltip">ລາຍງານຕາມຮາກຖານ</span>
          </v-tooltip>
          <span class="mx-5"></span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="printUnit"
                color="green accent-3"
                class="elevation-1 button-action"
                v-on="on"
                v-bind="attrs"
                :disabled="valid_Unit"
              >
                <v-icon color="teal lighten-1">assignment</v-icon>
                <small class="button-text">ຕາມໜ່ວຍ</small>
              </v-btn>
            </template>
            <span class="text-tooltip">ລາຍງານຕາມໜ່ວຍ</span>
          </v-tooltip>
          <span class="mx-5"></span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="printSection"
                color="green accent-3"
                class="elevation-1 button-action"
                v-on="on"
                v-bind="attrs"
                :disabled="valid_Sect"
              >
                <v-icon color="teal lighten-1">assignment</v-icon>
                <small class="button-text">ຕາມຈຸ</small>
              </v-btn>
            </template>
            <span class="text-tooltip">ລາຍງານຕາມຈຸ</span>
          </v-tooltip>
          <span class="mx-5"></span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="ClearData"
                color="green accent-3"
                class="elevation-1 button-action"
                v-on="on"
                v-bind="attrs"
                :disabled="valid_clear"
              >
                <v-icon color="teal lighten-1">clear_all</v-icon>
                <small class="button-text">ລ້າງຂໍ້ມູນ</small>
              </v-btn>
            </template>
            <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
      <div ref="myTable">
        <v-container fluid>
          <v-row justify="center">
            <v-card width="100%" class="mx-5">
              <v-data-table
                :headers="headers"
                :items="myData_members"
                class="elevation-4 table-content"
                item-key="member_id"
                :loading="loading"
                loading-text="ກຳລັງໂຫຼດ.."
              >
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
            </v-card>
          </v-row>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import dateformat from "dateformat";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@/assets/SaysetthaOT.js";
export default {
  name: "Membersreport",
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", align: "Left", value: "index" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ໜ້າທີຮັບຜິດຊອບ", value: "responsible", sortable: true },
        { text: "ສະຖານະ", value: "status", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
      ],
      myData_foundation: [],
      myData_unit: [],
      myData_section: [],
      found_selected: null,
      unit_selected: null,
      section_selected: null,
      mydataMember: [],
      myData_members: [],
      // valid form
      valid_Found: true,
      valid_Unit:true,
      valid_Sect:true,
      valid_clear:true,
      loading: true,
      //show Form
    };
  },
  created() {
    this.Foundations();
    this.Sections();
    this.Units();
    this.dataMember();
  },

  mounted() {},

  methods: {
    //Foundation
    printFoundation() {
      if (this.found_selected) {
        var femaleCount = this.myData_members.filter(
          (val) => String(val.gender) == "ຍິງ"
        ).length;

        // table columns
        const columns = [
          { title: "ລ/ດ", dataKey: "index" },
          { title: "ຊື່", dataKey: "member_name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ປະເພດສະມາຊິກ", dataKey: "typemember" },
          { title: "ໜ້າທີ່ຮັບຜິດຊອບ", dataKey: "responsible" },
          { title: "ສະຖານະ", dataKey: "status" },
          { title: "ຈຸ", dataKey: "sect_name" },
          { title: "ໜ່ວຍ", dataKey: "unit_name" },
        ];

        let rows = [];
        for (let i in this.myData_members) {
          rows[i] = {
            index: parseInt(i) + 1,
            member_name: this.myData_members[i].member_name,
            surname: this.myData_members[i].surname,
            gender: this.myData_members[i].gender,
            typemember: this.myData_members[i].typemember,
            responsible: this.myData_members[i].responsible,
            status: this.myData_members[i].status,
            sect_name: this.myData_members[i].sect_name,
            unit_name: this.myData_members[i].unit_name,
          };
        }

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3, 7.8, 3);

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
          .text("ລາຍຊື່ສະມາຊິກ ຊາວໜຸ່ມ", 4, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ຮາກຖານ: ${this.found_selected}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ລວມ: ${this.myData_members.length}  ສະຫາຍ,  ຍິງ: ${femaleCount}  ສະຫາຍ `,
            7.7,
            2.9,
            {
              align: "right",
              maxWidth: "7.5",
            }
          );
        // save pdf
        // doc.autoPrint();
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
          startY: 3.2,
          showHead: "firstPage",
          margin: { left: 0.2, right: 0.2 },
          styles: { font: "Saysettha OT", overflow: "linebreak" },
          columnStyles: {
            index: { columnWidth: 0.4 },
            member_name: { columnWidth: 1 },
            surname: { columnWidth: 1 },
            gender: { columnWidth: 0.4 },
            typemember: { columnWidth: 0.8 },
            responsible: { columnWidth: 0.8 },
            status: { columnWidth: 0.7 },
            sect_name: { columnWidth: 1.35 },
            unit_name: { columnWidth: 1.4 },
          },
        });

        doc.text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        doc.save(
          `ລາຍງານລາຍຊື່ສະມາຊິກຮາກຖານ${this.found_selected}-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
    },
    //Unit
    printUnit() {
      if (this.unit_selected && this.found_selected) {
        var femaleCount = this.myData_members.filter(
          (val) => String(val.gender) == "ຍິງ"
        ).length;

        // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຊື່", dataKey: "member_name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ປະເພດສະມາຊິກ", dataKey: "typemember" },
          { title: "ໜ້າທີ່ຮັບຜິດຊອບ", dataKey: "responsible" },
          { title: "ສະຖານະ", dataKey: "status" },
          { title: "ຈຸ", dataKey: "sect_name" },
        ];

        let rows = [];
        for (let i in this.myData_members) {
          rows[i] = {
            index: parseInt(i) + 1,
            member_name: this.myData_members[i].member_name,
            surname: this.myData_members[i].surname,
            gender: this.myData_members[i].gender,
            typemember: this.myData_members[i].typemember,
            responsible: this.myData_members[i].responsible,
            status: this.myData_members[i].status,
            sect_name: this.myData_members[i].sect_name,
          };
        }
        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3.3, 7.8, 3.3);

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
          .text("ລາຍຊື່ສະມາຊິກ ຊາວໜຸ່ມ", 4, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ຮາກຖານ: ${this.found_selected}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ໜ່ວຍ: ${this.unit_selected}`, 0.5, 3.2, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ລວມ: ${this.myData_members.length}  ສະຫາຍ,  ຍິງ: ${femaleCount}  ສະຫາຍ `,
            7.7,
            3.2,
            {
              align: "right",
              maxWidth: "7.5",
            }
          );
        // Table
        doc.autoTable({
          columns,
          body: rows,
          bodyStyles: {
            overflow: "linebreak",
            // tableWidth: "auto",
            //fileColor: [0, 0, 0],
            lineWidth: 0.01,
          },
          startY: 3.4,
          showHead: "firstPage",
          margin: { left: 0.5, right: 0.5 },
          styles: { font: "Saysettha OT", overflow: "linebreak" },
          // columnStyles: {
          //   member_name: { columnWidth: 20 },
          //   surname: { columnWidth: 20 },
          //   gender: { columnWidth: 10 },
          //   typemember: { columnWidth: 20 },
          //   level_name: { columnWidth: 20 },
          //   status: { columnWidth: 10 },
          // },
        });

        doc.text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.save(
          `ລາຍງານລາຍຊື່ສະມາຊິກໜ່ວຍ${this.unit_selected}_${dateformat(
            Date.now(),
            "dd-mm-yyyy"
          )}.pdf`
        );
      }
    },
    // section
    printSection() {
      if (this.unit_selected && this.found_selected && this.section_selected) {
        var femaleCount = this.myData_members.filter(
          (val) => String(val.gender) == "ຍິງ"
        ).length;

        // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຊື່", dataKey: "member_name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ປະເພດສະມາຊິກ", dataKey: "typemember" },
          { title: "ໜ້າທີ່ຮັບຜິດຊອບ", dataKey: "responsible" },
          { title: "ສະຖານະ", dataKey: "status" },
        ];

        let rows = [];
        for (let i in this.myData_members) {
          rows[i] = {
            index: parseInt(i) + 1,
            member_name: this.myData_members[i].member_name,
            surname: this.myData_members[i].surname,
            gender: this.myData_members[i].gender,
            typemember: this.myData_members[i].typemember,
            responsible: this.myData_members[i].responsible,
            status: this.myData_members[i].status,
            sect_name: this.myData_members[i].sect_name,
          };
        }

        //set format PDF
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });

        //set font and line
        doc.setFontSize(10);
        doc.setLineWidth(0.01).line(0.5, 3.5, 7.8, 3.5);

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

          margin: { left: 0.5, top: 3.6, right: 0.5 },
          styles: {
            font: "Saysettha OT",
          },
          tableLineWidth: 0,
          columnWidth: {
            member_name: { columnWidth: 20 },
            surname: { columnWidth: 20 },
            gender: { columnWidth: 10 },
            typemember: { columnWidth: 20 },
            level_name: { columnWidth: 20 },
            status: { columnWidth: 10 },
          },
          headerStyles: {
            theme: "grid",
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
          .text("ລາຍຊື່ສະມາຊິກ ຊາວໜຸ່ມ", 4, 2.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ຮາກຖານ: ${this.found_selected}`, 0.5, 2.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ໜ່ວຍ: ${this.unit_selected}`, 0.5, 3.15, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ຈຸ: ${this.section_selected}`, 0.5, 3.4, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(
            `ລວມ: ${this.myData_members.length}  ສະຫາຍ,  ຍິງ: ${femaleCount}  ສະຫາຍ `,
            7.7,
            3.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          );
        doc.text("ຜູ້ສັງລວມ", 27 - 20, 35.5 - 25, null, null, "right");
        // save pdf
        // doc.autoPrint();

        doc.save(
          `ລາຍງານລາຍຊື່ສະມາຊິກຈຸ${this.section_selected}_${dateformat(
            Date.now(),
            "dd-mm-yyyy"
          )}.pdf`
        );
      }
    },
    ValidateBtn_Found(value) {
      if (value != "") {
        this.valid_Found = false;
        this.valid_clear = false;
        this.valid_Unit = true;
        this.valid_Sect = true;
      } else {
        this.valid_Found = true;
      }
    },
      ValidateBtn_Unit(value) {
      if (value != "") {
        this.valid_Unit = false;
        this.valid_Found = true;
        this.valid_Sect = true;
      } else {
        this.valid_Unit = true;
      }
    },
    ValidateBtn_Sect(value) {
      if (value != "") {
        this.valid_Sect= false;
        this.valid_Unit = true;
        this.valid_Found = true;
      } else {
        this.valid_Sect = true;
      }
    },
    ClearData() {
      this.found_selected = null;
      this.unit_selected = null;
      this.section_selected = null;
      this.valid_Found= true,
      this.valid_Unit=true,
      this.valid_Sect=true,
      this.valid_clear=true,
      this.myData_members = [];
    },
    async dataMember() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/members/status"
        );
        this.mydataMember = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async Foundations() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/foundations"
        );
        var found = response.data;
        this.myData_foundation = found.map((item) => item.fund_name);
      } catch (err) {
        console.log(err);
      }
    },
    async Sections() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/sections"
        );
        var section = response.data;
        this.myData_section = section.map((item) => item.sect_name);
      } catch (err) {
        console.log(err);
      }
    },
    async Units() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/units"
        );
        var unit = response.data;
        this.myData_unit = unit.map((item) => item.unit_name);
      } catch (err) {
        console.log(err);
      }
    },
    Search_Foundation() {
      if (this.found_selected) {
        this.myData_members = this.mydataMember.filter(
          (value) => String(value.fund_name) == String(this.found_selected)
        );
        this.unit_selected = null;
        this.section_selected = null;
      }
    },
    Search_Unit() {
      if (this.unit_selected) {
        this.myData_members = this.mydataMember.filter(
          (value) => String(value.unit_name) == String(this.unit_selected)
        );
        this.section_selected = null;
      }
    },
    Search_Section() {
      if (this.section_selected) {
        this.myData_members = this.mydataMember.filter(
          (value) => String(value.sect_name) == String(this.section_selected)
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-family: "boonhome-400";
  font-size: 24px;
}
.text-tab,
.table-content,
.text-tooltip,
.button-text {
  font-family: "boonhome-400";
  font-size: 14px;
}
.button-action:hover {
  transition-delay: 2ms;
  transform: translateY(-10px);
}
</style>
