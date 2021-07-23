//import axios from 'axios'
import jwtInterceptor from "../../shared/jwtInterceptor";

const state = () => ({
  User: [],
  token: null,
});

const getters = {
  getmyUser(state) {
    return state.User;
  },
  token(state) {
    return state.token || localStorage.getItem("accessToken");
  },
};

const actions = {
  async getUser({ commit }, token) {
    var myToken = null;
    if (token) {
      myToken = token;
    } else {
      myToken = localStorage.getItem("accessToken");
    }
    var response = await jwtInterceptor.post(
      "http://localhost:5000/api/v1/auth/profile",
      {
        token: myToken,
      }
    );
    if (response && response.data) {
      commit("setUser", response.data);
    }
  },
  doToken({ commit }, token) {
    commit("setToken", token);
  },
};

const mutations = {
  setUser(state, payload) {
    state.User = payload;
  },
  setToken(state, token) {
    if (token) {
      state.token = token;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
