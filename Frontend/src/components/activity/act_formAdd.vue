<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getAct_formAdd"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ເພີ່ມຫົວຂໍ້ກິດຈະກຳ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  @submit.prevent="SavaData_Activity"
                  class="table-content"
                  v-model="valid"
                >
                  <v-text-field
                    label="ລະຫັດກິດຈະກຳ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                  <v-divider></v-divider>
                  <v-text-field
                    label="ຫົວຂໍ້ກິດຈະກຳ"
                    :rules="[
                      required('ຫົວຂໍ້ກິດຈະກຳ'),
                      minLength('ຫົວຂໍ້ກິດຈະກຳ', 5),
                      maxLength('ຫົວຂໍ້ກິດຈະກຳ', 100),
                    ]"
                    counter="100"
                    required
                    v-model="txt_actTitle"
                  ></v-text-field>
                  <v-select
                    :items="Data_typeActivity"
                    :rules="[required('ປະເພດກິດຈະກຳ')]"
                    v-model="typeact_selected"
                    label="ປະເພດກິດຈະກຳ"
                    @input="select_Actid"
                  ></v-select>
                  <template>
                    <v-menu
                      ref="menu_act_date"
                      v-model="menu_act_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
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
                        min="2000-01-01"
                        locale="lao"
                        class="calendar"
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
                  <v-btn text @click="close_formAdd" color="error"
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
  name: "ActFormadd",
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
      Data_typeActivity: [],
      Data_typeActivity_all: [],
      typeact_selected: null,
      get_typeAct_id: null,
      //-------------
      txt_actTitle: null,
      txt_actLocate: null,
    };
  },
  mounted() {
    this.getMaxID();
    this.getActivity_type();
  },
  watch: {
    act_date() {
      this.format_act_date = this.formatAct_date(this.act_date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatAct_date(this.act_date);
    },
  },
  methods: {
    formatAct_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseAct_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form add
    close_formAdd() {
      this.$store.dispatch({
        type: "clickShow_act_formAdd",
      });
    },
    // get max id from foundation
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/Activity-MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "C0001",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    //
    select_Actid() {
      for (let i = 0; i <= this.Data_typeActivity_all.length; i++) {
        if (
          String(this.typeact_selected).valueOf() ==
          String(this.Data_typeActivity_all[i].typeAct_name).valueOf()
        ) {
          this.get_typeAct_id = this.Data_typeActivity_all[i].typeAct_id;
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
    async getActivity_type() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/typeActivity")
          .then((response) => {
            this.Data_typeActivity_all = response.data;
            for (let i = 0; i <= this.Data_typeActivity_all.length; i++) {
              this.Data_typeActivity.push(
                this.Data_typeActivity_all[i].typeAct_name
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async SavaData_Activity() {
      const activity_id = this.$store.getters.getCustomID;
      let Activity_array = [];
      Activity_array.push(
        activity_id,
        this.txt_actTitle,
        this.get_typeAct_id,
        this.txt_actLocate,
        0,
        this.act_date
      );
      let conActivity = Activity_array.toString();
      this.$router.push({
        name: "activity-create",
        params: { data: conActivity },
      });
      this.close_formAdd();
      /* try{
         await axios.post("http://localhost:5000",{
            acti_id:activity_id,
            acti_title:this.txt_actTitle,
            typeAct_id:this.get_typeAct_id,
            place:this.txt_actLocate,
            amount_acti:0,
            date_acti:this.act_date
         }).then(()=>{
           this.Msg_done("ບັນທຶກຂໍ້ມູນກິດຈະກຳສຳເລັດ");
           this.router.push("/activity-create")
           location.reload();
         })
       }catch(err){
         this.Msg_fail("ບັນທຶກຂໍ້ມູນກິດຈະກຳບໍ໋ສຳເລັດ");
         console.log(err);
       }
       */
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
.calendar {
  font-family: "boonhome-400";
  font-weight: 14px;
}
</style>
