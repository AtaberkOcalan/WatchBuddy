
<template>
    <div>
        <p>Oluştur</p>
        <div class="input-section">

            <div class="input-group">
                <label for="stream-title" class="input-label">Yayın adı:</label>
                <input type="text" id="stream-title" v-model="roomTitle" class="input-field" placeholder="Yayın adı" />
            </div>
            
            <div class="input-group">
                <label for="access-type" class="input-label">Şifre:</label>
                <input type="password" id="acces-type" v-model="password" class="input-field" placeholder="Şifre" />
            </div>
            <div class="start-section">
                <button class="start-button" @click="createRoom">Oda Oluştur</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "../../../stores/userStore";
import { db } from "../../../utils/firebase_config";
import { doc, setDoc } from "firebase/firestore";

export default {
    data() {
        return {
            roomTitle: '', 
            password: '', 
        };
    },
    methods: {
        async createRoom() {
            try {
                const userStore = useUserStore();
                const userID = userStore.getid;
                const roomID = `room_${Date.now()}`;
                const roomRef = doc(db, "rooms", roomID);

                await setDoc(roomRef, {
                    roomID,
                    hostID: userID,
                    hostPeerID: null,
                    roomTitle: this.roomTitle,
                    password: this.password,
                    participants: {},
                    videos: [],
                });

                const liveRoom = chrome.runtime.getURL('src/live/live.html');
                chrome.tabs.create({ url: `${liveRoom}?roomID=${roomID}` });

            } catch (error) {
                console.error("Yayın oluşturulurken hata:", error);
            }
        }

    }
}   
</script>

<style scoped>
p{
    color: #fec040;
    font-size: larger;
    font-weight: 700;
    margin: 20px 0 10px 0;
    align-items: center;
    justify-content: center;
    display: flex;
}
.input-section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
}
.input-group {
    display:grid;
    grid-auto-flow: column;
    grid-row-start: auto;
    align-items: center;
}

.input-label {
    font-size: 0.75rem;
    color: rgb(61, 61, 61);
    font-weight: bold;
    width: 60px;
    display: flex;
}

.input-field {
    padding: 8px;
    width: 10rem;
    font-size: 0.72rem;
    border: 1px solid gray;
    border-radius: 4px;
    color: #3f3f3f;
    background-color: #f7f7f7;
}

.input-field:focus{
    outline: none;
}

select.input-field {
    font-size: 0.72rem;
    border: 1px solid #926eb1;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f7f7f7;
    color: #3f3f3f;
}

.start-button {
    font-size: 0.75rem;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: #f7f7f7;
    color: #3f3f3f;
    width: 15rem;
    height: 32px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.start-button:hover {
    color: #7c5d00;
    border: 1px solid #fec040;
}

.start-button:active {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>