<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getAct_formEdit"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ແກ້ໄຂຫົວຂໍ້ກິດຈະກຳ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  @submit.prevent="Update_Activity"
                  class="table-content"
                  v-model="valid"
                >
                  <v-text-field
                    label="ຫົວຂໍ້ກິດຈະກຳ"
                    :rules="[
                      required('ຫົວຂໍ້ກິດຈະກຳ'),
                      minLength('ຫົວຂໍ້ກິດຈະກຳ', 5),
                      maxLength('ຫົວຂໍ້ກິດຈະກຳ', 30),
                    ]"
                    counter="30"
                    required
                    v-model="txt_actTitle"
                  ></v-text-field>
                  <v-select
                    :items="Data_typeActivity"
                    :rules="[required('ປະເພດກິດຈະກຳ')]"
                    v-model="typeact_selected"
                    label="ປະເພດກິດຈະກຳ"
                  ></v-select>
                  <template>
                    <v-menu
                      ref="menu_act_date"
                      v-model="menu_act_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_act_date"
                          label="ວັນທີ"
                          :rules="[required('ວັນທີ')]"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="act_date = parseAct_date(format_act_date)"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="act_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-text-field
                    label="ສະຖານທີ່"
                    :rules="[
                      required('ສະຖານທີ່'),
                      minLength('ສະຖານທີ່', 5),
                      maxLength('ສະຖານທີ່', 30),
                    ]"
                    counter="30"
                    required
                    v-model="txt_actLocate"
                  ></v-text-field>
                  <v-btn text @click="close_formEdit" color="error">ຍົກເລີກ</v-btn>
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
import dateformat from "dateformat";
export default {
  name: "ActFormadd",
  props: ["myID"],
  data() {
    return {
      act_date: new Date().toISOString().substr(0, 10),
      menu_act_date: false,
      format_act_date: null,
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
      getID: null,
      //---------
      txt_actTitle: null,
      typeact_selected: null,
      txt_actLocate: null,
      Data_typeActivity: [],
      typeActivity_all: [],
      get_typeActivityID: null,
      getDate: null,
    };
  },
  mounted() {
    this.getData_activity();
    this.getTypeActivity();
    if (this.myID) {
      this.getID = this.myID;
    }
  },
  watch: {
    act_date() {
      this.format_act_date = this.formatAct_date(this.act_date);
    },
    reload() {
      this.getData_activity();
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatAct_date(this.act_date);
    },
    reload() {
      return this.getData_activity();
    },
  },
  methods: {
    formatAct_date(date) {
      if (!date) return null;
      this.getDate = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseAct_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form add
    close_formEdit() {
      this.myID = null;
      this.$store.dispatch({
        type: "clickShow_act_formEdit",
      });
    },
    async getData_activity() {
      if (this.myID && this.$store.getters.getAct_formEdit == true) {
        try {
          await axios
            .get(
              `${this.$store.getters.myHostname}/api/v1/activity-byID/${this.myID}`
            )
            .then((response) => {
              this.txt_actTitle = response.data.acti_title;
              this.format_act_date = dateformat(
                response.data.date_acti,
                "dd-mm-yyyy"
              );
              this.txt_actLocate = response.data.place;
              this.get_typeActivityID = response.data.typeAct_id;
              this.getDate = response.data.date_acti;
              for (let i in this.typeActivity_all) {
                if (
                  String(response.data.typeAct_id).valueOf() ==
                  String(this.typeActivity_all[i].typeAct_id).valueOf()
                ) {
                  this.typeact_selected = this.typeActivity_all[i].typeAct_name;
                }
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getTypeActivity() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/typeActivity")
          .then((response) => {
            this.typeActivity_all = response.data;
            for (let i in this.typeActivity_all) {
              this.Data_typeActivity.push(
                this.typeActivity_all[i].typeAct_name
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async Update_Activity() {
      const id = this.myID;
      for (let i in this.typeActivity_all) {
        if (
          String(this.typeact_selected).valueOf() ==
          String(this.typeActivity_all[i].typeAct_name).valueOf()
        ) {
          this.get_typeActivityID = this.typeActivity_all[i].typeAct_id;
          try {
            await axios
              .put(`${this.$store.getters.myHostname}/api/v1/activity/${id}`, {
                acti_title: this.txt_actTitle,
                typeAct_id: this.get_typeActivityID,
                date_acti: this.getDate,
                place: this.txt_actLocate,
              })
              .then(() => {
                this.Msg_done("ແກ້ໄຂຂໍ້ມູນກິດຈະກຳສຳເລັດ");
                this.close_formEdit();
                location.reload();
              });
          } catch (err) {
            this.Msg_fail("ແກ້ໄຂຂໍ້ມູນກິດຈະກຳບໍ່ສຳເລັດ");
            console.log(err);
            this.close_formEdit();
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
.table-content,
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: 24px;
}
</style>
