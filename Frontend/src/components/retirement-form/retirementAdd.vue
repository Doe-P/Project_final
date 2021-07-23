<template>
  <div>
    <template>
      <v-dialog
        v-model="$store.getters.getmyData_retire.showForm"
        persistent
        max-width="550"
        transition="dialog-transition"
        scrollable
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              height="45"
              dark
              z-index="1"
              class="d-flex"
            >
              <v-toolbar-title class="text-header-dialog">
                <span>ເພີ່ມຂໍ້ມູນສະມາຊິກກະສຽນ</span>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form v-model="valid" class="px-3 text-header-dialog">
                  <v-row>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ໃບພົ້ນກະສຽນເລກທີ"
                        :value="retirement_id"
                        readonly
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ລະຫັດສະມາຊິກ"
                        :value="$store.getters.getmyData_retire.member_id"
                        readonly
                        height="20"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ຊື່ສະມາຊິກ"
                        :value="$store.getters.getmyData_retire.member_name"
                        readonly
                        height="20"
                        outlined
                        danse
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        label="ນາມສະກຸນ"
                        :value="$store.getters.getmyData_retire.member_surname"
                        readonly
                        height="20"
                        outlined
                        dense
                      ></v-text-field>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="ເລກທີໃບຄຳຮ້ອງ"
                        v-model="txt_Noask"
                        :rules="[
                          required('ເລກທີໃບຄຳຮ້ອງ'),
                          maxLength('ເລກທີໃບຄຳຮ້ອງ', 10),
                          minLength('ເລກທີໃບຄຳຮ້ອງ', 2),
                        ]"
                        counter="10"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <template>
                        <v-menu
                          v-model="menu_ask_date"
                          :close-on-content-click="false"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="format_ask_date"
                              :rules="[required('ວັນເດືອນປີຮ້ອງຂໍ')]"
                              label="ວັນເດືອນປີຮ້ອງຂໍ"
                              prepend-icon="mdi-calendar"
                              readonly
                              @blur="ask_date = parseAsk_date(format_ask_date)"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            class="calendar"
                            ref="picker"
                            v-model="ask_date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            locale="lao"
                          >
                          </v-date-picker>
                        </v-menu>
                      </template>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-textarea
                        rows="0"
                        label="ເຫດຜົນ"
                        counter="100"
                        v-model="txt_reason"
                        :rules="[
                          required('ເຫດຜົນ'),
                          minLength('ເຫດຜົນ', 3),
                          maxLength('ເຫດຜົນ', 100),
                        ]"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-textarea
                        rows="0"
                        label="ຜົນງານ"
                        counter="100"
                        v-model="txt_portfolio"
                        :rules="[
                          required('ຜົນງານ'),
                          minLength('ຜົນງານ', 3),
                          maxLength('ຜົນງານ', 100),
                        ]"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <template>
                        <v-menu
                          v-model="menu_retire_date"
                          :close-on-content-click="false"
                          offset-y
                          min-width="auto"
                          max-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="format_retire_date"
                              :rules="[required('ວັນເດືອນປີພົ້ນກະສຽນ')]"
                              label="ວັນເດືອນປີພົ້ນກະສຽນ"
                              prepend-icon="mdi-calendar"
                              readonly
                              @blur="
                                retire_date = parseRetire_date(
                                  format_retire_date
                                )
                              "
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            class="calendar"
                            v-model="retire_date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            locale="lao"
                          >
                          </v-date-picker>
                        </v-menu>
                      </template>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end text-header-dialog">
              <v-btn text @click="close_dialog" color="error">ຍົກເລີກ</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid" @click="SaveData_retire"
                >ຕົກລົງ</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Formadd",
  data() {
    return {
      // ask date
      ask_date: new Date().toISOString().substr(0, 10),
      menu_ask_date: false,
      format_ask_date: null,
      // retire date
      retire_date: new Date().toISOString().substr(0, 10),
      menu_retire_date: false,
      format_retire_date: null,
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
      confirm_dialog: true,
      //-----------------
      retirement_id: null,
      txt_Noask: null,
      txt_reason: null,
      txt_portfolio: null,
      //-----------
    };
  },
  mounted() {
    this.getMaxID();
  },
  watch: {
    ask_date() {
      this.format_ask_date = this.formatAsk_date(this.ask_date);
    },
    retire_date() {
      this.format_retire_date = this.formatRetire_date(this.retire_date);
    },
  },
  computed: {
    AskDateFormatted() {
      return this.formatAsk_date(this.ask_date);
    },
    RetireDateFormatted() {
      return this.formatRetire_date(this.retire_date);
    },
  },
  methods: {
    // ask date
    formatAsk_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // retire date
    formatRetire_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseAsk_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    parseRetire_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //close form add
    close_dialog() {
      this.$store.dispatch({
        type: "doClick_retire",
        showForm: false,
        member_id: "",
        member_name: "",
        member_surname: "",
        member_age: "",
      });
    },
    // save data
    async SaveData_retire() {
      const getmember_id = this.$store.getters.getmyData_retire.member_id;
      const getmember_age = this.$store.getters.getmyData_retire.member_age;
      if (
        getmember_id &&
        getmember_age &&
        this.retirement_id &&
        this.txt_Noask &&
        this.txt_reason &&
        this.txt_portfolio &&
        this.ask_date &&
        this.retire_date
      ) {
        try {
          await axios
            .post(this.$store.getters.myHostname + "/api/v1/retirements", {
              retire_id: this.retirement_id,
              member_id: getmember_id,
              No_Ask: this.txt_Noask,
              reason: this.txt_reason,
              portfolio: this.txt_portfolio,
              date_Ask: this.ask_date,
              age: parseInt(getmember_age),
              date_retire: this.retire_date,
            })
            .then(() => {
              this.$router.push("/member-retirement");
              this.close_dialog();
              this.Msg_done("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
            });
        } catch (err) {
          this.close_dialog();
          this.Msg_fail("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຂໍ້ມູນຄືນໃໝ່");
      }
    },
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/Retire-MaxID")
          .then((response) => {
            let get_id = response.data.id;
            if (get_id) {
              var conID = parseInt(get_id) + 1;
              switch (conID.toString().length) {
                case 1:
                  this.retirement_id = "0000" + conID;
                  break;
                case 2:
                  this.retirement_id = "000" + conID;
                  break;
                case 3:
                  this.retirement_id = "00" + conID;
                  break;
                case 4:
                  this.retirement_id = "0" + conID;
                  break;
                case 5:
                  this.retirement_id = conID.toString();
                  break;
              }
            } else {
              this.retirement_id = "00001";
            }
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
.calendar {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>
