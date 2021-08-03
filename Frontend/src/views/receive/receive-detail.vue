<template>
  <div id="ReceiveDetail">
    <v-container fluid>
      <v-row justify="center" class="ma-5">
        <v-card width="100%">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title class="text-header-title">
              ລາຍລະອຽດການຮັບເງິນສະຕິຊາວໜຸ່ມ
            </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="recive_detail"
            class="elevation-4 table-content"
            item-key="id"
            :loading="loading"
            :search="search_recive_detail"
            loading-text="ກຳລັງໂຫຼດ...."
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນການຈ່າຍເງີນສະຕິ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="search_recive_detail"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!---------------->

            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.recive_NO }}</td>
                <td>{{ item.member_name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.typemember }}</td>
                <td>{{ formatPrice(item.money) }}</td>
                <td>{{ item.amount_month }}</td>
                <td>{{ formatPrice(item.total) }}</td>
                <td>{{ item.sect_name }}</td>
                <td>{{ item.unit_name }}</td>
              </tr>
            </template>

            <!-------------->
          </v-data-table>
          <v-card-actions class="justify-start text-action">
            <v-btn @click="$router.push('/receive-money')" color="primary"
              >ກັບຄືນ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReceiveDetail",

  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", value: "index", sortable: false },
        { text: "ເລກທີໃບຮັບເງີນ", value: "recive_NO", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ເງີນສະຕິ/ເດືອນ (ກີບ)", value: "money", sortable: false },
        { text: "ຈຳນວນເດືອນ", value: "amount_month", sortable: false },
        { text: "ລວມເງີນສະຕິ (ກີບ)", value: "total", sortable: false },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
      ],
      recive_detail: [],
      search_recive_detail: null,
      loading: true,
    };
  },
  created() {
    this.Recive_detail();
  },

  mounted() {},

  methods: {
    async Recive_detail() {
      try {
        let response = await axios.get(
          this.$store.getters.myHostname +
            `/api/v1/getReceiveDetail/${this.$route.params.id}`
        );
        this.recive_detail = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  color: #0779e4;
  font-weight: bold;
  font-size: 18px;
}
.table-content,
.text-action {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header-title {
  font-family: "boonhome-400";
  font-size: 20px;
}
</style>
