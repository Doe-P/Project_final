<template>
  <div id="Login">
    <template>
      <v-app>
        <v-row class="justify-center my-card">
          <v-card height="400" width="350" class="login-card mt-10">
            <v-card-title primary-title class="title justify-center">
              <img width="100" height="100" src="@/assets/images/logo.png" />
            </v-card-title>
            <v-card-subtitle class="text-center pt-2">
              <span class="header-text">
                <h2>ເຂົ້າສູ່ລະບົບ</h2>
              </span>
            </v-card-subtitle>
            <v-divider class="mx-5"></v-divider>
            <v-card-text class="px-5">
              <v-form @submit.prevent="isLogin" v-model="invalid">
                <v-text-field
                  class="text-input"
                  type="text"
                  v-model="account.username"
                  prepend-icon="person"
                  name="txt_username"
                  id="txt_username"
                  required
                  :rules="usernameRule"
                  outlined
                  dense
                  hint="ປ້ອນຊື່ຜູ້ໃຊ້"
                ></v-text-field>
                <v-text-field
                  class="text-input"
                  v-model="account.password"
                  prepend-icon="lock"
                  name="txt_password"
                  id="txt_password"
                  required
                  :append-icon="
                    isshowPassword ? 'visibility' : 'visibility_off'
                  "
                  @click:append="isshowPassword = !isshowPassword"
                  :type="isshowPassword ? 'text' : 'password'"
                  :rules="passwordRule"
                  outlined
                  dense
                  hint="ປ້ອນລະຫັດຜ່ານ"
                ></v-text-field>
                <div class="button-login">
                  <v-btn
                    :disabled="!invalid"
                    type="submit"
                    class="text-input"
                    color="primary"
                    width="100%"
                    :loading="buttonLoading"
                    >ເຂົ້າສູ່ລະບົບ</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-app>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      isshowPassword: false,
      invalid: false,
      buttonLoading: false,
      account: {
        username: null,
        password: null,
      },
      usernameRule: [(v1) => !!v1 || "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ກ່ອນ"],
      passwordRule: [
        (v1) => !!v1 || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ",
        (v2) =>
          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/.test(v2) ||
          "ລະຫັດຜ່ານຕ້ອງຫຼາຍກວ່າ ຫຼື ເທົ່າກັບ 10",
      ],
    };
  },
  mounted() {},
  methods: {
    async isLogin() {
      if(this.account){
           try {
        this.buttonLoading = true;
        await axios
          .post(this.$store.getters.myHostname + "/api/v1/auth/signIn1", {
            username: this.account.username,
            password: this.account.password,
          })
          .then((response) => {
            if (response) {
              console.log(response);
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
                localStorage.setItem("accessToken", response.data.accessToken);
                this.$store.dispatch({
                  type: "doLogin",
                });
                this.buttonLoading = false;
                 this.$router.push("/dashboard");
                 location.reload();
            }
          });
      } catch (err) {
        this.Msg_fail(
          "ມີຂໍ້ຜິດພາດໃນການເຂົ້າສູ່ລະບົບ ກະລຸນາກວດສອບ ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານຄືນໃໝ່"
        );
         this.buttonLoading = false;
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
    //----------
  },
};
</script>

<style lang="scss" scoped>
.header-text {
  font-family: "boonhome-400";
  font-size: 14px;
  color: #0779e4;
  font-weight: bold;
}
.text-input {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.login-card {
  transition: transform 250ms;
  border: #6ddccf 5px;
  border-radius: 15px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px !important;
}
.login-card:hover {
  transition-delay: 20ms;
  transform: translateY(-10px);
}
.my-card {
  width: 100%;
  height: 100%;
}
.button-login {
  width: 90%;
  margin-left: 10%;
}
</style>
