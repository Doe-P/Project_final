<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getunit_formEdit.isShow"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ແກ້ໄຂຂໍ້ມູນໜ່ວຍ
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
                    label="ຊື່ໜ່ວຍ"
                    counter="50"
                    :rules="[
                      required('ຊື່ໜ່ວຍ'),
                      minLength('ຊື່ໜ່ວຍ', 5),
                      maxLength('ຊື່ໜ່ວຍ', 50),
                    ]"
                    required
                    v-model="txt_unitname_edit"
                  ></v-text-field>
                  <v-select
                    :items="myfoundnames"
                    :rules="[required('ຮາກຖານ')]"
                    v-model="found_name"
                    label="ເລືອກຮາກຖານ"
                    dense
                  ></v-select>
                  <template>
                    <v-menu
                      ref="menu_unit_date"
                      v-model="menu_unit_date_edit"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_unit_date_edit"
                          label="ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ"
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ')]"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="
                            unit_date_edit = parseUnit_date_edit(
                              format_unit_date_edit
                            )
                          "
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                       class="calendar"
                        ref="picker"
                        v-model="unit_date_edit"
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
                  <v-btn @click="close_form_edit" color="error">ຍົກເລີກ</v-btn>
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
import moment from "moment";
import dateformat from "dateformat";
export default {
  name: "Formedit",
  data() {
    return {
      // form edit
      unit_date_edit: new Date().toISOString().substr(0, 10),
      menu_unit_date_edit: false,
      format_unit_date_edit: null,
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
      //-------------------
      statusSelected: "ບັນຈຸ",
      txt_unitname_edit: null,
      found_name: null,
      //-------------
      myfoundnames: [],
      get_foundationAll: [],
      select_fund_id: "",
      get_id: null,
    };
  },
  mounted() {
    this.getdata_found_selection();
  },
  watch: {
    // form edit
    unit_date_edit() {
      this.format_unit_date_edit = this.formatUnit_date_edit(
        this.unit_date_edit
      );
    },
    // get data unit by id
    reload_data() {
      this.getData_byID();
    },
  },
  computed: {
    // form edit
    computedDateFormatted_edit() {
      return this.formatUnit_date_edit(this.unit_date_edit);
    },
    // loading data to text
    reload_data() {
      return this.getData_byID();
    },
  },
  methods: {
    // form edit
    formatUnit_date_edit(date) {
      if (!date) return null;
      this.get_id = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseUnit_date_edit(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form edit
    close_form_edit() {
      this.$store.dispatch({
        type: "clickShow_unit_formEdit",
        id: "",
      });
    },
    //get foundations name from api
    async getdata_found_selection() {
      try {
        let response = await axios.get(
          "http://localhost:5000/api/v1/getItem/foundations"
        );
        this.get_foundationAll = response.data;
        for (let i = 0; i <= this.get_foundationAll.length; i++) {
          this.myfoundnames.push(this.get_foundationAll[i].fund_name);
        }
      } catch (err) {
        console.log(err);
      }
    },
    //get data unit by id from api
    async getData_byID() {
      const get_unit_id = this.$store.getters.getunit_formEdit.id;
      try {
        await axios
          .get(`http://localhost:5000/api/v1/units/${get_unit_id}`)
          .then((response) => {
            (this.txt_unitname_edit = response.data.unit_name),
              (this.found_name = response.data.fund_name),
              (this.format_unit_date_edit = moment(
                response.data.date_unit
              ).format("DD-MM-YYYY")),
              this.get_id=dateformat(response.data.date_unit,"yyyy-mm-dd"),
              (this.statusSelected = response.data.status_unit);
          });
      } catch (err) {
        console.log(err);
        this.close_form_edit();
      }
    },
    // update data unit
    async Submit_form() {
      const get_unit_id = this.$store.getters.getunit_formEdit.id;
      for (let i = 0; i <= this.get_foundationAll.length; i++) {
        if (
          String(this.found_name).valueOf() ==
          String(this.get_foundationAll[i].fund_name).valueOf()
        ) {
          try {
            this.select_fund_id = this.get_foundationAll[i].fund_id;
            await axios
              .put(`http://localhost:5000/api/v1/units/${get_unit_id}`, {
                unit_name: this.txt_unitname_edit,
                fund_id: this.select_fund_id,
                date_unit: this.get_id,
                status_unit: this.statusSelected,
              })
              .then(() => {
                this.close_form_edit();
                this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
                location.reload();
              });
          } catch (err) {
            console.log(err);
            this.close_form_edit();
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
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
.calendar{
   font-family: "boonhome-400";
  font-weight: normal;
  font-size: 14px;
}
</style>
