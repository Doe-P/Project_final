<template>
  <div id="Member">
    <v-app>
      <v-container fluid>
        <v-row class="justify-center">
          <!-- ຈຳນວນສະມາຊິກທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກທັງໝົດ"
              subtitle="1,800"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
           <!-- ຈຳນວນສະມາຊິກຍິງທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              subtitle="1,800"
              bg_color="primary"
              avatar_ic="groups"
            />
          </v-col>
          <!-- ຈຳນວນສະມາຊິກພົ້ນກະສຽ່ນທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກພົ້ນກະສຽ່ນທັງໝົດ"
              subtitle="1,800"
              bg_color="primary"
              avatar_ic="person_remove"
            />
          </v-col>
          <!-- ຈຳນວນສະມາຊິກຍົກຍ້າຍທັງໝົດ -->
          <v-col lg="3" md="3" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
              subtitle="1,800"
              bg_color="primary"
              avatar_ic="timeline"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- Section Table  -->
      <v-container fluid>
        <v-card>
          <!-- Section Table  -->
          <v-card>
            <v-data-table
              :headers="headers"
              :items="myData_member"
              loading="true"
              loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
              :search="searchData"
              class="table-header"
            >
              <!-- Section Table Header top  -->

              <template v-slot:top>
                <v-toolbar>
                  <v-toolbar-title>
                    <span class="table-header">ຂໍ້ມູນສະມາຊິກ</span>
                  </v-toolbar-title>
                  <v-divider class="px-3" inset vertical></v-divider>
                  <!--search ຮາກຖານ -->
                  <v-text-field
                    class="table-search ml-3"
                    box
                    label="ຄົ້ນຫາ.."
                    single-line
                    hide-details=""
                    append-icon="search"
                    v-model="searchData"
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="$router.push('/member-create')"
                        color="primary"
                        fab
                        small
                        transition="scale-transition"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-tooltip">ເພີ່ມສະມາຊິກ</span>
                  </v-tooltip>
                </v-toolbar>
              </template>

              <!-- Section tr Table -->
              <template v-slot:items="{ items }">
                <tr class="table-header">
                  <td>{{ items.id }}</td>
                  <td>{{ items.name }}</td>
                  <td>{{ items.surname }}</td>
                  <td>{{ items.gender }}</td>
                  <td>{{ items.member_level }}</td>
                  <td>
                    <v-icon color="btn_edit" small @click="edit_item(items.id)"
                      >edit</v-icon
                    >
                    <span class="ma-1"></span>
                    <v-icon
                      color="btn_edit"
                      small
                      @click="delete_item(items.id)"
                      >delete</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
export default {
  name: "Member",
  components: {
    MemberCard,
  },
  data() {
    return {
      searchData: null,
      myData_member: [],
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "id" },
        {
          text: "ຊື່",
          value: "name",
          sortable: true,
        },
        {
          text: "ນາມສະກຸນ",
          value: "surname",
          sortable: true,
        },
        {
          text: "ເພດ",
          value: "gender",
          sortable: false,
        },
        {
          text: "ລະດັບການສຶກສາ",
          value: "mem_level",
          sortable: false,
        },
        {
          text: "ວັນ/ເດືອນ/ປີ ເຂົ້າຊາວໝຸ່ມ",
          value: "date_Y",
          sortable: false,
        },
        {
          text: "ວັນ/ເດືອນ/ປີ ເຂົ້າແມ່ຍິງ",
          value: "date_W",
          sortable: false,
        },
        {
          text: "ວັນ/ເດືອນ/ປີ ເຂົ້າກຳມະບານ",
          value: "date_K",
          sortable: false,
        },
        {
          text: "ວັນ/ເດືອນ/ປີ ເຂົ້າພັກສຳຮອງ",
          value: "date_PS",
          sortable: false,
        },
        {
          text: "ວັນ/ເດືອນ/ປີ ເຂົ້າພັກສົມບູນ",
          value: "date_P",
          sortable: false,
        },
        {
          text: "ຈຸ",
          value: "section",
          sortable: false,
        },
        {
          text: "ປະເພດສະມາຊິກ",
          value: "type_member",
          sortable: true,
        },
        {
          text: "ວັນທີສັງກັດ ມຊ",
          value: "date_start_nuol",
          sortable: false,
        },
        {
          text: "ສະຖານະ",
          value: "status",
          sortable: true,
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
   
  },
  methods: {
    
  },
};
</script>

<style>
#Member {
  font-family: "boonhome-400";
  font-size: 12px;
  font-weight: bold;
}
#card {
  font-family: "boonhome-400";
  color: #0779e4;
}
.table-header {
  font-family: "boonhome-400";
  font-weight: 30px;
  color: #0779e4;
}
.table-search {
  font-family: "boonhome-400";
  font-weight: 20px;
}
.list-items {
  font-family: "boonhome-400";
  font-weight: 20px;
}
.text-tooltip{
   font-family: "boonhome-400";
  font-size: 14px;
}
</style>
