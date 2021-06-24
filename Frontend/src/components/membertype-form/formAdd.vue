<template>
  <div>
    <template>
      <v-dialog
        v-model="this.$store.getters.getMemberType_formAdd"
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar color="primary" height="45" dark>
          <v-toolbar-title class="text-header-dialog">
           ເພີ່ມຂໍ້ມູນປະເພດສະມາຊິກ
          </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="text-content">
            <v-form v-model="valid">
              <v-text-field
                label="ລະຫັດປະເພດສະມາຊິກ"
                :value="this.$store.getters.getCustomID"
                readonly
              ></v-text-field>
              <v-text-field
                label="ຊື່ປະເພດສະມາຊິກ"
                v-model="txt_memType_name"
                required
                counter="30"
                :rules="[
                  required('ຊື່ປະເພດສະມາຊິກ'),
                  minLength('ຊື່ປະເພດສະມາຊິກ', 5),
                  maxLength('ຊື່ປະເພດສະມາຊິກ', 30),
                ]"
              ></v-text-field>
              <v-text-field
                label="ຈຳນວນເງີນສະຕິ"
                v-model="txt_memType_price"
                type="number"
                suffix="ກີບ"
                required
                counter="7"
                :rules="[
                  required('ຈຳນວນເງີນສະຕິ'),
                  minLength('ຈຳນວນເງີນສະຕິ', 4),
                  maxLength('ຈຳນວນເງີນສະຕິ', 7),
                ]"
                @keypress.native="isNumberonly($event)"
              ></v-text-field>
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
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "Formadd",
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
    };
  },
  mounted() {
     this.$store.dispatch({
      type: "doCustomID",
      id: "",
      str: "MT0001",
    });
  },
  methods: {
    close_form_add() {
      this.$store.dispatch({
        type: "clickShow_memType_formAdd",
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
.text-header-dialog{
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>
