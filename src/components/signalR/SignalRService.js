import { HubConnectionBuilder } from "@microsoft/signalr";


class SignalRService {
  // Singleton instance
  static instance;
  connection = null;

  initialize = async () => {
    if (this.connection && this.connection.state === "Connected") {
      console.log("SignalR zaten bağlı.");
      return;
    }
  
    console.log("initialize çalıştı");
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("Auth token bulunamadı.");
      return;
    }
  
    this.connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_URL + "/notificationHub", {
        accessTokenFactory: () => authToken,
      })
      .withAutomaticReconnect()
      .build();
  
    try {
      await this.connection.start();
      console.log("SignalR bağlantısı başlatıldı.");
    } catch (err) {
      console.error("SignalR bağlantı hatası:", err);
    }
  };

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