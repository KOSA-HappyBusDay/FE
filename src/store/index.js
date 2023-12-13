import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    clinicMembers: [],
    token: '',
    isLogin: false,
    memberId: null,
    rooms: [],
    user: { type: '' },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getIsLogin(state) {
      return !!state.isLogin;
    },
    getMemberId(state) {
      return state.memberId;
    },
  },
  mutations: {
    setClinicMembers(state, members) {
      state.clinicMembers = members;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setToken(state, value) {
      state.token = value;
    },
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setMemberId(state, value) {
      state.memberId = value;
    },
    setLogout(state) {
      state.isLogin = false;
      state.memberId = null;
      state.user = { type: '' }; // 로그아웃 시 user 상태 초기화
    },
    reserveDate(state, date) {
      state.reservationDates.push(date);
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
  },
  actions: {
    // 로그인 액션
    async login({ commit }, credentials) {
      try {
        // 로그인 API 호출 등
        // 예: const response = await axios.post('http://example.com/login', credentials);

        // 로그인이 성공하면 memberId를 저장
        const memberId = response.data.memberId;
        commit('setMemberId', memberId);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
  plugins: [createPersistedState({
    paths: ["token", "user", "isLogin", "memberId"]
  })],
});