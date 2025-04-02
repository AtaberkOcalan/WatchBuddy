<template>
    <div class="main">
        <div class="inputArea">
            <input 
            v-model="driveLink"
                type="text"
                placeholder="Google Drive adresi"
            >
            <button class="btn" @click="addDriveVideo">
                <v-icon name="bi-caret-right-fill" class="btn-icon" />
            </button>
        </div>
        <div class="mainContainer">
            <div class="container">
                <div class="header">
                    <h2>Nasıl kullanılır ?</h2>
                </div>
                <div class="body">
                    <p>
                        Google Drive'da yüklü olan videonuza gidin. 
                        Sağ üst köşede bulunan üç noktaya basın.
                        Paylaş kısmının içinde bağlantıyı kopyala tuşuna basın.
                        Kopyalanan bağlantıyı buraya yapıştırıp
                        çalıştırırsanız sistem videoyu arkadaşlarınızla 
                        paylaşmanızı sağlar
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { useRoomStore } from '../../../stores/roomStore';


export default {
    data() {
        return {
            driveLink: '',
        };
    },
    methods: {
        extractDriveVideoID(url) {
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
            return match ? match[1] : null;
        },
        async addDriveVideo() {
            const videoID = this.extractDriveVideoID(this.driveLink);
            if (!videoID) {
                alert("Geçersiz Google Drive bağlantısı!");
                return;
            }

            const roomStore = useRoomStore();
            try {
                await roomStore.addVideo(videoID);
                alert("Video başarıyla eklendi!");

            } catch (error) {
                console.error("Video eklenirken hata:", error);
                alert("Video eklenirken bir hata oluştu.");
            }
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 78vh;
    gap: 30px;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.inputArea {
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 4px;
}

input {
    width: 360px;
    height: 30px;
    padding: 0px 10px;
    font-size: 12px;
    border: none;
    background: #573a00;
    color: aliceblue;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

input:focus {
    outline: none;
}

button {
    border: none;
    width: 30px;
    height: 30px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #493100;
}

.mainContainer {
    margin-top: 20px;
    width: 600px;
    height: 300px;
    display: flex;
    justify-content: center;
}

.container {
    width: 360px;
    height: 240px;
    border-radius: 8px;
    border: 1px solid #493100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    color: rgb(255, 227, 190);
}

p {
    width: 300px;
    text-align: center;
}
</style>
