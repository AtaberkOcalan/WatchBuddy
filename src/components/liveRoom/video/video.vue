<template>
    <div class="main">
        <div v-if="selectedVideo">
            <video 
                ref="videoPlayer"
                :src="'https://drive.google.com/uc?export=download&id=' + selectedVideo"
                width="100%" 
                height="100%" 
                controls
                autoplay
                @play="handlePlay"
                @pause="handlePause"
                @seeked="handleSeeked"
            >
                Your browser does not support the video tag.
            </video>
        </div>
        <div v-else class="othersView">
            <img src="/icons/128.png" alt="" class="logoText" />
            <h2>Oda sahibinin video yüklemesi bekleniyor</h2>
        </div>
    </div>
</template>

<script>
import { computed ,ref } from "vue";
import { useRoomStore } from "../../../stores/roomStore";

export default {
    setup() {
        const roomStore = useRoomStore();
        const selectedVideo = computed(() => roomStore.videos.length > 0 ? roomStore.videos[0] : null);
        const videoPlayer = ref(null);

        const handlePlay = () => {
            console.log("Video başlatıldı.");
        };

        const handlePause = () => {
            console.log("Video durduruldu.");
        };

        const handleSeeked = () => {
            console.log("Video sardırıldı.");
        };

        return {
            selectedVideo,
            videoPlayer,
            handlePlay,
            handlePause,
            handleSeeked
        };
    }
};
</script>


<style scoped>
.main {
    width: 100%;
    height: 78vh;
}

.othersView {
    width: 100%;
    height: 78vh;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    gap: 16px;
}

.logoText {
    width: 60px;
}

h2 {
    color: #fec040;
    font-size: small;
}
iframe {
    height: 78vh;
    border: none;
}
</style>
