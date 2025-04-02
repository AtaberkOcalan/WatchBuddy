<template>
    <div class="main-container">
        <div class="msg-box">
            <div class="photo" @click="triggerFileInput">
                <img :src="userPhotoURL" alt="Profil Fotoğrafı" v-if="userPhotoURL" />
                <div class="camera-icon-container" @click="triggerFileInput">
                    <v-icon name="md-flipcameraios-outlined" class="camera-icon" />
                </div>
            </div>
            <div class="content">
                <h2 class="name">
                    <input v-if="isEditingUsername" v-model="newUsername" type="text" placeholder="Yeni kullanıcı adı"
                        @blur="saveUsername" />
                    <span v-else @click="editUsername">{{ userName || "Kullanıcı" }}</span>
                    <v-icon name="md-modeedit-outlined" class="edit-icon" @click="editUsername" />
                </h2>
                <p class="user-uid" @click="copyUserUID">
                    <span class="uid-label">UserID</span>
                    <span class="short">{{ userUID.slice(0, 6) }}...</span>
                    <v-icon name="io-copy-outline" class="copy-icon" @click="copyUserUID" />

                </p>
            </div>
        </div>
        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
        <button @click="handleSignOut" class="sign-out-btn">
            <v-icon name="md-exittoapp-twotone" class="icon" />
            <span class="text">Çıkış yap</span>
        </button>
    </div>
</template>

<script>
import { useUserStore } from '../../stores/userStore';
import { uploadToImgur } from "../../utils/imgurService";

export default {
    data() {
        return {
            isEditingUsername: false,
            newUsername: '',
            isUploading: false,
        }
    },
    props: {
        currentTab: {
            type: Number,
            required: true
        }
    },
    computed: {
        user() {
            const userStore = useUserStore();
            return userStore.user; 
        },
        userPhotoURL() {
            const userStore = useUserStore();
            return userStore.photoURL;  
        },
        userName() {
            const userStore = useUserStore();
            return userStore.username;  
        },
        userUID() {
            const userStore = useUserStore();
            return userStore.id;  
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        async onFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("Lütfen bir resim dosyası seçin.");
                return;
            }

            this.isUploading = true; 
            try {
                const imageUrl = await uploadToImgur(file);

                const userStore = useUserStore();

                console.log(this.user.photoURL);
                await userStore.saveUserPhoto(imageUrl);
            } catch (error) {
                console.error("Hata oluştu:", error);
                console.log("Görsel yüklenemedi, lütfen tekrar deneyin.");
            } finally {
                this.isUploading = false;
            }
        },

        editUsername() {
            this.isEditingUsername = true;
            this.newUsername = this.userName;
        },

        saveUsername() {
            if (this.newUsername !== this.userName) {
                const userStore = useUserStore();
                userStore.username = this.newUsername;
                userStore.saveUserData({ username: this.newUsername }); 
            }
            this.isEditingUsername = false;
        },

        copyUserUID() {
            const el = document.createElement('textarea');
            el.value = this.userUID;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            const icon = this.$el.querySelector(".copy-icon");
            icon.classList.add("flash");
            setTimeout(() => icon.classList.remove("flash"), 500);
        },

        handleSignOut() {
            const userStore = useUserStore();
            userStore.signOut();
        }
    },
};
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    text-align: center;
    width: 100%;
    height: 270px;
}

.msg-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.photo {
    position: relative;
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #fec040;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(0px);
    transition: all 0.5s ease;
}

.photo:hover img {
    filter: blur(2px);
}

.camera-icon-container {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: larger;
    transform: translate(-50%, -50%) scale(2.2);
    display: none;
    opacity: 0;
    color: #3f3f3f;
    transition: all 0.5s ease-in-out;
}

.photo:hover .camera-icon-container {
    display: block;
    color: #fec040;
    opacity: 0.8;
}

.content h2 {
    font-size: 1rem;
    font-weight: bold;
}

.name span {
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: color 0.3s ease;
}

.name input {
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    transition: all 0.3s ease;
    width: 100px;
    text-align: center;
}

.name input:focus {
    border-color: #fec040;
}

.name .edit-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    scale: 0.85;
    color: #fec040;
    margin: 1px 0 0 4px;
}

.name:hover .edit-icon {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
}

.user-uid {
    font-size: 12px;
    color: gray;
    margin-top: 5px;
    cursor: pointer;
    display: inline-block;
    position: relative;
}

.user-uid .uid-label {
    display: inline-block;
}

.user-uid .short {
    display: none;
}

.user-uid .copy-icon {
    display: none;
    position: absolute;
    right: -25px;
    top: -2px;
    opacity: 0.7;
    scale: 0.8;
    cursor: pointer;
}

.user-uid:hover .uid-label {
    display: none;
}

.user-uid:hover .short {
    display: inline-block;
}

.user-uid:hover .copy-icon {
    display: inline-block;
}

@keyframes flash-effect {
    0% {
        transform: scale(1);
        color: #fec040;
    }
    50% {
        transform: scale(1.3);
        color: #ffc107;
    }
    100% {
        transform: scale(1);
        color: #fec040;
    }
}

.flash {
    animation: flash-effect 0.5s ease-in-out;
}

.sign-out-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px double #d3d3d3;
    background-color: #f7f7f7;
    color: #3f3f3f;
    padding: 10px 50px;
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-top: 20px;
}

.sign-out-btn:hover {
    color: #7c5d00;
    border: 1px solid #fec040;
}

.icon {
    margin-right: 10px;
    font-size: 1rem;
}

.text {
    font-size: 0.75rem;
}
</style>