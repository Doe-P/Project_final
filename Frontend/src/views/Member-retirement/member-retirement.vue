<template>
  <div id="MemberRetirement">
    <v-app>
      <v-container>
        <v-row justify="center" class="my-5">
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກພົ້ນກະສ່ຽນທັງໝົດ"
              subtitle="100"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              subtitle="10"
              bg_color="primary"
              avatar_ic="people"
            />
          </v-col>
          <v-card width="1000" class="my-3">
            <v-data-table
              :headers="headers"
              :items="myData_menberRetire"
              loading="true"
              loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
              :search="member_retire_search"
              class="header"
            >
              <template v-slot:top>
                <v-toolbar>
                  <v-toolbar-title>
                    <span class="text-header">ຂໍ້ມູນສະມາຊິກພົ້ນກະສ່ຽນ</span>
                  </v-toolbar-title>
                  <v-divider class="px-2 mr-2" inset vertical></v-divider>
                  <v-text-field
                    label="ຄົ້ນຫາ"
                    v-model="member_retire_search"
                    hide-details
                    single-line
                    append-icon="search"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                       v-on="on"
                       v-bind="attrs"
                        fab
                        small
                        color="primary"
                        @click="$router.push('/member-retirement-create')"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ເພີ່ມສະມາຊິກກະສຽນ</span>
                  </v-tooltip>
                </v-toolbar>
              </template>
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.mem_name }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
export default {
  name: "MemberRetirement",
  components: {
    MemberCard,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#MemberRetirement {
  font-family: "boonhome-400";
  font-size: 14px;
}
.header,
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 20px;
  font-weight: bold;
  color: #0779e4;
}
</style>
