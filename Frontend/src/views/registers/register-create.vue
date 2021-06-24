<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5">
        <v-card width="800">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title>
              <span class="text-header">ສະໝັກຜູ້ໃຊ້</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form class="text-content" v-model="valid">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ລະຫັດຜູ້ໃຊ້"
                    id="id"
                    :value="txt_user_id"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ຊື່ຜູ້ໃຊ້"
                    id="id"
                    v-model="txt_user_name"
                    counter="20"
                    :rules="[
                      required('ຊື່ຜູ້ໃຊ້'),
                      minLength('ຊື່ຜູ້ໃຊ້', 5),
                      maxLength('ຊື່ຜູ້ໃຊ້', 20),
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ລະຫັດຜູ້ໃຊ້"
                    id="id"
                    v-model="txt_user_psw"
                    :append-icon="
                      isshowPassword ? 'visibility' : 'visibility_off'
                    "
                    @click:append="isshowPassword = !isshowPassword"
                    :type="isshowPassword ? 'text' : 'password'"
                    :rules="passwordRule"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    name="name"
                    label="ຢືນຢັນລະຫັດຜ່ານ"
                    id="id"
                    v-model="txt_user_conpsw"
                     :append-icon="
                      isshowPassword ? 'visibility' : 'visibility_off'
                    "
                    @click:append="isshowPassword = !isshowPassword"
                    :type="isshowPassword ? 'text' : 'password'"
                    :rules="passwordRule"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="items"
                    v-model="value"
                    label="ເລືອກຮາກຖານ"
                    :rules="[required('ຮາກຖານ')]"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-radio-group v-model="selectStatus" row>
                    <span>ສະຖານະຜູ້ໃຊ້:</span>
                    <span class="ma-1"></span>
                    <v-radio label="Admin" value="Admin"></v-radio>
                    <v-radio label="User" value="User"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-space-between text-btn">
            <v-btn @click="$router.push('/register-view')" color="error"
              >ຍົກເລີກ</v-btn
            >
            <v-btn @click="saveData_user" :disabled="!valid" color="primary"
              >ບັນທຶກ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RegisterCreate",
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
      usernameRule: [(v1) => !!v1 || "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ກ່ອນ"],
      passwordRule: [
        (v1) => !!v1 || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ",
        (v2) =>
          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/.test(v2) ||
          "ຕ້ອງປ້ອນຕົວອັກສອນກັບຕົວເລກໃຫ້ເທົ່າກັບຫຼືຫຼາຍກວ່າ 10 ຕົວຢ່າງ Test123456",
      ],
      // valid form
      valid: false,
      selectStatus: "User",
      isshowPassword: false,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 20px;
}
.text-content,
.text-btn {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
