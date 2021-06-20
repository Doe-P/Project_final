<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-7">
          <v-card width="100%" color="primary" dark>
            <v-card-title class="justify-center">
              <span class="text-header">ລາຍງານສະຖິຕິຊາວໜຸ່ມ</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
               <v-form v-model="valid">
                    <v-row class="text-calender">
                  <v-col cols="4">
                    <v-menu
                      ref="menu1"
                      v-model="start_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="[required('ວັນທີເລີ່ມຕົ້ນ')]"
                          v-model="start_date_format"
                          label="ປະຈຳວັນທີ"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="
                            start_date = parseStart_date(start_date_format)
                          "
                          v-on="on"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calender"
                        ref="picker"
                        v-model="start_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        locale="lao"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
                      ref="menu1"
                      v-model="end_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="[required('ວັນທີສຸດທ້າຍ')]"
                          v-model="end_date_format"
                          label="ຫາວັນທີ"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="end_date = parseEnd_date(end_date_format)"
                          v-on="on"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="calender"
                        ref="picker"
                        v-model="end_date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        locale="lao"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4" class="justify-end pt-5">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="white" v-bind="attrs" v-on="on" :disabled="!valid" @click="submit">
                          <v-icon color="primary">assignment</v-icon>
                        </v-btn>
                      </template>
                      <span class="text-calender">ສະແດງລາຍລະອຽດ</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
               </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "MembersStatisticsReport",
  data() {
    return {
      // start date
      start_date: new Date().toISOString().substr(0, 10),
      start_date_menu: false,
      start_date_format: null,
      // end date
      end_date: new Date().toISOString().substr(0, 10),
      end_date_menu: false,
      end_date_format: null,
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      // validate btn
      valid:false,
    };
  },

  mounted() {},
  watch: {
    start_date() {
      this.start_date_format = this.formatStart_date(this.start_date);
    },
    end_date() {
      this.end_date_format = this.formatEnd_date(this.end_date);
    },
  },
  computed: {
    StartDateFormatted() {
      return this.formatStart_date(this.start_date);
    },
    EndDateFormatted() {
      return this.formatEnd_date(this.end_date);
    },
  },
  methods: {
    // start date
    formatStart_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseStart_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // end date
    formatEnd_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseEnd_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    submit(){
        if(this.start_date_format > this.end_date_format){
             this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: "ຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຄືນໃໝ່",
      });
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
}
.text-calender,
.calender,
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
