<template>
  <div>
    <v-container>
      <v-row class="ma-5">
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card
            class="elevation-1 justify-center px-3 card-header"
            width="100%"
            height="120px"
          >
            <v-row>
              <v-col cols="2">
                <v-img
                  src="@/assets/images/logo.png"
                  width="100px"
                  height="100px"
                ></v-img>
              </v-col>
              <v-col cols="10">
                <h4 class="text-header mt-5">
                  ລະບົບຈັດການຂໍ້ມູນສະມາຊິກຂອງອົງການຈັດຕັ້ງຊາວໜຸ່ມມະຫາວິທະຍາໄລແຫ່ງຊາດ ອອນລາຍ
                </h4>
              </v-col>
            </v-row>
          </v-card>
          <div class="my-5">
          
          </div>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
          <v-card
            class="elevation-3 my-Card"
            color="teal lighten-5"
            light
            width="100%"
            height="250px"
          >
            <v-list>
              <v-list-item class="justify-center">
                <v-list-item-avatar size="60">
                  <v-icon size="50" color="teal darken-1">groups</v-icon>
                </v-list-item-avatar>
                <v-list-title-title class="text-title-card"
                  >ສະມາຊິກທັງໝົດ</v-list-title-title
                >
              </v-list-item>
              <v-list-tile-content class="text-center">
                <h2 class="text-content-color">{{Allmember || 0}}</h2>
              </v-list-tile-content>
            </v-list>
          </v-card>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
           <v-card
            class="elevation-3 my-Card"
            color="pink lighten-5"
            light
            width="100%"
            height="250px"
          >
            <v-list>
              <v-list-item class="justify-center">
                <v-list-item-avatar size="60">
                  <v-icon size="50" color="pink darken-1">group</v-icon>
                </v-list-item-avatar>
                <v-list-tile-title class="text-title-card"
                  >ສະມາຊິກຍິງທັງໝົດ</v-list-tile-title
                >
              </v-list-item>
              <v-list-tile-content class="text-center">
                <h2 class="text-content-color" style="color:#D81B60;">{{womenMember || 0}}</h2>
              </v-list-tile-content>
            </v-list>
          </v-card>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
           <v-card
            class="elevation-3 my-Card"
            color="amber lighten-4"
            light
            width="100%"
            height="250px"
          >
            <v-list>
              <v-list-item class="justify-center">
                <v-list-item-avatar size="60">
                  <v-icon size="50" color="amber darken-3">timeline</v-icon>
                </v-list-item-avatar>
                <v-list-tile-title class="text-title-card"
                  >ສະມາຊິກຍົກຍ້າຍທັງໝົດ</v-list-tile-title
                >
              </v-list-item>
              <v-list-tile-content class="text-center">
                <h2 class="text-content-color" style="color:#FF8F00;">{{MemberMoveAll || 0}}</h2>
              </v-list-tile-content>
            </v-list>
          </v-card>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
         <v-card
            class="elevation-3 my-Card"
            color="red lighten-4"
            light
            width="100%"
            height="250px"
          >
            <v-list>
              <v-list-item class="justify-center">
                <v-list-item-avatar size="60">
                  <v-icon size="50" color="red darken-1">person_remove</v-icon>
                </v-list-item-avatar>
                <v-list-tile-title class="text-title-card"
                  >ສະມາຊິກພົ້ນກະສຽນທັງໝົດ</v-list-tile-title
                >
              </v-list-item>
              <v-list-tile-content class="text-center">
                <h2 class="text-content-color" style="color:#D32F2F;">{{memberRetireAll || 0}}</h2>
              </v-list-tile-content>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Main",
  data() {
    return {
      Allmember:0,
      womenMember:0,
      MemberMoveAll:0,
      memberRetireAll:0,
    };
  },
 created() {
   this.getCountMembers();
 },
 
  mounted() {},

  methods: {

   async getCountMembers(){
     try{
      
      var response = await axios.get(this.$store.getters.myHostname+"/api/v1/count-members");
      this.Allmember = parseInt(response.data.members);
      this.womenMember = parseInt(response.data.women);
      this.MemberMoveAll = parseInt(response.data.move);
      this.memberRetireAll = parseInt(response.data.retire);

     }catch(err){
       console.log(err);
     }
    }
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
  font-weight: bold;
}
.sub-header {
  font-family: "boonhome-400";
  font-size: 20px;
}
.card-text {
  font-family: "boonhome-400";
  font-size: 20px;
}
.my-Card {
  border-radius: 15px;
}
.text-title-card {
  font-family: "boonhome-400";
  font-size: 20px;
}
.text-content-color {
  color: #26a69a;
  font-size: 50px;
}
.card-header{
    border-radius: 15px;
    background-color: #E1F5FE;
}
</style>
