<template>
  <div id="Membercreate">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="8" lg="10">
          <v-card>
            <v-toolbar color="primary" height="45" dark class="mb-5">
              <v-toolbar-title class="text-header-dialog">
                ຟອມເພີ່ມຂໍ້ມູນພະນັກງານ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="justify-center">
              <v-form
                class="content"
                @submit.prevent="saveData_Members"
                v-model="valid"
              >
                <v-row justify="center" class="mx-7">
                  <v-col cols="3">
                    <span class="sub-text">ຊື່ແລະນາມສະກຸນ:</span>
                  </v-col>
                  <v-col cols="9" class="my-3">
                    <v-text-field
                      type="text"
                      box
                      name="name"
                      id="name"
                      label="ຊື່ສະມາຊິກ"
                      v-model="txt_Membername"
                      required
                      :rules="[
                        required('ຊື່ສະມາຊິກ'),
                        minLength('ຊື່ສະມາຊິກ', 2),
                        maxLength('ຊື່ສະມາຊິກ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="surname"
                      id="surname"
                      label="ນາມສະກຸນ"
                      v-model="txt_surname"
                      required
                      :rules="[
                        required('ນາມສະກຸນ'),
                        minLength('ນາມສະກຸນ', 2),
                        maxLength('ນາມສະກຸນ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-radio-group
                      v-model="gender"
                      required
                      :rules="[required('ເພດ')]"
                      row
                    >
                      <label>ເພດ:</label>
                      <span class="ml-10"></span>
                      <v-radio
                        label="ຍິງ"
                        value="female"
                        name="female"
                        color="primary"
                        required
                      ></v-radio>
                      <v-radio
                        label="ຊາຍ"
                        value="male"
                        name="male"
                        color="primary"
                        required
                      ></v-radio>
                    </v-radio-group>
                    <template>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date"
                            label="ວັນເດືອນປີເກີດ"
                            :rules="[required('ວັນເດືອນປີເກີດ')]"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date = parseDate(formatDate)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          class="content"
                          ref="picker"
                          v-model="date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          locale="lao"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <v-text-field
                      type="Number"
                      box
                      name="tel"
                      id="tel"
                      label="ເບີໂທລະສັບ"
                      v-model="txt_tel"
                      required
                      :rules="[
                        required('ເບີໂທລະສັບ'),
                        minLength('ເບີໂທລະສັບ', 10),
                        maxLength('ເບີໂທລະສັບ', 10),
                      ]"
                      :counter="10"
                      @keypress.native="isNumberonly($event)"
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
                      box
                      name="b_village"
                      id="b_village"
                      label="ບ້ານເກີດ"
                      v-model="txt_bvillage"
                      required
                      :rules="[
                        required('ບ້ານ'),
                        minLength('ບ້ານ', 2),
                        maxLength('ບ້ານ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="b_district"
                      id="b_district"
                      label="ເມືອງ"
                      v-model="txt_bdistrict"
                      required
                      :rules="[
                        required('ເມືອງ'),
                        minLength('ເມືອງ', 2),
                        maxLength('ເມືອງ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="b_province"
                      id="b_province"
                      label="ແຂວງ"
                      v-model="txt_bprovince"
                      required
                      :rules="[
                        required('ແຂວງ'),
                        minLength('ແຂວງ', 5),
                        maxLength('ແຂວງ', 20),
                      ]"
                      :counter="20"
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
                      box
                      name="n_village"
                      id="n_village"
                      label="ບ້ານ"
                      v-model="txt_nvillage"
                      required
                      :rules="[
                        required('ບ້ານ'),
                        minLength('ບ້ານ', 5),
                        maxLength('ບ້ານ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="n_district"
                      id="n_district"
                      label="ເມືອງ"
                      v-model="txt_ndistrict"
                      required
                      :rules="[
                        required('ເມືອງ'),
                        minLength('ເມືອງ', 5),
                        maxLength('ເມືອງ', 20),
                      ]"
                      :counter="20"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="n_province"
                      id="n_province"
                      label="ແຂວງຢູ່ປະຈຸບັນ"
                      v-model="txt_nprovince"
                      required
                      :rules="[
                        required('ແຂວງ'),
                        minLength('ແຂວງ', 2),
                        maxLength('ແຂວງ', 20),
                      ]"
                      :counter="20"
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
                      box
                      name="nation"
                      id="nation"
                      label="ເຊື້ອຊາດ"
                      v-model="txt_nation"
                      required
                      :rules="[
                        required('ເຊື້ອຊາດ'),
                        minLength('ເຊື້ອຊາດ', 3),
                        maxLength('ເຊື້ອຊາດ', 10),
                      ]"
                      :counter="10"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      box
                      name="ethnic"
                      id="ethnic"
                      label="ຊົນເຜົ່າ"
                      v-model="txt_ethnic"
                      required
                      :rules="[
                        required('ຊົນເຜົ່າ'),
                        minLength('ຊົນເຜົ່າ', 3),
                        maxLength('ຊົນເຜົ່າ', 10),
                      ]"
                      :counter="10"
                    ></v-text-field>
                    <v-radio-group v-model="select_riligion">
                      <span class="mb-3">ສາດສະໜາ:</span>
                      <v-radio label="ພຸດ" value="ພຸດ"></v-radio>
                      <v-radio label="ຄຣິດ" value="ຄຣິດ"></v-radio>
                      <v-radio label="ໝຸດສະລິມ" value="ໝຸດສະລິມ"></v-radio>
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
                    <template>
                      <v-menu
                        ref="menu_y"
                        v-model="menu_y"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date_y"
                            label="ວັນເດືອນປີເຂົ້າຊາວໝຸ່ມ"
                            :rules="[required('ວັນເດືອນປີເຂົ້າຊາວໝຸ່ມ')]"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date_y = parseDate_y(format_Date_y)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_y"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <template>
                      <v-menu
                        ref="menu_w"
                        v-model="menu_w"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-show="gender=='female'"
                            v-model="format_Date_w"
                            label="ວັນເດືອນປີເຂົ້າແມ່ຍິງ"
                            :rules="[required('ວັນເດືອນປີເຂົ້າແມ່ຍິງ')]"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date_w = parseDate_y(format_Date_w)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_w"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <template>
                      <v-menu
                        ref="menu_k"
                        v-model="menu_k"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date_k"
                            :rules="[required('ວັນເດືອນປີເຂົ້າກຳມະບານ')]"
                            label="ວັນເດືອນປີເຂົ້າກຳມະບານ"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date_k = parseDate_k(format_Date_k)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_k"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <template>
                      <v-menu
                        ref="menu_ps"
                        v-model="menu_ps"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date_ps"
                            :rules="[required('ວັນເດືອນປີເຂົ້າພັກສຳຮອງ')]"
                            label="ວັນເດືອນປີເຂົ້າພັກສຳຮອງ"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date_ps = parseDate_ps(format_Date_ps)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_ps"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <template>
                      <v-menu
                        ref="menu_p"
                        v-model="menu_p"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date_p"
                            :rules="[required('ວັນເດືອນປີເຂົ້າພັກສົມບູນ')]"
                            label="ວັນເດືອນປີເຂົ້າພັກສົມບູນ"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="date_p = parseDate_p(format_Date_p)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_p"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <template>
                      <v-menu
                        ref="menu_date_nuol"
                        v-model="menu_date_nuol"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date_start_nuol"
                            :rules="[
                              required('ວັນເດືອນປີເຂົ້າສັງກັດຊາວໝຸ່ມ ມຊ'),
                            ]"
                            label="ວັນເດືອນປີເຂົ້າສັງກັດຊາວໝຸ່ມ ມຊ"
                            prepend-icon="mdi-calendar"
                            readonly
                            @blur="
                              date_start_nuol = parseDate_start_nuol(
                                format_Date_start_nuol
                              )
                            "
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date_start_nuol"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
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
                    <v-select
                      class="combo_select my-5"
                      :items="section_items"
                      :rules="[required('ຈຸ')]"
                      v-model="selected_section_Item"
                      label="ເລືອກຈຸ"
                      dense
                    ></v-select>
                    <v-select
                      class="my-5"
                      :items="typeMember_items"
                      :rules="[required('ປະເພດສະມາຊິກ')]"
                      v-model="selected_typeMember_Item"
                      label="ເລືອກປະເພດສະມາຊິກ"
                      dense
                    ></v-select>
                    <v-select
                      class="my-5"
                      :items="level_items"
                      :rules="[required('ລະດັບການສືກສາ')]"
                      v-model="selecte_level_Item"
                      label="ເລືອກລະດັບການສືກສາ"
                      dense
                    ></v-select>
                    <v-select
                      :items="reponsibles"
                      v-model="select_reponsible"
                      label="ໜ້າທີ່ຮັບຜິດຊອບ"
                      :rules="[required('ໜ້າທີ່ຮັບຜິດຊອບ')]"
                    ></v-select>
                    <v-container>
                      <span class="sub-text">ພາສາທີ່ໄດ້</span>
                      <v-checkbox
                        label="ອັງກິດ"
                        v-model="select_lenguage"
                        value="ອັງກິດ"
                      ></v-checkbox>
                      <v-checkbox
                        label="ຈີນ"
                        v-model="select_lenguage"
                        value="ຈີນ"
                      ></v-checkbox>
                      <v-text-field
                        name="name"
                        label="ອຶ່ນໆ"
                        id="id"
                        v-model="select_lenguage_other"
                      ></v-text-field>
                    </v-container>
                    <v-select
                      :items="blood_items"
                      :rules="[required('ໝວດເລືອດ')]"
                      v-model="selected_blood_Item"
                      label="ໝວດເລືອດ"
                      dense
                    ></v-select>
                    <v-text-field
                      name="name"
                      label="ສະຖານະສະມາຊິກ"
                      id="id"
                      value="xxx"
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
                  <v-btn
                    @click="cancelData_member"
                    color="error"
                    class="mb-5"
                    dark
                    >ຍົກເລີກ</v-btn
                  >
                  <v-btn
                    type="submit"
                    color="btn_save"
                    class="mb-5 ml-5"
                    :disabled="!valid"
                    >ບັນທຶກ</v-btn
                  >
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <alertmessage />
    </v-container>
    <v-snackbar v-model="show_alert" :timeout="timeout" color="primary" dark>
      {{ message }}
      <v-btn flat color="primary" @click.native="show_alert = false">ປິດ</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import alertmessage from "@/components/AlertMessage/alertmessage.vue";
export default {
  name: "Membercreate",
  components: {
    alertmessage,
  },
  data() {
    return {
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      minLength(propertyType, minlength) {
        return (v) =>
          (v && v.length >= minlength) ||
          `${propertyType}ຕ້ອງຫຼາຍກວ່າຫຼືເທົ່າກັບ ${minlength}`;
      },
      maxLength(propertyType, maxlength) {
        return (v) =>
          (v && v.length <= maxlength) ||
          `${propertyType}ຕ້ອງໜ້ອຍກວ່າຫຼືເທົ່າກັບ ${maxlength}`;
      },
      radioRule() {
        return (v) => (v && v != true) || "ກະລຸນາເລືອກເພດກ່ອນ";
      },
      // valid form
      valid: false,
      show_alert: false,
      timeout: 2000,
      message: "Hello",
      select_riligion: "ພຸດ",
      select_lenguage: ["ອັງກິດ"],
      reponsibles: ["ນັກສຶກສາ", "ອາຈານ"],
      gender: "female",
     // isShow_woman_date: true,
      //Birthday
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      format_Date: null,
      // Date younger
      date_y: new Date().toISOString().substr(0, 10),
      menu_y: false,
      format_Date_y: null,
      // Date Women
      date_w: new Date().toISOString().substr(0, 10),
      menu_w: false,
      format_Date_w: null,
      // Date kammaban
      date_k: new Date().toISOString().substr(0, 10),
      menu_k: false,
      format_Date_k: null,
      // ເຂົ້າພັກສຳຮອງ
      date_ps: new Date().toISOString().substr(0, 10),
      menu_ps: false,
      format_Date_ps: null,
      // ເຂົ້າພັກສົມບູນ
      date_p: new Date().toISOString().substr(0, 10),
      menu_p: false,
      format_Date_p: null,
      // ເຂົ້າສັງກັດ ມຊ
      date_start_nuol: new Date().toISOString().substr(0, 10),
      menu_date_nuol: false,
      format_Date_start_nuol: null,
      // Section_items array
      section_items: ["item1", "item2", "item3"],
      selected_section_Item: null,
      // TypeMember_items array
      typeMember_items: ["item1", "item2", "item3"],
      selected_typeMember_Item: null,
      // educationLevel_items array
      level_items: ["item1", "item2", "item3"],
      selecte_level_Item: null,
      // Blood
      blood_items: ["A", "B", "AB", "O"],
      selecte_blood_Item: null,
      // Status Members
      status_items: ["ສະມາຊິກ", "ຍົກຍ້າຍ", "ພົ້ນກະສ່ຽນ"],
      selecte_status_Item: null,
    };
  },
  watch: {
    date() {
      this.format_Date = this.formatDate(this.date);
    },
    // date younger
    date_y() {
      this.format_Date_y = this.formatDate_y(this.date_y);
    },
    // date women
    date_w() {
      this.format_Date_w = this.formatDate_w(this.date_w);
    },
    // date kammaban
    date_k() {
      this.format_Date_k = this.formatDate_k(this.date_k);
    },
    // ເຂົ້າພັກສຳຮອງ
    date_ps() {
      this.format_Date_ps = this.formatDate_ps(this.date_ps);
    },
    // ເຂົ້າພັກສົມບູນ
    date_p() {
      this.format_Date_p = this.formatDate_p(this.date_p);
    },
    // ເຂົ້າສັງກັດ ມຊ
    date_start_nuol() {
      this.format_Date_start_nuol = this.formatDate_start_nuol(
        this.date_start_nuol
      );
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    //compute younger
    computedformatDate_y() {
      return this.formatDate_y(this.date_y);
    },
    // compute women
    computedformatDate_w() {
      return this.formatDate_w(this.date_w);
    },
    // compute kammaban
    computedformatDate_k() {
      return this.formatDate_k(this.date_k);
    },
    // compute ເຂົ້າພັດສຳຮອງ
    computedformatDate_ps() {
      return this.formatDate_ps(this.date_ps);
    },
    // compute ເຂົ້າພັກສົມບູນ
    computedformatDate_p() {
      return this.formatDate_p(this.date_p);
    },
    // compute ເຂົ້າສັງກັດ ມຊ
    computedformatDate_start_nuol() {
      return this.formatDate_start_nuol(this.date_p);
    },
  },
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
    //
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // Method Young
    formatDate_y(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method women
    formatDate_w(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method kammaban
    formatDate_k(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າພັກສຳຮອງ
    formatDate_ps(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າພັກສົມບູນ
    formatDate_p(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າສັງກັດ ມຊ
    formatDate_start_nuol(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date Young
    parseDate_y(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date women
    parseDate_w(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date kammaban
    parseDate_k(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date ເຂົ້າພັກສຳຮອງ
    parseDate_ps(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date ເຂົ້າພັກສົມບູນ
    parseDate_p(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Date ເຂົ້າສັງກັດ ມຊ
    parseDate_start_nuol(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    // Section Manage Data
    saveData_Members() {
      this.show_alert = true;
      this.$router.push("/Member");
    },

    //Cancel form
    cancelData_member() {
      this.$router.push("/Member");
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
