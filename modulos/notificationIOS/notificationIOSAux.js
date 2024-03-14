var notificationIOS = {
    title: "Title",
    content: "Content",
    type: "info",
    timeout: 3000
}

// Type["success"] = "success";
// Type["error"] = "error";
// Type["info"] = "info";
// Type["warning"] = "warning";

function newNotificationIOS(notification) {
    notificationIOS = notification
    let divNotificationIOS = document.querySelector("#notificationIOS")
    if (divNotificationIOS != null) {
        divNotificationIOS.click()
    }
}

// let notificationIOS_section = document.createElement("div")
// notificationIOS_section.setAttribute("id","notificationIOS-section")
// document.body.appendChild(notificationIOS_section)