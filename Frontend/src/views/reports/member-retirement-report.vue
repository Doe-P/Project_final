<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-row>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header">ລາຍງານຂໍ້ມູນປະຈຳສົກປີ</span>
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content" v-model="valid">
                    <v-row>
                      <v-col cols="6">
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
                      <v-col cols="6">
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
                              :error-messages="message"
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
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn color="primary" :disabled="!valid" @click="submit">
                        <v-icon>print</v-icon>
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header">ລາຍງານລາຍຊື່ສະມາຊິກທີ່ພົ້ນກະສຽນ</span>
                </v-card-title>
                <v-card-text>
                    <v-form class="text-content">
                        <v-select
                        :items="Foundations"
                        v-model="select_found"
                        label="ເລືອກຮາກຖານ"
                    ></v-select>
                     <v-row>
                         <v-col cols="6">
                          <v-select
                              :items="Years"
                              v-model="value"
                              label="ເລືອກປີ"
                              append-icon="today"
                              @input="selectvalue($event)"
                          ></v-select>
                         </v-col>
                         <v-col cols="6" class="pt-7 align-content-end">
                           <v-card-actions class="justify-end">
                                <v-btn color="primary" :disabled="isChecked">
                                    <v-icon>print</v-icon>
                                </v-btn>
                           </v-card-actions>
                         </v-col>
                     </v-row>
                    </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MemberRetirementReport",
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
      message:"",
      Years:[],
      start_year:2000,
      isChecked:true,
      select_found:"",
    };
  },

  mounted() {
      this.setYear();
  },
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
        this.message=""
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
        this.message=""
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
      this.message="ກະລຸນາເລືອກວັນທີຄືນໃໝ່"
        }
    },
    setYear(){
        var now =new Date();
        var y=now.getFullYear();
        for(let i=y; i>=this.start_year; i--){
            this.Years.push(i);
        }
    },
    selectvalue(val){
        if((val!="") && (this.select_found !="")){
            this.isChecked=false;
        }else{
             this.isChecked=true;
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
.sub-header {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.text-content,
.calender{
     font-family: "boonhome-400";
  font-size: 14px;
}
</style>
