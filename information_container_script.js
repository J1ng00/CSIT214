function ToggleInformationbar() {
    var userInfoBar = document.getElementById("information_container");
    var contentHeight = userInfoBar.scrollHeight + 'px'; // Get the content height

    // Toggle max-height to reveal or hide the content
    if (userInfoBar.style.maxHeight === "0px" || !userInfoBar.style.maxHeight) {
        userInfoBar.style.maxHeight = contentHeight;
    } else {
        userInfoBar.style.maxHeight = "0px";
    }
}

function logout(){
    window.location.href = "index.html";
}
