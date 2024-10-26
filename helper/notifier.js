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
  
  
export function sendNotification(task) {
    const notifTitle = "Hausaufgabe sind fällig!";
    const notifBody = task.title;
    const options = {
      body: notifBody,
    };
    new Notification(notifTitle, options);
  }