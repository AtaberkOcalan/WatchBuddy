<template>
  <div class="chat-container">
    <div class="messages">
      <transition-group name="message-animation" tag="div">
        <div v-for="(msg, index) in chatMessages" :key="index" :class="['message', msg.type]">
          <img v-if="msg.photoURL" :src="msg.photoURL" alt="User Photo" class="user-photo" />
          <div class="message-content">
            <div class="username">{{ msg.username }}</div>
            <div class="text">{{ msg.text }}</div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="input-container">
      <input type="text" placeholder="Mesajınızı yazın..." v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Gönder</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore";
import WebRTCHandler from "../../utils/webrtc.js";

export default {
  data() {
    return {
      message: "",
      chatMessages: [],
      webrtcHandler: new WebRTCHandler(),
    };
  },
  mounted() {
    this.webrtcHandler.initPeer();
    this.webrtcHandler.roomStore.chatMessages = this.chatMessages;
  },
  methods: {
    sendMessage() {
      const userStore = useUserStore();
      if (this.message.trim()) {
        const newMessage = {
          username: userStore.user.username,
          text: this.message.trim(),
          photoURL: userStore.user.photoURL,
          type: "sent",
        };

        this.chatMessages.push(newMessage);
        this.webrtcHandler.sendMessage("chat", newMessage);
        this.message = "";
      }
    },
  },
};
</script>


<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 62.5vh;
  border-left: 1px solid gray;
  color: white;
  padding: 10px;
  overflow: hidden;
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin: 10px 0;
  padding: 6px;
  border-radius: 10px;
  word-wrap: break-word;
  position: relative;
  align-items: center;
  animation: slide-up 0.5s ease-out;
  display: flex;
  gap: 10px;
}

.message.sent {
  background-color: #7e5400;
  color: white;
  align-self: flex-end;
}

.message.received {
  background-color: #302000;
  align-self: flex-end;
  flex-direction: row;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
}

.text {
  font-size: 0.9rem;
  color: rgb(255, 244, 223);
}

.user-photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
}

.input-container {
  display: flex;
  gap: 10px;
  width: 99%;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4e3400;
  color: white;
}

input:focus {
  outline: none;
}

button {
  padding: 10px 15px;
  background-color: #4e3400;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease all;
}

button:hover {
  background-color: #754e00;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.message-animation-enter-active {
  transition: transform 0.5s, opacity 0.5s;
}

.message-animation-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.message-animation-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>