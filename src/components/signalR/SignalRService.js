import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {store}  from "../../redux/store.js";
import { notificationsApi } from "../../features/notifications/notificationsApi.js";
import { messageApi } from "../../features/messageFeatures/messageApi.js";  
import {postApi} from "../../features/postFeatures/postApi.js"

class SignalRService {
  // Singleton instance
  static instance;

  constructor() {
    // Eğer zaten bir instance varsa, mevcut instance'ı döndür
    if (SignalRService.instance) {
      return SignalRService.instance;
    }
    SignalRService.instance = this;

    this.connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_API_URL + "/hubs/notification", {
        accessTokenFactory: () => {
          const token = localStorage.getItem("authToken");
          if (!token) {
            console.warn("SignalR bağlantısı için token bulunamadı");
            return null;
          }
          return token;
        }
      })
      .withAutomaticReconnect()
      .build();

    // this.connection.onclose = async () => {
    //   await this.startConnection();
    // };

    this.connection.onreconnecting = (error) => {
      console.log("Yeniden bağlanmaya çalışılıyor...", error);
    };

    this.connection.onreconnected = (connectionId) => {
      store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
    };


    this.connection.on("ReceiveNotification", (methodName, payload) => {
      if (methodName === "LikePost") {
        store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      }
      if(methodName === "CommentPost"){
        store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      }
      if(methodName === "CreateMessage"){
        // store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
        store.dispatch(messageApi.util.invalidateTags(["RelatedMessages"]));
      }
      if(methodName === "CreateMessage"){
        store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
      }
      if(methodName === "NewMessage"){
        toast.info(`${payload} - Yeni mesaj 📩`, {
          position: "top-right",
          autoClose: 3000,
          
        });
      }
      if (methodName === "CommentPost") {
        // Yorumları güncellemek için ilgili post'u invalidate et
        store.dispatch(postApi.util.invalidateTags(["Posts"]));
        store.dispatch(postApi.util.invalidateTags(["Comments"]));
      
        // Ayrıca gönderiler listesine özel bir güncelleme yapabilirsiniz
      }
    });
    this.startConnection();
  }

  // Singleton instance'ını almak için statik metod
  static getInstance() {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }
    return SignalRService.instance;
  }

  // Bağlantı durumu yönetimi
  startConnection = async () => {
    try {
      const token = localStorage.getItem("authToken");
          if (!token) {
            console.warn("SignalR bağlantısı için token bulunamadı");
            return null;
          }
      if(this.connection === null){
        console.log("SignalR bağlantısı yapılandırılmadı...");
        return;
      }
      await this.connection?.start();
      console.log("SignalR bağlantısı başarılı");
    } catch (err) {
      console.error("SignalR bağlantı hatası:", err);
      setTimeout(this.startConnection, 5000);
    }
  };

  stopConnection = async () => {
    try {
      console.log("SignalR bağlantısı kapatılıyor...");
      await this.connection.stop();
      this.connection = null;
      console.log("SignalR bağlantısı kapatıldı");
    } catch (err) {
      console.error("SignalR bağlantı hatası:", err);
      setTimeout(this.startConnection, 5000);
    }
  };

 
}

export { SignalRService };
export default SignalRService.getInstance();