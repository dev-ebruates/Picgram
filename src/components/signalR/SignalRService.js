import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../redux/store.js";
import { notificationsApi } from "../../features/notifications/notificationsApi.js";
import { messageApi } from "../../features/messageFeatures/messageApi.js";  
import {postApi} from "../../features/postFeatures/postApi.js"

class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_URL + "/notificationHub", {
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

    this.setupConnectionHandlers();
  }
}

// Bağlantı durumu yönetimi
const startConnection = async () => {
  try {
    await this.connection.start();
  } catch (err) {
    console.error("SignalR bağlantı hatası:", err);
    setTimeout(startConnection, 5000);
  }
};

this.connection.onclose(async () => {
  await startConnection();
});

this.connection.onreconnecting(error => {
});

this.connection.onreconnected(connectionId => {
  // Yeniden bağlandıktan sonra verileri güncelle
  store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
  store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
});

startConnection();

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



export default new SignalRService();