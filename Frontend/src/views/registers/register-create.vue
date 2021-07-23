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
              <v-row class="mx-10">
                <v-col cols="12">
                  <v-text-field
                    label="ຊື່ຜູ້ໃຊ້"
                    v-model="txt_user_name"
                    counter="20"
                    :rules="[
                      required('ຊື່ຜູ້ໃຊ້'),
                      minLength('ຊື່ຜູ້ໃຊ້', 5),
                      maxLength('ຊື່ຜູ້ໃຊ້', 20),
                    ]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ລະຫັດຜູ້ໃຊ້"
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
                <v-col cols="6">
                  <v-text-field
                    label="ຢືນຢັນລະຫັດຜ່ານ"
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
                <v-col cols="6" v-show="selectStatus == 'User'">
                  <v-select
                    :items="myfoundation"
                    v-model="found_selected"
                    label="ເລືອກຮາກຖານ"
                    :rules="[isChecked('ຮາກຖານ', selectStatus)]"
                    outlined
                    dense
                    @input="getFoundsID"
                  ></v-select>
                </v-col>
                <v-col cols="12">
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
          <v-card-actions class="justify-end text-btn">
            <v-btn text @click="$router.push('/register-view')" color="error"
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
      isChecked(propertyType, condition) {
        if (condition == "User") {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        }
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
      // valid form
      valid: false,
      selectStatus: "User",
      showPass_new: false,
      showPass_newCon: false,
      ///
      txt_user_name: null,
      txt_user_psw: null,
      txt_user_conpsw: null,
      myfoundation: [],
      myfoundation_all: [],
      found_selected: null,
      get_fund_id: "Admin",
      get_fund_name: "Admin",
    };
  },

  mounted() {
    this.Foundation();
  },

  methods: {
    async Foundation() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/foundations")
          .then((response) => {
            this.myfoundation_all = response.data;
            for (let i in this.myfoundation_all) {
              this.myfoundation.push(this.myfoundation_all[i].fund_name);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    getFoundsID() {
      for (let i in this.myfoundation_all) {
        if (
          String(this.found_selected).valueOf() ==
          String(this.myfoundation_all[i].fund_name).valueOf()
        ) {
          this.get_fund_id = this.myfoundation_all[i].fund_id;
          this.get_fund_name = this.myfoundation_all[i].fund_name;
          console.log(this.get_fund_id);
        }
      }
    },
    async saveData_user() {
      if (this.txt_user_name && this.txt_user_conpsw && this.selectStatus) {
        try {
          await axios
            .post(this.$store.getters.myHostname + "/api/v1/auth/signUp", {
              username: this.txt_user_name,
              password: this.txt_user_conpsw,
              fund_id: this.get_fund_id,
              fund_name: this.get_fund_name,
              status: this.selectStatus,
            })
            .then(() => {
              this.Msg_done("ບັນທຶກຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ");
              this.$router.push("/register-view");
              location.reload();
            });
        } catch (err) {
          this.Msg_fail("ບັນທຶກຂໍ້ມູນຜູ້ໃຊ້ຜິດພາດ");
          console.log(err);
        }
      } else {
        this.Msg_fail("ຂໍ້ມູນຜູ້ໃຊ້ບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຄືນໃໝ່");
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
