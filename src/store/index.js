import axios from 'axios';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    clinicMembers: [],
    token: '',
    email: null,
    isClinicMember: false,
    clinicEmail: null,
    isLogin: false,
    clinicMemberId: null,
    memberType: null,
    memberId: null,
    chatRoomId: null,
    rooms: [],
    clinicType: null,
    user: {
      type: '',
    },
    Name: '',
  },
  getters: {
    getClinicEmail(state) {
      return state.clinicEmail;
    },
    getClinicMemberType(state) {
      return state.clinicType;
    },
    getToken(state) {
      return state.token;
    },
    getChatRoomId(state) {
      return state.chatRoomId;
    },
    getIsLogin(state) {
      return !state.isLogin;
    },
    getClinicMemberId(state) {
      return state.clinicMemberId;
    },
    getMemberId(state) {
      return state.memberId;
    },
    getEmail(state) {
      return state.email;
    },
    getName(state) {
      return state.Name;
    },
  },
  mutations: {
    setClinicEmail(state, email) {
      state.clinicEmail = email;
    },
    setIsClinicMember(state, value) {
      console.log('IsClinicMember:', value);
      state.isClinicMember = value;
    },
    setClinicMemberId(state, value) {
      console.log('clinicMemberId:', value);
      state.clinicMemberId = value;
    },
    setClinicMemberType(state, value) {
      console.log('ClinicMemberType', value);
      state.user.type = value;
    },
    setClinicMembers(state, members) {
      console.log('ClinicMembermembers', members);
      state.clinicMembers = members;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setEmail(state, email) {
      state.email = email;
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
      state.user = { type: '' };
    },
    reserveDate(state, date) {
      state.reservationDates.push(date);
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
    setChatRoomId(state, id) {
      console.log(`Updating chatRoomId in Vuex to: ${id}`);
      state.chatRoomId = id;
    },
    setMemberType(state, memberType) {
      state.memberType = memberType;
    },
    setName(state, Name) {
      console.log('Setting Name:', Name);
      state.Name = Name;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://192.168.0.10:8761/auth/login', credentials);
        const memberType = response.data.memberType;
        const memberId = response.data.memberId;
        const ClinicMemberId = response.data.ClinicMemberId;
        const isClinicMember = response.data.isClinicMember;


        commit('setMemberId', memberId);
        commit('setIsClinicMember', isClinicMember);
        commit('setClinicMemberId', ClinicMemberId);
        commit('setClinicMemberType', memberType);

      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async fetchUserNickname({ commit }) {
      try {
        if (this.state.clinicEmail === true){
          const email = this.state.clinicEmail;
        }
        else{
          const email = this.state.email;
        }
        const response = await axios.get(`http://192.168.0.10:8761/auth/member-info?email=${email}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.state.token}`,
          },
        });
        const fetchedUserNickname = response.data.nickname;
        commit('setUserNickname', fetchedUserNickname);
      } catch (error) {
        console.error('사용자 닉네임을 가져오는 중 오류가 발생했습니다:', error);
      }
    },
  },
  plugins: [createPersistedState({
    paths: ["token", "user", "isLogin", "memberId", "clinicMemberId", "chatRoomId", "email", "memberType", "clinicEmail"]
  })],
});