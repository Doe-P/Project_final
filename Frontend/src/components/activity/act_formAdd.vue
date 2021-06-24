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
                <v-form class="table-content" v-model="valid">
                  <v-text-field
                    label="ລະຫັດກິດຈະກຳ"
                    :value="this.$store.getters.getCustomID"
                    readonly
                  ></v-text-field>
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
                        @change="save"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                  <v-text-field
                    label="ສະຖານທີ່"
                    :rules="[
                      required('ສະຖານທີ່'),
                      minLength('ສະຖານທີ່', 5),
                      minLength('ສະຖານທີ່', 30),
                    ]"
                    counter="30"
                    required
                    v-model="txt_actLocate"
                  ></v-text-field>
                  <v-btn @click="close_formAdd" color="error">ຍົກເລີກ</v-btn>
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
    };
  },
  mounted() {
        this.$store.dispatch({
      type: "doCustomID",
      id: "",
      str: "AC0001",
    });
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
