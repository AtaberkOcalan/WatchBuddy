<template>
  <div class="main">
    <loadingScreen v-if="loading" :roomTitle="roomTitle" :correctPassword="roomPassword"
      :onPasswordValidated="handlePasswordValidation" />
    <div v-else>
      <div class="header">
        <liveHeader />
      </div>
      <div class="middle">
        <div class="input">
          <div v-if="!isHost || hasVideos">
            <videoVue />
          </div>
          <div v-else>
            <selectPlatform />
          </div>
        </div>
        <div class="panel">
          <div class="option">
            <live-option />
          </div>
          <div class="chat">
            <live-chat :webrtcHandler="webrtcHandler" :messages="chatMessages" />
          </div>
        </div>
      </div>
      <div class="footer">
        <liveFooter />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoomStore } from "../stores/roomStore";
import { useUserStore } from "../stores/userStore";
import loadingScreen from "../components/liveRoom/loadingScreen.vue";
import liveHeader from "../components/liveRoom/liveHeader.vue";
import selectPlatform from "../components/liveRoom/liveSelect.vue";
import videoVue from "../components/liveRoom/video/video.vue";
import liveFooter from "../components/liveRoom/liveFooter.vue";
import liveOption from "../components/liveRoom/liveOption.vue";
import liveChat from "../components/liveRoom/liveChat.vue";
import WebRTCHandler from "../utils/webrtc";
import { computed, watch } from "vue";

export default {
  components: {
    loadingScreen,
    liveHeader,
    liveFooter,
    liveOption,
    liveChat,
    selectPlatform,
    videoVue,
  },
  data() {
    return {
      roomID: null,
      roomTitle: null,
      roomPassword: null,
      loading: true,
      webrtcHandler: new WebRTCHandler(),
      chatMessages: [],
      hasVideos: false,
    };
  },
  setup() {
    const roomStore = useRoomStore();
    const userStore = useUserStore();
    const isHost = computed(() => roomStore.isHost(userStore.user?.id));
    const hasVideos = computed(() => roomStore.videos.length > 0);

    watch(() => roomStore.videos, (newVideos) => {
      console.log("roomStore.videos değişti:", newVideos);
    });
    return {
      roomStore,
      userStore,
      isHost,
      hasVideos,
    };
  },
  async mounted() {
    const roomStore = useRoomStore();
    this.roomID = new URLSearchParams(window.location.search).get("roomID");
    if (this.roomID) {
      try {
        await roomStore.reset();
        await roomStore.loadRoomData(this.roomID);
        this.roomTitle = roomStore.roomTitle;
        this.roomPassword = roomStore.password;
      } catch (error) {
        console.error("Odaya katılma hatası:", error);
      }
    } else {
      console.error("Geçersiz oda ID'si");
    }
  },
  methods: {
    async handlePasswordValidation() {
      const roomStore = useRoomStore();
      const userStore = useUserStore();
      if (!userStore.user || !userStore.user.id) {
        console.error("Kullanıcı bilgileri eksik veya giriş yapılmamış.");
        return;
      }
      try {
        roomStore.startRoomListener(this.roomID);
        await roomStore.addUserToRoom(this.roomID, userStore.user);
        this.webrtcHandler.initPeer();
        this.loading = false;
      } catch (error) {
        console.error("Kullanıcı eklenirken hata:", error);
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.main {
  display: flex;
  flex-direction: column;
}

.middle {
  display: flex;
  flex-direction: row;
  background-color: #0f0f0f;
  height: 78vh;
}

.input {
  width: 80%;
  background-color: #0f0f0f;

}

.panel {
  height: 78vh;
  width: 20%;
  display: flex;
  flex-direction: column;
  background-color: #0f0f0f;
}
</style>
