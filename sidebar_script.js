function openSidebar() {
    document.getElementById("sidebar").style.left = "0";
    document.querySelector(".content").style.marginLeft = "0px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
    document.querySelector(".content").style.marginLeft = "0";
}