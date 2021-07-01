<template>
  <div>
    <template>
      <v-dialog
        v-model="this.$store.getters.getMemberType_formEdit.isShow"
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title class="text-header-dialog">
              ແກ້ໄຂຂໍ້ມູນປະເພດສະມາຊິກ
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="text-content">
            <v-form v-model="valid" @submit.prevent="Update_data">
              <v-text-field
                label="ຊື່ປະເພດສະມາຊິກ"
                v-model="txt_memberType_name_edit"
                counter="30"
                :rules="[
                  required('ຊື່ປະເພດສະມາຊິກ'),
                  minLength('ຊື່ປະເພດສະມາຊິກ', 5),
                  maxLength('ຊື່ປະເພດສະມາຊິກ', 30),
                ]"
              ></v-text-field>
              <v-text-field
                label="ຈຳນວນເງີນສະຕິ"
                v-model="txt_memType_price_edit"
                required
                suffix="ກີບ"
                counter="7"
                :rules="[
                  required('ຈຳນວນເງີນສະຕິ'),
                  minLength('ຈຳນວນເງີນສະຕິ', 4),
                  maxLength('ຈຳນວນເງີນສະຕິ', 10),
                ]"
                 @keypress.native="isNumberonly($event)"
              ></v-text-field>
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
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Formedit",
  data() {
    return {
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
      txt_memberType_name_edit: null,
      txt_memType_price_edit:0,
    };
  },
  mounted() {
    this.getData_typemember_byID();
  },
  watch: {
    reload_data() {
      this.getData_typemember_byID();
    },
  },
  computed: {
    reload_data() {
      return this.getData_typemember_byID();
    },
  },
  methods: {
    close_form_edit() {
      this.$store.dispatch({
        type: "clickShow_memType_formEdit",
      });
    },
    //Number On ly
    isNumberonly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      }
      return true;
    },
    async getData_typemember_byID() {
      const id = this.$store.getters.getMemberType_formEdit.id;
      try {
        await axios
          .get(`http://localhost:5000/api/v1/type-members/${id}`)
          .then((response) => {
            (this.txt_memberType_name_edit = response.data.typemember),
              (this.txt_memType_price_edit = (response.data.money).toString());
          });
      } catch (err) {
        console.log(err);
      }
    },
   async Update_data(){
     const id = this.$store.getters.getMemberType_formEdit.id;
      try{
         await axios.put(`http://localhost:5000/api/v1/type-members/${id}`,{
         typemember:this.txt_memberType_name_edit,
         money:parseInt(this.txt_memType_price_edit)
       }).then(()=>{
        this.close_form_edit();
        this.Msg_done("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ")
        location.reload();
       })
      }catch(err){
        this.close_form_edit();
        this.Msg_fail("ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ");
        console.log(err);
      }
    },
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
.text-content {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>
