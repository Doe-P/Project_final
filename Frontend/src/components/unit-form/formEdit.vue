<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getunit_formEdit"
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
                <v-form class="table-content" v-model="valid">
                  <v-text-field
                    label="ຊື່ໜ່ວຍ"
                    counter="30"
                    :rules="[
                      required('ຊື່ໜ່ວຍ'),
                      minLength('ຊື່ໜ່ວຍ', 5),
                      maxLength('ຊື່ໜ່ວຍ', 30),
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
                        ref="picker"
                        v-model="unit_date_edit"
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
      statusSelected:"ບັນຈຸ",
    };
  },
  mounted() {},
  watch: {
    // form edit
    unit_date_edit() {
      this.format_unit_date_edit = this.formatUnit_date_edit(
        this.unit_date_edit
      );
    },
  },
  computed: {
    // form edit
    computedDateFormatted_edit() {
      return this.formatUnit_date_edit(this.unit_date_edit);
    },
  },
  methods: {
    // form edit
    formatUnit_date_edit(date) {
      if (!date) return null;

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
