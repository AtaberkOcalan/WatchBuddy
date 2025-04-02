import { createApp } from 'vue';
import Live from './live.vue';
import router from "../router";
import { OhVueIcon,  addIcons } from "oh-vue-icons";
import { createPinia } from 'pinia';
import piniaPersistedState from "pinia-plugin-persistedstate"; 
import { 
    FaYoutube,
    FaGoogleDrive,
    FaDailymotion,
    FaTwitch,
    FaKickstarterK,
    FaCode,
    FaSearch,
    FaCrown,
    BiCaretRightFill,
    FaPlay,
    FaPause,
} from "oh-vue-icons/icons";

addIcons(
    FaYoutube,
    FaGoogleDrive,
    FaDailymotion,
    FaTwitch,
    FaKickstarterK,
    FaCode,
    FaSearch, 
    FaCrown,
    BiCaretRightFill,
    FaPlay,
    FaPause,
);

const app = createApp(Live);

const pinia = createPinia();
pinia.use(piniaPersistedState);

app.component("v-icon", OhVueIcon);
app.use(pinia);
app.use(router)
app.mount("body");