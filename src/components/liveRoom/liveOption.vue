<template>
    <div class="option">
        <div class="participants" v-if="participants">
            <div v-for="(participant, userID) in participants" :key="userID" class="participant-item">
                <img :src="participant.photoURL" alt="User Photo" class="user-photo" />
                <span class="username">{{ participant.username.length > 7 ? participant.username.slice(0, 7) + '...' : participant.username }}</span>
                <span v-if="participant.isHost" class="host-label"><v-icon name="fa-crown"/></span>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoomStore } from "../../stores/roomStore";

export default {
    computed: {
        participants() {
            return this.roomStore.participants;
        }
    },
    setup() {
        const roomStore = useRoomStore();
        return { roomStore };
    }
};
</script>

<style scoped>
.option {
    height: 12vh;
    border-left: 1px solid gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 5px;
    overflow: hidden;
}

.user-photo {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid white;
}

.participants {
    display: flex;
    gap: 8px;
    flex-wrap: wrap; /* Flex öğelerinin satır sonuna geçmesine izin verir */
    justify-content: center; /* Katılımcıları ortalar */
    margin-top: 10px;
    padding: 5px;
    width: 100%;
}

.participant-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    background-color: #333;
    border-radius: 12px;
    color: white;
    font-size: 0.9rem;
    max-width: 120px; /* Ekranda taşmaması için max genişlik */
    justify-content: center; /* İçeriği ortalar */
}

.username {
    font-size: 0.9rem; 
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
    width: 80px;
}

.host-label {
    background-color: #f39c12;
    scale: 0.7;
    padding: 4px;
    border-radius: 50%;
    font-size: 0.8em;
}

@media (max-width: 768px) {
    .option {
        height: auto; /* Ekran küçüldüğünde daha rahat sığması için yükseklik ayarlanabilir */
    }

    .user-photo {
        width: 18px;
        height: 18px;
    }

    .participants {
        gap: 6px;
        padding: 8px;
    }

    .participant-item {
        max-width: 100px;
        font-size: 0.8rem;
    }

    .username {
        font-size: 0.8rem; 
        width: 70px;
    }
}

@media (max-width: 480px) {
    .participant-item {
        flex-direction: column; /* Küçük ekranlarda katılımcıları dikey hizala */
        gap: 4px;
        max-width: 80px;
    }

    .username {
        width: 60px;
    }
}
</style>
