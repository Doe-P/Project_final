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
                            :rules="[required('ວັນທີສຸດທ້າຍ')]"
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
                            @click="submit"
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
                            @click.prevent="downloadStatisticPDF"
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
        <v-card width="100%" color="grey lighten-4">
          <v-card-text>
           <div ref="myTable">
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
                      <th :key="'header3' + idx_3">{{ headeritem_3.text }}</th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
                    <td>{{ item.fund_name }}</td>
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
import jsPDF from 'jspdf';
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
          text: "ຈຳນວນໜ່ວຍ",
          rowspan: 2,
          colspan: 2,
          align: "center",
        },
        {
          text: "ຈຳນວນຈຸ",
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
        { text: "ຍ" },

        //------------
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
      valid: false,
      isCheck_download: true,
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
      return this.formatStart_date(this.start_date);
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
    submit() {
      if (this.start_date_format > this.end_date_format) {
        this.$store.dispatch({
          type: "doClick_myMsg",
          mshow: true,
          mcolor: "error",
          micon: "error",
          message: "ຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຄືນໃໝ່",
        });
      }
    },

    //==================

    ClearAll() {
      this.valid = false;
      this.isCheck_download = true;
      this.start_date_format = null;
      this.end_date_format = dateformat(Date.now(), "dd-mm-yyyy");
    },

    //-------------

    downloadStatisticPDF(){
      const doc = new jsPDF();

      const html = this.$refs.myTable.innerHTML

      doc.formHTML(html,15,15,{
        Width:150
      })

      doc.save('output.pdf')
    }
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
