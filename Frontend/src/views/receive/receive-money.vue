<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1 table-content"
            item-key="id"
            loading="true"
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ຂໍ້ມູນການຈ່າຍເງີນສະຕິ</span>
                </v-toolbar-title>
                <v-divider class="px-2 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາຂໍ້ມູນຮາກຖານ"
                  single-line
                  hide-details
                  append-icon="search"
                  v-model="search"
                ></v-text-field>
                <v-divider class="px-3 mr-3" inset vertical></v-divider>
                <v-select
                  class="mt-5 mx-4"
                  :items="Year_select"
                  v-model="value"
                  label="ສົກຮຽນ"
                ></v-select>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="$router.push('/recive-create')"
                      fab
                      small
                      color="primary"
                      v-on="on"
                      v-bind="attrs"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span class="text-tooltip">ຮັບເງິນສະຕິ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-card-actions>
            <span class="table-footer"
              >ລວມຈຳນວນເງິນທັງໝົດ:{{ totalmoney | currency("ກີບ") }}</span
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ReceiveMoney",
  data() {
    return {
      headers: [
        { text: "ລະຫັດ", value: "rev_id", sortable: false },
        { text: "ເລກທີໃບບິນ", value: "rev_NO", sortable: false },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
        { text: "ປະຈຳງວດ", value: "quarterly", sortable: false },
        { text: "ສົກຮຽນ", value: "year", sortable: true },
        { text: "ຈຳນວນເງີນທັງໝົດ", value: "amount", sortable: false },
        { text: "ວັນທີ", value: "rev_date", sortable: false },
      ],
      totalmoney: 0.0,
      Year_start: 2000,
      Year_select: [],
    };
  },

  mounted() {
    this.setYear_select();
  },

  methods: {
    setYear_select() {
      // let object = [];
      let str = "";
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        let n = i - 1;
        str = (i.toString() + "-" + n.toString()).toString();
        this.Year_select.push(str);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-content,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header,
.table-footer {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
</style>
