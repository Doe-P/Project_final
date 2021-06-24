<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getmoveFormadd"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header-dialog">
                ເພີ່ມຂໍ້ມູນການຍົກຍ້າຍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form @submit="saveMembermove" class="table-content" v-model="valid">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="ລະຫັດຍົກຍ້າຍ"
                        required
                        v-model="txt_moveID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="ເລກທີໃບຍົກຍ້າຍ"
                        required
                        v-model="txt_moveNO"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                     <v-select
                       :items="Year_select"
                       v-model="value"
                       label="ສົກຮຽນ"
                        :rules="[
                          required('ສົກຮຽນ')
                        ]"
                     ></v-select>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                      <v-textarea
                        label="ເຫດຜົນ"
                        counter="50"
                        rows="1"
                        v-model="moveReason"
                          :rules="[
                          required('ເຫດຜົນ'),
                          maxLength('ເຫດຜົນ', 50),
                          minLength('ເຫດຜົນ', 1),
                        ]"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                      <v-text-field
                        label="ອອກທີ່"
                        append-icon="place"
                        v-model="moveLocate"
                        required
                            :rules="[
                          required('ອອກທີ່'),
                          maxLength('ອອກທີ່', 50),
                          minLength('ອອກທີ່', 1),
                        ]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                      <v-text-field
                        label="ອອກໂດຍ"
                        v-model="moveSign_by"
                        required
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
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-btn @click="close_form_add" color="error">ຍົກເລີກ</v-btn>
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
      Year_start:null,
      Year_select:[],
    };
  },
  mounted() {
    this.setYear_select();
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
    //close form add
    close_form_add() {
      this.$store.dispatch({
        type:"doClickmoveFormadd",
        val:false,
      })
    },
    // save data
    saveMembermove(){
      this.$router.push('/member-move-create');
      this.close_form_add();
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
</style>
