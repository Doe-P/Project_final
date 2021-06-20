import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMenu: false,
    islogin: false,
    // foundation form add
    found_form_add: false,
    // foundation form edit
    found_form_edit: false,
    // section form add
    sect_form_add: false,
    // section form edit
    sect_form_edit: false,
    // unit form add
    unit_form_add: false,
    // unit form edit
    unit_form_edit: false,
    // member type form add
    memberType_form_add: false,
    // member type form edit
    memberType_form_edit: false,
    // activity form add
    act_formAdd: false,
    // activity form edit
    act_formEdit: false,
    //Message Box
    myMessage: {
      mShow: false,
      mColor: "",
      mIcon: "",
      Message: "",
    },
    //retirement member
    myData_retire: {
      showForm: false,
      member_id: "",
      member_name: "",
      member_surname: "",
    },
    // member move
    moveFormadd: false,
    // form add certificate
    formAdd_certificate: false,
    //form add member certificate
    addMember_certificate: false,
    // form edit certificate
    formEdit_certificate: false,
    //auto id
    custom_id: null,
  },
  getters: {
    //get auto id
    getCustomID(state) {
      return state.custom_id;
    },
    //form add members certificate
    getaddMember_certificate(state) {
      return state.addMember_certificate;
    },
    // form add certificate
    getformAdd_certificate(state) {
      return state.formAdd_certificate;
    },
    // form edit certificate
    getformEdit_certificate(state) {
      return state.formEdit_certificate;
    },
    //member move
    getmoveFormadd(state) {
      return state.moveFormadd;
    },
    //Retirement
    getmyData_retire(state) {
      return state.myData_retire;
    },
    //Message
    getmyMessage(state) {
      return state.myMessage;
    },
    getShowmenu(state) {
      return state.showMenu;
    },
    getLogin(state) {
      return state.islogin;
    },
    //get value for show foundation form add
    getfound_formAdd(state) {
      return state.found_form_add;
    },
    //get value for show foundation form edit
    getfound_formEdit(state) {
      return state.found_form_edit;
    },
    //get value for show section form add
    getsect_formAdd(state) {
      return state.sect_form_add;
    },
    //get value for show section form edit
    getsect_formEdit(state) {
      return state.sect_form_edit;
    },
    //get value for show unit form add
    getunit_formAdd(state) {
      return state.unit_form_add;
    },
    //get value for show unit form edit
    getunit_formEdit(state) {
      return state.unit_form_edit;
    },
    // get value for show member type form add
    getMemberType_formAdd(state) {
      return state.memberType_form_add;
    },
    // get value for show member type form edit
    getMemberType_formEdit(state) {
      return state.memberType_form_edit;
    },
    // get value from form add
    getAct_formAdd(state) {
      return state.act_formAdd;
    },
    // get value from form edit
    getAct_formEdit(state) {
      return state.act_formEdit;
    },
  },
  mutations: {
    setShowmenu(state) {
      if (state.showMenu == true) {
        state.showMenu = false;
      } else {
        state.showMenu = true;
      }
    },
    setLogin(state, value) {
      state.islogin = value;
    },

    //set value for show foundation form add
    setfound_formAdd(state) {
      if (state.found_form_add == true) {
        state.found_form_add = false;
      } else {
        state.found_form_add = true;
      }
    },
    //set value for show foundation form edit
    setfound_formEdit(state) {
      if (state.found_form_edit == true) {
        state.found_form_edit = false;
      } else {
        state.found_form_edit = true;
      }
    },
    // set value for section form add
    setSect_formAdd(state) {
      if (state.sect_form_add == true) {
        state.sect_form_add = false;
      } else {
        state.sect_form_add = true;
      }
    },
    // set value for section form edit
    setSect_formEdit(state) {
      if (state.sect_form_edit == true) {
        state.sect_form_edit = false;
      } else {
        state.sect_form_edit = true;
      }
    },
    // set value for unit form edit
    setUnit_formAdd(state) {
      if (state.unit_form_add == true) {
        state.unit_form_add = false;
      } else {
        state.unit_form_add = true;
      }
    },
    // set value for unit form edit
    setUnit_formEdit(state) {
      if (state.unit_form_edit == true) {
        state.unit_form_edit = false;
      } else {
        state.unit_form_edit = true;
      }
    },
    // set value for member type form edit
    setmemType_formAdd(state) {
      if (state.memberType_form_add == true) {
        state.memberType_form_add = false;
      } else {
        state.memberType_form_add = true;
      }
    },
    // set value for unit form edit
    setmemType_formEdit(state) {
      if (state.memberType_form_edit == true) {
        state.memberType_form_edit = false;
      } else {
        state.memberType_form_edit = true;
      }
    },
    // set value for activity form add
    setAct_formAdd(state) {
      if (state.act_formAdd == true) {
        state.act_formAdd = false;
      } else {
        state.act_formAdd = true;
      }
    },
    // set value for activity form edit
    setAct_formEdit(state) {
      if (state.act_formEdit == true) {
        state.act_formEdit = false;
      } else {
        state.act_formEdit = true;
      }
    },
    //Message
    setmyMessage(state, data) {
      state.myMessage.mShow = data.mshow;
      state.myMessage.mColor = data.mcolor;
      state.myMessage.mIcon = data.micon;
      state.myMessage.Message = data.message;
    },
    // Retirement
    setMyData_retire(state, data) {
      state.myData_retire.showForm = data.showForm;
      state.myData_retire.member_id = data.member_id;
      state.myData_retire.member_name = data.member_name;
      state.myData_retire.member_surname = data.member_surname;
    },
    // member move form add
    setmoveFormadd(state, val) {
      state.moveFormadd = val;
    },
    //form add certificate
    setformAdd_certificate(state, value) {
      state.formAdd_certificate = value;
    },
    //form edit certificate
    setformEdit_certificate(state, value) {
      state.formEdit_certificate = value;
    },
    //form add members certificate
    setaddMember_certificate(state, value) {
      state.addMember_certificate = value;
    },
    // set value for  customID
    setCustomID(state, values) {
      state.custom_id = null;
      let getstr = values.str;
      let getID = values.id;
      var now = Date.now();
      var datefor = moment(now).format("DDMMYYYY");
      if (getID) {
        let myID = getID.substr(1, getID.length);
        var conID = parseInt(myID) + 1;
        switch (conID.toString().length) {
          case 1:
            state.custom_id = getID.substring(0, getID.length-conID.toString().length) + conID + "/" + datefor;
            break;
          case 2:
            state.custom_id = getID.substring(0, getID.length-conID.toString().length) + conID + "/" + datefor;
            break;
          case 3:
            state.custom_id = getID.substring(0, getID.length-conID.toString().length) + conID + "/" + datefor;
            break;
          case 4:
            state.custom_id = getID.substring(0, getID.length-conID.toString().length) + conID + "/" + datefor;
            break;
          default:
            state.custom_id = getID.substring(0, getID.length-conID.toString().length) + conID + "/" + datefor;
            break;
        }
      } else {
        state.custom_id = getstr + "/" + datefor;
      }
    },
  },
  actions: {
    doClickshow({ commit }) {
      commit("setShowmenu");
    },
    doLogin({ commit }, { status }) {
      commit("setLogin", status);
    },
    restoreLogin({ commit }) {
      commit("setLogin", true);
    },
    // action for foundation form add
    clickShow_found_formAdd({ commit }) {
      commit("setfound_formAdd");
    },
    // action for foundation form edit
    clickShow_found_formEdit({ commit }) {
      commit("setfound_formEdit");
    },
    // section form add action
    clickShow_sect_formAdd({ commit }) {
      commit("setSect_formAdd");
    },
    // section form edit action
    clickShow_sect_formEdit({ commit }) {
      commit("setSect_formEdit");
    },
    // unit form edit action
    clickShow_unit_formAdd({ commit }) {
      commit("setUnit_formAdd");
    },
    // unit form edit action
    clickShow_unit_formEdit({ commit }) {
      commit("setUnit_formEdit");
    },
    // member type form edit action
    clickShow_memType_formAdd({ commit }) {
      commit("setmemType_formAdd");
    },
    // member type form edit action
    clickShow_memType_formEdit({ commit }) {
      commit("setmemType_formEdit");
    },
    // Activity form add action
    clickShow_act_formAdd({ commit }) {
      commit("setAct_formAdd");
    },
    // Activity form edit action
    clickShow_act_formEdit({ commit }) {
      commit("setAct_formEdit");
    },
    //message box
    doClick_myMsg({ commit }, { mshow, mcolor, micon, message }) {
      commit("setmyMessage", { mshow, mcolor, micon, message });
    },
    doClick_retire(
      { commit },
      { showForm, member_id, member_name, member_surname }
    ) {
      commit("setMyData_retire", {
        showForm,
        member_id,
        member_name,
        member_surname,
      });
    },
    doClickmoveFormadd({ commit }, { val }) {
      commit("setmoveFormadd", val);
    },
    doClickFormadd_certificate({ commit }, { value }) {
      commit("setformAdd_certificate", value);
    },
    doClickFormedit_certificate({ commit }, { value }) {
      commit("setformEdit_certificate", value);
    },
    doClickAddmember_certificate({ commit }, { value }) {
      commit("setaddMember_certificate", value);
    },
    // action customid
    doCustomID({ commit }, { id, str }) {
      commit("setCustomID", { id, str });
    },
  },
  modules: {},
});
