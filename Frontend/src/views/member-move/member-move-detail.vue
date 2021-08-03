<template>
  <div>
    <v-container fluid>
      <v-row class="my-5 mx-10">
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍທັງໝົດ"
            :subtitle="getCount_all"
            bg_color="primary"
            avatar_ic="groups"
          />
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
          <MemberCard
            id="card"
            title="ສະມາຊິກຍົກຍ້າຍຍິງທັງໝົດ"
            :subtitle="getCount_female"
            bg_color="primary"
            avatar_ic="groups"
          />
        </v-col>
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="moveDetail"
            class="elevation-1 table-content"
            item-key="id"
            :loading="load_data"
            loading-text="ກຳລັງໂຫຼດຂໍ້ມູນ...."
            :search="search_moveDetail"
          >
            <template v-slot:top>
              <v-toolbar>
                <v-toolbar-title>
                  <span class="text-title">ລາຍລະອຽດສະມາຊິກຍົກຍ້າຍ</span>
                </v-toolbar-title>
                <v-divider class="px-1 mr-2" inset vertical></v-divider>
                <v-text-field
                  label="ຄົ້ນຫາ"
                  hide-details
                  single-line
                  append-icon="search"
                  v-model="search_moveDetail"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!----- number of rows --->
            <template #body="{ items, headers }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td v-for="(n, t) in headers" :key="t">
                    {{ n.value === "index" ? index + 1 : item[n.value] }}
                  </td>
                </tr>
              </tbody>
            </template>

            <!-------------->
          </v-data-table>
          <v-card-actions class="justify-space-between table-content">
            <v-btn color="primary" dark @click="$router.push('/member-move')">
              <span>ກັບຄືນ</span>
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{on,attrs}">
                <v-btn @click.prevent="downloadMemberMove_PDF" v-on="on" v-bind="attrs" color="primary">
                  <v-icon>file_download</v-icon>
                </v-btn>
              </template>
              <span class="text-tooltip">ດາວໂຫຼດໃບຍົກຍ້າຍ</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MemberCard from "@/components/cards/MemberCard.vue";
import axios from "axios";
import jsPDF from 'jspdf';
import dateformat from 'dateformat';
export default {
  name: "MemberMoveDetail",
  components: { MemberCard },
  data() {
    return {
      search_moveDetail: "",
      moveDetail: [],
      load_data: true,
      getCount_all: 0,
      getCount_female: 0,
      getMemberMove:[],
      headers: [
        { text: "ລຳດັບ", value: "index", sortable: false },
        { text: "ເລກທີໃບຍົກຍ້າຍ", value: "move_NO", sortable: false },
        { text: "ຊື່", value: "member_name", sortable: false },
        { text: "ນາມສະກຸນ", value: "surname", sortable: false },
        { text: "ເພດ", value: "gender", sortable: true },
        { text: "ສົກປີ", value: "m_Year", sortable: false },
        { text: "ຈຸ", value: "sect_name", sortable: true },
        { text: "ໜ່ວຍ", value: "unit_name", sortable: true },
        { text: "ຮາກຖານ", value: "fund_name", sortable: true },
      ],
    };
  },

  mounted() {
    this.getMember_movedetail();
    this.CountAll_move();
    this.Countfemale_move();
    this.getReportMoveMember();
  },

  methods: {
    //count all
    async CountAll_move() {
      const id = this.$route.params.id;
      try {
        await axios
          .get(`${this.$store.getters.myHostname}/api/v1/countAll/${id}`)
          .then((response) => {
            this.getCount_all = parseInt(response.data.amount);
          });
      } catch (err) {
        console.log(err);
      }
    },
    //count female
    async Countfemale_move() {
      const id = this.$route.params.id;
      try {
        await axios
          .get(`${this.$store.getters.myHostname}/api/v1/countfemale/${id}`)
          .then((response) => {
            this.getCount_female = parseInt(response.data.amount);
          });
      } catch (err) {
        console.log(err);
      }
    },
    // get member move detail by id
    async getMember_movedetail() {
      const id = this.$route.params.id;
      try {
        await axios
          .get(
            `${this.$store.getters.myHostname}/api/v1/move/getmove-detail/${id}`
          )
          .then((response) => {
            this.moveDetail = response.data;
            this.load_data = false;
          });
      } catch (err) {
        console.log(err);
      }
    },

   async getReportMoveMember (){
       try{
          if(this.$route.params.id){
            let response = await axios.get(this.$store.getters.myHostname+`/reportMove/getmember/${this.$route.params.id}`);
            this.getMemberMove=response.data;
          }
       }catch(err){
         console.log(err);
       }
    },

    //-------------

  async  downloadMemberMove_PDF(){
        if(this.getMemberMove){
           const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "A4",
        });
          for(let i in this.getMemberMove){
            
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
          .text(`ເລກທີ...${this.getMemberMove[i].move_NO}../ຄຊປປລ ມຊ`, 7.7, 2.1, {
            align: "right",
            maxWidth: "7.5",
          })
          .text(
            `ນະຄອນຫຼວງວຽງຈັນ, ວັນທີ:.${dateformat(Date.now(), "dd/mm/yyyy")}`,
            7.7,
            2.4,
            {
              align: "right",
              maxWidth: "7.5",
            }
          )
          .setFontSize(12)
          .text("ລາຍງານຂໍ້ມູນການຍົກຍ້າຍ", 4, 3, {
            align: "center",
            maxWidth: "7.5",
          })
          .setFontSize(11)
          .text(`ຮຽນ: ຄະນະບໍລິຫານງານຊາວໜຸ່ມປະຊາຊົນປະຕິວັດລາວ ແຫ່ງໃໝ່`, 4, 3.6, {
            align: "center",
            maxWidth: "7.5",
          })
          .text(`ອິງຕາມ: ກົດລະບຽບຂອງ ຄຊປປລ ວ່າດ້ວຍການຍົກຍ້າຍສະມາຊິກຊາວໜຸ່ມເພື່ອໄປປະຕິບັດໜ້າທີ່ຢູ່ແຫ່ງໃໝ່.`, 4, 3.85, {
            align: "center",
            maxWidth: "7.5",
          })
          .text(`ຄ ຊ ປ ປ ລ ມະຫາໄລແຫ່ງຊາດ ໄດ້ຕົກລົງອອກໃບຍົກຍ້າຍໃຫ້ແກ່ສະຫາຍ`, 4, 4.1, {
            align: "center",
            maxWidth: "7.5",
          })
           .text(`ຊື່ ແລະ ນາມສະກຸນ:.......ສະຫາຍ...${this.getMemberMove[i].member_name +'....'+this.getMemberMove[i].surname}......ວັນ,ເດືອນ,ປີເກີດ........${dateformat(this.getMemberMove[i].birthday,'dd/mm/yyyy')}............`, 0.6, 4.5, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ບ້ານເກີດ:.....${this.getMemberMove[i].bvillage}...............,ເມືອງ......${this.getMemberMove[i].bdistrict}...........ແຂວງ:........${this.getMemberMove[i].bprovince}..............`, 0.6, 4.78, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ບ້ານຢູ່ປະຈຸບັນ:.....${this.getMemberMove[i].nvillage}......,ເມືອງ:.......${this.getMemberMove[i].ndistrict}..............,ແຂວງ:.........${this.getMemberMove[i].nprovince}.............`, 0.6, 5.05, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(`ຊົນເຜົ່າ:.........${this.getMemberMove[i].nation}.........,ເຊື້ອຊາດ:.........${this.getMemberMove[i].ethnic}..............,ສາສະໜາ:...............${this.getMemberMove[i].religion}..................`, 0.6, 5.33, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ວັນທີ, ເດືອນ, ປີສັງກັດລັດ:.............................................. ......,ສັງກັດຢູ່:.......................................................`, 0.6, 5.63, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(`ໜ້າທີຮັບຜິດຊອບ:..........................................................................................................................................`, 0.6, 5.93, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(`ວັນ,ເດືອນ,ປີ ເຂົ້າເປັນສະມາຊິກຊາວໜຸ່ມ ຄ ຊ ປ ປ ລ:....${dateformat(this.getMemberMove[i].date_Y,'dd/mm/yyyy')}....,ໜ້າທີ່ຮັບຜິດຊອບ:.........${this.getMemberMove[i].responsible}............`, 0.6, 6.33, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(`ກ່ອນມື້ຍົກຍ້າຍປະຈຳຢູ່ພາກສ່ວນ:.ຊາວໜຸ່ມຮາກຖານ ${this.getMemberMove[i].fund_name}................................................`, 0.6, 6.63, {
            align: "left",
            maxWidth: "7.5",
          })
            .text(`ເຫດຜົນຂອງການຍົກຍ້າຍ:...............${this.getMemberMove[i].reason}......,ສົກປີ:.................${this.getMemberMove[i].m_Year}................................`, 0.6, 6.93, {
            align: "left",
            maxWidth: "7.5",
          })
          .text(`ຈຸດດີພື້ນຖານ:...............................................................................................................................................`, 0.6, 7.33, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`.................................................................................................................................................................`, 0.6, 7.66, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ຈຸດອ່ອນພື້ນຖານ:.............................................................................................................................................`, 0.6, 7.96, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`...................................................................................................................................................................`, 0.6, 8.33, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ສຳລັບເງິນບຳລຸງເດືອນ:...........................ໄດ້ປະຕິບັດແລ້ວ, ສ່ວນເດືອນ....................................ໃຫ້ປະຕິບັດຢູ່ບ່ອນໃໝ່.`, 0.6, 8.66, {
            align: "left",
            maxWidth: "7.5",
          })
           .text(`ເມື່ອສະຫາຍເອົາໃບຍົກຍ້າຍມາແຈ້ງຕໍ່ບ່ອນສັງກັດໃໝ່ແລ້ວຂໍໃຫ້ອົງການຈັດຕັ້ງ ຄ ຊ ປ ປ ລ ບ່ອນດັ່ງກ່າວ`, 4, 8.96, {
            align: "center",
            maxWidth: "7.5",
          })
           .text(`ໃຫ້ຮັບເອົາຜູ້ກ່ຽວເຂົ້າດຳເນີນຊີວິດ ແລະ ເຄື່ອນໄຫວຕາມລະບຽບຫຼັກການຂອງ ຄ ຊ ປ ປ ລ `, 4, 9.27, {
            align: "center",
            maxWidth: "7.5",
          })
           .text(`ດັ່ງນັ້ນ, ຈື່ງໄດ້ອອກໃບຍົກຍ້າຍໃຫ້ກັບຜູ້ກ່ຽວເພື່ອສຶບຕໍ່ສ້າງຜົນງານໃຫ້ກັບບ່ອນໃໝ່. `, 4, 9.53, {
            align: "center",
            maxWidth: "7.5",
          })
        doc.setFontSize(11);
        doc.text("ຄະນະບໍລິຫານງານຊາວໜຸ່ມມະຫາວິທະຍາໄລແຫ່ງຊາດ", 0.7, 10, null, null, "left");
        doc.text("ເລຂາ", 0.7, 10.33, null, null, "left");
        doc.text(`ວັນທີ: ${dateformat(Date.now(),'dd/mm/yyyy')}`, 7.5, 10, null, null, "right");
        doc.text(`ເລຂາຊາວໜຸ່ມຮາກຖານ:${'ວິທະຍາສາດທຳມະຊາດ'}`, 7.5, 10.33, null, null, "right");
        // save pdf
        // doc.autoPrint();
        doc.addPage();
          }
           doc.save(
          `ໃບຍົກຍ້າຍຂອງສະມາຊິກຊາວໜຸ່ມ-${dateformat(
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
.text-title {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.table-content {
  font-family: "boonhome-400";
  font-size: 10px;
}
.text-tooltip{
   font-family: "boonhome-400";
  font-size: 14px;
}
</style>
