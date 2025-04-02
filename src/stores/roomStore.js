import { defineStore } from 'pinia';
import { db } from '../utils/firebase_config';
import { 
  doc, 
  getDoc,
  updateDoc, 
  arrayUnion, 
  onSnapshot,
  arrayRemove,
} from 'firebase/firestore';

export const useRoomStore = defineStore('room', {

  state: () => ({
    roomID: null,
    hostID: null,
    hostPeerID: null,
    roomTitle: null,
    password: null,
    participants: {},   
    videos: [],
    unsubscribeListener: null,
  }),

  getters: {
    isHost: (state) => (userID) => {
      const participant = state.participants[userID];
      return participant ? participant.isHost : false;
    }
  },

  actions: {
    async reset() {
      try {
        if (this.unsubscribeListener) {
          this.unsubscribeListener();
          this.unsubscribeListener = null;
        }
        this.roomID = null;
        this.hostID = null;
        this.hostPeerID = null;
        this.roomTitle = null;
        this.password = null;
        this.participants = {};
        this.videos = [];
        console.log("Reset başarılı:", this.$state);
      } catch (error) {
        console.error("Reset hatası:", error);
      }
    },

    async loadRoomData(roomID) {
      try {
        const roomRef = doc(db, 'rooms', roomID);
        const roomSnapshot = await getDoc(roomRef);

        if(roomSnapshot.exists()) {
          const roomData = roomSnapshot.data();

          this.roomID = roomID;
          this.hostID = roomData.hostID || null;
          this.hostPeerID = roomData.hostPeerID || null;
          this.roomTitle = roomData.roomTitle || null;
          this.password = roomData.password || null;
          this.participants = roomData.participants || {};
          this.videos = roomData.videos || [];

          console.log("Oda verileri başarıyla yüklendi", roomData);
        } else {
          console.error("Oda Bulunamadı");
          router.push("NotFound");
        }
      } catch (error) {
        console.error("Oda verileri yüklenirken hata oluştu:", error);
      }
    },

    startRoomListener(roomID) {
      const roomRef = doc(db, 'rooms', roomID);
      
      this.unsubscribeListener = onSnapshot(roomRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log("Oda verisi alındı:", data);
    
          if (data.participants !== undefined) {
            this.participants = data.participants;
            console.log("Participants güncellendi:", this.participants);
          }
          
          this.hostPeerID = data.hostPeerID;
             
          
          if (data.videos !== undefined) {
            this.videos = data.videos;
            console.log("Videos güncellendi:", this.videos);
          }
        }
    
        console.log("Listener başladı:");
    
      }, (error) => {
        console.error("Firestore listener error:", error);
      });
    },

    async addUserToRoom(roomID, user) {
      try {
        const roomRef = doc(db, 'rooms', roomID);

        await updateDoc(roomRef, {
          [`participants.${user.id}`]: {
            photoURL: user.photoURL,
            username: user.username,
            isHost: user.id === this.hostID,
          },
        });
        
        console.log("Kullanıcı katıldı");
      } catch (error) {
        console.error("Kullanıcı katılırken hata:", error)
      }
    },

    async addHostPeerID(roomID, peerID) {
      try {
        const roomRef = doc(db, 'rooms', roomID);

        await updateDoc(roomRef, {
          hostPeerID: peerID,
        });

        console.log("Host Peer ID'si başarıyla güncellendi:", peerID);
      } catch (error) {
        console.error("Host Peer ID'si güncellenirken hata oluştu:", error);
      }
    },

    async addVideo(videoID) {
      try {
        const roomRef = doc(db, 'rooms', this.roomID);
        await updateDoc(roomRef, {
          videos: arrayUnion(videoID),
        });
      } catch (error) {
        console.error('Video eklenirken hata:', error);
      }
    },

    async addDriveVideo(videoID) {
      try {
        const roomRef = doc(db, 'rooms', this.roomID);
        await updateDoc(roomRef, {
          driveVideo: arrayUnion(videoID),
        });
      } catch (error) {
        console.error('Video eklenirken hata:', error);
      }
    },

    async removeVideo(videoID) {
      try {
        const roomRef = doc(db, 'rooms', this.roomID);
        await updateDoc(roomRef, {
          videos: arrayRemove(videoID),
        });

        this.videos = this.videos.filter(video => video !== videoID);
        console.log(`Video ${videoID} başarıyla silindi.`);
      } catch (error) {
        console.error('Video silinirken hata:', error);
      }
    },
  },
});
