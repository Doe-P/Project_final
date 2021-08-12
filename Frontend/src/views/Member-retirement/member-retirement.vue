<template>
  <div id="MemberRetirement">
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-3">
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກພົ້ນກະສຽນທັງໝົດ"
              :subtitle="Count_allmember"
              bg_color="#D32F2F"
              avatar_ic="groups"
            />
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12">
            <MemberCard
              id="card"
              title="ສະມາຊິກຍິງທັງໝົດ"
              :subtitle="Count_femalemember"
              bg_color="#D81B60"
              avatar_ic="people"
            />
          </v-col>
          <v-card width="100%" class="my-3">
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
                    <span class="text-header">ຂໍ້ມູນສະມາຊິກພົ້ນກະສຽນ</span>
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
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.retire_id }}</td>
                  <td>{{ item.member_name }}</td>
                  <td>{{ item.surname }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.typemember }}</td>
                  <td>{{ item.sect_name }}</td>
                  <td>{{ item.unit_name }}</td>
                  <td>{{ item.fund_name }}</td>
                  <td>{{ item.date_retire | formatDate }}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          small
                          v-on="on"
                          v-bind="attrs"
                          @click="edit_item_retire(item.retire_id)"
                          >update</v-icon
                        >
                      </template>
                      <span class="text-tooltip">ແກ້ໄຂຂໍ້ມູນ</span>
                    </v-tooltip>
                    <span class="ma-1"></span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                         @click.prevent="downloadRetirementPDF(item.retire_id)"
                          small
                          v-on="on"
                          v-bind="attrs"
                          >file_download</v-icon
                        >
                      </template>
                      <span class="text-tooltip">ດາວໂຫຼດໃບພົ້ນກະສຽນ</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-container>
      <formRetireEdit />
    </v-app>
  </div>
</template>

<script>
import formRetireEdit from "@/components/retirement-form/retirementEdit.vue";
import MemberCard from "@/components/cards/MemberCard.vue";
import axios from "axios";
import dateformat from 'dateformat';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  name: "MemberRetirement",
  components: {
    MemberCard,
    formRetireEdit,
  },
  data() {
    return {
      headers: [
        {
          text: "ລຳດັບ",
          align: "Left",
          value: "index",
          sortable: false,
        },
        {
          text: "ເລກທີໃບພົ້ນກະສຽນ",
          align: "Left",
          value: "retire_id",
          sortable: false,
        },
        { text: "ຊື່", align: "Left", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", align: "Left", value: "surname", sortable: false },
        { text: "ເພດ", align: "Left", value: "gender", sortable: false },
        { text: "ອາຍຸ", align: "Left", value: "age", sortable: false },
        {
          text: "ປະເພດສະມາຊິກ",
          align: "Left",
          value: "typemember",
          sortable: true,
        },
        { text: "ຈຸ", align: "Left", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", align: "Left", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", align: "Left", value: "fund_name", sortable: true },
        {
          text: "ວັນທີພົ້ນກະສຽນ",
          align: "Left",
          value: "date_retire",
          sortable: false,
        },
        { text: "Actions", align: "Left", value: "action", sortable: false },
      ],
      myData_menberRetire: [],
      member_retire_search: null,
      //-------
      getCount_allmember: null,
      getCount_femalemember: null,
    };
  },
  watch: {
    User() {
      this.getData_retirements();
    },
  },
  computed: {
    User() {
      return this.$store.getters["User/getmyUser"];
    },
      Count_allmember() {
       let myData = ""
      try {
         myData = this.myData_menberRetire.length;
      } catch (err) {
        console.log(err);
      }
      return myData;
    },

      Count_femalemember() {
        let myData =""
      try {
        myData = this.myData_menberRetire.filter(item => String(item.gender)==String('ຍິງ')).length;
      } catch (err) {
        console.log(err);
      }
      return myData;
    },
  },
  created() {
    this.getData_retirements();
  },

  mounted() {
    // this.Count_allmember();
    // this.Count_femalemember();
  },
  methods: {
    async getData_retirements() {
      const user_status = this.User.status;
      const fund_id = this.User.fund_id;
      try {
        if (user_status == "Admin") {
          console.log("dd");
          let response = await axios.get(
            this.$store.getters.myHostname + "/api/v1/retirements"
          );
          this.myData_menberRetire = response.data;
        } else if (user_status == "User") {
          let response = await axios.get(
            this.$store.getters.myHostname +
              `/api/v1/retirements/foundations/${fund_id}`
          );
          this.myData_menberRetire = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // async Count_allmember() {
    //   try {
    //     await axios
    //       .get(
    //         this.$store.getters.myHostname + "/api/v1/count-allmembers-retire"
    //       )
    //       .then((response) => {
    //         this.getCount_allmember = response.data.count_member;
    //       });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async Count_femalemember() {
    //   try {
    //     await axios
    //       .get(
    //         this.$store.getters.myHostname +
    //           "/api/v1/count-femalemembers-retire"
    //       )
    //       .then((response) => {
    //         this.getCount_femalemember = response.data.count_member;
    //       });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    edit_item_retire(id) {
      this.$store.dispatch({
        type: "doClick_retireEdit",
        showForm: true,
        retire_id: id,
      });
    },

    //----------------
    downloadRetirementPDF(id){
      if(id){
         const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });
          const mydata = this.myData_menberRetire.filter(item => String(item.retire_id)==String(id))
          var rows = [];
          for(let i in mydata ){
            rows[i]={
              index:parseInt(i)+1,
              retire_NO:mydata[i].retire_id,
              date:mydata[i].date_retire,
              name:mydata[i].member_name,
              surname:mydata[i].surname,
              gender:mydata[i].gender,
              unit:mydata[i].unit_name,
              age:mydata[i].age,
              fundation : mydata[i].fund_name
            }
          }

           // table columns
        const columns = [
          { title: "ລຳດັບ", dataKey: "index" },
          { title: "ຊື່", dataKey: "name" },
          { title: "ນາມສະກຸນ", dataKey: "surname" },
          { title: "ເພດ", dataKey: "gender" },
          { title: "ໜ່ວຍ", dataKey: "unit" },
          { title: " ອາຍຸ", dataKey: "age" },
           { title: "ໝາຍເຫດ", dataKey: "note" },
        ];
          

           // Table
        doc.autoTable({
          columns,
          body: rows,
           bodyStyles: {
            overflow: "linebreak",
            tableWidth: "auto",
            //fileColor: [0, 0, 0],
            lineWidth: 0.01,
          },
          margin: { left: 0.5, top: 6.25, right: 0.5 },
          styles: { font: "Saysettha OT" },
          columnWidth: {
            fund_name: { columnWidth: 33 },
            result: { columnWidth: 33 },
            women: { columnWidth: 33 },
          },
        });
           //set format PDF
        //set font text header
        doc.addFont("Saysettha OT");
        doc.setFont("Saysettha OT");
        doc
          .addImage("nation.png", "PNG", 3.6, 0.25, 0.8, 0.8)
          .setFontSize(11)
          .text("ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ", 4, 1.4, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ", 4, 1.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .text("ມະຫາວິທະຍາໄລແຫ່ງຊາດ", 0.5, 1.9, {
            align: "left",
            maxWidth: "7.5",
          })
          .text("ຄະນະຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວ", 0.5, 2.2, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ເລກທີ...${rows[0].retire_NO}../ຄຊປປລ ມຊ`, 7.7, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ວິທະຍາເຂດດົງໂດກ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            7.7,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(12)
          .text("ຂໍ້ຕົກລົງ", 4, 3, {
            align: "center",
            maxWidth: "7.5",
          })
          .text(`ວ່າດ້ວຍການສິນສຸດ ການເປັນສະມາຊິກ ຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວ`, 4, 3.33, {
            align: "center",
            maxWidth: "7.5",
          })
           .setFontSize(11)
           .text(`- ອິງຕາມ: ກົດລະບຽບຂອງຊາວໜຸ່ມ ປະຊາຊົນປະຕິວັດລາວ ສະໄໝທີ VII ໝວດ II ມາດຕາທີ 08 ວ່າດ້ວຍ `, 0.8, 3.83, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(` ການສິ້ນສຸດການເປັນສະມາຊິກ ຂອງຊາວໜຸ່ມປະຊົນປະຕິວັດລາວ`, 0.8, 4.07, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`- ອິງຕາມ: ໜັງສືສະເໜີຂອງຄະນະບໍລິຫານງານຮາກຖານ ${rows[0].fundation} ສະບັບເລກທີ `, 0.8, 4.33, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(` ${mydata[0].No_Ask}/ຄຊປປລ.ຄວທ, ລົງວັນທີ ${dateformat(rows[0].date,'dd/mm/yyyy')}`, 0.8, 4.63, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`- ອິງຕາມ: ການຄົ້ນຄວ້າຂອງຄະນະບໍລິຫານງານຊາວໜຸ່ມ ປປລ ມະຫາວິທະຍາໄລແຫ່ງຊາດ`, 0.8, 4.93, {
            align: "left",
            maxWidth: "7.5",
          })
           .setFontSize(12)
            .text(`ຄະນະບໍລິຫານງານຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວມະຫາວິທະຍາໄລແຫ່ງຊາດ ຕົກລົງ`, 0.8, 5.33, {
            align: "left",
            maxWidth: "7.5",
          })
           .setFontSize(11)
            .text(` ມາດຕາ 01 ເຫັນດີໃຫ້ສະມາຊິກຊາວໜຸ່ມຮາກຖານ ${rows[0].fundation}`, 0.8, 5.63, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(` ອອກຈາກການເປັນສະມາຊິກ ຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວ ດັ່ງລາຍຊື່ລຸ່ມນີ້:`, 0.8, 5.93, {
            align: "left",
            maxWidth: "7.5",
          })
           

            .text(`ມາດຕາ 02 ມອບໃຫ້ຄະນະບໍລິຫານງານຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວ ຮາກຖານ ${rows[0].fundation}`, 0.6, 7.33, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ຈັດພິທີລາອອກຈາກສົມກຽດ ຕາມເວລາທີ່ເໝາະສົມ.`, 0.6, 7.63, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ມາດຕາ 03 ຂໍ້ຕົກລົງສະບັບນີ້ມີຜົນສັກສິດນັບຕັ້ງແຕ່ມື້ລົງລາບເຊັນເປັນຕົ້ນໄປ`, 0.6, 7.93, {
            align: "left",
            maxWidth: "7.5",
          })
        doc.setFontSize(11);
        doc.text("ຄະນະບໍລິຫານງານຊາວໜຸ່ມມະຫາວິທະຍາໄລແຫ່ງຊາດ", 7, 8.63, null, null, "right");
        doc.text("ເລຂາ", 5, 8.93, null, null, "left");
        // save pdf

          doc.save(
          `ໃບພົ້ນກະສຽນຂອງ${rows[0].name+rows[0].surname}-${dateformat(
            Date.now(),
            "dd/mm/yyyy"
          )}.pdf`
        );
      }
    }
  },
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
