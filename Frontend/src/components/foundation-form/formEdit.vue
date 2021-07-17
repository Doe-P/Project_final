<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="$store.getters.getfound_formEdit.isShow"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ແກ້ໄຂຂໍ້ມູນຮາກຖານ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  class="table-content"
                  v-model="valid"
                  @submit.prevent="submit_edit"
                >
                  <v-text-field
                    label="ລະຫັດຮາກຖານ"
                    :value="$store.getters.getfound_formEdit.id"
                    readonly
                    name="txt_found_ID"
                  ></v-text-field>
                  <v-text-field
                    label="ຮາກຖານ"
                    :rules="[
                      required('ຊື່ຮາກຖານ'),
                      minLength('ຊື່ຮາກຖານ', 3),
                      maxLength('ຊື່ຮາກຖານ', 30),
                    ]"
                    v-model="txt_foundname_edit"
                  ></v-text-field>
                  <template>
                    <v-menu
                      ref="menu_found_date"
                      v-model="menu_found_date_edit"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_found_date_edit"
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍຮາກຖານ')]"
                          label="ວັນເດືອນປີຂະຫຍາຍຮາກຖານ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="
                            found_date_edit = parsefound_date_edit(
                              format_found_date_edit
                            )
                          "
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calendar"
                        ref="picker"
                        v-model="found_date_edit"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
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
                  <v-btn @click="close_form" color="error">ຍົກເລີກ</v-btn>
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
//import axios from "axios";
import dateformat from 'dateformat';
import axios from 'axios';
export default {
  name: "foundation",
  data() {
    return {
      // form edit
      found_date_edit: new Date().toISOString().substr(0, 10),
      menu_found_date_edit: false,
      format_found_date_edit: null,
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
      statusSelected: null,
      txt_foundname_edit: null,
      getFound_id: null,
      get_item_edit: null,
      get_date:null,
    };
  },
  created() {},
  mounted() {
     
  },
  watch: {
    // form edit
    found_date_edit() {
      this.format_found_date_edit = this.formatfound_date_edit(
        this.found_date_edit
      );
    },
    computed_ID() {
      this.getData_byID();
    },
  },
  computed: {
    // form edit
    computedDateFormatted_edit() {
      return this.formatfound_date_edit(this.found_date_edit);
    },
    computed_ID() {
      return this.getData_byID();
    },
  },
  methods: {
    // form edit
    formatfound_date_edit(date) {
      if (!date) return null;
       this.get_date=dateformat(date,"yyyy-mm-dd")
      const [year, month, day] = date.split("-");
     return `${day}-${month}-${year}`;
    },
    parsefound_date_edit(date) {
      if (!date) return null;
         
          
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form edit
    close_form() {
      this.$store.dispatch({
        type: "clickShow_found_formEdit",
        found_id: "",
      });
    },
    //message fail
    Msg_fail() {
      // Message show
      this.loading = true;
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: "ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ",
      });
      this.loading = false;
    },
    //message done
    Msg_done() {
      // Message show
      this.loading = true;
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "success",
        micon: "check_circle",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
      });
      this.loading = false;
    },
    // edit data
   async submit_edit() {
     //const date =this.get_date
      try{
        await axios.put(`${this.$store.getters.myHostname}/api/v1/foundations/${this.getFound_id}`,{
        fund_name:this.txt_foundname_edit,
        date_fund:this.get_date,
        status_fund:this.statusSelected,
        }).then(()=>{
         this.Msg_done();
         this.close_form();
         location.reload();
       })
      }catch(err){
        console.log(err);
        this.Msg_fail();
        this.close_form();
      }
    },
    //ດຶງໄອດີຈາກການຄລິກແກ້ໄຂໃນຕາຕາລາງ
    get_myID() {
      this.get_item_edit = this.$store.getters.getfound_formEdit.id;
    },
    // get data from api by id
    async getData_byID() {
      this.getFound_id = this.$store.getters.getfound_formEdit.id;
      this.txt_foundname_edit = this.$store.getters.getfound_formEdit.name;
      this.format_found_date_edit = dateformat(this.$store.getters.getfound_formEdit.date,"dd-mm-yyyy")
      this.get_date=dateformat(this.$store.getters.getfound_formEdit.date,"yyyy-mm-dd");
      this.statusSelected = this.$store.getters.getfound_formEdit.status;
    },
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
.calendar{
   font-family: "boonhome-400";
  font-weight: normal;
  font-size: 14px;
}
</style>
