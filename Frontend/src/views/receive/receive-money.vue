<template>
  <div>
    <v-container fluid>
      <v-row class="my-5 mx-10">
        <v-col cols="6">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
              transition="scale-transition"
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar tile size="50" color="primary">
                    <v-icon color="white">money</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="text-card-title"
                        >ຈຳນວນເງີນສະຕິຊາວໜຸ່ມທັງໝົດ</span
                      >
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span class="text-card-subtitle"
                        >{{ formatPrice(CalculateMoneyTotal) }} <small>ກີບ</small></span
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-hover>
        </v-col>
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myReciveMoney"
            class="elevation-1 table-content"
            item-key="id"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດ...."
            :search="searchRecive"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນການຈ່າຍເງີນສະຕິ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນຮາກຖານ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="searchRecive"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="$router.push('/recive-create')"
                      fab
                      small
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ຮັບເງິນສະຕິ</span>
                </v-tooltip>
              </v-toolbar>
              <v-container fluid class="pa-0">
                <v-row class="justify-end">
                  <v-col cols="3">
                    <v-select
                      class="mt-5 mx-4"
                      :items="Years"
                      v-model="Year_selected"
                      label="ສົກຮຽນ"
                      outlined
                      dense
                      @change="search_Recive_Year"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      class="mt-5 mx-4"
                      :items="times"
                      v-model="time_selected"
                      label="ປະຈຳງວດ"
                      outlined
                      dense
                      @change="search_Recive_querterly"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider></v-divider>
            </template>

          <template v-slot:item="{item , index}">
            <tr>
              <td>{{index + 1}}</td>
              <td>{{item.recive_NO}}</td>
               <td>{{item.fund_name}}</td>
                <td>{{item.quarterly}}</td>
                <td>{{item.year}}</td>
                <td>{{formatPrice(item.money_total)}}</td>
                  <td>{{item.date |formatDate}}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{attrs,on}">
                       <v-icon v-on="on" v-bind="attrs" small @click="$router.push({name:'receive-detail',params:{id:item.receive_id}})">more</v-icon>
                    </template>
                    <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                    </v-tooltip>
                  </td>
            </tr>
          </template>


          </v-data-table>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ReceiveMoney",
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ເລກທີໃບບິນ", value: "recive_NO", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
        { text: "ປະຈຳງວດ", value: "quarterly", sortable: false },
        { text: "ສົກຮຽນ", value: "year", sortable: true },
        { text: "ຈຳນວນເງີນທັງໝົດ(ກີບ)", value: "money_total", sortable: false },
        { text: "ວັນທີ", value: "date", sortable: false },
          { text: "Action", value: "action", sortable: false },
      ],
      Year_start: 2000,
      Years: [],
      times:['ງວດທີ I','ງວດທີ II','ໝົດປີ'],
      myReciveMoney:[],
      loading:true,
      searchRecive:null,
      myData_recive:[],
      Year_selected:null,
      time_selected:null,
    };
  },
  created() {
    this.ReciveMoney();
  },
  

  mounted() {
    this.setYear_select();
    this.Year_selected=this.Years[0]
  },
  watch: {
    User() {
      this.ReciveMoney();
    },
  },
  computed: {
    User() {
      return this.$store.getters['User/getmyUser'];
    },
    CalculateMoneyTotal(){
      const money = this.myReciveMoney.map(money => money.money_total);
      var moneyTotal = parseInt(
        money.reduce(function (a, b) {
          return a + b;
        }, 0)
      );
      return moneyTotal;
    }
  
  },
  methods: {
    setYear_select() {
      // let object = [];
      let str = "";
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        let n = i - 1;
        str = (n.toString() + "-" + i.toString()).toString();
        this.Years.push(str);
      }
    },
    // get data recive money 
  async ReciveMoney(){
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      if(user_status=='Admin'){
         try{
         let response = await axios.get(this.$store.getters.myHostname+"/api/v1/getReceiveMoney/admin");
         this.myReciveMoney=response.data;
         this.myData_recive=this.myReciveMoney;
         this.loading=false;
       }catch(err){
         console.log("Admin Error:",err);
       }
      }else if(user_status=="User"){
         try{
         let response = await axios.get(this.$store.getters.myHostname+`/api/v1/getReceiveMoney/client/${fund_id}`);
         this.myReciveMoney=response.data;
          this.myData_recive=this.myReciveMoney;
          this.loading=false;
       }catch(err){
         console.log("User Error:",err);
      }
   }
  },
  formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    search_Recive_Year(){
      this.myReciveMoney=[];
      this.myReciveMoney = this.myData_recive.filter(value =>String(value.year)==String(this.Year_selected))
    },
    search_Recive_querterly(){
      this.myReciveMoney=[];
      this.myReciveMoney=this.myData_recive.filter(value => String(value.quarterly)==String(this.time_selected))
    }
  }
};
</script>

<style lang="scss" scoped>
.table-content,
.text-tooltip,
.text-card-subtitle {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header,
.table-footer {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.text-card-title {
  font-family: "boonhome-400";
  font-size: 18px;
}
.text-tooltip{
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
