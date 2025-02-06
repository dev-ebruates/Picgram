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
  connection = null;

  initialize = async () => {
    console.log("initialize çalıştı");
    var authToken = localStorage.getItem("authToken");
    console.log("authToken: ", authToken);
    if(authToken === null){
      console.log("authToken: null");
      return;
    }

    console.log("connection: ", this.connection);
    this.connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_URL + "/notificationHub", {
        accessTokenFactory: () => authToken
      })
      .withAutomaticReconnect()
      .build();

    // this.connection.onclose = async () => {
    //   await this.startConnection();
    // };

    // this.connection.onreconnecting = (error) => {
    //   console.log("Yeniden bağlanmaya çalışılıyor...", error);
    // };

    // this.connection.onreconnected = (connectionId) => {
    //   store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
    //   store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
    // };


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
          autoClose: 1000,
          
        });
      }
      if (methodName === "CommentPost") {
        // Yorumları güncellemek için ilgili post'u invalidate et
        store.dispatch(postApi.util.invalidateTags(["Posts"]));
        store.dispatch(postApi.util.invalidateTags(["Comments"]));
      
        // Ayrıca gönderiler listesine özel bir güncelleme yapabilirsiniz
      }
    });
    console.log("start connection: ", this.connection);
    await this.connection?.start();
    console.log("connection started: ", this.connection);
  }

  // Singleton instance'ını almak için statik metod
  static getInstance() {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }
    return SignalRService.instance;
  }

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