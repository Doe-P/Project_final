<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getsect_formAdd"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ເພີ່ມຂໍ້ມູນຈຸ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  class="table-content"
                  v-model="valid"
                  @submit.prevent="Submit_form"
                >
                  <v-text-field
                    label="ລະຫັດຈຸ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                  <v-divider></v-divider>
                  <v-text-field
                    label="ຊື່ຈຸ"
                    required
                    counter="30"
                    :rules="[
                      required('ຊື່ຈຸ'),
                      minLength('ຊື່ຈຸ', 5),
                      maxLength('ຊື່ຈຸ', 30),
                    ]"
                    v-model="txt_sectname"
                  ></v-text-field>
                  <v-select
                    :items="myFoundations"
                    :rules="[required('ຮາກຖານ')]"
                    v-model="found_name"
                    label="ເລືອກຮາກຖານ"
                    dense
                    @input="get_units"
                  ></v-select>
                  <v-select
                    :items="myUnitnames"
                    :rules="[required('ໜ່ວຍ')]"
                    v-model="unit_name"
                    label="ເລືອກໜ່ວຍ"
                    dense
                  ></v-select>
                  <template>
                    <v-menu
                      ref="menu_sect_date"
                      v-model="menu_sect_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_sect_date"
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍຈຸ')]"
                          label="ວັນເດືອນປີຂະຫຍາຍຈຸ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="sect_date = parseSect_date(format_sect_date)"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calendar"
                        ref="picker"
                        v-model="sect_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                        locale="lao"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-radio-group v-model="statusSelected" row>
                    <v-radio
                      label="ບັນຈຸ"
                      value="ບັນຈຸ"
                      @click="isSelected"
                    ></v-radio>
                    <v-radio
                      label="ບໍ່ໄດ້ບັນຈຸ"
                      value="ບໍ່ໄດ້ບັນຈຸ"
                      @click="isSelected"
                    ></v-radio>
                  </v-radio-group>
                  <v-btn text @click="close_form_add" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <span></span>
                  <v-btn
                    type="submit"
                    color="primary"
                    class="mx-10"
                    :disabled="!valid"
                    >ບັນທຶກ</v-btn
                  >
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Formadd",
  data() {
    return {
      sect_date: new Date().toISOString().substr(0, 10),
      menu_sect_date: false,
      format_sect_date: null,
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      minLength(propertyType, minlength) {
        return (v) =>
          (v && v.length >= minlength) ||
          `${propertyType}ຕ້ອງຫຼາຍກວ່າຫຼືເທົ່າກັບ ${minlength}`;
      },
      maxLength(propertyType, maxlength) {
        return (v) =>
          (v && v.length <= maxlength) ||
          `${propertyType}ຕ້ອງໜ້ອຍກວ່າຫຼືເທົ່າກັບ ${maxlength}`;
      },
      // valid form
      valid: false,
      //---------
      myUnitnames: [],
      getUnitnameAll: [],
      myFoundations: [],
      get_found_All: [],
      //-----------
      statusSelected: "ບັນຈຸ",
      txt_sectname: null,
      unit_name: null,
      found_name: null,
    };
  },
  mounted() {
    this.getMaxID();
    this.getdata_found_selection();
  },
  watch: {
    sect_date() {
      this.format_sect_date = this.formatsect_date(this.sect_date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatsect_date(this.sect_date);
    },
  },
  methods: {
    formatsect_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parsesect_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //close form add
    close_form_add() {
      this.$store.dispatch({
        type: "clickShow_sect_formAdd",
      });
    },
    // get Max ID
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/Sections-MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "S0001",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    // get unit name
    async getData_Unit() {
      this.myUnitnames = [];
      this.unit_name = null;
      for (let a = 0; a <= this.get_found_All.length; a++) {
        if (
          String(this.found_name).valueOf() ==
          String(this.get_found_All[a].fund_name).valueOf()
        ) {
          const id = this.get_found_All[a].fund_id;
          try {
            let response = await axios.get(
              `${this.$store.getters.myHostname}/api/v1/getItem-units/${id}`
            );
            this.getUnitnameAll = response.data;
            for (let i = 0; i <= this.getUnitnameAll.length; i++) {
              this.myUnitnames.push(this.getUnitnameAll[i].unit_name);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    // get data foundation
    async getdata_found_selection() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/getItem/foundations"
        );
        this.get_found_All = response.data;
        for (let i = 0; i <= this.get_found_All.length; i++) {
          this.myFoundations.push(this.get_found_All[i].fund_name);
        }
      } catch (err) {
        console.log(err);
      }
    },
    get_units() {
      this.getData_Unit();
    },
    // save data
    async Submit_form() {
      for (let i = 0; i <= this.getUnitnameAll.length; i++) {
        if (
          String(this.unit_name).valueOf() ==
          String(this.getUnitnameAll[i].unit_name).valueOf()
        ) {
          const id = this.getUnitnameAll[i].unit_id;
          try {
            await axios
              .post(this.$store.getters.myHostname + "/api/v1/sections", {
                sect_id: this.$store.getters.getCustomID,
                sect_name: this.txt_sectname,
                unit_id: id,
                date_sect: this.sect_date,
                status_sect: this.statusSelected,
              })
              .then(() => {
                this.close_form_add();
                this.Msg_done("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
                location.reload();
              });
          } catch (err) {
            console.log(err);
            this.close_form_add();
            this.Msg_done("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
          }
        }
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
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.table-content {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.text-header-dialog,
.calendar {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>
