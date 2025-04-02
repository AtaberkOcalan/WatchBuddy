<template>
    <footer>
        <div class="logo">
            <popupHeader/>
        </div>
        <div class="copyright">
            <p>&copy; 2025 WatchBuddy. Tüm hakları saklıdır.</p>
        </div>
    </footer>
</template>

<script>
import popupHeader from '../popup/popupHeader.vue'
export default{
    components: {
        popupHeader,
    }
}
</script>

<style scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: black;
    height: 12vh;
    justify-content: center;
    align-items: center;
    color: #fec040;
    cursor: default;
    gap: 0.2vh;
}
.logo {
    scale: 0.85;
    background-color: black;
}
.copyright {
    color: #fec040;
    margin-bottom: 18px;
}
</style>