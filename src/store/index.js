import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    token: '',
    isLogin: false,
    user: '', // user 상태 추가
    rooms: [],
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getIsLogin(state) {
      return !!state.isLogin;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null; // 로그아웃 시 user 상태 초기화
    },
    reserveDate(state, date) {
      // 특정 날짜를 예약 상태로 변경
      state.reservationDates.push(date);
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
  },
  plugins: [createPersistedState({
    paths: ["token", "user", "isLogin"]
  })],
});