<template>
  <div>
    <h2>병원 회원 리스트</h2>
    <ul>
      <li v-for="(hospital, index) in hospitals" :key="index">
        {{ hospital.clinicName }} - {{ hospital.clinicEmail }} - {{ hospital.address }}
        <button @click="openCreateRoomDialog(hospital)">Create Room</button>
      </li>
    </ul>

    <!-- 채팅방 이름 입력 팝업/모달 -->
    <ChatRoomNameDialog v-if="showCreateRoomDialog" @confirm="createRoom" />
  </div>
</template>

<script>
import axios from 'axios';
import ChatRoomNameDialog from './ChatRoomNameDialog.vue'; // 경로를 실제 컴포넌트 위치에 맞게 수정

export default {
  data() {
    return {
      hospitals: [],
      showCreateRoomDialog: false,
      selectedHospital: null,
    };
  },
  methods: {
    async fetchHospitalList() {
      try {
        const response = await axios.get('http://192.168.0.23:8761/clinic-members/list');
        this.hospitals = response.data;
      } catch (error) {
        console.error('Error fetching hospital list:', error);
      }
    },
    openCreateRoomDialog(hospital) {
      this.selectedHospital = hospital;
      this.showCreateRoomDialog = true;
    },
    createRoom(roomName) {
      if (this.selectedHospital) {
        const roomId = Math.random().toString(36).substring(7);
        const finalRoomName = roomName || `${this.selectedHospital.clinicName} Chat Room`;

        this.$store.commit('addRoom', { id: roomId, name: finalRoomName, messages: [] });

        // 채팅방 생성 후 알림
        alert('채팅방이 생성되었습니다.');

        // 선택한 병원이 없어지도록 초기화
        this.selectedHospital = null;
        this.showCreateRoomDialog = false;

        // 페이지 이동
        this.$router.push("/mypage");
      }
    },
  },
  components: {
    ChatRoomNameDialog,
  },
  mounted() {
    this.fetchHospitalList();
  },
};
</script>