<template>
  <div id="Membercreate">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="8" lg="10">
          <v-card>
            <v-toolbar color="primary" height="45" dark class="mb-5">
              <v-toolbar-title class="text-header-dialog">
                ຟອມສະແດງລາຍລະອຽດຂໍ້ມູນສະມາຊິກ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="justify-center">
              <v-form
                class="content"
                @submit.prevent="UpdateData_Members"
                v-model="valid"
              >
                <v-row justify="center" class="mx-7">
                  <v-col cols="3">
                    <span class="sub-text">ຊື່ແລະນາມສະກຸນ:</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      label="ລະຫັດສະມາຊິກ"
                      :value="member_id"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="name"
                      id="name"
                      label="ຊື່ສະມາຊິກ"
                      :value="txt_Membername"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="surname"
                      id="surname"
                      label="ນາມສະກຸນ"
                      :value="txt_surname"
                      readonly
                    ></v-text-field>
                    <v-radio-group v-model="gender" row>
                      <label>ເພດ:</label>
                      <span class="ml-10"></span>
                      <v-radio
                        label="ຍິງ"
                        value="ຍິງ"
                        name="female"
                        color="primary"
                        disabled
                      ></v-radio>
                      <v-radio
                        label="ຊາຍ"
                        value="ຊາຍ"
                        name="male"
                        color="primary"
                        disabled
                      ></v-radio>
                    </v-radio-group>
                    <v-text-field
                      label="ວັນເດືອນປີເກີດ"
                      :value="format_Date"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="Number"
                      name="tel"
                      id="tel"
                      label="ເບີໂທລະສັບ"
                      :value="txt_tel"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row class="mx-10" justify="center">
                  <v-col cols="3">
                    <span class="sub-text">ບ້ານເມືອງແຂວງເກີດ:</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      type="text"
                      name="b_village"
                      id="b_village"
                      label="ບ້ານເກີດ"
                      :value="txt_bvillage"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="b_district"
                      id="b_district"
                      label="ເມືອງ"
                      :value="txt_bdistrict"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="b_province"
                      id="b_province"
                      label="ແຂວງ"
                      :value="txt_bprovince"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <!-- section now address -->
                <v-row class="mx-10" justify="center">
                  <v-col cols="3">
                    <span class="sub-text">ທີ່ຢູ່ປະຈຸບັນ:</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      type="text"
                      name="n_village"
                      id="n_village"
                      label="ບ້ານ"
                      :value="txt_nvillage"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="n_district"
                      id="n_district"
                      label="ເມືອງ"
                      :value="txt_ndistrict"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="n_province"
                      id="n_province"
                      label="ແຂວງຢູ່ປະຈຸບັນ"
                      :value="txt_nprovince"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <!-- section nation ethnic religion -->
                <v-row class="mx-10" justify="center">
                  <v-col cols="3">
                    <span class="sub-text">ເຊື້ອຊາດແລະຊົນເຜົ່າ</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      type="text"
                      name="nation"
                      id="nation"
                      label="ເຊື້ອຊາດ"
                      :value="txt_nation"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      name="ethnic"
                      id="ethnic"
                      label="ຊົນເຜົ່າ"
                      :value="txt_ethnic"
                      readonly
                    ></v-text-field>
                    <v-radio-group v-model="select_riligion">
                      <span class="mb-3">ສາດສະໜາ:</span>
                      <v-radio disabled label="ພຸດ" value="ພຸດ"></v-radio>
                      <v-radio disabled label="ຄຣິດ" value="ຄຣິດ"></v-radio>
                      <v-radio
                        disabled
                        label="ໝຸດສະລິມ"
                        value="ໝຸດສະລິມ"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <!-- Data start to organize -->
                <v-row class="mx-10" justify="center">
                  <v-col cols="3">
                    <span class="sub-text">ວັນເດືອນປີເຂົ້າອົງການຈັດຕັ້ງ</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      :value="format_Date_y"
                      label="ວັນທີເຂົ້າຊາວໜຸ່ມ"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ວັນທີສັງກັດເປັນສະມາຊິກຊາວໜຸ່ມ ມຊ"
                      :value="format_Date_start_nuol"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ວັນທີເຂົ້າແມ່ຍິງ"
                      :value="format_Date_w"
                      readonly
                      v-show="gender == 'ຍິງ'"
                    ></v-text-field>
                    <span class="sub-text">ອົງການຈັດຕັ້ງອື່ນ</span>
                    <v-checkbox
                      label="ກຳມະບານ"
                      v-model="isKamaban"
                      value="ກຳມະບານ"
                    ></v-checkbox>
                    <v-text-field
                      label="ວັນທີເຂົ້າກຳມະບານ"
                      :value="format_Date_k"
                      readonly
                      v-show="isKamaban == 'ກຳມະບານ'"
                    ></v-text-field>
                    <v-checkbox
                      label="ສັງກັດພັກ(ສຳຮອງ)"
                      v-model="isParty_reserve"
                      value="ສັງກັດພັກສຳຮອງ"
                    ></v-checkbox>
                    <v-text-field
                      label="ວັນທີເຂົ້າພັກ (ສຳຮອງ)"
                      :value="format_Date_ps"
                      readonly
                      v-show="isParty_reserve == 'ສັງກັດພັກສຳຮອງ'"
                    ></v-text-field>
                    <v-checkbox
                      label="ສັງກັດພັກ(ສົມບູນ)"
                      v-model="isParty_full"
                      value="ສັງກັດພັກສົມບູນ"
                    ></v-checkbox>
                    <v-text-field
                      label="ວັນທີເຂົ້າພັກ (ສົມບູນ)"
                      :value="format_Date_p"
                      readonly
                      v-show="isParty_full == 'ສັງກັດພັກສົມບູນ'"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row class="mx-10" justify="center">
                  <v-col cols="3">
                    <span class="sub-text">ສັງກັດແລະກ່ຽວກັບ</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      label="ຈຸ"
                      :value="selected_section_Item"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ໜ່ວຍ"
                      :value="selected_unit_Item"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ຮາກຖານ"
                      :value="this.fund_name"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ປະເພດສະມາຊິກ"
                      :value="selected_typeMember_Item"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ລະດັບການສຶກສາ"
                      :value="selecte_level_Item"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      label="ໜ້າທີ່ຮັບຜິດຊອບ"
                      :value="select_reponsible"
                      readonly
                    ></v-text-field>
                    <span class="sub-text"
                      >ພາສາຕ່າງປະເທດທີ່ອ່ານ ແລະ ຂຽນໄດ້ດີ</span
                    >
                    <v-text-field
                      :value="language_selected"
                      chips
                      label="ພາສາ"
                      solo
                      readonly
                      multiple
                    >
                      <template
                        v-slot:selection="{ attrs, item, select, selected }"
                      >
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)"
                        >
                          <strong>{{ item }}</strong
                          >&nbsp;
                        </v-chip>
                      </template>
                    </v-text-field>
                    <v-text-field
                      label="ໝວດເລືອດ"
                      :value="selected_blood_Item"
                      readonly
                    ></v-text-field>
                    <v-text-field
                      name="name"
                      label="ສະຖານະສະມາຊິກ"
                      id="id"
                      :value="member_status"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row class="mx-10">
                  <v-spacer></v-spacer>
                  <v-card-actions class="justify-end">
                    <v-btn @click="cancelData_member" color="primary" dark
                      >ກັບຄືນ</v-btn
                    >
                  </v-card-actions>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <alertmessage />
    </v-container>
  </div>
</template>

<script>
import alertmessage from "@/components/AlertMessage/alertmessage.vue";
import axios from "axios";
import dateformat from "dateformat";
export default {
  name: "Membercreate",
  components: {
    alertmessage,
  },
  data() {
    return {
      language_selected: [],
      items: ["ອັງກິດ", "ຈີນ", "ຫວຽດນາມ", "ຢີ່ປຸ່ນ", "ເກົາຫຼີ"],
      // valid form
      valid: true,
      reponsibles: ["ນັກສຶກສາ", "ອາຈານ"],
      member_status: "",
      // isShow_woman_date: true,
      //Birthday
      format_Date: null,
      // Date younger
      format_Date_y: null,
      // Date Women
      format_Date_w: null,
      // Date kammaban
      format_Date_k: null,
      // ເຂົ້າພັກສຳຮອງ
      format_Date_ps: null,
      // ເຂົ້າພັກສົມບູນ
      format_Date_p: null,
      // ເຂົ້າສັງກັດ ມຊ
      format_Date_start_nuol: null,
      // Section_items array
      section_items: [],
      selected_section_Item: null,
      section_items_all: [],
      get_section_id: null,
      // TypeMember_items array
      typeMember_items: [],
      selected_typeMember_Item: null,
      // educationLevel_items array
      level_items: [],
      selecte_level_Item: null,
      // Blood
      blood_items: ["A", "B", "AB", "O"],

      //-------------
      typeMember_item_All: [],
      level_item_All: [],
      get_membertype_id: null,
      get_eduLevel_id: null,
      unit_items: [],
      unit_items_all: [],
      selected_unit_Item: null,
      //--------------
      txt_Membername: null,
      txt_surname: null,
      gender: "",
      txt_tel: "",
      //-----born----
      txt_bvillage: null,
      txt_bdistrict: null,
      txt_bprovince: null,
      //---- now------
      txt_nvillage: null,
      txt_ndistrict: null,
      txt_nprovince: null,
      //-----ເຊື່້ອຊາດ, ຊົນເຜົ່າ ແລະ ສາດສະໜາ
      txt_nation: null,
      select_riligion: "ພຸດ",
      txt_ethnic: null,
      //----
      select_reponsible: null,
      getSect_id: null,
      found_id: "",
      selected_blood_Item: "",
      //----- format date for database
      birthdate_format: null,
      youthdate_format: null,
      womendate_format: null,
      kamabandate_format: null,
      psdate_format: null,
      pdate_format: null,
      startnuol_format: null,
      //---------
      isKamaban: null,
      isParty_reserve: null,
      isParty_full: null,
      member_id: null,
      fund_name: null,
    };
  },
  mounted() {
    this.getUnit_items();
    this.get_TypeMember_selection();
    this.get_educationLevel();
    this.getMember_byID();
    this.fund_name = this.$route.params.fund_name;
  },

  watch: {},
  computed: {},
  methods: {
    //Number On ly
    isNumberonly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      }
      return true;
    },
    //Cancel form
    cancelData_member() {
      this.$router.push("/Member");
    },

    async get_TypeMember_selection() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/type-members")
          .then((response) => {
            this.typeMember_item_All = response.data;
            for (let i = 0; i <= this.typeMember_item_All.length; i++) {
              this.typeMember_items.push(
                this.typeMember_item_All[i].typemember
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async get_educationLevel() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/education-levels")
          .then((response) => {
            this.level_item_All = response.data;
            for (let i = 0; i <= this.level_item_All.length; i++) {
              this.level_items.push(this.level_item_All[i].level_name);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    //get unit items from api
    async getUnit_items() {
      try {
        await axios
          .get(
            `${this.$store.getters.myHostname}/api/v1/getItem-units/${this.$route.params.fund_id}`
          )
          .then((response) => {
            this.unit_items_all = response.data;
            for (let i = 0; i <= this.unit_items_all.length; i++) {
              this.unit_items.push(this.unit_items_all[i].unit_name);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    async get_unit() {
      this.section_items = [];
      this.selected_section_Item = null;
      if (this.selected_unit_Item) {
        for (let i = 0; i <= this.unit_items_all.length; i++) {
          if (
            String(this.selected_unit_Item).valueOf() ==
            String(this.unit_items_all[i].unit_name).valueOf()
          ) {
            const id = this.unit_items_all[i].unit_id;
            try {
              await axios
                .get(
                  `${this.$store.getters.myHostname}/api/v1/allsections/${id}`
                )
                .then((response) => {
                  this.section_items_all = response.data;
                  for (let a = 0; a <= this.section_items_all.length; a++) {
                    this.section_items.push(
                      this.section_items_all[a].sect_name
                    );
                  }
                });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    },
    //get member by id
    async getMember_byID() {
      // w is women
      let w = "";
      // k is kammaban
      let k = "";
      // ps is party reserve
      let ps = "";
      // p is party full
      let p = "";
      let get_item_unit = "";
      let get_item_sect = "";
      let levelid = "";
      try {
        await axios
          .get(
            `${this.$store.getters.myHostname}/api/v1/members/${this.$route.params.member_detail}`
          )
          .then((response) => {
            this.member_id = response.data.member_id;
            this.txt_Membername = response.data.member_name;
            this.txt_surname = response.data.surname;
            this.gender = response.data.gender;
            this.format_Date = dateformat(response.data.birthday, "dd-mm-yyyy");
            this.birthdate_format = dateformat(
              response.data.birthday,
              "yyyy-mm-dd"
            );
            this.txt_tel = response.data.tell.toString();
            this.txt_bvillage = response.data.bvillage;
            this.txt_bdistrict = response.data.bdistrict;
            this.txt_bprovince = response.data.bprovince;
            this.txt_nvillage = response.data.nvillage;
            this.txt_ndistrict = response.data.ndistrict;
            this.txt_nprovince = response.data.nprovince;
            this.txt_nation = response.data.nation;
            this.txt_ethnic = response.data.ethnic;
            this.select_riligion = response.data.religion;
            w = response.data.date_W;
            this.format_Date_y = dateformat(response.data.date_Y, "dd-mm-yyyy");
            this.youthdate_format = dateformat(
              response.data.date_Y,
              "yyyy-mm-dd"
            );
            this.startnuol_format = dateformat(
              response.data.date_start,
              "yyyy-mm-dd"
            );
            this.format_Date_start_nuol = dateformat(
              response.data.date_start,
              "dd-mm-yyyy"
            );
            k = response.data.date_K;
            ps = response.data.date_PS;
            p = response.data.date_P;
            get_item_unit = response.data.unit_id;
            get_item_sect = response.data.sect_id;
            levelid = response.data.level_id;
            this.member_status = response.data.status;
            this.select_reponsible = response.data.responsible;
            this.language_selected = response.data.language.split(",");
            this.selected_blood_Item = response.data.blood;
            this.getTypeMember_item(response.data.typemember_id);
          });
      } catch (err) {
        console.log(err);
      }
      this.getUnit_selected(get_item_unit, get_item_sect);
      // ກວດສອບວັນທີຂອງອົງການຈັດຕັ້ງ
      if (w) {
        this.gender = "ຍິງ";
        this.format_Date_w = dateformat(w, "dd-mm-yyyy");
        this.womendate_format = dateformat(w, "yyyy-mm-dd");
      } else {
        this.format_Date_w = null;
      }
      //--------
      if (k) {
        this.isKamaban = "ກຳມະບານ";
        this.format_Date_k = dateformat(k, "dd-mm-yyyy");
        this.kamabandate_format = dateformat(k, "yyyy-mm-dd");
      } else {
        this.isKamaban = "";
        this.format_Date_k = null;
      }
      //-------
      if (ps) {
        this.isParty_reserve = "ສັງກັດພັກສຳຮອງ";
        this.format_Date_ps = dateformat(ps, "dd-mm-yyyy");
        this.psdate_format = dateformat(ps, "yyyy-mm-dd");
      } else {
        this.isParty_reserve = "";
        this.format_Date_ps = null;
      }
      //-------
      if (p) {
        this.isParty_full = "ສັງກັດພັກສົມບູນ";
        this.format_Date_p = dateformat(p, "dd-mm-yyyy");
        this.pdate_format = dateformat(p, "yyyy-mm-dd");
      } else {
        this.isParty_full = "";
        this.format_Date_p = null;
      }
      this.getEdulevel_item(levelid);
    },
    remove(item) {
      if (this.language_selected.length >= 2) {
        this.language_selected.splice(this.language_selected.indexOf(item), 1);
        this.language_selected = [...this.language_selected];
      }
    },
    //get member type item selected
    getTypeMember_item(membertypeid) {
      for (let t = 0; t <= this.typeMember_item_All.length; t++) {
        if (
          String(membertypeid).valueOf() ==
          String(this.typeMember_item_All[t].typemember_id).valueOf()
        ) {
          this.selected_typeMember_Item = this.typeMember_item_All[
            t
          ].typemember;
          this.get_membertype_id = membertypeid;
        }
      }
    },
    // get education level item selected
    getEdulevel_item(id) {
      for (let l = 0; l <= this.level_item_All.length; l++) {
        if (
          String(id).valueOf() ==
          String(this.level_item_All[l].level_id).valueOf()
        ) {
          this.selecte_level_Item = this.level_item_All[l].level_name;
          this.get_eduLevel_id = id;
        }
      }
    },
    // get unit item selected
    async getUnit_selected(unitid, sectid) {
      this.section_items_all = [];
      for (let i = 0; i <= this.unit_items_all.length; i++) {
        if (
          String(unitid).valueOf() ==
          String(this.unit_items_all[i].unit_id).valueOf()
        ) {
          this.selected_unit_Item = this.unit_items_all[i].unit_name;
          try {
            await axios
              .get(
                `${this.$store.getters.myHostname}/api/v1/allsections/${unitid}`
              )
              .then((response) => {
                this.section_items_all = response.data;
                for (let a = 0; a <= this.section_items_all.length; a++) {
                  this.section_items.push(this.section_items_all[a].sect_name);
                  const getvalue = String(
                    this.section_items_all[a].sect_id
                  ).valueOf();
                  if (String(sectid).valueOf() == getvalue) {
                    this.selected_section_Item = this.section_items_all[
                      a
                    ].sect_name;
                    this.getSect_id = this.section_items_all[a].sect_id;
                  }
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
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
.combo_select {
  font-family: "boonhome-400";
  font-weight: 10px;
}
.content {
  font-family: "boonhome-400";
  font-weight: 14px;
}
.text-header-dialog {
  font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
.sub-text {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
}
</style>
