<template>
    <div>
        <v-container fluid>
            <v-row justify="center" class="my-10 mx-10">
                 <!-- ຈຳນວນສະມາຊິກທັງໝົດ -->
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກທັງໝົດ"
              subtitle="100"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
                      <!-- ຈຳນວນສະມາຊິກຍິງທັງໝົດ -->
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              subtitle="10"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
             <v-card width="100%">
                 <v-data-table
                     :headers="headers"
                     :items="myData_certi_detail"
                     hide-actions
                     class="elevation-1 table-content"
                     item-key="id"
                     loading="true"
                     loading-text="ກຳລັງໂຫຼດ.."
                     :search="search_certi_detail"
                 >
                     <template v-slot:top>
                         <v-toolbar>
                             <v-toolbar-title>
                                 <span class="text-header">ລາຍລະອຽດການຍ້ອງຍໍສະມາຊິກ</span>
                             </v-toolbar-title>
                             <v-divider class="px-2 mr-2" inset vertical></v-divider>
                             <v-text-field
                                 label="ຄົ້ນຫາຂໍ້ມູນຊະມາຊິກ"
                                 append-icon="search"
                                 single-line
                                 hide-details
                                 v-model="search_certi_detail"
                             ></v-text-field>
                         </v-toolbar>
                          <v-row class="mx-5">
                              <v-col cols="3">
                                  <v-text-field
                                      label="ລະຫັດໃບຍ້ອງຍໍ"
                                      readonly
                                      value="xxxx"
                                  ></v-text-field>
                              </v-col>
                                <v-col cols="3">
                                  <v-text-field
                                      label="ເລກທີໃບຍ້ອງຍໍ"
                                      readonly
                                      value="xxxx"
                                  ></v-text-field>
                              </v-col>
                                <v-col cols="3">
                                  <v-text-field
                                      label="ອອກໃຫ້ໂດຍ"
                                      readonly
                                      value="xxxx"
                                  ></v-text-field>
                              </v-col>
                                <v-col cols="3">
                                  <v-text-field
                                      label="ວັນທີອອກ"
                                      readonly
                                      value="xxxx"
                                  ></v-text-field>
                              </v-col>
                          </v-row>
                     </template>
                 </v-data-table>
                 <v-card-actions class="btn-text">
                     <v-btn color="primary" @click="$router.push('/certificate-view')">
                         ກັບຄືນ
                     </v-btn>
                 </v-card-actions>
             </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
export default {
    name: 'CertificateDetail',
    components:{
     MemberCard,
    },
    data() {
        return {
            search_certi_detail:null,
            headers:[
               {text:"ຊື່",value:"member_name",sortable:false},
               {text:"ນາມສະກຸນ",value:"member_surname",sortable:false},
               {text:"ເພດ",value:"member_gender",sortable:false},
               {text:"ປະເພດສະມາຊິກ",value:"memberType",sortable:true},
               {text:"ເນື້ອໃນການຍ້ອງຍໍ",value:"certi_title",sortable:false},
               {text:"ປະເພດການຍ້ອງຍໍ",value:"certiType",sortable:false},
               {text:"ຈຸ",value:"section",sortable:true},
               {text:"ໜ່ວຍ",value:"unit",sortable:true},
               {text:"ຮາກຖານ",value:"foundation",sortable:false},
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.table-content,
.btn-text{
    font-family: "boonhome-400";
    font-size: 14px;
}
.text-header{
   font-family: "boonhome-400";
    font-size: 18px; 
    color: #0779e4;
}
</style>