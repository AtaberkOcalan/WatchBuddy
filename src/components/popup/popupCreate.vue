<template>
    <div class="main-container">     
        <createJoin/>
        <createNew/>
    </div>
</template>

<script>
import createJoin from './create/createJoin.vue'
import createNew from './create/createNew.vue'

export default {
    props: {
        currentTab: {
            type: Number,
            required: true
        }
    },
    components: {
        createJoin,
        createNew
    }
}
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 270px;
}



</style>
