<template>
    <div class="content">
        <div logo>
            <img src="/icons/128.png" alt="">
            <h1>WatchBuddy</h1>
            <p>Uzak mesafelerin küçük dostu!</p>
        </div>
        <button @click="handleGoogleSignIn">
            <v-icon name="fc-google" class="icon" />
            <span class="text"><span class="google">Google</span> ile Giriş Yap</span>
        </button>
    </div>
</template>



<style scoped>
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px); 
    -webkit-backdrop-filter: blur(8px); 
    box-sizing: border-box; 
    gap: 50px;
}
.logo {
    display: flex;
    background-color: whte;
    justify-content: center;
    align-items: center;
    color: #fec040;
}

.logo img {
    width: 30px;
}

h1 {
    font-size: 1.7em;
}
button {
    width: 230px;
    height: 60px;
    border: 1px double #d3d3d3;
    background-color: #f7f7f7;
    color: #838383;
    transition: all 0.3s ease;
    border-radius: 6px;
    border-style: double;
}

button:hover {
    color: #fec040;
    border: 1px solid #fec040;
    cursor: pointer;
}

.google {
    font-weight: bold;
}

.text {
    margin-left: 10px;
    font-size: 16px;
}

.icon {
    scale: 1.5;
    margin-right: 10px;
}
</style>

<script>
import { firebaseApp, db } from '../../utils/firebase_config';
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useUserStore } from '../../stores/userStore'; 

export default {
    data() {
        return {
            user: null,
            auth: null,
            userStore: useUserStore(),
        };
    },
    created() {
        this.auth = getAuth(firebaseApp);
        setPersistence(this.auth, browserLocalPersistence);
        this.checkAuthState();
    },
    methods: {
        checkAuthState() {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.user = user;
                    this.saveUserToFirestore(user);

                    this.userStore.loadUserData(user.uid);
                    this.userStore.startUserListener(user.uid);
                } else {
                    console.log('No user is logged in.');
                }
            });
        },
        handleGoogleSignIn() {
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                if (token) {
                    const credential = GoogleAuthProvider.credential(null, token);
                    signInWithCredential(this.auth, credential)
                        .then((result) => {
                            console.log("Sign-In Success: ", result);
                            this.user = result.user;
                            this.saveUserToFirestore(result.user);

                            this.userStore.loadUserData(result.user.uid);
                            this.userStore.startUserListener(result.user.uid);
                        })
                        .catch((error) => {
                            console.error('Sign-In Error: ', error);
                        });
                } else {
                    console.error('Failed to get OAuth token.');
                }
            });
        },
        async saveUserToFirestore(user) {
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (!userSnapshot.exists()) {
                await setDoc(userRef, {
                    id: user.uid,
                    email: user.email,
                    username: user.displayName,
                    photoURL: user.photoURL,
                    roomID: "",
                    friends: {},
                    friendRequests: {},
                    createdAt: new Date().toISOString(),
                });
                console.log("Yeni kullanıcı Firestore'a kaydedildi.");

            } else {
                console.log("User already exists in Firestore");
            }
        }
    },
};


</script>