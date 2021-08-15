<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="$store.getters.getfound_formAdd"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ເພີ່ມຂໍ້ມູນຮາກຖານ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  class="table-content"
                  @submit.prevent="submit_form"
                  v-model="valid"
                >
                  <v-text-field
                    label="ລະຫັດຮາກຖານ"
                    :value="$store.getters.getCustomID"
                    readonly
                    name="txt_found_ID"
                    outlined
                    dense
                  ></v-text-field>
                  <v-divider></v-divider>
                  <v-text-field
                    label="ຊື່ຮາກຖານ"
                    name="txt_foundname"
                    required
                    v-model="txt_foundname"
                    :rules="[
                      required('ຊື່ຮາກຖານ'),
                      minLength('ຊື່ຮາກຖານ', 5),
                      maxLength('ຊື່ຮາກຖານ', 50),
                    ]"
                    counter="50"
                  ></v-text-field>
                  <template>
                    <v-menu
                      ref="menu1"
                      v-model="memu_found_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍຮາກຖານ')]"
                          v-model="format_found_date"
                          label="ວັນເດືອນປີຂະຫຍາຍຮາກຖານ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="
                            found_date = parsefound_date(format_found_date)
                          "
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calendar"
                        ref="picker"
                        v-model="found_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        locale="lao"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-radio-group v-model="foundstatus" row>
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
                  <v-btn text @click="close_form_dialog" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <span></span>
                  <v-btn
                    type="submit"
                    color="primary"
                    class="mx-10"
                    :disabled="!valid"
                    :loading="loading"
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
      found_date: new Date().toISOString().substr(0, 10),
      menu_found_date: false,
      format_found_date: null,
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
      // loading..
      loading: false,
      //status foundation
      txt_foundname: null,
      foundstatus: "ບັນຈຸ",
      txt_foundID: null,
    };
  },
  mounted() {
    this.getMaxID();
  },
  watch: {
    found_date() {
      this.format_found_date = this.formatfound_date(this.found_date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatfound_date(this.found_date);
    },
  },
  methods: {
    formatfound_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parsefound_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    // close form add
    close_form_dialog() {
      this.$store.dispatch({
        type: "clickShow_found_formAdd",
      });
      this.txt_foundname = null;
      this.format_found_date = null;
      this.foundstatus = "ບັນຈຸ";
    },
    // submit form
    async submit_form() {
      try {
        await axios
          .post(this.$store.getters.myHostname + "/api/v1/foundations", {
            txt_found_ID: this.txt_foundID,
            txt_foundname: this.txt_foundname,
            found_date: this.found_date,
            found_status: this.foundstatus,
          })
          .then(() => {
            // Message show
            this.loading = true;
            this.$store.dispatch({
              type: "doClick_myMsg",
              mshow: true,
              mcolor: "success",
              micon: "check_circle",
              message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
            });
            this.loading = false;
            this.close_form_dialog();
            location.reload();
          });
      } catch (err) {
        console.log(err);
        // Message show
        this.loading = true;
        this.$store.dispatch({
          type: "doClick_myMsg",
          mshow: true,
          mcolor: "error",
          micon: "error",
          message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        });
        this.loading = false;
      }
    },
    // get max id from foundation
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/foundations-MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "F0001",
            });
          });
        this.txt_foundID = this.$store.getters.getCustomID;
      } catch (err) {
        console.log(err);
      }
    },
    //
  },
};
</script>

<style lang="scss" scoped>
.table-content {
  font-family: "boonhome-400";
  font-weight: 10px;
}
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
.calendar {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 14px;
}
</style>
