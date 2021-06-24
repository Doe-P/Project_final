<template>
  <div>
    <!-- Form add unit -->
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getunit_formAdd"
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title class="text-header-dialog">
             ເພີ່ມຂໍ້ມູນໜ່ວຍ
            </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form class="table-content" v-model="valid">
                  <v-text-field
                    label="ລະຫັດໜ່ວຍ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="ຊື່ໜ່ວຍ"
                    required
                    counter="30"
                    :rules="[
                      required('ຊື່ໜ່ວຍ'),
                      minLength('ຊື່ໜ່ວຍ', 5),
                      maxLength('ຊື່ໜ່ວຍ', 30),
                    ]"
                    v-model="txt_unitname"
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
                      v-model="menu_unit_date"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="format_unit_date"
                          label="ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ"
                          prepend-icon="mdi-calendar"
                          readonly
                          @blur="unit_date = parseUnit_date(format_unit_date)"
                          v-bind="attrs"
                          v-on="on"
                          :rules="[required('ວັນເດືອນປີຂະຫຍາຍໜ່ວຍ')]"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="unit_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
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
      unit_date: new Date().toISOString().substr(0, 10),
      menu_unit_date: false,
      format_unit_date: null,
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
      statusSelected:"ບັນຈຸ"
    };
  },
  mounted() {
     this.$store.dispatch({
      type: "doCustomID",
      id: "",
      str: "U0001",
    });
    alert(this.$store.getters.getCustomID);
  },
  watch: {
    unit_date() {
      this.format_unit_date = this.formatUnit_date(this.unit_date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatUnit_date(this.unit_date);
    },
  },
  methods: {
    formatUnit_date(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseUnit_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //close form add
    close_form_add() {
      this.$store.dispatch({
        type: "clickShow_unit_formAdd",
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
.text-header-dialog{
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>
