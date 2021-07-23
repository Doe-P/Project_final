<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5">
        <v-card width="500">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title>
              <span class="text-header">ປ່ຽນລະຫັດຜ່ານຜູ້ໃຊ້</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form class="text-content" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ຊື່ຜູ້ໃຊ້"
                    :value="$route.params.username"
                    counter="20"
                    :rules="[
                      required('ຊື່ຜູ້ໃຊ້'),
                      minLength('ຊື່ຜູ້ໃຊ້', 5),
                      maxLength('ຊື່ຜູ້ໃຊ້', 20),
                    ]"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ລະຫັດຜ່ານໃໝ່"
                    v-model="txt_user_psw"
                    :append-icon="
                      showPass_new ? 'visibility' : 'visibility_off'
                    "
                    @click:append="showPass_new = !showPass_new"
                    :type="showPass_new ? 'text' : 'password'"
                    :rules="passwordRule"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
                    v-model="txt_user_conpsw"
                    :append-icon="
                      showPass_newCon ? 'visibility' : 'visibility_off'
                    "
                    @click:append="showPass_newCon = !showPass_newCon"
                    :type="showPass_newCon ? 'text' : 'password'"
                    :rules="passwordRule"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ລະຫັດຜ່ານເກົ່າ"
                    v-model="txt_user_oldpass"
                    :append-icon="
                      showPass_old ? 'visibility' : 'visibility_off'
                    "
                    @click:append="showPass_old = !showPass_old"
                    :type="showPass_old ? 'text' : 'password'"
                    :rules="oldpasswordRule"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end text-btn">
            <v-btn text @click="$router.push('/register-view')" color="error"
              >ຍົກເລີກ</v-btn
            >
            <v-btn @click="ChangePassword" :disabled="!valid" color="primary"
              >ບັນທຶກ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
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
          "ຕ້ອງມີຕົວເລກ ແລະ ຕົວອັກສອນ",
        (v3) =>
          (v3 && String(v3).valueOf() == String(this.txt_user_psw).valueOf()) ||
          "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        (v4) =>
          (v4 && v4.length >= 10) || "ຕ້ອງຫຼາຍກວ່າ ຫຼື ເທົ່າກັບ 10 ຕົວອັກສອນ",
      ],
      oldpasswordRule: [(v1) => !!v1 || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ"],
      // valid form
      valid: false,
      selectStatus: "User",
      showPass_new: false,
      showPass_newCon: false,
      showPass_old: false,
      /////
      txt_user_psw: null,
      txt_user_conpsw: null,
      txt_user_oldpass: null,
    };
  },

  mounted() {},

  methods: {
    async ChangePassword() {
      if (
        this.txt_user_conpsw &&
        this.txt_user_oldpass &&
        this.$route.params.username
      ) {
        try {
          await axios
            .post(
              this.$store.getters.myHostname + "/api/v1/auth/changePassword",
              {
                username: this.$route.params.username,
                password: this.txt_user_oldpass,
                newpassword: this.txt_user_conpsw,
              }
            )
            .then(() => {
              this.Msg_done("ປ່ຽນລະຫັດຜ່ານຜູ້ໃຊ້ສຳເລັດ");
              this.$router.push("/register-view");
            });
        } catch (err) {
          this.Msg_fail("ປ່ຽນລະຫັດຜ່ານບໍ່ສຳເລັດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ");
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
  font-size: 20px;
}
.text-content,
.text-btn {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
