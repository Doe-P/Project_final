<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="$store.getters.getformAdd_certificate"
          persistent
          :overlay="false"
          max-width="800px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" dark height="45">
              <v-toolbar-title class="text-header">
                ເພີ່ມຂໍ້ມູນການຍ້ອງຍໍ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form class="text-content" v-model="valid">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ລະຫັດໃບຍ້ອງຍໍ"
                        readonly
                        :value="$store.getters.getCustomID"
                        outlined
                        dense
                      >
                      </v-text-field>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="ເລກທີໃບຍ້ອງຍໍ"
                        focusable
                        v-model="txt_certi_NO"
                        :rules="[
                          required('ເລກທີໃບຍ້ອງຍໍ'),
                          minLength('ເລກທີໃບຍ້ອງຍໍ', 3),
                          maxLength('ເລກທີໃບຍ້ອງຍໍ', 20),
                        ]"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="certi_type"
                        v-model="certiType_select"
                        label="ເລືອກປະເພດກິດຈະກຳ"
                        class="text-content pt-6"
                        :rules="[required('ປະເພດກິດຈະກຳ')]"
                        @input="isCertificateType"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-textarea
                        label="ເນື້ອໃນການຍ້ອງຍໍ"
                        rows="2"
                        required
                        v-model="txt_title"
                        class="pt-0"
                        counter="100"
                        :rules="[
                          required('ເນື້ອໃນການຍ້ອງຍໍ'),
                          minLength('ເນື້ອໃນການຍ້ອງຍໍ', 5),
                          maxLength('ເນື້ອໃນການຍ້ອງຍໍ', 100),
                        ]"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :rules="[
                          required('ອອກທີ່'),
                          minLength('ອອກທີ່', 3),
                          maxLength('ອອກທີ່', 50),
                        ]"
                        label="ອອກທີ່"
                        counter="50"
                        v-model="txt_locate"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="Datasign_by"
                        v-model="signBy_select"
                        label="ເລືອກຜູ້ອອກ"
                        :rules="[required('ເລືອກຜູ້ອອກ')]"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu1"
                        v-model="certi_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :rules="[required('ວັນທີອອກ')]"
                            v-model="certi_date_format"
                            label="ວັນທີອອກ"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="
                              certi_date = parseCerti_date(certi_date_format)
                            "
                            v-on="on"
                            readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          class="calendar"
                          ref="picker"
                          v-model="certi_date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          locale="lao"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end btn_text">
              <v-btn text @click="close_dialog" color="error"> ຍົກເລີກ </v-btn>
              <v-btn
                @click.prevent="saveData_Certificate"
                :disabled="!valid"
                color="primary"
              >
                ບັນທືກ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CertificateFormadd",
  data() {
    return {
      // certificate date
      certi_date: new Date().toISOString().substr(0, 10),
      certi_date_menu: false,
      certi_date_format: null,
      certi_type: [],
      mytypeCertificate: null,
      certiType_select: "",
      Datasign_by: [
        "ຂັ້ນເລຂາຄະນະບໍລິຫານງານຊາວໜຸ່ມ ມຊ",
        "ຂັ້ນຄຊປປລ ມຊ",
        "ຂັ້ນຊາວໜຸ່ມກະຊວງສຶກສາ ແລະ ກິລາ",
        "ຂັ້ນສູນກາງຊາວໝຸ່ມ",
      ],
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
      // valid form
      valid: false,
      //------
      txt_certi_NO: null,
      txt_title: null,
      txt_locate: null,
      signBy_select: null,
      get_typeCerti_id: null,
    };
  },

  mounted() {
    this.getMaxID();
    this.typeCertificate();
  },
  watch: {
    certi_date() {
      this.certi_date_format = this.formatCerti_date(this.certi_date);
    },
  },
  computed: {
    CertiDateFormatted() {
      return this.formatCerti_date(this.certi_date);
    },
  },
  methods: {
    // certificate date
    formatCerti_date(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseCerti_date(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // close form
    close_dialog() {
      this.$store.dispatch({
        type: "doClickFormadd_certificate",
        value: false,
      });
    },
    async typeCertificate() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/typecertificate")
          .then((response) => {
            this.mytypeCertificate = response.data;
            for (let i in this.mytypeCertificate) {
              this.certi_type.push(this.mytypeCertificate[i].typeCerti_name);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    isCertificateType() {
      for (let i in this.mytypeCertificate) {
        if (
          String(this.certiType_select).valueOf() ==
          String(this.mytypeCertificate[i].typeCerti_name).valueOf()
        ) {
          this.get_typeCerti_id = this.mytypeCertificate[i].typeCerti_id;
        }
      }
    },
    saveData_Certificate() {
      let Certificate_arr = [
        this.$store.getters.getCustomID,
        this.get_typeCerti_id,
        this.txt_certi_NO,
        this.txt_title,
        this.txt_locate,
        this.certi_date,
        this.signBy_select,
      ];
      this.$store.dispatch({
        type: "doClickAddmember_certificate",
        data: Certificate_arr,
      });
      this.close_dialog();
    },
    async getMaxID() {
      try {
        await axios
          .get(this.$store.getters.myHostname + "/api/v1/getCerti/MaxID")
          .then((response) => {
            const getid = response.data.id;
            this.$store.dispatch({
              type: "doCustomID",
              id: getid,
              str: "G0001",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 18px;
  font-weight: bold;
}
.text-content,
.calendar,
.btn_text {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
