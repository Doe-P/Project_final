<template>
  <div id="move">
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
            subtitle="100"
            bg_color="primary"
            avatar_ic="groups"
          />
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍິງຍົກຍ້າຍທັງໝົດ"
            subtitle="10"
            bg_color="primary"
            avatar_ic="people"
          />
        </v-col>
        <v-card width="100%" class="mt-3">
          <v-data-table
            :headers="headers"
            :items="myData_move"
            loading="true"
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
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.move_id }}</td>
                <td>{{ item.moveNO }}</td>
                <td>{{ item.move_Year }}</td>
                <td>{{ item.reason }}</td>
                <td>{{ item.amount_move }}</td>
                <td>{{ item.locate }}</td>
                <td>{{ item.sign_by }}</td>
                <td>{{ item.date_move }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="edit_Item_move"
                        small
                        v-on="on"
                        v-bind="attrs"
                        >edit</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນການຍົກຍ້າຍ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        @click="$router.push('/member-move-detail')"
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
import moveformAdd from "@/components/member-move-form/move-formAdd.vue";
export default {
  name: "move",
  components: {
    MemberCard,
    moveformAdd,
  },
  data() {
    return {
      headers: [
        { text: "ລະຫັດຍົກຍ້າຍ", align: "Left", value: "move_id" },
        { text: "ເລກທີໃບຍົກຍ້າຍ", value: "ON_move", sortable: false },
        { text: "ສົກຮຽນ", value: "move_year", sortable: true },
        { text: "ເຫດຜົນ", value: "move_reason", sortable: false },
        { text: "ຈຳນວນສະມາຊິກ", value: "move_amount", sortable: false },
        { text: "ອອກທີ່", value: "move_locate", sortable: false },
        { text: "ອອກໂດຍ", value: "move_BY", sortable: true },
        { text: "ວັນທີຍົກຍ້າຍ", value: "move_date", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],
      search_move: "",
      myData_move: [{ move_id: 1 }],
    };
  },
  mounted(){
   alert(this.uuidv4());
  },
  methods: {
    openFormadd(){
      this.$store.dispatch({
        type:"doClickmoveFormadd",
        val:true,
      })
    },
    edit_Item_move() {},
    uuidv4() {
  return 'xxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
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
