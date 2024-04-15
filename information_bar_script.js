function openInformationbar() {
    document.getElementById("information_bar").style.right = "0";
    document.querySelector(".content").style.marginright = "0px";
}

function closeInformationbar() {
    document.getElementById("information_bar").style.right = "-300px";
    document.querySelector(".content").style.marginright = "0";
}