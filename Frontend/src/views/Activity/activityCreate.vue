<template>
  <div id="Activitycreate">
    <v-container fluid>
      <v-row justify="center" class="my-10 mx-5">
        <v-card width="100%">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="myData_member"
            :single-select="single_select"
            item-key="member_id"
            show-select
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ..."
            class="elevation-1 table-content"
            :search="searchData_member"
            @input="checkSelect($event)"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-3" inset vertical></v-divider>
                <v-text-field
                  name="txt_search_Datamember"
                  label="ຄົ້ນຫາສະມາຊິກ"
                  id="id"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="searchData_member"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!--
            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>
                  <v-simple-checkbox
                    v-model="selected_item"
                    :value="item.id"
                    @click="select"
                  ></v-simple-checkbox>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.member_level }}</td>
                <td>{{ item.member_unit }}</td>
                <td>{{ item.member_section }}</td>
                <td>{{ item.member_foundation }}</td>
              </tr>
            </template>
            -->
            <!----- number of rows --->
            <!-- <template #body="{ items, headers }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td v-for="n in headers" :key="n">
                    {{ n.value === "index" ? index + 1 : item[n.value] }}
                  </td>
                </tr>
              </tbody>
            </template> -->

            <!-------------->
          </v-data-table>
          <v-card-actions class="justify-space-between table-content">
            <v-btn color="error" dark @click="$router.push('/activity')">
              <span>ຍົກເລີກ</span>
            </v-btn>
            <v-btn
              @click.prevent="SaveData_activitys"
              :disabled="checked"
              color="primary"
            >
              <span>ບັນທຶກ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Activitycreate",
  data() {
    return {
      myData_member: [
        {
          mem_id: 1,
          mem_name: "do",
          mem_surname: "dodo",
          mem_gender: "gg",
          mem_edulevel: "dd",
          mem_unit: "dd",
          mem_section: "ff",
          mem_foundation: "hh",
        },
        {
          mem_id: 2,
          mem_name: "tado",
          mem_surname: "dodo",
          mem_gender: "gg",
          mem_edulevel: "dd",
          mem_unit: "dd",
          mem_section: "ff",
          mem_foundation: "hh",
        },
        {
          mem_id: 3,
          mem_name: "do",
          mem_surname: "dodo",
          mem_gender: "gg",
          mem_edulevel: "dd",
          mem_unit: "dd",
          mem_section: "ff",
          mem_foundation: "hh",
        },
      ],
      // search member
      searchData_member: null,
      //
      headers: [
       // { text: "#ລຳດັບ", align: "Left", value: "index" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: false },
        { text: "ລະດັບການສຶກສາ", value: "level_name", sortable: true },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
      ],
      // select all
      single_select: false,
      selected: [],
      checked: true,
      loading: true,
      filter_MemberID: [],
      array: [],
    };
  },
  created() {
    this.getData_member();
  },

  mounted() {},
  watch: {
    User() {
      this.getData_member();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
  },
  methods: {
    checkSelect(value) {
      if (value != "") {
        this.checked = false;
        this.filter_member();
      } else {
        this.checked = true;
        this.filter_MemberID = [];
      }
    },
    //filter id in data member
    filter_member() {
      this.filter_MemberID = [];
      this.filter_MemberID = this.myData_member.map((a) => a.member_id);
    },
    //get data member
    async getData_member() {
      const user_status = this.User.status;
      const get_found = this.User.fund_id;
      this.myData_member = [];
      if (user_status == "Admin") {
        try {
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/getMembers"
          );
          this.myData_member = response.data;
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
      } else if (user_status == "User") {
        try {
          let response = await axios.get(
            `${this.$store.getters.myHostname}/api/v1/getMembers/${get_found}`
          );
          this.myData_member = response.data;
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async SaveData_activitys() {
      let arr = this.$route.params.data;
      let arrray = arr.split(",");
      // let total =this.filter_MemberID.length
      // let arrActivity = arrray.push(total)
      var json_arr = {};
      (json_arr.acti_id = arrray[0]),
        (json_arr.acti_title = arrray[1]),
        (json_arr.typeAct_id = arrray[2]);
      json_arr.place = arrray[3];
      json_arr.amount_acti = this.selected.length;
      json_arr.date_acti = arrray[5];
      let mydata_arr = [];
      for (let i in this.filter_MemberID) {
        json_arr.member_id = this.filter_MemberID[i];
        mydata_arr[i] = {
          acti_id: arrray[0],
          acti_title: arrray[1],
          typeAct_id: arrray[2],
          place: arrray[3],
          amount_acti: this.selected.length,
          date_acti: arrray[5],
          member_id: this.filter_MemberID[i],
        };
      }

      console.log(mydata_arr);

      if (arrray && mydata_arr) {
        try {
          await axios
            .post(this.$store.getters.myHostname + "/api/v1/new-activity", {
              data: mydata_arr,
            })
            .then(() => {
              this.Msg_done("ບັນທືກຂໍ້ມູນກິດຈະກຳສຳເລັດ");
              this.$router.push("/activity");
              location.reload();
            });
        } catch (err) {
          this.Msg_fail(
            "ບັນທຶກຂໍ້ມູນກິດຈະກຳບໍ໋ສຳເລັດ ກະລຸນາກວດສອບຂໍ້ມູນອີກຄັ້ງ"
          );
          console.log(err);
        }
      } else {
        this.Msg_fail("ມີຂໍ້ຜິດພາດກັບຂໍ້ມູນກິດຈະກຳ ຫຼື ຂໍ້ມູນສະມາຊິກ");
      }
    },
    // message done
    Msg_done(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "success",
        micon: "check_circle",
        message: text,
      });
    },
    //message fail
    Msg_fail(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: text,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-search,
.table-content {
  font-family: "boonhome-400";
  font-weight: 24px;
}
</style>
