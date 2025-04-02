<template>
    <div>
    <!-- Navbar -->
    <div class="platforms">
      <div class="select" @click="selectedPlatform = 'drive'">
        <v-icon name="fa-google-drive" id="logo" class="drive" />
        <p>Drive</p>
      </div>
      <div class="select" @click="selectedPlatform = 'twitch'">
        <v-icon name="fa-twitch" id="logo" class="twitch" />
        <p>Twitch</p>
      </div>
      <div class="select" @click="selectedPlatform = 'kick'">
        <v-icon name="fa-kickstarter-k" id="logo" class="kick" />
        <p>Kick</p>
      </div>
      <div class="select" @click="selectedPlatform = 'others'">
        <v-icon name="fa-code" id="logo" class="others" />
        <p>Others</p>
      </div>
    </div>

    <div class="content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script>
import liveDrive from './platforms/liveDrive.vue';
import liveTwitch from './platforms/liveTwitch.vue';
import liveKick from './platforms/liveKick.vue';
import liveOthers from './platforms/liveOthers.vue';

export default {
  data() {
    return {
      selectedPlatform: null, 
    };
  },
  computed: {
    currentComponent() {
      switch (this.selectedPlatform) {
        case 'drive':
          return liveDrive;
        case 'twitch':
          return liveTwitch;
        case 'kick':
          return liveKick;
        case 'others':
          return liveOthers;
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
.platforms {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 10px;
}

.select {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

#logo {
    border: 3px solid #3b2802;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(0, 0, 0);
    padding: 14px;
    cursor: pointer;
    transition: 0.5s ease all;
}

#logo:hover {
    background: #312100;
}

.youtube {
    color: #fe0000;
}

.drive {
    color: #289e62;
}

.dailymotion {
    color: #00c3f7;
}

.twitch {
    color: #9146ff;
}

.kick{
    color: #50f417;
}

.others{
    color: #fec040;
}

p {
    font-size: 10px;
    color: #fec040;
}

.content {
  margin-top: 20px;
}
</style>