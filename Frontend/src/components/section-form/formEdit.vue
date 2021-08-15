<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getsect_formEdit.isShow"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ແກ້ໄຂຂໍ້ມູນຈຸ
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
                    label="ຊື່ຈຸ"
                    :rules="[
                      required('ຊື່ຈຸ'),
                      minLength('ຊື່ຈຸ', 5),
                      maxLength('ຊື່ຈຸ', 50),
                    ]"
                    counter="50"
                    required
                    v-model="txt_sectname_edit"
                  ></v-text-field>
                  <v-select
                    :items="myFoundation"
                    :rules="[required('ຮາກຖານ')]"
                    v-model="found_name"
                    label="ເລືອກຮາກຖານ"
                    dense
                    @input="get_Units"
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
                      v-model="menu_sect_date_edit"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_sect_date_edit"
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍຈຸ')]"
                          label="ວັນເດືອນປີຂະຫຍາຍຈຸ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="
                            sect_date_edit = parsesect_date_edit(
                              format_sect_date_edit
                            )
                          "
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calendar"
                        ref="picker"
                        v-model="sect_date_edit"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                        locale="lao"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-radio-group v-model="statusSelected" row>
                    <v-radio label="ບັນຈຸ" value="ບັນຈຸ"></v-radio>
                    <v-radio label="ບໍ່ໄດ້ບັນຈຸ" value="ບໍ່ໄດ້ບັນຈຸ"></v-radio>
                  </v-radio-group>
                  <v-btn text @click="close_form_edit" color="error"
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
//import moment from "moment";
import dateformat from "dateformat";
export default {
  name: "Formedit",
  data() {
    return {
      // form edit
      sect_date_edit: new Date().toISOString().substr(0, 10),
      menu_sect_date_edit: false,
      format_sect_date_edit: null,
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
      myFoundation: [],
      get_found_all: [],
      myUnitnames: [],
      get_unit_all: [],
      //-----------
      statusSelected: "ບັນຈຸ",
      txt_sectname_edit: null,
      unit_name: null,
      found_name: null,
      unitID: null,
      get_date: null,
    };
  },
  mounted() {
    this.getdata_found_selection();
  },
  watch: {
    // form edit
    sect_date_edit() {
      this.format_sect_date_edit = this.formatsect_date_edit(
        this.sect_date_edit
      );
    },
    reload_data() {
      this.getSect_byID();
    },
  },
  computed: {
    // form edit
    computedDateFormatted_edit() {
      return this.formatsect_date_edit(this.sect_date_edit);
    },
    reload_data() {
      return this.getSect_byID();
    },
  },
  methods: {
    // form edit
    formatsect_date_edit(date) {
      if (!date) return null;
      this.get_date = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parsesect_date_edit(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //close form edit
    close_form_edit() {
      this.$store.dispatch({
        type: "clickShow_sect_formEdit",
        id: "",
        name: "",
      });
    },
    // get data foundation
    async getdata_found_selection() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname + "/api/v1/getItem/foundations"
        );
        this.get_found_all = response.data;
        for (let i = 0; i <= this.get_found_all.length; i++) {
          this.myFoundation.push(this.get_found_all[i].fund_name);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // get unit name
    async getData_Unit() {
      for (let a = 0; a <= this.get_found_all.length; a++) {
        if (
          String(this.found_name).valueOf() ==
          String(this.get_found_all[a].fund_name).valueOf()
        ) {
          const id = this.get_found_all[a].fund_id;
          try {
            let response = await axios.get(
              `${this.$store.getters.myHostname}/api/v1/getItem-units/${id}`
            );
            this.myUnitnames = [];
            this.get_unit_all = response.data;
            for (let i = 0; i <= this.get_unit_all.length; i++) {
              this.myUnitnames.push(this.get_unit_all[i].unit_name);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    get_Units() {
      this.myUnitnames = [];
      this.unit_name = "";
      this.getData_Unit();
    },
    async getSect_byID() {
      const id = this.$store.getters.getsect_formEdit.id;
      try {
        await axios
          .get(`${this.$store.getters.myHostname}/api/v1/sections/${id}`)
          .then((response) => {
            (this.txt_sectname_edit = response.data.sect_name),
              (this.format_sect_date_edit = dateformat(
                response.data.date_sect,
                "dd-mm-yyyy"
              )),
              (this.get_date = dateformat(
                response.data.date_sect,
                "yyyy-mm-dd"
              )),
              (this.statusSelected = response.data.status_sect);
            for (let i = 0; i <= this.get_found_all.length; i++) {
              if (
                String(this.$store.getters.getsect_formEdit.name).valueOf() ==
                String(this.get_found_all[i].fund_name).valueOf()
              ) {
                this.found_name = this.get_found_all[i].fund_name;
                const id = this.get_found_all[i].fund_id;

                axios
                  .get(
                    `${this.$store.getters.myHostname}/api/v1/getItem-units/${id}`
                  )
                  .then((res) => {
                    this.get_unit_all = res.data;
                    for (let i = 0; i <= this.get_unit_all.length; i++) {
                      this.myUnitnames.push(this.get_unit_all[i].unit_name);
                      if (
                        String(response.data.unit_id).valueOf() ==
                        String(this.get_unit_all[i].unit_id).valueOf()
                      ) {
                        this.unit_name = this.get_unit_all[i].unit_name;
                        this.unitID = this.get_unit_all[i].unit_id;
                      }
                    }
                  });
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    // save data
    async Submit_form() {
      const get_id_sect = this.$store.getters.getsect_formEdit.id;
      for (let i = 0; i <= this.get_unit_all.length; i++) {
        if (
          String(this.unit_name).valueOf() ==
          String(this.get_unit_all[i].unit_name).valueOf()
        ) {
          this.unitID = this.get_unit_all[i].unit_id;
          try {
            await axios
              .put(
                `${this.$store.getters.myHostname}/api/v1/sections/${get_id_sect}`,
                {
                  sect_name: this.txt_sectname_edit,
                  unit_id: this.unitID,
                  date_sect: this.get_date,
                  status_sect: this.statusSelected,
                }
              )
              .then(() => {
                this.close_form_edit = false;
                this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
                location.reload();
              });
          } catch (err) {
            this.close_form_edit = false;
            console.log(err);
            alert(err);

            this.Msg_fail("ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ");
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
