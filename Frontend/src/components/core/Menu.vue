<template>
  <div id="app">
    <v-navigation-drawer
      v-model="$store.state.showMenu"
      fixed
      absolute
      temporary
      color="#fdfdfd"
      class="fixes"
      width="300px"
    >
      <v-list>
        <v-list-item class="justify-center pa-5">
         
          <div>
              <v-img
              width="100px"
              height="100px"
              src="@/assets/images/logo.png"
            >
            </v-img>
          </div>
         
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="user">
            <v-list-item-title color="primary">
              ຊື່ຜູ້ໃຊ້:
              <span class="user-text">{{ getUser.username }}</span>
              <v-divider class="my-2"></v-divider>
            </v-list-item-title>
            <v-list-item-subtitle>
              ສະຖານະ:
              <span class="user-text">{{ getUser.status }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Menu Drop draw ຈັດການຂໍ້ມູນພື້ນຖານ -->
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">

            <!-- deshboard -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon  medium>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickDashboard">
             <span class="text-menu">ໜ້າຫຼັກ</span>
            </v-list-item-title>
          </v-list-item>
          <!-- ຈັດການຂໍ້ມູນຫຼັກ -->
           <v-list-group
            v-show="getUser.status == 'Admin'"
            :value="false"
            prepend-icon="view_list"
          >
            <template v-slot:activator>
              <v-list-item-title  >
                <span class="text-menu">ຈັດການຂໍ້ມູນຫຼັກ</span>
              </v-list-item-title>
            </template>

            <v-list-item
              link
              v-for="(item, index) in dataManage"
              :key="index"
               class="ml-10 pl-6 subButton-action "
              @click="isClickmenu(item.router)"
            >
              <!-- <v-list-item-icon class="justify-end">
                <v-icon small>{{ item.icons }}</v-icon>
              </v-list-item-icon> -->
              <v-list-item-title><span class="text-subtitle"> {{ item.title }}</span> </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- ຈັດການຂໍ້ມູນສະມາຊິກ -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon  medium>group_add</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickManageMember">
             <span class="text-menu">ຈັດການຂໍ້ມູນສະມາຊິກ</span>
            </v-list-item-title>
          </v-list-item>

            <!-- ສະມາຊິກຍົກຍ້າຍ -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon medium>timeline</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickMove">
             <span class="text-menu">ສະມາຊິກຍົກຍ້າຍ</span>
            </v-list-item-title>
          </v-list-item>

            <!-- ສະມາຊິກກະສຽ່ນ -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon medium>person_remove</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickRetirement">
              <span class="text-menu">ສະມາຊິກພົ້ນກະສຽນ</span>
            </v-list-item-title>
          </v-list-item>

          <!-- ບັນທືກກິດຈະກຳ -->

          <v-list-item link class="button-menu-action" >
            <v-list-item-icon>
              <v-icon medium>local_activity</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickActivity">
              <span class="text-menu">ບັນທຶກກິດຈະກຳ</span>
            </v-list-item-title>
          </v-list-item>

          <!-- ຍ້ອງຍໍ -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon medium>verified</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="certificate"> <span class="text-menu">ຍ້ອງຍໍ</span> </v-list-item-title>
          </v-list-item>

        
        
          <!-- ຮັບເງີນສະຕິ -->
          <v-list-item link class="button-menu-action">
            <v-list-item-icon>
              <v-icon medium>payments</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickReceive">
             <span class="text-menu"> ຮັບເງີນສະຕິ</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-group :value="false" prepend-icon="article">
            <template v-slot:activator>
              <v-list-item-title>
                <span class="text-menu">ລາຍງານ</span>
              </v-list-item-title>
            </template>

            <v-list-item
              link
              v-for="(item, index) in myReports"
              :key="index"
              class=" ml-10 pl-6 subButton-action"
              @click="isClickmenu(item.router)"
            >
              <!-- <v-list-item-icon>
                <v-icon medium>{{ item.icons }}</v-icon>
              </v-list-item-icon> -->
              <v-list-item-title class="text-subtitle"> {{ item.title }} </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-divider></v-divider>
          <!-- <v-list-item link v-show="getUser.status == 'Admin'">
            <v-list-item-icon>
              <v-icon medium>account_box</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="register">ສະໝັກຜູ້ໃຊ້</v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      drawer: true,
      found_id: "F0001-30062021",
      dataManage: [
        { title: "ຈັດການຂໍ້ມູນຮາກຖານ", icons: "domain", router: "/foundation" },
        {
          title: "ຈັດການຂໍ້ມູນໜ່ວຍ",
          icons: "account_balance_wallet",
          router: "/unit",
        },
        { title: "ຈັດການຂໍ້ມູນຈຸ", icons: "class", router: "/section" },
        {
          title: "ຈັດການຂໍ້ມູນປະເພດສະມາຊິກ",
          icons: "people",
          router: "/member-type",
        },
         {
          title: "ຈັດການຂໍ້ມູນລະດັບການສຶກສາ",
          icons: "filter_list",
          router: "/education-level",
        },
        {
          title: "ຈັດການຂໍ້ມູນປະເພດກິດຈະກຳ",
          icons: "local_activity",
          router: "/activity-type",
        },
        {
          title: "ຈັດການຂໍ້ມູນປະເພດການຍ້ອງຍໍ",
          icons: "stars",
          router: "/certificate-type",
        },
        {
          title: "ຈັດການຂໍ້ມູນຜູ້ໃຊ້ລະບົບ",
          icons: "stars",
          router: "/register-view",
        },
      ],
      myReports: [
        {
          title: "ລາຍງານສະມາຊິກ",
          icons: "domain",
          router: "/members-report",
        },
        {
          title: "ລາຍງານສະຖິຕິຊາວໜຸ່ມ",
          icons: "insert_chart",
          router: "/members-statistics-report",
        },
        {
          title: "ລາຍງານຂໍ້ມູນສະຖິຕິຍົກຍ້າຍ",
          icons: "confirmation_number",
          router: "/member-move-report",
        },
        {
          title: "ລາຍງານຂໍ້ມູນສະຖິຕິຜູ້ພົ້ນກະສຽນ",
          icons: "person_remove",
          router: "/members-retirement-report",
        },
        {
          title: "ລາຍງານການຮັບເງິນສະຕິ",
          icons: "payments",
          router: "/receive-report",
        },
        {
          title: "ລາຍງານການເຄື່ອນໄຫວກິດຈະກຳ",
          icons: "local_activity",
          router: "/activity-report",
        },
        {
          title: "ລາຍງານການຍ້ອງຍໍ",
          icons: "stars",
          router: "/certificate-report",
        },
      ],
      Username: null,
      Status: null,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("User", {
      getUser: "getmyUser",
    }),
  },
  methods: {
    isClickmenu(path) {
      this.$router.push(path).catch((err) => {
        console.log(err);
      });
      this.$store.dispatch({
        type: "doClickshow",
      });
    },

    ClickDashboard(){
    this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/dashboard");
    },
    ClickManageMember() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/Member");
    },
    ClickActivity() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/activity");
    },
    ClickRetirement() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/member-retirement");
    },
    ClickMove() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/member-move");
    },
    ClickReceive() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/receive-money");
    },
    certificate() {
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/certificate-view");
    },
    isClickmenuReport(path) {
      this.$router.push(path).catch((err) => {
        console.log(err);
      });
      this.$store.dispatch({
        type: "doClickshow",
      });
    },
    // register() {
    //   this.$store.dispatch({
    //     type: "doClickshow",
    //   });
    //   this.$router.push("/register-view");
    // },
    get_users() {
      this.$store.dispatch({
        type: "doget_users",
        username: "dodo",
        userstatus: "admin",
        foundation: this.found_id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fixes {
  position: fixed;
}
.user {
  
  padding: 5px;
}
.user-text {
  color: #0760a8;
  text-align: center !important;
  margin-left: 10px;
}
.text-menu{
  font-family: 'boonhome-400';
  font-size: 16px;
  font-weight: 30px;
}

.button-menu-action:hover{
  background-color: #D8E3E7;
  transform: translateX(10px);
  transition-delay: transform 250ms, opacity 100ms;
  transition-timing-function: ease-in-out 250ms;
}

.subButton-action:hover{
 background-color: #cee2f3 ;
  transition-delay: transform 250ms, opacity 100ms;
  transition-timing-function: ease-in-out 250ms;
}
.text-subtitle{
  font-family: 'boonhome-400';
  font-size: 14px;
  font-weight: 30px;
}
</style>
