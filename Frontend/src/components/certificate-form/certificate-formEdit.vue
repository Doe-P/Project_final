<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="$store.getters.getformEdit_certificate"
          persistent
          :overlay="false"
          max-width="800px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" dark height="45">
              <v-toolbar-title class="text-header">
                ແກ້ໄຂຂໍ້ມູນການຍ້ອງຍໍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form class="text-content" v-model="valid">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field outlined dense label="ລະຫັດໃບຍ້ອງຍໍ" readonly :value="myID">
                      </v-text-field>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="ເລກທີໃບຍ້ອງຍໍ"
                        v-model="txt_certi_NO"
                        :rules="[
                          required('ເລກທີໃບຍ້ອງຍໍ'),
                          minLength('ເລກທີໃບຍ້ອງຍໍ', 3),
                          maxLength('ເລກທີໃບຍ້ອງຍໍ', 20),
                        ]"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="certi_type"
                        v-model="certiType_select"
                        label="ເລືອກປະເພດກິດຈະກຳ"
                        class="text-content pt-6"
                        :rules="[required('ປະເພດກິດຈະກຳ')]"
                        @input="GettypeCertificateID"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-textarea
                        label="ເນື້ອໃນການຍ້ອງຍໍ"
                        rows="2"
                        required
                        v-model="txt_title"
                        class="pt-0"
                        counter="100"
                        :rules="[
                          required('ເນື້ອໃນການຍ້ອງຍໍ'),
                          minLength('ເນື້ອໃນການຍ້ອງຍໍ', 5),
                          maxLength('ເນື້ອໃນການຍ້ອງຍໍ', 100),
                        ]"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :rules="[
                          required('ອອກທີ່'),
                          minLength('ອອກທີ່', 3),
                          maxLength('ອອກທີ່', 50),
                        ]"
                        label="ອອກທີ່"
                        counter="50"
                        v-model="txt_locate"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="Datasign_by"
                        v-model="signBy_select"
                        label="ເລືອກຜູ້ອອກ"
                        :rules="[required('ເລືອກຜູ້ອອກ')]"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu1"
                        v-model="certi_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :rules="[required('ວັນທີອອກ')]"
                            v-model="certi_date_format"
                            label="ວັນທີອອກ"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="
                              certi_date = parseCerti_date(certi_date_format)
                            "
                            v-on="on"
                            readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          class="calendar"
                          ref="picker"
                          v-model="certi_date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          locale="lao"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end btn_text">
              <v-btn  text @click="close_dialog" color="error"> ຍົກເລີກ </v-btn>
              <v-btn @click.prevent="UpdateCertificate" :disabled="!valid" color="primary"> ບັນທືກ </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import dateformat from 'dateformat'
export default {
  name: "CertificateFormadd",
  props: ["myID"],
  data() {
    return {
      // certificate date
      certi_date: new Date().toISOString().substr(0, 10),
      certi_date_menu: false,
      certi_date_format: null,
      certi_type: [],
      certi_type_all:[],
      certiType_select: "",
      Datasign_by: [
        "ຮາກຖານ",
        "ຄຊປປລ ມຊ",
        "ກະຊວງສຶກສາ ແລະ ກິລາ",
        "ສູນກາງຊາວໝຸ່ມ",
      ],
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
      //------
      txt_title: null,
      txt_locate: null,
      signBy_select: null,
      txt_certi_NO:null,
      getDate:null,
      typecerti_id:null,
    };
  },

  mounted() {
     this.typeCertificate();
     this.DataCertificate();
  },
  watch: {
    certi_date() {
      this.certi_date_format = this.formatCerti_date(this.certi_date);
    },
    load_typeCerificate(){
      this.typeCertificate();
    },
    load_dataCertificate(){
      this.DataCertificate();
    }
  },
  computed: {
    CertiDateFormatted() {
      return this.formatCerti_date(this.certi_date);
    },
    load_typeCerificate(){
      return this.typeCertificate();
    },
    load_dataCertificate(){
      return this.DataCertificate();
    }
  },
  methods: {
    // certificate date
    formatCerti_date(date) {
      if (!date) return null;
      this.getDate=dateformat(date,"yyyy-mm-dd")
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseCerti_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form
    close_dialog() {
      this.$store.dispatch({
        type: "doClickFormedit_certificate",
        value: false,
      });
    },
    GettypeCertificateID(){
      for(let i in this.certi_type_all){
         if(String(this.certiType_select).valueOf()==String(this.certi_type_all[i].typeCerti_name).valueOf()){
           this.typecerti_id=this.certi_type_all[i].typeCerti_id;
           console.log(this.typecerti_id);
         }
      }
    },
    // update certificate
   async UpdateCertificate(){
     if(this.myID && this.txt_certi_NO && this.txt_title && this.txt_locate && this.certiType_select && this.signBy_select && this.getDate){
      try{
         await axios.put(`${this.$store.getters.myHostname}/api/v1/certificate/${this.myID}`,{
          typeCerti_id:this.typecerti_id,
          certific_NO:this.txt_certi_NO,
          title:this.txt_title,
          locate:this.txt_locate,
          sign_by:this.signBy_select,
          date_sign:this.getDate,
         }).then(()=>{
           this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດ")
           location.reload();
       })
      }catch(err){
        this.Msg_fail("ການແກ້ໄຂຂໍ້ມູນເກີດຂໍ້ຜິດພາດ")
        console.log(err);
      }
     }else{
       this.Msg_fail("ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຄືນໃໝ່")
     }
    },
    //get typecertificate
    async typeCertificate(){
     if(this.$store.getters.getformEdit_certificate==true){
        try{
       await  axios.get(this.$store.getters.myHostname+"/api/v1/typecertificate").then((response)=>{
         this.certi_type_all=response.data;
         for(let i in this.certi_type_all){
           this.certi_type.push(this.certi_type_all[i].typeCerti_name)
         }
       })
      }catch(err){
        console.log(err);
      }
     }
    },
    // get data certificate by id
    async DataCertificate(){
     if(this.myID && this.$store.getters.getformEdit_certificate==true){
        try{
        await axios.get(`${this.$store.getters.myHostname}/api/v1/getCertificate-byID/${this.myID}`).then((response)=>{
          this.txt_certi_NO=response.data.certific_NO;
          this.txt_title=response.data.title;
          this.txt_locate=response.data.locate;
          this.signBy_select=response.data.sign_by;
          this.getDate=response.data.date_sign;
          this.certi_date_format=dateformat(this.getDate,"dd-mm-yyyy");
          this.typecerti_id =response.data.typeCerti_id;
          for(let i in this.certi_type_all){
            if(String(this.typecerti_id).valueOf()==String(this.certi_type_all[i].typeCerti_id).valueOf()){
              this.certiType_select=this.certi_type_all[i].typeCerti_name;
            }
          }
        })
      }catch(err){
        console.log(err);
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
  font-size: 18px;
  font-weight: bold;
}
.text-content,
.calendar,
.btn_text {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
