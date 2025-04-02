<template>
  <div class="loading-screen">
    <div class="mainContainer">
      <img src="/icons/128.png" alt="Logo" class="logoP" />
      <h1>{{ roomTitle }}</h1>
      <p :class="{ active: error, 'fade-out': transitioningStage === 1 }" class="error">{{ error }}</p>
      <div class="passwordContainer">
        <input type="password" v-model="passwordInput" placeholder="Oda şifresi" class="password-input" />
        <button @click="validatePassword" class="btn">
          <v-icon name="bi-caret-right-fill" class="btn-icon" />
        </button>
      </div>
      <div class="progress-bar" :class="{ active: transitioningStage === 1 }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomTitle: String,
    correctPassword: String,
    onPasswordValidated: Function,
  },
  data() {
    return {
      passwordInput: "",
      error: null,
      transitioningStage: 0,
    };
  },
  methods: {
    validatePassword() {
      if (this.passwordInput === this.correctPassword) {
        this.error = null;
        this.startProgressBar();
      } else {
        this.error = "Hatalı şifre!";
        this.transitioningStage = 0; 
      }
    },
    startProgressBar() {
      this.transitioningStage = 1; 
      setTimeout(() => {
        this.onPasswordValidated();
      }, 2500); 
    },
  },
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  padding: 5rem;
  border-radius: 12px;
  background-color: black;
  height: 16rem;
  width: 30rem;
}

.logoP {
  width: 100px;
  height: auto;
  margin-bottom: 0.5rem;
}

.passwordContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  height: 35px;
}

.password-input {
  padding: 0 0.8rem;
  height: 30px;
  border: 1px solid #fec040;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: none;
}

.password-input:focus {
  outline: none;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background-color: #fec040;
  transition: width 2.5s ease;
}

.progress-bar.active {
  width: 100%;
}

.error {
  color: red;
  margin-top: 2rem;
  min-height: 1rem;
  text-align: center;
  visibility: hidden;
}

.error.active {
  visibility: visible;
}

.btn {
  cursor: pointer;
  transition: 0.3s all;
  height: 32px;
  width: 32px;
  background-color: #fec040;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 1px solid #fec040;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-left: none;
}
</style>
