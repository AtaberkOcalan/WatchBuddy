import Popup from "./popup.vue";
import { createApp } from "vue";
import { OhVueIcon,  addIcons } from "oh-vue-icons";
import { createPinia } from 'pinia';
import piniaPersistedState from "pinia-plugin-persistedstate";  

import { 
    FcGoogle, 
    MdExittoappTwotone, 
    LaEditSolid, 
    MdFlipcameraiosOutlined, 
    MdModeeditOutlined,
    IoCopyOutline,
    IoPersonAddOutline,
    RiCloseCircleFill,
    FcOk,
    BiXCircleFill,
    BiXCircle,
    BiTrash3,
    MdCastconnectedOutlined,
} from "oh-vue-icons/icons";

addIcons(
    FcGoogle, 
    MdExittoappTwotone, 
    LaEditSolid, 
    MdFlipcameraiosOutlined, 
    MdModeeditOutlined,
    IoCopyOutline,
    IoPersonAddOutline, 
    RiCloseCircleFill,
    FcOk,
    BiXCircleFill,
    BiXCircle,
    BiTrash3,
    MdCastconnectedOutlined,
);

const app = createApp(Popup);

const pinia = createPinia();
pinia.use(piniaPersistedState);

app.component("v-icon", OhVueIcon);
app.use(pinia);

app.mount("body");
