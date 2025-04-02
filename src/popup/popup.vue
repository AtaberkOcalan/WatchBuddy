<template>
    <div class="popup">
        <loginScreen v-if="!isLoggedIn" />
        <div v-else>
            <popupHeader />
            <hr>
            <div class="content-wrapper">
                <transition name="slide" mode="out-in">
                    <div class="content" :key="currentTab">
                        <popupProfile v-if="currentTab === 1" :current-tab="currentTab" />
                        <popupActivity v-else-if="currentTab === 2" :current-tab="currentTab" />
                        <popupCreate v-else-if="currentTab === 3" :current-tab="currentTab"/>
                    </div>
                </transition>
            </div>
            <hr>
            <popupFooter :current-tab="currentTab" @change-tab="changeTab" />
        </div>
    </div>
</template>


<script>
import popupHeader from '../components/popup/popupHeader.vue';
import popupFooter from '../components/popup/popupFooter.vue';
import popupProfile from '../components/popup/popupProfile.vue';
import popupActivity from '../components/popup/popupActivity.vue';
import popupCreate from '../components/popup/popupCreate.vue';
import loginScreen from '../components/popup/loginScreen.vue';
import { useUserStore } from '../stores/userStore';
import { onMounted } from 'vue'; 

export default {
    components: {
        popupHeader,
        popupFooter,
        popupProfile,
        popupActivity,
        popupCreate,
        loginScreen
    },

    data() {
        return {
            currentTab: 1,
        }
    },

    computed: {
        isLoggedIn() {
            const userStore = useUserStore();
            return userStore.isLoggedIn;
        }
    },

    created() {
        const savedTab = localStorage.getItem('currentTab');
        if (savedTab) {
            this.currentTab = parseInt(savedTab);
        }
    },
    
    methods: {
        changeTab(tab) {
            this.currentTab = tab;
            localStorage.setItem('currentTab', tab);
        }
    },

    setup() {
        const userStore = useUserStore();

        onMounted(() => {
            if (userStore.isLoggedIn && !userStore.unsubscribeListener) {
                userStore.startUserListener(userStore.id);
            }
        });

        return {};
    }
}
</script>

<style scoped>
.popup {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
}

.content-wrapper {
    flex: 1;
    overflow-y: auto;
}

.content {
    width: 100%;
}

hr {
    border: 0;
    border-top: 1px solid #fec040;
    width: 80%;
    margin: 5px auto;
}

</style>