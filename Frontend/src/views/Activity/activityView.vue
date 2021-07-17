<template>
  <div id="Activitydetail">
    <v-container fluid>
      <v-row justify="center" class="my-10 mx-5">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_act_detaill"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກເຂົ້າຮ່ວມກິດຈະກຳ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  name="txt_search"
                  label="ຄົ້ນຫາ"
                  id="id"
                  single-line
                  hide-details
                  v-model="searchData"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item="{item,index}">
              <tr class="table-content">
                <td>{{index + 1}}</td>
                <td>{{ item.acti_title }}</td>
                <td>{{ item.typeAct_name }}</td>
                 <td>{{ item.member_name }}</td>
                <td>{{ item.member_surname }}</td>
                <td>{{ item.gender }}</td>
                 <td>{{ item.typemember }}</td>
                <td>{{ item.unit_name}}</td>
                <td>{{ item.sect_name }}</td>
                <td>{{ item.fund_name }}</td>
               
              </tr>
            </template>
          </v-data-table>
          <v-card-actions class="justify-start table-content">
            <v-btn
              @click="$router.push('/activity')"
              color="primary"
              class="lighten-0"
            >
              <span>ກັບຄືນ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Activitydetail",
  props:['myID'],
  data() {
    return {
      myData_act_detaill: [],
      searchData: null,
      loading:true,
      headers: [
        { text: "ລຳດັບ", value: "NO", sortable: false },
         { text: "ຫົວຂໍ້ກິດຈະກຳ", value: "acti_title", sortable: false },
        { text: "ປະເພດກິດຈະກຳ", value: "typeAct_name", sortable: true },
        { text: "ຊື່", value: "name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: true },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
      ],
    };
  },
  mounted() {
    this.getActivity_detail();
  },
  methods: {
    async getActivity_detail(){
      try{
      await axios.get(`${this.$store.getters.myHostname}/api/v1/activityDetail/${this.$route.params.activity_view}`).then((response)=>{
       this.myData_act_detaill=response.data;
       this.loading=false;
      })
      }catch(err){
        console.log(err);
      }
    },
  },

  created(){
    console.log(this.$route.params.activity_view);
  }
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-search,
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-weight: 24px;
}
</style>
