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
    found_form_edit: {
      id: null,
      name: null,
      date: null,
      status: null,
      isShow: false,
    },
    // section form add
    sect_form_add: false,
    // section form edit
    sect_form_edit: {
      isShow: false,
      id: "",
      name: "",
    },
    // unit form add
    unit_form_add: false,
    // unit form edit
    unit_form_edit: {
      isShow: false,
      id: "",
    },
    // member type form add
    memberType_form_add: false,
    // member type form edit
    memberType_form_edit: {
      isShow: false,
      id: "",
    },
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
      member_age:"",
    },
    //retirement member view
    myData_retireEdit: {
      showForm: false,
      retire_id: "",
    },
    // member move
    moveFormadd: false,
    moveFormEdit:{
      val:false,
      id:"",
    },
    // form add certificate
    formAdd_certificate: false,
    //form add member certificate
    addMember_certificate: false,
    // form edit certificate
    formEdit_certificate: false,
    //auto id
    custom_id: null,
    get_users: {
      user_name: "",
      user_status: "",
      user_foundation: "",
    },
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
    //member move
    getmoveFormEdit(state) {
      return state.moveFormEdit;
    },
    //Retirement
    getmyData_retire(state) {
      return state.myData_retire;
    },
     //Retirement view
     getmyData_retireEdit(state) {
      return state.myData_retireEdit;
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
    //get data user
    getData_user(state) {
      return state.get_users;
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
    setfound_formEdit(state, data) {
      if (state.found_form_edit.isShow == true) {
        state.found_form_edit.isShow = false;
        state.found_form_edit.id = null;
        state.found_form_edit.name = null;
        state.found_form_edit.date = null;
        state.found_form_edit.status = null;
      } else {
        state.found_form_edit.isShow = true;
        state.found_form_edit.id = data.id;
        state.found_form_edit.name = data.name;
        state.found_form_edit.date = data.date;
        state.found_form_edit.status = data.status;
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
    setSect_formEdit(state, data) {
      if (state.sect_form_edit.isShow == true) {
        state.sect_form_edit.isShow = false;
        state.sect_form_edit.id = "";
        state.sect_form_edit.name = "";
      } else {
        state.sect_form_edit.isShow = true;
        state.sect_form_edit.id = data.id;
        state.sect_form_edit.name = data.name;
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
    setUnit_formEdit(state, data) {
      if (state.unit_form_edit.isShow == true) {
        state.unit_form_edit.isShow = false;
        state.unit_form_edit.id = "";
      } else {
        state.unit_form_edit.isShow = true;
        state.unit_form_edit.id = data;
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
    setmemType_formEdit(state, id) {
      if (state.memberType_form_edit.isShow == true) {
        state.memberType_form_edit.isShow = false;
        state.memberType_form_edit.id = "";
      } else {
        state.memberType_form_edit.isShow = true;
        state.memberType_form_edit.id = id;
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
      if(data){
        state.myData_retire.showForm = data.showForm;
        state.myData_retire.member_id = data.member_id;
        state.myData_retire.member_name = data.member_name;
        state.myData_retire.member_surname = data.member_surname;
        state.myData_retire.member_age=data.member_age;
      }else{
        console.log("not found in"+data.toString());
      }
    },
    // Retirement
    setMyData_retireEdit(state, data) {
      if(data){
        state.myData_retireEdit.showForm = data.showForm;
        state.myData_retireEdit.retire_id = data.retire_id;
      }else{
        console.log("not found in"+data.toString());
      }
    },
    // member move form add
    setmoveFormadd(state, val) {
      state.moveFormadd = val;
    },
    setmoveFormEdit(state, data) {
      if(data.val&&data.move_id){
        state.moveFormEdit.val=data.val;
        state.moveFormEdit.id=data.move_id;
      }else{
        state.moveFormEdit.val=false;
        state.moveFormEdit.id="";
      }
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
        var split_getID = getID.split("-");
        let strid = split_getID[0].substr(1, split_getID[0].toString().length);
        var conID = parseInt(strid) + 1;
        switch (conID.toString().length) {
          case 1:
            state.custom_id =
              split_getID[0].substring(
                0,
                split_getID[0].length - conID.toString().length
              ) +
              conID +
              "-" +
              datefor;
            break;
          case 2:
            state.custom_id =
              split_getID[0].substring(
                0,
                split_getID[0].length - conID.toString().length
              ) +
              conID +
              "-" +
              datefor;
            break;
          case 3:
            state.custom_id =
              split_getID[0].substring(
                0,
                split_getID[0].length - conID.toString().length
              ) +
              conID +
              "-" +
              datefor;
            break;
          case 4:
            state.custom_id =
              getID.substring(0, getID.length - conID.toString().length) +
              conID +
              "-" +
              datefor;
            break;
          default:
            state.custom_id =
              split_getID[0].substring(
                0,
                split_getID[0].length - conID.toString().length
              ) +
              conID +
              "-" +
              datefor;
            break;
        }
      } else {
        state.custom_id = getstr + "-" + datefor;
      }
    },
    set_users(state, data) {
      if(data){
        state.get_users.user_name = data.username;
      state.get_users.user_status = data.userstatus;
      state.get_users.user_foundation = data.foundation;
      }else{
        state.get_users.user_name = "";
      state.get_users.user_status = "";
      state.get_users.user_foundation = "";
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
    clickShow_found_formEdit({ commit }, { id, name, date, status }) {
      commit("setfound_formEdit", { id, name, date, status });
    },
    // section form add action
    clickShow_sect_formAdd({ commit }) {
      commit("setSect_formAdd");
    },
    // section form edit action
    clickShow_sect_formEdit({ commit }, { id, name }) {
      commit("setSect_formEdit", { id, name });
    },
    // unit form edit action
    clickShow_unit_formAdd({ commit }) {
      commit("setUnit_formAdd");
    },
    // unit form edit action
    clickShow_unit_formEdit({ commit }, { id }) {
      commit("setUnit_formEdit", id);
    },
    // member type form edit action
    clickShow_memType_formAdd({ commit }) {
      commit("setmemType_formAdd");
    },
    // member type form edit action
    clickShow_memType_formEdit({ commit }, { id }) {
      commit("setmemType_formEdit", id);
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
      { showForm, member_id, member_name, member_surname,member_age }
    ) {
      commit("setMyData_retire", {
        showForm,
        member_id,
        member_name,
        member_surname,
        member_age
      });
    },
    doClick_retireEdit({ commit },{ showForm, retire_id}) {
      commit("setMyData_retireEdit", {showForm,retire_id});
    },
    doClickmoveFormadd({ commit }, { val }) {
      commit("setmoveFormadd", val);
    },
    doClickmoveFormEdit({ commit }, { val,move_id }) {
      commit("setmoveFormEdit", {val,move_id});
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
    // get users
    doget_users({ commit }, { username, userstatus, foundation }) {
      commit("set_users", { username, userstatus, foundation });
    },
  },

  modules: {},
});
