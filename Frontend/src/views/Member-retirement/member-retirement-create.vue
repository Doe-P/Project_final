<template>
  <div id="MemberRetirementCreate">
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-5 table-header">
        <v-card width="100%">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title> ເພີ່ມສະມາຊິກພົ້ນກະສຽນ </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="myData_memRetire"
            hide-actions
            class="elevation-5"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="search_memberRetire"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ສະມາຊິກທີ່ມີອາຍຸ 35 ປີ</span>
                </v-toolbar-title>
                <v-divider class="px-1 mr-4" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="search_memberRetire"
                ></v-text-field>
                <v-spacer></v-spacer>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-on="on" v-bind="attrs">
                      <v-icon>print</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ພິມຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
                </v-tooltip> -->
              </v-toolbar>
            </template>
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.member_name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.birthday | formatDate }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.responsible }}</td>
                <td>{{ item.sect_name }}</td>
                <td>{{ item.unit_name }}</td>
                <td>{{ item.fund_name }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          selectItem(
                            item.member_id,
                            item.member_name,
                            item.surname,
                            item.age
                          )
                        "
                        text
                        small
                        color="primary"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ຄລິກເພື່ອເພີ່ມ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-card-actions class="justify-start">
            <v-btn
              color="primary"
              small
              @click="$router.push('/member-retirement')"
            >
              ຍ້ອນກັບ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <!-- Retirement component -->
      <retirementAdd />
    </v-container>
  </div>
</template>

<script>
import retirementAdd from "@/components/retirement-form/retirementAdd.vue";
import axios from "axios";
export default {
  name: "MemberRetirementCreate",
  components: {
    retirementAdd,
  },
  data() {
    return {
      headers: [
        { text: "#ລຳດັບ", align: "Left", value: "index" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: true },
        {
          text: "ວັນເດືອນປີເກີດ",
          value: "birthday",
          sortable: false,
        },
        { text: "ອາຍຸ", value: "age", sortable: false },
        { text: "ໜ້າທີ່ຮັບຜິດຊອບ", value: "responsible", sortable: false },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
        { text: "ເພີ່ມ", value: "memRetire_add", sortable: false },
      ],
      myData_memRetire: [
        {
          member_id: 1,
          member_name: "do",
          member_surname: "dodo",
        },
        {
          member_id: 2,
          member_name: "Jass",
          member_surname: "Bye",
        },
      ],
      selected: [],
      //check combobox
      checked: true,
      openForm: false,
    };
  },
  created() {
    this.getmemberRetirement();
  },

  mounted() {
    this.getmemberRetirement();
  },
  watch: {
    User() {
      this.getmemberRetirement();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
  },
  methods: {
    // setvalue to form retireAdd
    selectItem(id, name, surname, age) {
      this.$store.dispatch({
        type: "doClick_retire",
        showForm: true,
        member_id: id,
        member_name: name,
        member_surname: surname,
        member_age: age,
      });
    },
    async getmemberRetirement() {
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      this.myData_memRetire = [];
      try {
        if (user_status == "Admin") {
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/membersWhere-Status-Age"
          );
          this.myData_memRetire = response.data;
        } else if (user_status == "User") {
          let response = await axios.get(
            `${this.$store.getters.myHostname}/api/v1/membersWhere-Status-Age-client/${fund_id}`
          );
          this.myData_memRetire = response.data;
        }
      } catch (err) {
        console.log(err);
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
.table-header {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
  color: #0779e4;
}
.form_header {
  font-family: "boonhome-400";
  font-size: 18px;
}
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
