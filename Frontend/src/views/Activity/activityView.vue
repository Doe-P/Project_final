<template>
  <div id="Activitydetail">
    <v-container fluid>
      <v-row justify="center" class="my-10">
        <v-card width="1000">
          <v-data-table
            :headers="headers"
            :items="myData_act_detaill"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="searchData"
            class="table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນສະມາຊິກເຂົ້າຮ່ວມກິດຈະກຳ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  name="txt_search"
                  label="ຄົ້ນຫາ"
                  id="id"
                  single-line
                  hide-details
                  v-model="searchData"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      fab
                      small
                      @click="$router.push('/activity-create')"
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມສະມາຊິກເຂົ້າຮ່ວມ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>{{ item.mem_name }}</td>
                <td>{{ item.mem_surname }}</td>
                <td>{{ item.mem_gender }}</td>
                <td>{{ item.mem_eduLevel }}</td>
                <td>{{ item.actTitle }}</td>
                <td>{{ item.typeactivity }}</td>
                <td>{{ item.unitname }}</td>
                <td>{{ item.section }}</td>
                <td>{{ item.foundation }}</td>
                <td>
                  <v-icon medium @click="delete_actDetaill_item">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-card-actions class="justify-start table-content">
            <v-btn
              @click="$router.push('/activity')"
              color="primary"
              class="lighten-0"
            >
              <span>ກັບຄືນ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Activitydetail",
  data() {
    return {
      myData_act_detaill: [],
      searchData: null,
      headers: [
        { text: "ຊື່", value: "mem_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "mem_surname", sortable: false },
        { text: "ເພດ", value: "mem_gender", sortable: true },
        { text: "ລະດັບການສຶກສາ", value: "mem_eduLevel", sortable: true },
        { text: "ຫົວຂໍ້ກິດຈະກຳ", value: "actTitle", sortable: false },
        { text: "ປະເພດກິດຈະກຳ", value: "typeActivity", sortable: true },
        { text: "ໜ່ວຍ", value: "unitname", sortable: true },
        { text: "ຈຸ", value: "section", sortable: true },
        { text: "ຮາກຖານ", value: "foundation", sortable: true },
        { text: "Action", value: "action", sortable: false },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-weight: bold;
  color: #0779e4;
}
.text-search,
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-weight: 24px;
}
</style>
