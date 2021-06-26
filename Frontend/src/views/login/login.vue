<template>
  <div id="Login">
    <template>
      <v-app>
        <v-row class="justify-center my-10">
          <v-card height="400" width="300">
            <v-card-title primary-title class="title justify-center">
              <v-avatar size="120">
                <img src="@/assets/images/logo.png" />
              </v-avatar>
            </v-card-title>
            <v-card-subtitle class="text-center pt-2">
              <span class="header-text">
                <h2>ເຂົ້າສູ່ລະບົບ</h2>
              </span>
            </v-card-subtitle>
            <v-divider class="mx-5"></v-divider>
            <v-card-text class="px-5">
              <v-form @submit.prevent="isLogin">
                <v-text-field
                  class="text-input"
                  type="text"
                  v-model="account.username"
                  prepend-icon="person"
                  name="txt_username"
                  id="txt_username"
                  required
                  counter
                  :rules="usernameRule"
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
                  counter
                  :rules="passwordRule"
                ></v-text-field>
               <v-card-actions class="justify-space-between">
                   <v-btn  class="text-input" text color="primary">ລືມລະຫັດຜ່ານ</v-btn>
                 <v-btn type="submit"  class="text-input" color="primary">ເຂົ້າສູ່ລະບົບ</v-btn>
               </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-app>
    </template>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isshowPassword: false,
      found_items:[],
      selected_found_Item:null,
      account: {
        username: null,
        password: null,
      },
      usernameRule: [(v1) => !!v1 || "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ກ່ອນ"],
      passwordRule: [
        (v1) => !!v1 || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ",
        (v2) =>
          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) ||
          "ຕ້ອງປ້ອນຕົວອັກສອນກັບຕົວເລກໃຫ້ເທົ່າກັບຫຼືຫຼາຍກວ່າ 8 ຕົວຢ່າງ Test1234",
      ],
    };
  },
  mounted() {},
  methods: {
      isLogin(){
          this.$store.dispatch({
            type:"doLogin",
            status:true
          })
          this.$router.push('/Member');
      }
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
</style>
