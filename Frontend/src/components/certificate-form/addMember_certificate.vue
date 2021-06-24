<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.getters.getaddMember_certificate"
          persistent
          :overlay="false"
          max-width="1000px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="text-header">
                ເພີ່ມສະມາຊິກທີ່ຕ້ອງຍ້ອງຍໍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="myData_members"
                hide-actions
                class="elevation-1 mt-5 table-content"
                :single-select="single_select"
                show-select
                item-key="member_id"
                loading="true"
                loading-text="ກຳລັງໂຫຼດ.."
                :search="search_members"
                full-width
                @input="selectData($event)"
              >
                <template v-slot:top>
                 <v-container>
                      <v-text-field
                      label="ຄົ້ນຫາຂໍ້ມູນສະມາຊິກ"
                      append-icon="search"
                      hide-details
                      single-line
                      v-model="search_members"
                  ></v-text-field>
                 </v-container>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions class="justify-space-between btn_text">
                <v-btn color="error" @click="close_dialog">ຍົກເລີກ</v-btn>
                <v-btn :disabled="checked" color="primary">ບັນທືກ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AddmemberCertificate",
  data() {
    return {
      headers: [
        { text: "ລະຫັດສະມາຊິກ", value: "member_id", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "member_surname", sortable: false },
        { text: "ເພດ", value: "member_gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "memberType", sortable: true },
        { text: "ລະດັບການສຶກສາ", value: "edulevel_member", sortable: true },
        { text: "ຈຸ", value: "section", sortable: true },
        { text: "ໜ່ວຍ", value: "unit", sortable: true },
        { text: "ຮາກຖານ", value: "foundation", sortable: true },
      ],
      myData_members: [
        {
          member_id: 1,
        },
        {
          member_id: 2,
        },
      ],
      search_members: null,
      selected: [],
      single_select: false,
      checked: true,
    };
  },

  mounted() {},

  methods: {
    selectData(value) {
      if (value != "") {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    close_dialog(){
        this.$store.dispatch({
        type:"doClickAddmember_certificate",
        value:false,
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
}
.table-content,
.btn_text {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
