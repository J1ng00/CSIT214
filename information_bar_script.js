function ToggleInformationbar() {
    var userInfoBar = document.getElementById("information_bar");
    var contentHeight = userInfoBar.scrollHeight + 'px'; // Get the content height

    // Toggle max-height to reveal or hide the content
    if (userInfoBar.style.maxHeight === "0px" || !userInfoBar.style.maxHeight) {
        userInfoBar.style.maxHeight = contentHeight;
    } else {
        userInfoBar.style.maxHeight = "0px";
    }
}
