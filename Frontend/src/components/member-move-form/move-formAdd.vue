<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getmoveFormadd"
          persistent
          max-width="500px"
          transition="dialog-transition"
          scrollable
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ເພີ່ມຂໍ້ມູນການຍົກຍ້າຍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form class="table-content" v-model="valid">
                  <v-row>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ລະຫັດຍົກຍ້າຍ"
                        required
                        :value="this.$store.getters.getCustomID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ເລກທີໃບຍົກຍ້າຍ"
                        required
                        v-model="txt_moveNO"
                        :rules="[
                          required('ເລກທີໃບຍົກຍ້າຍ'),
                          maxLength('ເລກທີໃບຍົກຍ້າຍ', 20),
                          minLength('ເລກທີໃບຍົກຍ້າຍ', 2),
                        ]"
                        counter="20"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-select
                        :items="Years"
                        v-model="year_selected"
                        label="ສົກຮຽນ"
                        :rules="[required('ສົກຮຽນ')]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-textarea
                        label="ເຫດຜົນ"
                        counter="50"
                        rows="1"
                        v-model="moveReason"
                        :rules="[
                          required('ເຫດຜົນ'),
                          maxLength('ເຫດຜົນ', 50),
                          minLength('ເຫດຜົນ', 5),
                        ]"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ອອກທີ່"
                        append-icon="place"
                        v-model="moveLocate"
                        required
                        :rules="[
                          required('ອອກທີ່'),
                          maxLength('ອອກທີ່', 50),
                          minLength('ອອກທີ່', 3),
                        ]"
                        counter="50"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ອອກໂດຍ"
                        v-model="moveSign_by"
                        required
                        counter="30"
                        :rules="[
                          required('ອອກໂດຍ'),
                          maxLength('ອອກໂດຍ', 30),
                          minLength('ອອກໂດຍ', 3),
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <template>
                    <v-menu
                      ref="menu_move_date"
                      v-model="menu_move_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_move_date"
                          :rules="[required('ວັນເດືອນປີຍົກຍ້າຍ')]"
                          label="ວັນເດືອນປີຍົກຍ້າຍ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="move_date = parseMove_date(format_move_date)"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="move_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="2000-01-01"
                        locale="lao"
                        class="calendar"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end text-actions">
              <v-btn text @click="close_form_add" color="error">ຍົກເລີກ</v-btn>
              <v-btn
                text
                @click.prevent="saveData_Move"
                color="primary"
                :disabled="!valid"
                >ບັນທຶກ</v-btn
              >
            </v-card-actions>
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
      move_date: new Date().toISOString().substr(0, 10),
      menu_move_date: false,
      format_move_date: null,
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
      show: true,
      Year_start: null,
      Years: [],
      //------------
      txt_moveNO: null,
      year_selected: null,
      moveReason: null,
      moveLocate: null,
      moveSign_by: null,
    };
  },
  mounted() {
    this.setYear_select();
    this.getMaxID();
  },
  watch: {
    move_date() {
      this.format_move_date = this.formatMove_date(this.move_date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatMove_date(this.move_date);
    },
  },
  methods: {
    formatMove_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseMove_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async saveData_Move() {
      const moveID = this.$store.getters.getCustomID;
      alert(moveID);
      if (
        moveID &&
        this.txt_moveNO &&
        this.moveReason &&
        this.moveLocate &&
        this.moveSign_by &&
        this.move_date &&
        this.year_selected
      ) {
        try {
          await axios
            .post(this.$store.getters.myHostname + "/api/v1/add-move", {
              move_id: moveID,
              move_NO: this.txt_moveNO,
              m_Year: this.year_selected,
              reason: this.moveReason,
              locate: this.moveLocate,
              sign_by: this.moveSign_by,
              date_move: this.move_date,
            })
            .then(() => {
              this.Msg_done("ບັນທຶກຂໍ້ມູນກິດຈະກຳສຳເລັດແລ້ວ");
              this.$router.push({
                name: "member-move-create",
                params: { id: moveID, move_NO: this.txt_moveNO },
              });
              location.reload();
            });
        } catch (err) {
          this.Msg_fail("ບັນທຶກຂໍ້ມູນກິດຈະກຳບໍ່ສຳເລັດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຄືນໃໝ່");
      }
    },
    //close form add
    close_form_add() {
      this.$store.dispatch({
        type: "doClickmoveFormadd",
        val: false,
      });
      location.reload();
    },
    // save data

    setYear_select() {
      // let object = [];
      let str = "";
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        let n = i - 1;
        str = (n.toString() + "-" + i.toString()).toString();
        this.Years.push(str);
      }
    },
    // get max id from foundation
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/Move-MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "V0001",
            });
          });
      } catch (err) {
        console.log(err);
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
.calendar,
.text-actions {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 14px;
}
</style>
