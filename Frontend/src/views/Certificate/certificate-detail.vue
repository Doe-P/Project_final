<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-10 mx-10">
        <!-- ຈຳນວນສະມາຊິກທັງໝົດ -->
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກທັງໝົດ"
            :subtitle="getCountAll"
            bg_color="primary"
            avatar_ic="groups"
          />
        </v-col>
        <!-- ຈຳນວນສະມາຊິກຍິງທັງໝົດ -->
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍິງທັງໝົດ"
            :subtitle="getCountFemale"
            bg_color="women"
            avatar_ic="groups"
          />
        </v-col>
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_certi_detail"
            class="elevation-5 table-content"
            :loading="loading"
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
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row class="mx-5 my-2">
                <v-col cols="4">
                  <v-text-field
                    label="ລະຫັດໃບຍ້ອງຍໍ"
                    readonly
                    :value="Certificate_id"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="ເນື້ອໃນການຍ້ອງຍໍ"
                    readonly
                    :value="Certificate_title"
                     outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-0"><v-divider></v-divider></v-col>
              </v-row>
            </template>
           <!----- number of rows --->
           <template #body="{ items, headers }">
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
          <td v-for="n in headers" :key="n">
           {{ n.value === 'index' ? index+1 : item[n.value] }}
        </td>
       </tr>
      </tbody>
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
import axios from 'axios';
export default {
  name: "CertificateDetail",
  components: {
    MemberCard,
  },
  data() {
    return {
      search_certi_detail: null,
    
      headers: [
         { text: "ລຳດັບ", value: "index", sortable: false },
          { text: "ເລກທີໃບຍ້ອງຍໍ", value: "certific_NO", sortable: false },
        { text: "ປະເພດຍ້ອງຍໍ", value: "typeCerti_name", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: false },
      ],
      loading:true,
      myData_certi_detail:[],
      Certificate_id:null,
      Certificate_title:null,
      getCountAll:0,
      getCountFemale:0,
    };
  },

  mounted() {
    this.CertificateDetail();
    this.CountAll();
    this.CountFemale();
  },

  methods: {
   async CertificateDetail(){
     const id = this.$route.params.id;
    if(id){
       try{
        await axios.get(`${this.$store.getters.myHostname}/api/v1/getCertificate_detail/admin/${id}`).then((response)=>{
         this.myData_certi_detail=response.data;
         this.Certificate_id=response.data[0].certific_id;
         this.Certificate_title=response.data[1].title;
         this.loading=false;
      })
     }catch(err){
       console.log(err);
     }
    }
    },
   async CountAll(){
     try{
      await axios.get(this.$store.getters.myHostname+"/api/v1/CountAll/Member/Certificate").then((response)=>{
        this.getCountAll=response.data.amount;
      })
     }catch(err){
       console.log(err);
     }
   },
   async CountFemale(){
     try{
      await axios.get(this.$store.getters.myHostname+"/api/v1/CountFemale/Member/Certificate").then((response)=>{
        this.getCountFemale=response.data.amount;
      })
     }catch(err){
       console.log(err);
     }
   }
  },
};
</script>

<style lang="scss" scoped>
.table-content,
.btn-text {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
</style>
