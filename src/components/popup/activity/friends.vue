<template>
    <div class="friend-list">
        <div>
            <div v-for="(friend, index) in formattedFriends" :key="index" class="friend-item">
                <img :src="friend.photoURL || 'https://via.placeholder.com/50'" alt="User Photo" class="friend-photo" />
                <span>{{ friend.username }}</span>
                <span 
                    class="live"  
                    :class="{ 'disabled': !friend.roomID }"
                    :style="{ cursor: friend.roomID ? 'pointer' : 'default' }"
                    @click="joinRoom(friend.roomID)"
                >
                    <v-icon 
                        name="md-castconnected-outlined" 
                        class="joinRoom"
                        :style="{ color: friend.roomID ? 'green' : '#aaa' }"
                    />
                    .live
                </span>
                <v-icon name="bi-trash3" @click="deleteFriend(friend.id)" class="delete" />

            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../../../stores/userStore';

export default {
    computed: {
        formattedFriends() {
            const userStore = useUserStore();
            const friends = userStore.getFriends;

            return Object.keys(friends).map(uid => {
                return {
                    id: uid,
                    username: friends[uid].username,
                    photoURL: friends[uid].photoURL,
                    roomID: friends[uid].roomID
                };
            });
        }
    },
    methods: {
        async deleteFriend(friendId) {
            const userStore = useUserStore();
            try {
                await userStore.removeFriend(friendId);
                console.log("Arkadaş başarıyla silindi.");
            } catch (error) {
                console.error("Arkadaş silinirken bir hata oluştu:", error);
            }
        },
        joinRoom(roomID) {
            if (roomID) {
                const liveRoom = chrome.runtime.getURL('src/live/live.html');
                chrome.tabs.create({ url: `${liveRoom}?roomID=${roomID}` });
            }
        }
    }
};
</script>

<style scoped>
.friend-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
}

.friend-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 200px;
    height: 50px;
    margin-bottom: 6px;
    border: 1px solid green;
    border-radius: 10px;
    padding: 0 10px;
}

.friend-photo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
}

.friend-item span {
    flex-grow: 1;
    text-align: left;
}

.live {
    display: flex;
    align-items: center;
    margin-left: 30px;
    color: green;
    transition: 0.3s all;
    cursor: pointer;
    scale: 0.95;
}

.live.disabled {
    color: #aaa;
    cursor: default;
}

.joinRoom {
    scale: 0.9;
    color: green;
}

.delete {
    transition: 0.2s all;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete:hover {
    color: red;
}
</style>
