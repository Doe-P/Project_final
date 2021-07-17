<template>
  <div>
    <v-container fluid>
      <v-row class="my-5 mx-10">
         <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
            :subtitle="getCount_all"
            bg_color="primary"
            avatar_ic="groups"
          />
         </v-col>
         <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍຍິງທັງໝົດ"
            :subtitle="getCount_female"
            bg_color="primary"
            avatar_ic="groups"
          />
         </v-col>
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="moveDetail"
            class="elevation-1 table-content"
            item-key="id"
            :loading="load_data"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ...."
            :search="search_moveDetail"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-title">ລາຍລະອຽດສະມາຊິກຍົກຍ້າຍ</span>
                </v-toolbar-title>
                 <v-divider class="px-1 mr-2" inset vertical></v-divider>
                 <v-text-field
                label="ຄົ້ນຫາ"
                hide-details
                single-line
                append-icon="search"
                v-model="search_moveDetail"
              ></v-text-field>
              <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
           <v-card-actions class="justify-space-between table-content">
              <v-btn color="primary" dark @click="$router.push('/member-move')">
              <span>ກັບຄືນ</span>
            </v-btn>
          
           </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue"
import axios from 'axios';
export default {
  name: "MemberMoveDetail",
  components: { MemberCard },
  data() {
    return {
        search_moveDetail:"",
        moveDetail:[],
        load_data:true,
        getCount_all:0,
        getCount_female:0,
        headers:[
            {text:"ລຳດັບ",value:"move_id",sortable:false},
            {text:"ເລກທີໃບຍົກຍ້າຍ",value:"move_NO",sortable:false},
            {text:"ຊື່",value:"member_name",sortable:false},
            {text:"ນາມສະກຸນ",value:"surname",sortable:false},
            {text:"ເພດ",value:"gender",sortable:true},
              {text:"ສົກປີ",value:"m_Year",sortable:false},
               {text:"ຈຸ",value:"sect_name",sortable:true},
               {text:"ໜ່ວຍ",value:"unit_name",sortable:true},
                 {text:"ຮາກຖານ",value:"fund_name",sortable:true},
        ]
    };
  },

  mounted() {
    this.getMember_movedetail();
     this.CountAll_move();
      this.Countfemale_move();
  },

  methods: {
      //count all
   async CountAll_move(){
     const id =this.$route.params.id;
      try{
        await axios.get(`${this.$store.getters.myHostname}/api/v1/countAll/${id}`).then((response)=>{
          this.getCount_all=parseInt(response.data.amount);
        })
      }catch(err){
        console.log(err);
      }
    },
     //count female
   async Countfemale_move(){
     const id =this.$route.params.id;
      try{
        await axios.get(`${this.$store.getters.myHostname}/api/v1/countfemale/${id}`).then((response)=>{
          this.getCount_female=parseInt(response.data.amount)
        })
      }catch(err){
        console.log(err);
      }
    },
    // get member move detail by id
   async getMember_movedetail(){
     const id=this.$route.params.id
      try{
       await axios.get(`${this.$store.getters.myHostname}/api/v1/move/getmove-detail/${id}`).then((response)=>{
         this.moveDetail=response.data;
         this.load_data=false;
       })
      }catch(err){
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.text-title {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.table-content {
  font-family: "boonhome-400";
  font-size: 10px;
}
</style>
