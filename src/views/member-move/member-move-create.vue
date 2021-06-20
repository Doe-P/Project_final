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
            v-model="selected"
            item-key="member_id"
            loading="true"
            :search="search_member"
            @input="isChecked($event)"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-title">ຂໍ້ມູນສະມາຊິກ</span>
                </v-toolbar-title>
                <v-divider class="px-1 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  append-icon="search"
                  hide-details
                  single-line
                  v-model="search_member"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-card-actions class="justify-space-between table-content">
              <v-btn color="error" dark @click="$router.push('/member-move')">
              <span>ຍົກເລີກ</span>
            </v-btn>
            <v-btn
              @click="SaveData_move"
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
export default {
  name: "MemberMoveCreate",
  data() {
    return {
      search_member: "",
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "member_id" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "member_surname", sortable: false },
        { text: "ເພດ", value: "member_gender", sortable: true },
        { text: "ໜ່ວຍ", value: "unit", sortable: true },
        { text: "ຈຸ", value: "section", sortable: true },
        { text: "ຮາກຖານ", value: "foundation", sortable: true },
      ],
      myData_member: [{ member_id: 1 }, { member_id: 2 }],
      single_select: false,
      selected: [],
      checked: true,
    };
  },

  mounted() {},

  methods: {
    isChecked(value) {
      if (value != "") {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    // save
    SaveData_move(){
        this.$router.push('/member-move')
    }
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.table-content {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
