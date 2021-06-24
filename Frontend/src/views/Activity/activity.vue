<template>
  <div id="Activity">
    <v-container fluid>
      <v-row justify="center" class="my-7">
        <v-card width="1000">
          <v-data-table
            :headers="headers"
            :items="myData_act"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ..."
            :search="searchData_act"
            class="table-content"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນກິດຈະກຳ</span>
                </v-toolbar-title>
                <v-divider class="px-3 mr-4" inset vertical></v-divider>
                <v-text-field
                  name="txt_search"
                  label="ຄົ້ນຫາກິດຈະກຳ"
                  id="id"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="searchData_act"
                  class="text-search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      fab
                      small
                      @click="open_formAdd"
                      medium
                      color="primary"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ເພີ່ມຫົວຂໍ້ກິດຈະກຳ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr class="table-content">
                <td>{{ item.act_id }}</td>
                <td>{{ item.act_title }}</td>
                <td>{{ item.typeactivity_name }}</td>
                <td>{{ item.act_locate }}</td>
                <td>{{ item.act_amount }}</td>
                <td>{{ item.act_date }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        small
                        @click="edit_activity_item"
                        >edit</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ແກ້ໄຂຫົວຂໍ້ກິດຈະກຳ</span>
                  </v-tooltip>
                  <span class="ma-1"></span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        small
                        @click="$router.push('/activity-view')"
                        >table_view</v-icon
                      >
                    </template>
                    <span class="text-tooltip">ລາຍລະອຽດກິດຈະກຳ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- Activity form Add -->
        <formAdd />
        <!-- Activity form Edit -->
        <formEdit />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import formAdd from "@/components/activity/act_formAdd.vue";
import formEdit from "@/components/activity/act_formEdit.vue";
export default {
  name: "Activity",
  components: {
    formAdd,
    formEdit,
  },
  data() {
    return {
      searchData_act: null,
      myData_act: [
        {
          act_id: 1,
        },
      ],
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "act_id" },
        { text: "ຫົວຂໍ້ກິດຈະກຳ", value: "act_title", sortable: false },
        { text: "ປະເພດກິດຈະກຳ", value: "typeActivity", sortable: true },
        { text: "ສະຖານທີ່", value: "act_locate", sortable: true },
        { text: "ຈຳນວນເຂົ້າຮ່ວມ", value: "act_amount", sortable: false },
        { text: "ວັນທີ", value: "act_date", sortable: false },
        { text: "Action", value: "act_action", sortable: false },
      ],
    };
  },
  mounted() {},
  methods: {
    // open form add from component
    open_formAdd() {
      this.$store.dispatch({
        type: "clickShow_act_formAdd",
      });
    },
    // open form edit
    edit_activity_item() {
      this.$store.dispatch({
        type: "clickShow_act_formEdit",
      });
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
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
