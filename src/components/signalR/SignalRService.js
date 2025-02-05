import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../redux/store.js";
import { notificationsApi } from "../../features/notifications/notificationsApi.js";
import { messageApi } from "../../features/messageFeatures/messageApi.js";  
import { postApi } from "../../features/postFeatures/postApi.js";

export default class SignalRService {
  // Singleton instance
  static _instance = null;
  connection = null;

  constructor() {
    if (SignalRService._instance) {
      return SignalRService._instance;
    }
    SignalRService._instance = this;
  }

  static getInstance() {
    if (!SignalRService._instance) {
      SignalRService._instance = new SignalRService();
    }
    return SignalRService._instance;
  }

  initialize = async () => {
    // Eğer zaten bağlı ise tekrar bağlanmaya çalışma
    if (this.connection && this.connection.state === HubConnectionState.Connected) {
      console.log("SignalR zaten bağlı.");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("Auth token bulunamadı.");
      return;
    }

    try {
      // Önceki bağlantıyı kapat
      if (this.connection) {
        await this.stopConnection();
      }

      this.connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_BASE_URL + "/notificationHub", {
          accessTokenFactory: () => authToken,
        })
        .withAutomaticReconnect()
        .build();

      // Notification event handler'ları ekle
      this.connection.on("ReceiveNotification", (methodName, payload) => {
        switch (methodName) {
          case "LikePost":
          case "CommentPost":
            store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
            break;
          case "CreateMessage":
            store.dispatch(messageApi.util.invalidateTags(["RelatedMessages", "Conversations"]));
            break;
          case "NewMessage":
            toast.info(`${payload} - Yeni mesaj 📩`, {
              position: "top-right",
              autoClose: 3000,
            });
            break;
        }

        if (methodName === "CommentPost") {
          store.dispatch(postApi.util.invalidateTags(["Posts", "Comments"]));
        }
      });

      await this.connection.start();
      console.log("SignalR bağlantısı başarıyla kuruldu.");
    } catch (err) {
      console.error("SignalR bağlantı hatası:", err);
      // Hata durumunda 5 saniye sonra tekrar bağlanmayı dene
      setTimeout(() => this.initialize(), 5000);
    }
  };

  stopConnection = async () => {
    try {
      if (this.connection && this.connection.state !== HubConnectionState.Disconnected) {
        console.log("SignalR bağlantısı kapatılıyor...");
        await this.connection.stop();
        this.connection = null;
        console.log("SignalR bağlantısı kapatıldı");
      }
    } catch (err) {
      console.error("SignalR bağlantı kapatma hatası:", err);
    }
  };
}

export { SignalRService };