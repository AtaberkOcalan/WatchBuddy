<template>
    <footer class="footer">
        <button @click="changeTab(currentTab - 1)" :disabled="currentTab === 1">←</button>

        <div class="tabs">
            <span :class="['tab', { active: currentTab === 1 }]"></span>
            <span :class="['tab', { active: currentTab === 2 }]"></span>
            <span :class="['tab', { active: currentTab === 3 }]"></span>
        </div>

        <button @click="changeTab(currentTab + 1)" :disabled="currentTab === 3">→</button>
    </footer>
</template>

<script>
export default {
    props: {
        currentTab: {
            type: Number,
            required: true
        }
    },
    methods: {
        changeTab(tab) {
            if (tab >= 1 && tab <= 3) {
                this.$emit('change-tab', tab);
            } 
        }
    }
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fec040;
    gap: 50px; 
    padding: 4px 0 0 0;
}

button {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0 0 1px 0 ;
    border: 1px solid #fec040;
    background-color: transparent;
    color: #fec040;
    border-radius: 50%;
    width: 36px; 
    height: 36px; 
    transition: all 0.3s ease;
    cursor:pointer;
}

button:hover {
    background-color: #fec040;
    color: white;
}

button:active {
    background-color: #7c5d00;
}

.tabs {
    display: flex;
    gap: 10px;
    align-items: center;

}

.tab {
    width: 8px; 
    height: 8px; 
    border: 1px solid #fec040;
    border-radius: 50%;
    background-color: transparent;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.tab.active {
    background-color: #fec040;
    transform: scale(1.3);
}
</style>