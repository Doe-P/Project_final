<template>
  <div>
    <template>
      <v-card color="primary" class="ma-5" dark>
        <v-card-title class="justify-center">
          <span class="text-title">ລາຍງານສະມາຊິກຕາມຮາກຖານ, ໜ່ວຍ ແລະ ຈຸ</span>
        </v-card-title>
        <v-card-subtitle>
          <v-row class="table-content" v-model="valid">
            <v-col cols="4">
              <v-select
                :items="myData_foundation"
                v-model="found_selected"
                label="ລາຍງານຕາມຮາກຖານ"
                @input="ValidateBtn($value)"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="myData_unit"
                v-model="unit_selected"
                label="ເລືອກໜ່ວຍ"
                @input="ValidateBtn($value)"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="myData_section"
                v-model="section_selected"
                label="ເລືອກຈຸ"
                @input="ValidateBtn($value)"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" v-on="on" v-bind="attrs" :disabled="valid">
                <v-icon color="primary">assignment</v-icon>
              </v-btn>
            </template>
            <span class="text-tooltip">ສະແດງລາຍລະອຽດ</span>
          </v-tooltip>
          <span class="mx-5"></span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="ClearData"
                color="white"
                v-on="on"
                v-bind="attrs"
                :disabled="valid"
              >
                <v-icon color="primary">clear_all</v-icon>
              </v-btn>
            </template>
            <span class="text-tooltip">ລ້າງຂໍ້ມູນ</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
      <v-container fluid>
        <v-row justify="center">
          <v-card width="100%" class="mx-5">
            <v-data-table
              :headers="headers"
              :items="myData_members"
              class="elevation-1 table-content"
              item-key="id"
              loading="true"
              loading-text="ກຳລັງໂຫຼດ.."
              items-per-page="All"
            >
            </v-data-table>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-on="on" v-bind="attrs">
                    <v-icon>print</v-icon>
                  </v-btn>
                </template>
                <span class="text-tooltip">ສັ່ງພິມລາຍງານ</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  name: "Membersreport",
  data() {
    return {
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "member_id" },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "member_surname", sortable: false },
        { text: "ເພດ", value: "member_gender", sortable: false },
        { text: "ປະເພດສະມາຊິກ", value: "memberType", sortable: true },
        { text: "ລະດັບການສຶກສາ", value: "edulevel", sortable: true },
        { text: "ສະຖານະ", value: "member_status", sortable: true },
        { text: "ຈຸ", value: "section", sortable: true },
        { text: "ໜ່ວຍ", value: "unit", sortable: true },
        { text: "ຮາກຖານ", value: "foundation", sortable: false },
      ],
      myData_foundation: [],
      myData_unit: [],
      myData_section: [],
      found_selected: null,
      unit_selected: null,
      section_selected: null,
      // valid form
      valid: true,
      //show Form
    };
  },

  mounted() {},

  methods: {
    ValidateBtn(value) {
      if (value != "") {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    ClearData() {
      this.found_selected = null;
      this.unit_selected = null;
      this.section_selected = null;
      this.valid = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-family: "boonhome-400";
  font-size: 24px;
}
.text-tab,
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
