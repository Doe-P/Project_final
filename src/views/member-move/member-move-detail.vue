<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="moveDetail"
            class="elevation-1 table-content"
            select-all
            item-key="id"
            loading="true"
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
          </v-data-table>
           <v-card-actions class="justify-space-between table-content">
              <v-btn color="primary" dark @click="$router.push('/member-move')">
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
  name: "MemberMoveDetail",

  data() {
    return {
        search_moveDetail:"",
        headers:[
             {text:"ລຳດັບ",value:"moveNO",sortable:false},
            {text:"ລະຫັດ",value:"member_id",sortable:false},
            {text:"ຊື່",value:"member_name",sortable:false},
            {text:"ນາມສະກຸນ",value:"member_surname",sortable:false},
            {text:"ເພດ",value:"member_gender",sortable:true},
            {text:"ເລກທີໃບຍົກຍ້າຍ",value:"member_NO",sortable:false},
             {text:"ເຫດຜົນ",value:"moveReason",sortable:false},
              {text:"ສົກປີ",value:"move_Year",sortable:false},
               {text:"ໜ່ວຍ",value:"unit",sortable:true},
                {text:"ຈຸ",value:"section",sortable:true},
                 {text:"ຮາກຖານ",value:"foundation",sortable:true},
        ]
    };
  },

  mounted() {},

  methods: {},
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
  font-size: 14px;
}
</style>
