<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_certificate"
            class="elevation-3 table-content"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດ.."
            :search="searchData_certificate"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header mr-5">ຂໍ້ມູນການຍ້ອງຍໍ</span>
                </v-toolbar-title>
                <v-divider class="mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  hide-details
                  single-line
                  append-icon="search"
                  v-model="searchData_certificate"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="open_dialog"
                      fab
                      small
                      v-on="on"
                      v-bind="attrs"
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="table-content">ເພີ່ມເນື້ອໃນການຍ້ອງຍໍ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item,index }">
              <tr>
                <td>
                  {{ index + 1 }}
                </td>
                <td>{{ item.certific_NO }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.typeCerti_name }}</td>
                <td>{{ item.amount_cert }}</td>
                <td>{{ item.locate }}</td>
                <td>{{ item.date_sign | formatDate }}</td>
                <td>{{ item.sign_by }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        small
                        @click="editcertificate_item"
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນການຍ້ອງຍໍ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon @click="$router.push('/certificate-detail')" small v-on="on" v-bind="attrs"
                        >table_view</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      <formAdd />
      <addMembercertificate />
      <formEdit/>
    </v-container>
  </div>
</template>

<script>
import formAdd from "@/components/certificate-form/certificate-formAdd.vue";
import formEdit from "@/components/certificate-form/certificate-formEdit.vue";
import addMembercertificate from "@/components/certificate-form/addMember_certificate.vue";
import axios from 'axios';
export default {
  name: "CertificateView",
  components: {
    formAdd,
    formEdit,
    addMembercertificate,
  },
  data() {
    return {
      headers: [
        { text: "ລຳດັບ", value: "NO", sortable: false },
        { text: "ເລກທີໃບຍ້ອງຍໍ", value: "certific_NO", sortable: false },
        { text: "ເນື້ອໃນການຍ້ອງຍໍ", value: "title", sortable: false },
        { text: "ປະເພດການຍ້ອງຍໍ", value: "typeCerti_name", sortable: true },
        { text: "ຈຳນວນສະມາຊິກ", value: "amount_cert", sortable: false },
        { text: "ອອກທີ່", value: "locate", sortable: false },
        { text: "ວັນທີອອກ", value: "date_sign", sortable: false },
        { text: "ອອກໃຫ້ໂດຍ", value: "sign_by", sortable: false },
        { text: "Actions", value: "action", sortable: false, align: "center" },
      ],
      searchData_certificate: "",
      myData_certificate: [{ certifi_id: 1 }],
      myFoundation: [],
      myUnit: [],
      show: true,
      loading:true,
    };
  },

  mounted() {
    this.getData_certificate();
  },

  methods: {
    open_dialog() {
      this.$store.dispatch({
        type: "doClickFormadd_certificate",
        value: true,
      });
    },
    editcertificate_item() {
      this.$store.dispatch({
        type: "doClickFormedit_certificate",
        value: true,
      });
    },
    openform_addMember_certi(){
      this.$store.dispatch({
        type:"doClickAddmember_certificate",
        value:true,
      })
    },
     //get data certificate
     async getData_certificate(){
       this.myData_certificate=[]
       let user_status="admin"
       if(user_status=="admin"){
          try{
         await axios.get(this.$store.getters.myHostname+"/api/v1/geCertificate/admin").then((response)=>{
           this.myData_certificate=response.data;
           this.loading=false;
         })
       }catch(err){
         console.log(err);
       }
       }else{
           try{
         await axios.get(`${this.$store.getters.myHostname}/`).then((response)=>{
           this.myData_certificate=response.data;
           this.loading=false;
         })
       }catch(err){
         console.log(err);
       }
       }
     }
  },
};
</script>

<style lang="scss" scoped>
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
  color: #0779e4;
}
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
