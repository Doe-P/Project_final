<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_certificate"
            class="elevation-1 table-content"
            loading="true"
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
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.certifi_id }}
                </td>
                <td>{{ item.cert_NO }}</td>
                <td>{{ item.cert_title }}</td>
                <td>{{ item.typecerti_name }}</td>
                <td>{{ item.amount_cert }}</td>
                <td>{{ item.cert_locate }}</td>
                <td>{{ item.sign_date }}</td>
                <td>{{ item.sign_by }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        medium
                        @click="editcertificate_item"
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນການຍ້ອງຍໍ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon @click="openform_addMember_certi" medium v-on="on" v-bind="attrs">group_add</v-icon>
                    </template>
                    <span class="text-tooltip">ເພີ່ມສະມາຊິກທີ່ຕ້ອງຍ້ອງຍໍ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon @click="$router.push('/certificate-detail')" medium v-on="on" v-bind="attrs"
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
        { text: "ລະຫັດໃບຍ້ອງຍໍ", value: "certi_id", sortable: false },
        { text: "ເລກທີໃບຍ້ອງຍໍ", value: "certi_NO", sortable: false },
        { text: "ເນື້ອໃນການຍ້ອງຍໍ", value: "certi_content", sortable: false },
        { text: "ປະເພດການຍ້ອງຍໍ", value: "certiType_name", sortable: true },
        { text: "ຈຳນວນສະມາຊິກ", value: "certi_amount", sortable: false },
        { text: "ອອກທີ່", value: "certi_locate", sortable: false },
        { text: "ວັນທີອອກ", value: "certi_date", sortable: false },
        { text: "ອອກໃຫ້ໂດຍ", value: "sign_by", sortable: false },
        { text: "Actions", value: "action", sortable: false, align: "center" },
      ],
      searchData_certificate: "",
      myData_certificate: [{ certifi_id: 1 }],
      myFoundation: [],
      myUnit: [],
      show: true,
    };
  },

  mounted() {},

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
