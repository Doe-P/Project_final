<template>
    <div>
         <!-- Dialog confirm delete data -->
      <template>
       <v-row justify="center">
         <v-dialog
          v-model="confirm_dialog"
          persistent
          max-width="400"
          transition="dialog-transition"
        >
         <template>
            <v-card>
            <v-toolbar color="primary" height="45" dark>
              <v-toolbar-title class="header-message">
                <v-icon>info</v-icon>
                ຂໍ້ຄວາມ
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="text-center mt-5 text-message"> ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ຫຼືບໍ່? </v-card-text>
            <v-card-actions class="justify-space-between text-message-btn">
              <v-btn text @click="confirm_dialog = false" color="error"
                >ຍົກເລີກ</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="message_confirm=true">ຕົກລົງ</v-btn>
            </v-card-actions>
          </v-card>
         </template>
        </v-dialog>
       </v-row>
      </template>
      
    </div>
</template>

<script>
export default {
    name: 'Dialogconfirm',
    data() {
        return {
            confirm_dialog:false,
    }
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.header-message,
.text-message-btn {
  font-family: "boonhome-400";
  font-weight: 30px;
}
.text-message{
 font-family: "boonhome-400";
  font-weight: normal;
  font-size: 18px;
}
</style>