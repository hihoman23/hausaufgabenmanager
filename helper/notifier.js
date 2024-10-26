export function getPermission(window) {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("Dieser Browser supported keine Notifications");
    }  else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      const previousPermission = Notification.permission;
      console.log(previousPermission)
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted" && previousPermission === 'default') {
          const notification = new Notification("Jetzt informiert bleiben!");
        }
      });
    }
}
  
  
export function sendNotification() {
    const notifTitle = "Hausaufgabe sind fällig!";
    const notifBody = "Hier clicken um anzuzeigen";
    const options = {
      body: notifBody,
      icon: './logo.png'
    };
    new Notification(notifTitle, options);
  }