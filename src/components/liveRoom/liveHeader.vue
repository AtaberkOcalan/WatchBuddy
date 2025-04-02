<template>
    <div class="header">
        <div class="logo" @click="removeVideo">
            <popup-header />
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useRoomStore } from "../../stores/roomStore";
import { useUserStore } from "../../stores/userStore";
import popupHeader from "../popup/popupHeader.vue";

export default {
    components: {
        popupHeader,
    },
    setup() {
        const roomStore = useRoomStore();
        const userStore = useUserStore();

        const isCurrentUserHost = computed(() => roomStore.isHost(userStore.id));

        const removeVideo = async () => {
            if (roomStore.videos.length > 0 && isCurrentUserHost.value) {
                const videoID = roomStore.videos[roomStore.videos.length - 1];
                await roomStore.removeVideo(videoID);
                console.log("Video silindi ve diğer ekranlara geçildi.");
            }
        };

        return { removeVideo };
    },
};
</script>

<style scoped>
.header {
    display: flex;
    background-color: black;
    height: 10vh;
    justify-content: center;
    align-items: center;
    color: #fec040;
    cursor: default;
    gap: 7vh;
}

.logo {
    background-color: black;
    cursor: pointer;
}
</style>