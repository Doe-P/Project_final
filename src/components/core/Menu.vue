<template>
  <div id="app">
    <v-navigation-drawer
      v-model="this.$store.getters.getShowmenu"
      absolute
      temporary
      color="#fdfdfd"
    >
      <v-list>
        <v-list-item class="justify-center">
           <v-list-item-avatar size="100">
          <v-img
          max-height="100"
          max-width="100"
          sizes="100"
          src="@/assets/images/logo.png"
          >
          </v-img>
        </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Username </v-list-item-title>
            <v-list-item-subtitle> Status </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Menu Drop draw -->
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickDeshboard">
              ໜ້າຫຼັກ
            </v-list-item-title>
          </v-list-item>
          <v-list-group :value="true" prepend-icon="view_list">
            <template v-slot:activator>
              <v-list-item-title>
                <span>ການຈັດການ</span>
              </v-list-item-title>
            </template>

            <v-list-item
              link
              v-for="(item, index) in dataManage"
              :key="index"
              class="pa-0"
              @click="isClickmenu(item.router)"
            >
              <v-list-item-icon>
                <v-icon medium>{{ item.icons }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title> {{ item.title }} </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>local_activity</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickActivity">
              ບັນທຶກກິດຈະກຳ
            </v-list-item-title>
          </v-list-item>

           <!-- ສະມາຊິກກະສຽ່ນ -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>verified</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="certificate">
              ຍ້ອງຍໍ
            </v-list-item-title>
          </v-list-item>
          
          <!-- ສະມາຊິກກະສຽ່ນ -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>person_remove</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickRetirement">
              ສະມາຊິກພົ້ນກະສ່ຽນ
            </v-list-item-title>
          </v-list-item>
            <!-- ສະມາຊິກຍົກຍ້າຍ -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>timeline</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickMove">
              ສະມາຊິກຍົກຍ້າຍ
            </v-list-item-title>
          </v-list-item>
              <!-- ຮັບເງີນສະຕິ -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>payments</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="ClickReceive">
              ຮັບເງີນສະຕິ
            </v-list-item-title>
          </v-list-item>
               <v-list-group :value="true" prepend-icon="article">
            <template v-slot:activator>
              <v-list-item-title>
                <span>ລາຍງານ</span>
              </v-list-item-title>
            </template>

            <v-list-item
              link
              v-for="(item, index) in myReports"
              :key="index"
              class="pa-0"
              @click="isClickmenu(item.router)"
            >
              <v-list-item-icon>
                <v-icon medium>{{ item.icons }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title> {{ item.title }} </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-divider></v-divider>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon medium>account_box</v-icon>
            </v-list-item-icon>
            <v-list-item-title> ຕັ້ງຄ່າ </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      drawer: true,
      dataManage: [
        { title: "ຈັດການຂໍ້ມູນຮາກຖານ", icons: "domain", router: "/foundation" },
        {
          title: "ຈັດການຂໍ້ມູນໜ່ວຍ",
          icons: "account_balance_wallet",
          router: "/unit",
        },
        { title: "ຈັດການຂໍ້ມູນຈຸ", icons: "class", router: "/section" },
        {
          title: "ຈັດການຂໍ້ມູນລະດັບການສຶກສາ",
          icons: "filter_list",
          router: "/education-level",
        },
        {
          title: "ຈັດການຂໍ້ມູນປະເພດສະມາຊິກ",
          icons: "people",
          router: "/member-type",
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
      ],
      myReports:[
        {
         title:"ລາຍງານສະມາຊິກ",
         icons:"domain",
         router:"/members-report"
        },
          {
         title:"ລາຍງານສະຖິຕິຊາວໜຸ່ມ",
         icons:"insert_chart",
         router:"/members-statistics-report"
        },
          {
         title:"ລາຍງານຈຳນວນສະມາຊິກທີ່ຍົກຍ້າຍ",
         icons:"confirmation_number",
         router:""
        },
          {
         title:"ລາຍງານຈຳນວນຜູ້ພົ້ນກະສຽນ",
         icons:"person_remove",
         router:""
        },
          {
         title:"ລາຍງານການຮັບເງິນສະຕິ",
         icons:"payments",
         router:""
        },
         {
         title:"ລາຍງານການເຄື່ອນໄຫວກິດຈະກຳ",
         icons:"local_activity",
         router:""
        },
         {
         title:"ລາຍງານການຍ້ອງຍໍ",
         icons:"stars",
         router:""
        },
      ]
    };
  },
  mounted() {},
  methods: {
    isClickmenu(path) {
      this.$router.push(path).catch((err) => {
        console.log(err);
      });
      this.$store.dispatch({
        type: "doClickshow",
      });
    },
    ClickDeshboard() {
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
    ClickMove(){
       this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/member-move");
    },
    ClickReceive(){
       this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/receive-money");
    },
    certificate(){
      this.$store.dispatch({
        type: "doClickshow",
      });
      this.$router.push("/certificate-view");
    },
    isClickmenuReport(path){
      this.$router.push(path).catch((err)=>{
        console.log(err);
      });
       this.$store.dispatch({
        type: "doClickshow",
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
