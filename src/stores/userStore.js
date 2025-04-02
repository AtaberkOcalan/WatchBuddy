import { defineStore } from 'pinia';
import { getAuth, signOut } from 'firebase/auth';
import { db } from "../utils/firebase_config";
import { 
   doc,
   getDoc, 
   updateDoc,
   onSnapshot, 
   deleteField 
} from 'firebase/firestore';
import { saveUserDataToFirestore } from "../utils/firestoreService";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    id: null,
    email: null,
    username: null,
    photoURL: null,
    roomID: null,
    friends: {},
    friendRequests: {},
    loggedIn: false,
    unsubscribeListener: null,
  }),

  getters: {
    getUser: (state) => state.user,
    getid: (state) => state.id,
    getEmail: (state) => state.email,
    getUsername: (state) => state.username,
    getPhotoURL: (state) => state.photoURL,
    getRoomID: (state) => state.roomID,
    getFriends: (state) => state.friends,
    getFriendRequests: (state) => state.friendRequests,
    isLoggedIn: (state) => state.loggedIn,
  },

  actions: {
    async loadUserData(uid) {
      try {

        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {

          const userData = userSnapshot.data();

          this.user = userData;
          this.id = userData.id;
          this.email = userData.email;
          this.username = userData.username;
          this.photoURL = userData.photoURL || 'https://via.placeholder.com/80';
          this.roomID = userData.roomID;
          this.friends = userData.friends || {}; 
          this.friendRequests = userData.friendRequests || {}; 
          this.loggedIn = true; 
        } else {
          console.log('User not found in Firestore');
          this.loggedIn = false;
        }
      } catch (error) {
        console.error('Error loading user data from Firestore:', error);
      }
    },

    async saveUserPhoto(newPhotoURL) {
      try {
        if (!this.user || !this.user.id) {
          throw new Error("Kullanıcı verisi mevcut değil, lütfen tekrar giriş yapın.");
        }
    
        this.photoURL = newPhotoURL;
        await saveUserDataToFirestore(this.user.id, { photoURL: this.photoURL });
        console.log("Profil fotoğrafı başarıyla güncellendi.");
    
        for (const friendId in this.friends) {
          const friendRef = doc(db, 'users', friendId);
          await updateDoc(friendRef, {
            [`friends.${this.id}.photoURL`]: this.photoURL,
          });
        }
    
        for (const requestId in this.friendRequests) {
          const requestRef = doc(db, 'users', requestId);
          await updateDoc(requestRef, {
            [`friendRequests.${this.id}.photoURL`]: this.photoURL,
          });
        }
    
      } catch (error) {
        console.error("Fotoğraf güncellenirken hata oluştu:", error);
      }
    },
      

    async saveUserData(newData) {
      try {
        const userRef = doc(db, 'users', this.user.id);
        await updateDoc(userRef, newData);
        console.log("Kullanıcı verisi başarıyla güncellendi.");
    
        if (newData.username) {
          const newUsername = newData.username || this.username;
    
          for (const friendId in this.friends) {
            const friendRef = doc(db, 'users', friendId);
            await updateDoc(friendRef, {
              [`friends.${this.id}.username`]: newUsername,
            });
          }
    
          for (const requestId in this.friendRequests) {
            const requestRef = doc(db, 'users', requestId);
            await updateDoc(requestRef, {
              [`friendRequests.${this.id}.username`]: newUsername,
            });
          }
        }
    
      } catch (error) {
        console.error("Firestore kaydı başarısız:", error);
      }
    },
       

    startUserListener(uid) {
      if (this.unsubscribeListener) {
        console.log("Dinleyici zaten çalışıyor.");
        return;
      }

      const userRef = doc(db, 'users', uid);

      this.unsubscribeListener = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          this.user = data;
          this.id = uid;
          this.email = data.email;
          this.username = data.username;
          this.photoURL = data.photoURL;
          this.roomID = data.roomID;
          this.friends = data.friends || {};
          this.friendRequests = data.friendRequests || {}; 
          this.loggedIn = true;
        }
      }, (error) => {
        console.error("Firestore listener error:", error);
      });
    },

    async sendFriendRequest(friendId) {
      try {
        const friendRef = doc(db, 'users', friendId);
        const userRequest = {
          id: this.id,
          username: this.username,
          photoURL: this.photoURL,
          roomID: this.roomID
        };
    
        await updateDoc(friendRef, {
          [`friendRequests.${this.id}`]: userRequest,
        });
    
        console.log("Arkadaşlık isteği başarıyla gönderildi.");
      } catch (error) {
        console.error("Arkadaşlık isteği gönderilirken hata oluştu:", error);
      }
    },    

    async acceptFriendRequest(friendId) {
      const userStore = useUserStore();
      try {
        const friendData = userStore.getFriendRequests[friendId];
        if (!friendData) {
          console.error("Arkadaşlık isteği bulunamadı.");
          return;
        }

        const userRef = doc(db, 'users', userStore.id);
        const friendRef = doc(db, 'users', friendId);

        await updateDoc(userRef, {
          [`friendRequests.${friendId}`]: deleteField() 
        });

        await updateDoc(userRef, {
          [`friends.${friendId}`]: {
            username: friendData.username,
            photoURL: friendData.photoURL,
            roomID: friendData.roomID
          },  
        });

        await updateDoc(friendRef, {
          [`friends.${this.id}`]: {
            username: this.username,
            photoURL: this.photoURL,
            roomId: this.roomID
          },
        });

        console.log("Arkadaşlık isteği başarıyla kabul edildi.");
      } catch (error) {
        console.error("Arkadaşlık isteği kabul edilirken hata oluştu:", error);
      }
    }, 

    async removeFriendRequest(friendId) {
      const userStore = useUserStore();
      try {
        const friendData = userStore.getFriendRequests[friendId];
        if (!friendData) {
          console.error("Arkadaşlık isteği bulunamadı.");
          return;
        }

        const userRef = doc(db, 'users', userStore.id);

        await updateDoc(userRef, {
          [`friendRequests.${friendId}`]: deleteField() 
        });

      } catch (error) {
        console.error("Arkadaşlık isteği kaldırılırken hata oluştu:", error);
        throw error;
      }
    },

    async removeFriend(friendId) {
      const userStore = useUserStore();
      try {
        const friendData = userStore.getFriends[friendId];
        if (!friendData) {
          console.error("Arkadaş bulunamadı.");
          return;
        }

        const userRef = doc(db, 'users', userStore.id);
        const friendRef = doc(db, 'users', friendId);

        await updateDoc(userRef, {
          [`friends.${friendId}`]: deleteField() 
        });

        await updateDoc(friendRef, {
          [`friends.${this.id}`]: deleteField() 
        });

      } catch (error) {
        console.error("Arkadaş kaldırılırken hata oluştu:", error);
        throw error;
      }
    },

    stopListener() {
      if (this.unsubscribeListener) {
        this.unsubscribeListener();
        this.unsubscribeListener = null;
      }
    },

    
    async signOut() {
      try {
        const auth = getAuth();
        await signOut(auth); 

        this.stopListener(); 
        this.$reset(); 
      } catch (error) {
        console.error('Çıkış hatası:', error);
      }
    },    
  },
  persist: true,
});
