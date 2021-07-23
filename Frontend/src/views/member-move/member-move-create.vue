<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="myData_member"
            class="elevation-1 table-content"
            show-select
            :single-select="single_select"
            v-model="member_selected"
            item-key="member_id"
            loading="true"
            loading-text="ບໍ່ມີຂໍ້ມູນ!!...ກະລຸນາເລືອກເງືອນໄຂຕາມຂ້າງເທີງກ່ອນ"
            :search="search_member"
            @input="isChecked($event)"
          >
            <template v-slot:top>
              <v-toolbar>
                <span class="text-title">ເພີ່ມສະມາຊິກທີ່ຈະຍົກຍ້າຍ</span>
                <v-divider class="px-2 mr-1" inset vertical></v-divider>
                <v-toolbar-title>
                  <v-row class="table-content mt-4">
                    <v-col cols="4">
                      <v-select
                        :items="myFoundations"
                        v-model="selected_found"
                        label="ເລືອກຮາກຖານ"
                        @input="get_units"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        :items="myUnits"
                        v-model="selected_unit"
                        label="ເລືອກໜ່ວຍ"
                        @input="get_sections"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        :items="mySections"
                        v-model="selected_sect"
                        label="ເລືອກຈຸ"
                        @input="getData_member_byCondition($event)"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-divider class="px-1 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  append-icon="search"
                  hide-details
                  single-line
                  v-model="search_member"
                ></v-text-field>
              </v-toolbar>
            </template>

            <!----- number of rows --->
            <template #body="{ items, headers }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td v-for="n in headers" :key="n">
                    {{ n.value === "index" ? index + 1 : item[n.value] }}
                  </td>
                </tr>
              </tbody>
            </template>

            <!-------------->
          </v-data-table>
          <v-card-actions class="justify-space-between table-content">
            <v-btn color="primary" dark @click="$router.push('/member-move')">
              <span>ຍົກເລີກ</span>
            </v-btn>
            <v-btn
              @click="SaveData_move_detail"
              :disabled="checked"
              color="primary"
              dark
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
  name: "MemberMoveCreate",
  data() {
    return {
      search_member: "",
      headers: [
        { text: "#ລຳດັບ", align: "Left", value: "index" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: true },
        { text: "ປະເພດສະມາຊິກ", value: "typemember", sortable: true },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
      ],
      myData_member: [],
      single_select: false,
      member_selected: [],
      checked: true,
      filter_member_id: [],
      //-------------
      myFoundations: [],
      myFoundation_all: [],
      selected_found: null,
      //--------------
      myUnits: [],
      myUnit_all: [],
      selected_unit: null,
      //
      mySections: [],
      mySection_all: [],
      selected_sect: null,
      //
      get_fund_id: null,
      get_unit_id: null,
      get_sect_id: null,
    };
  },

  mounted() {
    this.get_foundations();
  },

  methods: {
    isChecked(value) {
      if (value != "") {
        this.checked = false;
        this.filter_member();
      } else {
        this.filter_member_id = [];
        this.checked = true;
      }
    },
    /*
    //get data member
    async getData_member(){
      try{
       let response = await axios.get(this.$store.getters.myHostname+"/api/v1/member-status");
       this.myData_member=response.data;
      }catch(err){
        console.log(err);
      }
    },
    */
    filter_member() {
      this.filter_member_id = [];
      for (let i = 0; i <= this.member_selected.length; i++) {
        this.filter_member_id.push(this.member_selected[i].member_id);
      }
    },
    // save
    async SaveData_move_detail() {
      const get_id = this.$route.params.id;
      if (
        this.filter_member_id &&
        this.$route.params.id &&
        this.$route.params.move_NO
      ) {
        for (let i = 0; i < this.filter_member_id.length; i++) {
          const member_id = this.filter_member_id[i];
          try {
            await axios
              .post(this.$store.getters.myHostname + "/api/v1/move-detail", {
                move_id: get_id,
                member_id: member_id,
              })
              .then(() => {
                this.Msg_done("ຍົກຍ້າຍສະມາຊິກສຳເລັດ");
                this.$router.push("/member-move");
              });
          } catch (err) {
            this.Msg_fail("ຂໍ້ມູນຜິດພາດບໍ່ສາມາດເພີ່ມສະມາຊິກໄດ້");
            console.log(err);
          }
        }
        // check amount on section
        try {
          await axios
            .put(
              `${this.$store.getters.myHostname}/api/v1/Update-Status/section/${this.get_sect_id}`
            )
            .then(() => {
              this.Msg_done(
                "ບໍ່ມີສະມາຊິກໃນຈຸ" +
                  this.selected_sect +
                  "ອັບເດດສະຖານະຈຸເປັນລົບລ້າງ"
              );
              this.$router.push("/member-move");
            });
        } catch (err) {
          console.log(err);
        }
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
    // get foundations
    async get_foundations() {
      this.myFoundation_all = [];
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/foundations")
          .then((response) => {
            this.myFoundation_all = response.data;
            for (let i = 0; i <= this.myFoundation_all.length; i++) {
              this.myFoundations.push(this.myFoundation_all[i].fund_name);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    //get units
    async get_units() {
      this.myUnit_all = [];
      this.myUnits = [];
      //-----
      this.mySections = [];
      this.selected_sect = null;
      //
      this.selected_unit = null;
      //
      for (let i = 0; i <= this.myFoundation_all.length; i++) {
        if (
          String(this.selected_found).valueOf() ==
          String(this.myFoundation_all[i].fund_name).valueOf()
        ) {
          const get_fund = this.myFoundation_all[i].fund_id;
          this.get_fund_id = get_fund;
          try {
            await axios
              .get(
                `${this.$store.getters.myHostname}/api/v1/getItem-units/${get_fund}`
              )
              .then((response) => {
                this.myUnit_all = response.data;
                for (let i = 0; i <= this.myUnit_all.length; i++) {
                  this.myUnits.push(this.myUnit_all[i].unit_name);
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    // get sections
    async get_sections() {
      this.mySection_all = [];
      this.mySections = [];
      this.selected_sect = null;
      for (let i = 0; i <= this.myUnit_all.length; i++) {
        if (
          String(this.selected_unit).valueOf() ==
          String(this.myUnit_all[i].unit_name).valueOf()
        ) {
          const get_unit_id = this.myUnit_all[i].unit_id;
          this.get_unit_id = get_unit_id;
          try {
            await axios
              .get(
                `${this.$store.getters.myHostname}/api/v1/allsections/${get_unit_id}`
              )
              .then((response) => {
                this.mySection_all = response.data;
                for (let i = 0; i <= this.mySection_all.length; i++) {
                  this.mySections.push(this.mySection_all[i].sect_name);
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    // get data member by section unit foudation and member status on tb_member
    async getData_member_byCondition(value) {
      if (value != "") {
        for (let i = 0; i <= this.mySection_all.length; i++) {
          if (
            String(this.selected_sect).valueOf() ==
            String(this.mySection_all[i].sect_name).valueOf()
          ) {
            const id = this.mySection_all[i].sect_id;
            this.get_sect_id = id;
            this.myData_member = [];
            try {
              await axios
                .get(
                  `${this.$store.getters.myHostname}/api/v1/getMember/move-detail/${id}`,
                  {}
                )
                .then((response) => {
                  this.myData_member = response.data;
                });
            } catch (err) {
              console.log(err);
            }
          }
        }
      } else {
        this.getData_member();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
  font-size: 16px;
}
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
