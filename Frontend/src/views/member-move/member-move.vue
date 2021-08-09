<template>
  <div id="move">
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <!-- <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
            :subtitle="getCount_all"
            bg_color="primary"
            avatar_ic="groups"
          />
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍິງຍົກຍ້າຍທັງໝົດ"
            :subtitle="getCount_female"
            bg_color="primary"
            avatar_ic="people"
          />
        </v-col> -->
        <v-card width="100%" class="mt-3">
          <v-data-table
            :headers="headers"
            :items="myData_move"
            :loading="value"
            loading-text="ກຳລັງໂຫຼດ.."
            :search="search_move"
            class="header"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກຍົກຍ້າຍ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  hide-details
                  single-line
                  append-icon="search"
                  v-model="search_move"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="openFormadd"
                      fab
                      small
                      v-on="on"
                      v-bind="attrs"
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມຂໍ້ມູນການຍົກຍ້າຍ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.move_NO }}</td>
                <td>{{ item.m_Year }}</td>
                <td>{{ item.reason }}</td>
                <td>{{ item.locate }}</td>
                <td>{{ item.sign_by }}</td>
                <td>{{ item.date_move | formatDate }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="edit_Item_move(item.move_id)"
                        small
                        v-on="on"
                        v-bind="attrs"
                        >update</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນການຍົກຍ້າຍ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        small
                        v-on="on"
                        v-bind="attrs"
                        @click="
                          $router.push({
                            name: 'member-move-detail',
                            params: { id: item.move_id },
                          })
                        "
                        >table_view</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ລາຍລະອຽດການຍົກຍ້າຍ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <moveformAdd />
        <moveformEdit />
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import MemberCard from "@/components/cards/MemberCard.vue";
import moveformAdd from "@/components/member-move-form/move-formAdd.vue";
import moveformEdit from "@/components/member-move-form/move-formEdit.vue";
import axios from "axios";
export default {
  name: "move",
  components: {
    moveformAdd,
    moveformEdit,
  //  MemberCard,
  },
  data() {
    return {
      headers: [
        { text: "ລຳດັບ", align: "Left", value: "NO" },
        { text: "ເລກທີໃບຍົກຍ້າຍ", value: "move_NO", sortable: false },
        { text: "ສົກຮຽນ", value: "m_year", sortable: true },
        { text: "ເຫດຜົນ", value: "reason", sortable: false },
        { text: "ອອກທີ່", value: "locate", sortable: false },
        { text: "ອອກໂດຍ", value: "sign_by", sortable: true },
        { text: "ວັນທີຍົກຍ້າຍ", value: "move_date", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      search_move: "",
      myData_move: [{ move_id: 1 }],
      user_status: "admin",
      value: true,
      getCount_all: 0,
      getCount_female: 0,
    };
  },
  mounted() {
    this.getData_move();
    // this.CountAll_membermove();
    // this.CountFemale_membermove();
  },
  methods: {
    async getData_move() {
      this.myData_move = [];
      this.user_status = "admin";
      try {
        if (this.user_status == "admin") {
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/moves"
          );
          this.myData_move = response.data;
          this.value = false;
        } else {
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/moves"
          );
          this.myData_move = response.data;
          this.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    openFormadd() {
      this.$store.dispatch({
        type: "doClickmoveFormadd",
        val: true,
      });
    },
    edit_Item_move(id) {
      this.$store.dispatch({
        type: "doClickmoveFormEdit",
        val: true,
        move_id: id,
      });
    },
    // // get count all member move for admin
    // async CountAll_membermove() {
    //   const user_status = "admin";
    //   const get_found = "F0001-30062021";
    //   if (user_status == "admin") {
    //     try {
    //       await axios
    //         .get(this.$store.getters.myHostname + "/api/v1/countAll")
    //         .then((response) => {
    //           this.getCount_all = parseInt(response.data.amount);
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   } else {
    //     try {
    //       await axios
    //         .get(
    //           `${this.$store.getters.myHostname}/api/v1/countAll-foundation/${get_found}`
    //         )
    //         .then((response) => {
    //           this.getCount_all = parseInt(response.data.amount);
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },
    // async CountFemale_membermove() {
    //   const user_status = "admin";
    //   const get_found = "F0001-30062021";
    //   if (user_status == "admin") {
    //     try {
    //       await axios
    //         .get(this.$store.getters.myHostname + "/api/v1/countfemale")
    //         .then((response) => {
    //           this.getCount_female = parseInt(response.data.amount);
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   } else {
    //     try {
    //       await axios
    //         .get(
    //           `${this.$store.getters.myHostname}/api/v1/countfemale-found//${get_found}`
    //         )
    //         .then((response) => {
    //           this.getCount_female = parseInt(response.data.amount);
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },
  },
};
</script>

<style scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.header,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
>
