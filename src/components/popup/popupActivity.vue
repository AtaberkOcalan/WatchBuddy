<template>
  <div class="main-container">
    <div class="search">
      <input 
        type="text" 
        placeholder="Arkadaş Ara"
      />
    </div>

    <div class="friends">
      
      <div v-if="!formattedFriendRequests?.length && !formattedFriends?.length" class="no-friends-message">
        Hiç arkadaşınız ya da isteğiniz yok.
      </div>
      <div v-else>
        <friend-request/>
        <friends/>
      </div>
    </div>

    <div class="addFriend">
      <input 
        v-model="friendUID" 
        type="text" 
        placeholder="Arkadaş UID'si"
      />
      <v-icon 
        name="io-person-add-outline" 
        class="addFriendIcon" 
        @click="handleAddFriend" 
      />
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../../stores/userStore'; 
import friendRequest from './activity/friendRequest.vue';
import friends from './activity/friends.vue';

export default {
  props: {
    currentTab: {
      type: Number,
      required: true
    }
  },
  components: {
    friendRequest,
    friends,
  },
  data() {
    return {
      friendUID: '',
    };
  },
  computed: {
    formattedFriendRequests() {
      const userStore = useUserStore();
      const friendRequests = userStore.getFriendRequests;

      return Object.keys(friendRequests).map(uid => ({
        id: uid,
        username: friendRequests[uid].username,
        photoURL: friendRequests[uid].photoURL,
      }));
    },
    formattedFriends() {
      const userStore = useUserStore();
      const friends = userStore.getFriends;

      return Object.keys(friends).map(uid => ({
        id: uid,
        username: friends[uid].username,
        photoURL: friends[uid].photoURL,
        roomID: friends[uid].roomID
      }));
    },
  },

  methods: {
    async handleAddFriend() {
      if (!this.friendUID) {
        console.log("Lütfen bir UID girin.");
        return;
      }

      const userStore = useUserStore(); 
      try {
        await userStore.sendFriendRequest(this.friendUID); 
        console.log("Arkadaşlık isteği başarıyla gönderildi.");
        this.friendUID = '';
      } catch (error) {
        console.error("Arkadaşlık isteği gönderilirken hata oluştu:", error);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  }
};
</script>

  
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  width: 100%;
  height: 270px; 
  overflow: hidden; 
}

.search {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3px;
}

.search input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.no-friends-message {
  text-align: center;
  font-size: 14px;
  color: gray;
  height: 270px;
  display: flex;
  align-items: center;
}

.friends {
  width: 100%;
  height: calc(100% - 88px); 
  overflow-y: auto; 
  padding: 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.addFriend {
  display: flex;
  align-items: center;
  gap: 10px;
}

.addFriend input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70%;
}

.addFriendIcon {
  font-size: 24px;
  cursor: pointer;
  color: #4CAF50;
}

.addFriendIcon:hover {
  color: #45a049;
}

.friends::-webkit-scrollbar {
  width: 6px;
}

.friends::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.friends::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
