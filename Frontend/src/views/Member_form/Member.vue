<template>
  <div id="Member">
    <v-app>
      <v-container fluid>
        <v-row class="justify-center">
          <!-- ຈຳນວນສະມາຊິກທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກທັງໝົດ"
              :subtitle="getCount_allmember"
              bg_color="#26a69a"
              avatar_ic="groups"
            />
          </v-col>
          <!-- ຈຳນວນສະມາຊິກຍິງທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              :subtitle="getCount_femalemember"
              bg_color="#D81B60"
              avatar_ic="group"
            />
          </v-col>
    
          <!-- ຈຳນວນສະມາຊິກຍົກຍ້າຍທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
              :subtitle="getCount_movemember"
              bg_color="#FF8F00"
              avatar_ic="timeline"
            />
          </v-col>
           <!-- ຈຳນວນສະມາຊິກພົ້ນກະສຽ່ນທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກພົ້ນກະສຽນທັງໝົດ"
              :subtitle="getCount_retirementmember"
              bg_color="#D32F2F"
              avatar_ic="person_remove"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- Section Table  -->
      <v-container fluid>
        <v-card width="auto">
          <!-- Section Table  -->
          <v-data-table
            :headers="headers"
            :items="myData_member"
            :loading="loading"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="table-header"
            id="datatable"
          >
            <!-- Section Table Header top  -->

            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="header-text">ຂໍ້ມູນສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-3" inset vertical></v-divider>
                <!--search ຮາກຖານ -->
                <v-text-field
                  class="table-search ml-3"
                  label="ຄົ້ນຫາ.."
                  single-line
                  hide-details=""
                  append-icon="search"
                  v-model="searchData"
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      @click="$router.push('/member-create')"
                      color="primary"
                      fab
                      small
                      transition="scale-transition"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມສະມາຊິກ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <!-- Section tr Table -->
            <template v-slot:item="{ item, index }">
              <tr class="table-header">
                <td>{{ index + 1 }}</td>
                <td>{{ item.member_name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.level_name }}</td>
                <td>{{ item.date_Y | formatDate }}</td>
                <td>{{ item.typemember }}</td>
                <td>{{ item.sect_name }}</td>
                <td>{{ item.unit_name }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="update"
                        v-on="on"
                        v-bind="attrs"
                        small
                        @click="
                          $router.push({
                            name: 'member-edit',
                            params: {
                              member_edit: item.member_id,
                              fund_id: item.fund_id,
                            },
                          })
                        "
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂສະມາຊິກ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="delete"
                        v-bind="attrs"
                        v-on="on"
                        small
                        @click="delete_item(item.member_id)"
                        >delete</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ລົບສະມາຊິກ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="#4FB783"
                        v-bind="attrs"
                        v-on="on"
                        small
                        @click="
                          $router.push({
                            name: 'member-detail',
                            params: {
                              member_detail: item.member_id,
                              fund_id: item.fund_id,
                              fund_name: item.fund_name,
                            },
                          })
                        "
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
      </v-container>
      <!-- Dialog confirm delete data -->
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="confirm_dialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template>
              <v-card>
                <v-toolbar color="primary" height="45" dark>
                  <v-toolbar-title class="header-message">
                    <v-icon>info</v-icon>
                    ຂໍ້ຄວາມ
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text-center mt-5 text-message">
                  ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ຫຼືບໍ່?
                </v-card-text>
                <v-card-actions class="justify-space-between text-message-btn">
                  <v-btn text @click="confirm_dialog = false" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="delete_member_item"
                    >ຕົກລົງ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-row>
      </template>
    </v-app>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
import axios from "axios";
//import { mapGetters } from 'vuex';
export default {
  name: "Member",
  components: {
    MemberCard,
  },
  data() {
    return {
      confirm_dialog: false,
      searchData: null,
      myData_member: [],
      headers: [
        {
          text: "ລຳດັບ",
          align: "Left",
          value: "No",
          sortable: false,
        },
        {
          text: "ຊື່",
          align: "Left",
          value: "member_name",
          sortable: false,
        },
        {
          text: "ນາມສະກຸນ",
          value: "surname",
          sortable: true,
        },
        {
          text: "ເພດ",
          value: "gender",
          sortable: true,
        },
        {
          text: "ລະດັບການສຶກສາ",
          value: "level_name",
          sortable: false,
        },
        {
          text: "ວັນທີເຂົ້າຊາວໝຸ່ມ",
          value: "date_Y",
          sortable: false,
        },
        {
          text: "ປະເພດສະມາຊິກ",
          value: "typemember",
          sortable: true,
        },
        {
          text: "ຈຸ",
          value: "sect_name",
          sortable: true,
        },
        {
          text: "ໜ່ວຍ",
          value: "unit_name",
          sortable: true,
        },
        {
          text: "ສະຖານະ",
          value: "status",
          sortable: true,
        },
        {
          text: "Actions",
          value: "action",
          sortable: false,
        },
      ],
      //------
      Count_allmember: 0,
      Count_femalemember: 0,
      Count_retiremember: 0,
      Count_movemember: 0,
      //-----
      get_member_id: null,
      countColumn: 0,
      //
      loading: true,
      user_status: "Admin",
    };
  },
  watch: {
    myUser() {
      // this.getCount_allmember();
      this.getData_members();
    },
  },
  computed: {
    myUser() {
      return this.$store.getters["User/getmyUser"];
    },
    getCount_allmember() {
      let myData = "";
      try {
        if (this.myUser.status == "Admin") {
          myData = this.myData_member.filter(
            (item) => String(item.status) == String("ສະມາຊິກ")
          ).length;
        } else {
          myData = this.myData_member.filter(
            (item) =>
              String(item.status) == String("ສະມາຊິກ") &&
              String(item.fund_id) == String(this.myUser.fund_id)
          ).length;
        }
      } catch (err) {
        console.log(err);
      }
      return myData;
    },

    getCount_femalemember() {
      let myData = "";
      try {
        if (this.myUser.status == "Admin") {
          myData = this.myData_member.filter(
            (item) =>
              String(item.status) == String("ສະມາຊິກ") &&
              String(item.gender) == String("ຍິງ")
          ).length;
        } else {
          myData = this.myData_member.filter(
            (item) =>
              String(item.status) == String("ສະມາຊິກ") &&
              String(item.fund_id) == String(this.myUser.fund_id) &&
              String(item.gender) == String("ຍິງ")
          ).length;
        }
      } catch (err) {
        console.log(err);
      }
      return myData;
    },

     getCount_retirementmember() {
       let myData =""
      try {
         if (this.myUser.status == "Admin") {
          myData = this.myData_member.filter(
            (item) => String(item.status) == String("ພົ້ນກະສຽນ")
          ).length;
        } else {
          myData = this.myData_member.filter(
            (item) =>
              String(item.status) == String("ພົ້ນກະສຽນ") &&
              String(item.fund_id) == String(this.myUser.fund_id)
          ).length;
        }
      } catch (err) {
        console.log(err);
      }
      return myData;
    },

   getCount_movemember() {
     let myData =""
      try {
        if (this.myUser.status == "Admin") {
          myData = this.myData_member.filter(
            (item) => String(item.status) == String("ຍົກຍ້າຍ")
          ).length;
        } else {
          myData = this.myData_member.filter(
            (item) =>
              String(item.status) == String("ຍົກຍ້າຍ") &&
              String(item.fund_id) == String(this.myUser.fund_id)
          ).length;
        }
      } catch (err) {
        console.log(err);
      }
      return myData;
    },
  },
  mounted() {
    // this.getCount_allmember();
    this.getCount_femalemember();
    this.getCount_retirementmember();
    this.getCount_movemember();
  },
  created() {
    this.getData_members();
  },

  methods: {
    async getData_members() {
      try {
        this.myData_member = [];
        const fund_id = this.myUser.fund_id;
        this.user_status = this.myUser.status;
        if (this.user_status == "Admin") {
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/members"
          );
          this.myData_member = response.data;
          this.loading = false;
        } else if (this.user_status == "User") {
          let response = await axios.get(
            `${this.$store.getters.myHostname}/api/v1/members-foundation/${fund_id}`
          );
          this.myData_member = response.data;
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // get count all member
    // async getCount_allmember() {
    //   try {

    //      let myData = this.myData_member.filter(item => String(item.status)==String('ສະມາຊິກ'));
    //      this.Count_allmember = parseInt(myData.length)

    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getCount_femalemember() {
    //   try {
    //     let response = await axios.get(
    //       this.$store.getters.myHostname + "/api/v1/count-femalemembers"
    //     );
    //     this.Count_femalemember = parseInt(response.data.count_member);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getCount_retirementmember() {
    //   try {
    //     let response = await axios.get(
    //       this.$store.getters.myHostname + "/api/v1/retirement-members"
    //     );
    //     this.Count_retiremember = parseInt(response.data.count_member);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getCount_movemember() {
    //   try {
    //     let response = await axios.get(
    //       this.$store.getters.myHostname + "/api/v1/count-movemembers"
    //     );
    //     this.Count_movemember = parseInt(response.data.count_member);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    delete_item(id) {
      this.confirm_dialog = true;
      this.get_member_id = id;
    },
    //delete data
    async delete_member_item() {
      try {
        await axios
          .delete(
            `${this.$store.getters.myHostname}/api/v1/members/${this.get_member_id}`
          )
          .then(() => {
            this.Msg_done("ຂໍ້ມູນຖືກລົບອອກແລ້ວ");
            location.reload();
          });
      } catch (err) {
        this.Msg_fail("ລົບຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວດສອບຄືນໃໝ່");
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

<style>
#Member {
  font-family: "boonhome-400";
  font-size: 12px;
  font-weight: bold;
}
#card {
  font-family: "boonhome-400";
  color: #0779e4;
}
.header-text {
  font-family: "boonhome-400";
  color: #0779e4;
  font-size: 18px;
  font-weight: bold;
}
.table-header {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 14px;
}
.table-search,
.header-message {
  font-family: "boonhome-400";
  font-weight: 20px;
  font-size: 18px;
}
.list-items {
  font-family: "boonhome-400";
  font-weight: 20px;
}
.text-tooltip,
.text-message-btn {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-message {
  font-family: "boonhome-400";
  font-size: 16px;
}
</style>
