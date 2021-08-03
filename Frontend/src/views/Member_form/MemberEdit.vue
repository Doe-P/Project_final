<template>
  <div id="Membercreate">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="8" lg="10">
          <v-card>
            <v-toolbar color="primary" height="45" dark class="mb-5">
              <v-toolbar-title class="text-header-dialog">
                ຟອມແກ້ໄຂຂໍ້ມູນສະມາຊິກ
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
                      type="text"
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
                    <v-radio-group v-model="gender" row>
                      <label>ເພດ:</label>
                      <span class="ml-10"></span>
                      <v-radio
                        label="ຍິງ"
                        value="ຍິງ"
                        name="female"
                        color="primary"
                        required
                      ></v-radio>
                      <v-radio
                        label="ຊາຍ"
                        value="ຊາຍ"
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
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="format_Date"
                            label="ວັນເດືອນປີເກີດ"
                            :rules="[isCheckAge(get_Year)]"
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
                    <v-select
                      label="ເລືອກແຂວງປະຈຸບັນ"
                      :items="myProvince"
                      v-model="txt_bprovince"
                      required
                      :rules="[required('ແຂວງປະຈຸບັນ')]"
                    ></v-select>
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
                    <v-select
                      label="ເລືອກແຂວງປະຈຸບັນ"
                      :items="myProvince"
                      v-model="txt_nprovince"
                      required
                      :rules="[required('ແຂວງປະຈຸບັນ')]"
                    ></v-select>
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
                        max-width="290px"
                        min-width="auto"
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
                        max-width="290px"
                        min-width="auto"
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
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-show="gender == 'ຍິງ'"
                            v-model="format_Date_w"
                            label="ວັນເດືອນປີເຂົ້າແມ່ຍິງ"
                            :rules="[
                              isChecked('ວັນເດືອນປີເຂົ້າແມ່ຍິງ', gender),
                            ]"
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
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <span class="sub-text">ອົງການຈັດຕັ້ງອື່ນ</span>
                    <v-checkbox
                      label="ກຳມະບານ"
                      v-model="isKamaban"
                      value="ກຳມະບານ"
                    ></v-checkbox>
                    <template>
                      <v-menu
                        ref="menu_k"
                        v-model="menu_k"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-show="isKamaban == 'ກຳມະບານ'"
                            v-model="format_Date_k"
                            :rules="[
                              isChecked('ວັນເດືອນປີເຂົ້າກຳມະບານ', isKamaban),
                            ]"
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
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <v-checkbox
                      label="ສັງກັດພັກ(ສຳຮອງ)"
                      v-model="isParty_reserve"
                      value="ສັງກັດພັກສຳຮອງ"
                    ></v-checkbox>
                    <template>
                      <v-menu
                        ref="menu_ps"
                        v-model="menu_ps"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-show="isParty_reserve == 'ສັງກັດພັກສຳຮອງ'"
                            v-model="format_Date_ps"
                            :rules="[
                              isChecked(
                                'ວັນເດືອນປີເຂົ້າພັກສຳຮອງ',
                                isParty_reserve
                              ),
                            ]"
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
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <v-checkbox
                      label="ສັງກັດພັກ(ສົມບູນ)"
                      v-model="isParty_full"
                      value="ສັງກັດພັກສົມບູນ"
                      v-show="isParty_reserve == 'ສັງກັດພັກສຳຮອງ'"
                    ></v-checkbox>
                    <template>
                      <v-menu
                        ref="menu_p"
                        v-model="menu_p"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-show="isParty_full == 'ສັງກັດພັກສົມບູນ'"
                            v-model="format_Date_p"
                            :rules="[
                              isChecked(
                                'ວັນເດືອນປີເຂົ້າພັກສົມບູນ',
                                isParty_full
                              ),
                            ]"
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
                      :items="unit_items"
                      :rules="[required('ໜ່ວຍ')]"
                      v-model="selected_unit_Item"
                      label="ເລືອກໜ່ວຍ"
                      dense
                      @input="get_unit"
                    ></v-select>
                    <v-select
                      class="combo_select my-5"
                      :items="section_items"
                      :rules="[required('ຈຸ')]"
                      v-model="selected_section_Item"
                      label="ເລືອກຈຸ"
                      dense
                      @input="get_sectionID"
                    ></v-select>
                    <v-select
                      class="my-5"
                      :items="typeMember_items"
                      :rules="[required('ປະເພດສະມາຊິກ')]"
                      v-model="selected_typeMember_Item"
                      label="ເລືອກປະເພດສະມາຊິກ"
                      dense
                      @input="get_item_typemember"
                    ></v-select>
                    <v-select
                      class="my-5"
                      :items="level_items"
                      :rules="[required('ລະດັບການສືກສາ')]"
                      v-model="selecte_level_Item"
                      label="ເລືອກລະດັບການສືກສາ"
                      dense
                      @input="get_item_educationlevel"
                    ></v-select>
                    <v-select
                      :items="reponsibles"
                      v-model="select_reponsible"
                      label="ໜ້າທີ່ຮັບຜິດຊອບ"
                      :rules="[required('ໜ້າທີ່ຮັບຜິດຊອບ')]"
                    ></v-select>
                    <span class="sub-text"
                      >ພາສາຕ່າງປະເທດທີ່ອ່ານ ແລະ ຂຽນໄດ້ດີ</span
                    >
                    <v-combobox
                      v-model="language_selected"
                      :items="items"
                      chips
                      clearable
                      label="ເລືອກພາສາ"
                      multiple
                      solo
                      :rules="[required('ພາສາ')]"
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
                    </v-combobox>
                    <v-select
                      :items="blood_items"
                      :rules="[required('ໝວດເລືອດ')]"
                      label="ໝວດເລືອດ"
                      dense
                      v-model="selected_blood_Item"
                    ></v-select>
                    <v-select
                      :items="myStatus"
                      v-model="member_status"
                      label="ເລືອກສະຖານະ"
                      :rules="[required('ສະຖານະ')]"
                    ></v-select>
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
                    <v-btn @click="cancelData_member" color="error" dark
                      >ຍົກເລີກ</v-btn
                    >
                    <v-btn type="submit" :disabled="!valid" color="primary"
                      >ບັນທຶກ</v-btn
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
      myStatus: ["ສະມາຊິກ", "ພົ້ນກະສຽນ", "ຍົກຍ້າຍ"],
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
      isChecked(propertyType, condition) {
        if (condition == "ຍິງ") {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        } else if (condition == "ກຳມະບານ") {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        } else if (condition == "ສັງກັດພັກສຳຮອງ") {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        } else if (condition == "ສັງກັດພັກສົມບູນ") {
          return (v) =>
            (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
        } else {
          console.log("validate text on member create form err");
        }
      },
      isCheckAge(birthdate) {
        var d = new Date();
        var y = d.getFullYear();
        var age = y - birthdate;
        if (birthdate) {
          if (age >= 35) {
            return `ອາຍຸຂອງສະມາຊິກຫຼາຍກວ່າ 34 ອາຍຸຕ້ອງຢູ່ລະຫວ່າງ 15-34`;
          } else if (age < 15) {
            return `ອາຍຸຂອງສະມາຊິກໜ້ອຍກວ່າ  15 ອາຍຸຕ້ອງຢູ່ລະຫວ່າງ 15-34`;
          }
        }
      },
      // valid form
      valid: true,
      reponsibles: ["ນັກສຶກສາ", "ອາຈານ"],
      member_status: "",
      get_Year: null,
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
      myProvince: [
        "ນະຄອນຫຼວງວຽງຈັນ",
        "ບໍລິຄຳໄຊ",
        "ຄຳມ່ວນ",
        "ສະຫວັນນະເຂດ",
        "ຈຳປາສັກ",
        "ສາລະວັນ",
        "ເຊກອງ",
        "ອັດຕະປື",
        "ວຽງຈັນ",
        "ໄຊຍະບູລີ",
        "ໄຊສົມບູນ",
        "ຫຼວງນ້ຳທາ",
        "ຫຼວງພະບາງ",
        "ຫົວພັນ",
        "ບໍ່ແກ້ວ",
        "ຊຽງຂວາງ",
        "ຜົ້ງສາລີ",
      ],

      selecte_status_Item: null,
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
    };
  },
  mounted() {
    this.getUnit_items();
    this.get_TypeMember_selection();
    this.get_educationLevel();
    this.getMember_byID();
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
      this.birthdate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      this.get_Year = parseInt(year);
      return `${day}-${month}-${year}`;
    },
    // Method Young
    formatDate_y(date) {
      if (!date) return null;
      this.youthdate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method women
    formatDate_w(date) {
      if (!date) return null;
      this.womendate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method kammaban
    formatDate_k(date) {
      if (!date) return null;
      this.kamabandate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າພັກສຳຮອງ
    formatDate_ps(date) {
      if (!date) return null;
      this.psdate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າພັກສົມບູນ
    formatDate_p(date) {
      if (!date) return null;
      this.pdate_format = dateformat(date, "yyyy-mm-dd");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    // method ເຂົ້າສັງກັດ ມຊ
    formatDate_start_nuol(date) {
      if (!date) return null;
      this.startnuol_format = dateformat(date, "yyyy-mm-dd");
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
    async UpdateData_Members() {
      try {
        if (
          this.txt_Membername &&
          this.txt_surname &&
          this.gender &&
          this.txt_tel &&
          this.birthdate_format &&
          this.txt_bvillage &&
          this.txt_bdistrict &&
          this.txt_bprovince &&
          this.txt_nvillage &&
          this.txt_ndistrict &&
          this.txt_nprovince &&
          this.txt_nation &&
          this.txt_ethnic &&
          this.select_riligion &&
          this.format_Date_y &&
          this.startnuol_format &&
          this.selected_section_Item &&
          this.selected_typeMember_Item &&
          this.selecte_level_Item &&
          this.select_reponsible &&
          this.language_selected &&
          this.selected_blood_Item &&
          this.member_status
        ) {
          if (String(this.gender).valueOf() == "ຍິງ" && this.format_Date_w) {
            await axios
              .put(
                `${this.$store.getters.myHostname}/api/v1/members/${this.member_id}`,
                {
                  member_name: this.txt_Membername,
                  surname: this.txt_surname,
                  gender: this.gender,
                  birthday: this.birthdate_format,
                  bvillage: this.txt_bvillage,
                  bdistrict: this.txt_bdistrict,
                  bprovince: this.txt_bprovince,
                  nvillage: this.txt_nvillage,
                  ndistrict: this.txt_ndistrict,
                  nprovince: this.txt_nprovince,
                  nation: this.txt_nation,
                  ethnic: this.txt_ethnic,
                  religion: this.select_riligion,
                  tell: parseInt(this.txt_tel),
                  date_Y: this.youthdate_format,
                  date_W: this.womendate_format,
                  date_K: this.kamabandate_format,
                  date_PS: this.psdate_format,
                  date_P: this.pdate_format,
                  sect_id: this.getSect_id,
                  typemember_id: this.get_membertype_id,
                  level_id: this.get_eduLevel_id,
                  responsible: this.select_reponsible,
                  language: this.language_selected.toString(),
                  blood: this.selected_blood_Item,
                  date_start: this.startnuol_format,
                  status: this.member_status,
                }
              )
              .then(() => {
                this.cancelData_member();
                this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
              });
          } else {
            await axios
              .put(
                `${this.$store.getters.myHostname}/api/v1/members/${this.member_id}`,
                {
                  member_name: this.txt_Membername,
                  surname: this.txt_surname,
                  gender: this.gender,
                  birthday: this.birthdate_format,
                  bvillage: this.txt_bvillage,
                  bdistrict: this.txt_bdistrict,
                  bprovince: this.txt_bprovince,
                  nvillage: this.txt_nvillage,
                  ndistrict: this.txt_ndistrict,
                  nprovince: this.txt_nprovince,
                  nation: this.txt_nation,
                  ethnic: this.txt_ethnic,
                  religion: this.select_riligion,
                  tell: parseInt(this.txt_tel),
                  date_Y: this.youthdate_format,
                  date_K: this.kamabandate_format,
                  date_PS: this.psdate_format,
                  date_P: this.pdate_format,
                  sect_id: this.getSect_id,
                  typemember_id: this.get_membertype_id,
                  level_id: this.get_eduLevel_id,
                  responsible: this.select_reponsible,
                  language: this.language_selected.toString(),
                  blood: this.selected_blood_Item,
                  date_start: this.startnuol_format,
                  status: this.member_status,
                }
              )
              .then(() => {
                this.cancelData_member();
                this.Msg_done("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
              });
          }
        } else {
          this.Msg_fail("ຂໍ້ມູນສະມາຊິກບໍ່ຄົບຖ້ວນ ກະລຸນາກວດສອບຄືນໃໝ່");
        }
      } catch (err) {
        this.cancelData_member();
        this.Msg_fail("ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ");
        console.log(err);
      }
    },

    //Cancel form
    cancelData_member() {
      this.$router.push("/Member");
    },
    // message done
    Msg_done(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "success",
        micon: "check_circle",
        message: text,
      });
    },
    //message fail
    Msg_fail(text) {
      // Message show
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: true,
        mcolor: "error",
        micon: "error",
        message: text,
      });
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
    //get id member type
    async get_item_typemember() {
      for (let i = 0; i <= this.typeMember_item_All.length; i++) {
        if (
          String(this.selected_typeMember_Item).valueOf() ==
          String(this.typeMember_item_All[i].typemember).valueOf()
        ) {
          this.get_membertype_id = this.typeMember_item_All[i].typemember_id;
        }
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
    get_item_educationlevel() {
      for (let i = 0; i <= this.level_item_All.length; i++) {
        if (
          String(this.selecte_level_Item).valueOf() ==
          String(this.level_item_All[i].level_name).valueOf()
        ) {
          this.get_eduLevel_id = this.level_item_All[i].level_id;
        }
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
    async get_sectionID() {
      for (let i = 0; i <= this.section_items_all.length; i++) {
        if (
          String(this.selected_section_Item).valueOf() ==
          String(this.section_items_all[i].sect_name).valueOf()
        ) {
          this.getSect_id = this.section_items_all[i].sect_id;
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
      try {
        await axios
          .get(
            `${this.$store.getters.myHostname}/api/v1/members/${this.$route.params.member_edit}`
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
            this.member_status = response.data.status;
            this.select_reponsible = response.data.responsible;
            this.language_selected = response.data.language.split(",");
            this.selected_blood_Item = response.data.blood;
            this.getTypeMember_item(
              response.data.typemember_id,
              response.data.level_id
            );
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
      this.getSect_selected(get_item_sect);
    },
    remove(item) {
      if (this.language_selected.length >= 2) {
        this.language_selected.splice(this.language_selected.indexOf(item), 1);
        this.language_selected = [...this.language_selected];
      }
    },
    //get member type item selected
    getTypeMember_item(membertypeid, level_id) {
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
        this.getEdulevel_item(level_id);
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
