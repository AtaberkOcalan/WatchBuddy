<template>
  <div class="friend-request" v-if="formattedFriendRequests.length > 0">
    <div>
      <div v-for="(request, index) in formattedFriendRequests" :key="index" class="friend-request-item">
        <img :src="request.photoURL || 'https://via.placeholder.com/50'" alt="User Photo" class="friend-photo" />
        <span>{{ request.username }}</span>
        <v-icon name="fc-ok" @click="acceptFriendRequest(request.id)" class="accept"/>
        <v-icon name="bi-x-circle-fill" @click="rejectFriendRequest(request.id)" class="reject" />
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../../../stores/userStore';

export default {
  computed: {
    formattedFriendRequests() {
      const userStore = useUserStore();
      const friendRequests = userStore.getFriendRequests;

      return Object.keys(friendRequests).map(uid => {
        return {
          id: uid,
          username: friendRequests[uid].username,
          photoURL: friendRequests[uid].photoURL,
          roomID: friendRequests[uid].roomID
        };
      });
    }
  },
  methods: {
    async acceptFriendRequest(friendId) {
      const userStore = useUserStore();
      try {
        await userStore.acceptFriendRequest(friendId); 
        console.log("Arkadaşlık isteği başarıyla kabul edildi.");
      } catch (error) {
        console.error("Arkadaşlık isteği kabul edilirken hata oluştu:", error);
      }
    },
    async rejectFriendRequest(friendId) {
      const userStore = useUserStore();
      try {
        await userStore.removeFriendRequest(friendId);
        console.log("Arkadaşlık isteği başarıyla reddedildi.");
      } catch (error) {
          console.error("Arkadaşlık isteği reddedilirken hata oluştu:", error);
      }
    }
  }
};
</script>

<style scoped>
.friend-request {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
}

.friend-request-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 50px;
  margin-bottom: 6px;
  border: 1px solid #fec040;
  border-radius: 10px;
  padding: 0 10px;
}

.friend-photo {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.friend-request-item span {
  flex-grow: 1; 
  text-align: left; 
}

.accept,
.reject {
  cursor: pointer;
  scale: 1.2;
  margin-left: 10px;
}

.accept {
  color: green;
}

.reject {
  color: red;
}

</style>
