<template>
  <div id="MemberRetirement">
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-3">
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກພົ້ນກະສຽນທັງໝົດ"
              :subtitle="getCount_allmember"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              :subtitle="getCount_femalemember"
              bg_color="women"
              avatar_ic="people"
            />
          </v-col>
          <v-card width="100%" class="my-3">
            <v-data-table
              :headers="headers"
              :items="myData_menberRetire"
              loading="true"
              loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
              :search="member_retire_search"
              class="header"
            >
              <template v-slot:top>
                <v-toolbar>
                  <v-toolbar-title>
                    <span class="text-header">ຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
                  </v-toolbar-title>
                  <v-divider class="px-2 mr-2" inset vertical></v-divider>
                  <v-text-field
                    label="ຄົ້ນຫາ"
                    v-model="member_retire_search"
                    hide-details
                    single-line
                    append-icon="search"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        fab
                        small
                        color="primary"
                        @click="$router.push('/member-retirement-create')"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ເພີ່ມສະມາຊິກກະສຽນ</span>
                  </v-tooltip>
                </v-toolbar>
              </template>
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.retire_id }}</td>
                  <td>{{ item.member_name }}</td>
                  <td>{{ item.surname }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.typemember }}</td>
                  <td>{{ item.sect_name }}</td>
                  <td>{{ item.unit_name }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.date_retire | formatDate }}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          small
                          v-on="on"
                          v-bind="attrs"
                          @click="edit_item_retire(item.retire_id)"
                          >update</v-icon
                        >
                      </template>
                      <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນ</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-container>
      <formRetireEdit />
    </v-app>
  </div>
</template>

<script>
import formRetireEdit from "@/components/retirement-form/retirementEdit.vue";
import MemberCard from "@/components/cards/MemberCard.vue";
import axios from "axios";
export default {
  name: "MemberRetirement",
  components: {
    MemberCard,
    formRetireEdit,
  },
  data() {
    return {
      headers: [
        {
          text: "ລຳດັບ",
          align: "Left",
          value: "index",
          sortable: false,
        },
        {
          text: "ເລກທີໃບພົ້ນກະສຽນ",
          align: "Left",
          value: "retire_id",
          sortable: false,
        },
        { text: "ຊື່", align: "Left", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", align: "Left", value: "surname", sortable: false },
        { text: "ເພດ", align: "Left", value: "gender", sortable: false },
        { text: "ອາຍຸ", align: "Left", value: "age", sortable: false },
        {
          text: "ປະເພດສະມາຊິກ",
          align: "Left",
          value: "typemember",
          sortable: true,
        },
        { text: "ຈຸ", align: "Left", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", align: "Left", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", align: "Left", value: "fund_name", sortable: true },
        {
          text: "ວັນທີພົ້ນກະສຽນ",
          align: "Left",
          value: "action",
          sortable: false,
        },
        { text: "Actions", align: "Left", value: "action", sortable: false },
      ],
      myData_menberRetire: [],
      member_retire_search: null,
      //-------
      getCount_allmember: null,
      getCount_femalemember: null,
    };
  },
  watch: {
    User() {
      this.getData_retirements();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
  },
  created() {
    this.getData_retirements();
  },

  mounted() {
    this.Count_allmember();
    this.Count_femalemember();
  },
  methods: {
    async getData_retirements() {
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      try {
        if (user_status == "Admin") {
          console.log("dd");
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/retirements"
          );
          this.myData_menberRetire = response.data;
        } else if (user_status == "User") {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/api/v1/retirements/foundations/${fund_id}`
          );
          this.myData_menberRetire = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async Count_allmember() {
      try {
        await axios
          .get(
            this.$store.getters.myHostname + "/api/v1/count-allmembers-retire"
          )
          .then((response) => {
            this.getCount_allmember = response.data.count_member;
          });
      } catch (err) {
        console.log(err);
      }
    },
    async Count_femalemember() {
      try {
        await axios
          .get(
            this.$store.getters.myHostname +
              "/api/v1/count-femalemembers-retire"
          )
          .then((response) => {
            this.getCount_femalemember = response.data.count_member;
          });
      } catch (err) {
        console.log(err);
      }
    },
    edit_item_retire(id) {
      this.$store.dispatch({
        type: "doClick_retireEdit",
        showForm: true,
        retire_id: id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#MemberRetirement {
  font-family: "boonhome-400";
  font-size: 14px;
}
.header,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 20px;
  font-weight: bold;
  color: #0779e4;
}
</style>
