<template>
  <div id="Activitycreate">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="1000">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="myData_member"
            :single-select="single_select"
            item-key="mem_id"
            show-select
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
          </v-data-table>
          <v-card-actions class="justify-space-between table-content">
             <v-btn color="error" dark @click="$router.push('/activity-view')">
              <span>ຍົກເລີກ</span>
            </v-btn>
            <v-btn :disabled="checked" color="primary">
              <span>ບັນທຶກ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
   
      <span>{{selected}}</span>
    </v-container>
  </div>
</template>

<script>
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
        { text: "ລະຫັດ", align: "Left", value: "mem_id" },
        { text: "ຊື່", value: "mem_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "mem_surname", sortable: false },
        { text: "ເພດ", value: "mem_gender", sortable: false },
        { text: "ລະດັບການສຶກສາ", value: "mem_edulevel", sortable: true },
        { text: "ໜ່ວຍ", value: "mem_unit", sortable: true },
        { text: "ຈຸ", value: "mem_section", sortable: true },
        { text: "ຮາກຖານ", value: "mem_foundation", sortable: true },
      ],
      // select all
      single_select:false,
      selected:[],
      checked:true,
    };
  },
  mounted() {},
  methods: {
    checkSelect(value) {
      if (value != "") {
        this.checked = false;
      } else {
        this.checked = true;
      }
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
