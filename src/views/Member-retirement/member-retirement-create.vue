<template>
  <div id="MemberRetirementCreate">
    <v-container fluid>
      <v-row justify="center" class="my-5 table-header">
        <v-card width="900">
          <v-toolbar color="primary" height="45" dark>
            <v-toolbar-title> ເພີ່ມສະມາຊິກພົ້ນກະສຽນ </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="myData_memRetire"
            hide-actions
            class="elevation-1"
            loading="true"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ.."
            :search="search_memberRetire"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-header">ສະມາຊິກທີ່ມີອາຍຸ 35 ປີ</span>
                </v-toolbar-title>
                <v-divider class="px-1 mr-4" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="search_memberRetire"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{on,attrs}">
                      <v-btn color="primary" dark v-on="on" v-bind="attrs">
                  <v-icon>print</v-icon>
                  </v-btn>
                  </template>
                  <span class="text-tooltip">ພິມຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
                </v-tooltip>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.member_id }}</td>
                <td>{{ item.member_name }}</td>
                <td>{{ item.member_surname }}</td>
                <td>{{ item.member_gender }}</td>
                <td>{{ item.member_birthday }}</td>
                <td>{{ item.member_age }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.section }}</td>
                <td>{{ item.foundation }}</td>
                <td>
                <v-tooltip bottom>
                   <template v-slot:activator="{on,attrs}">
                    <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      selectItem(
                        item.member_id,
                        item.member_name,
                        item.member_surname
                      )
                    "
                    text
                    small
                    color="primary"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                 </template>
                 <span class="text-tooltip">ຄລິກເພື່ອເພີ່ມ</span>
                </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-container>
             <v-btn color="primary" small @click="$router.push('/member-retirement')">
              ຍ້ອນກັບ
             </v-btn>
          </v-container>
        </v-card>
      </v-row>
     <!-- Retirement component -->
     <retirementAdd/>
    </v-container>
  </div>
</template>

<script>
import retirementAdd from "@/components/retirement-form/retirementAdd.vue"
export default {
  name: "MemberRetirementCreate",
  components:{
   retirementAdd,
  },
  data() {
    return {
      headers: [
        { text: "ລະຫັດ", align: "Left", value: "memRetire_id" },
        { text: "ຊື່", value: "memRetire_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "memRetire_surname", sortable: false },
        { text: "ເພດ", value: "memRetire_gender", sortable: true },
        {
          text: "ວັນເດືອນປີເກີດ",
          value: "memRetire_birthday",
          sortable: false,
        },
        { text: "ອາຍຸ", value: "memRetire_age", sortable: false },
        { text: "ໜ່ວຍ", value: "memRetire_unit", sortable: true },
        { text: "ຈຸ", value: "memRetire_section", sortable: true },
        { text: "ຮາກຖານ", value: "memRetire_foundation", sortable: true },
        { text: "ເພີ່ມ", value: "memRetire_add", sortable: false },
      ],
      myData_memRetire: [
        {
          member_id: 1,
          member_name:"do",
          member_surname:"dodo"
        },
        {
          member_id: 2,
           member_name:"Jass",
          member_surname:"Bye"
        },
      ],
      selected: [],
      //check combobox
      checked: true,
      openForm: false,
    };
  },
  mounted() {},
  methods: {
    // setvalue to form retireAdd
    selectItem(id,name,surname){
      this.$store.dispatch({
        type:"doClick_retire",
        showForm:true,
        member_id:id,
        member_name:name,
        member_surname:surname,
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  font-family: "boonhome-400";
  font-size: 14px;
}
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
  color: #0779e4;
}
.form_header {
  font-family: "boonhome-400";
  font-size: 18px;
}
.text-tooltip{
   font-family: "boonhome-400";
  font-size: 14px;

}
</style>
