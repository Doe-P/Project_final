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
            class="elevation-1 table-content"
            item-key="member_id"
            loading="true"
            show-select
            v-model="selected"
            @input="Isselected($event)"
            :search="searchData"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນຮາກຖານ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="searchData"
                ></v-text-field>
                <v-divider class="px-3 mr-3" inset vertical></v-divider>
                <v-select
                  class="mt-5 mx-4"
                  :items="items"
                  v-model="value"
                  label="ເລືອກຮາກຖານ"
                  hint="ກະລຸນາເລືອກຮາກຖານກ່ອນ"
                ></v-select>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-card-text>
            <v-form class="text-form" >
              <v-row class="mx-10">
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ລະຫັດການຮັບເງິນສະຕິ"
                    id="id"
                    value="xxx"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ເລກທີໃບຮັບເງິນ"
                    id="id"
                    value="xxx"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="Year_select"
                    v-model="select_year"
                    label="ສົກຮຽນ"
                    :rules="[required('ສົກຮຽນ')]"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ຮາກຖານ"
                    id="id"
                    value="xxx"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ຈຳນວນເງິນທັງໝົດ"
                    id="id"
                    value="xxx"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ຈຳນວນເງິນ 50%"
                    id="id"
                    value="xxx"
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="6">
                      <span>ເລືອກງວດທີ່ຕ້ອງຊຳລະ</span>
                   <v-radio-group v-model="value_select" row>
                       <v-radio label="ງວດທີ I" value="ງວດທີ I"></v-radio>
                       <v-radio label="ງວດທີ II" value="ງວດທີ II"></v-radio>
                        <v-radio label="ໝົດປີ" value="ໝົດປີ"></v-radio>
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
                      :rules="[required('ວັນທີ')]"
                        v-model="receive_date_format"
                        label="ວັນທີ"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="
                          recevie_date = parseReceive_date(receive_date_format)
                        "
                        v-on="on"
                        readonly
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
              <v-btn @click="$router.push('/receive-money')" color="error">
                  ຍົກເລີກ
              </v-btn>
              <v-btn :disabled="isChecked" color="primary">ບັນທຶກ</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ReceiveCreate",
  data() {
    return {
         //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      headers: [
        { text: "ຊື່", value: "member_id", sortable: false },
        { text: "ນາມສະກຸນ", value: "member_surname", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ເງິນສະຕິ", value: "money", sortable: false },
        { text: "ຈຸ", value: "section", sortable: true },
        { text: "ໜ່ວຍ", value: "unit", sortable: false },
        { text: "ຮາກຖານ", value: "foundation", sortable: false },
      ],
      Data_members: [{ member_id: 1 }, { member_id: 2 }],
      selected: [],
      isChecked: true,
      searchData: null,
      // date
      receive_date: new Date().toISOString().substr(0, 10),
      receive_date_menu: false,
      receive_date_format: null,
      value_select:"ງວດທີ I",
      select_year:null,
      Year_start:null,
      Year_select:[],
    };
  },

  mounted() {
    this.setYear_select();
  },
 watch: {
    receive_date() {
      this.receive_date_format = this.formatReceive_date(this.receive_date);
    },
  },
   computed: {
    ReceiveDateFormatted() {
      return this.formatReceive_date(this.receive_date);
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
        this.isChecked = false;
      } else {
        this.isChecked = true;
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
        str = (i.toString() + "-" + n.toString()).toString();
        this.Year_select.push(str);
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
.header{
     font-family: "boonhome-400";
  font-size: 18px;
}
</style>
