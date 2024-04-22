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

var currentPage = window.location.pathname;

function generateMenu() {
    var menu = document.querySelector(".menu");
    
    // Clear existing menu items
    menu.innerHTML = "";

    // Generate menu items based on the current page
    if (currentPage.includes("student.html")) {
        menu.innerHTML += '<a href="../payment.html"><li>Payment</li></a>';
        menu.innerHTML += '<a href="../staff.html"><li>Staff</li></a>';
        menu.innerHTML += '<a href="../index.html"><li>Index</li></a>';
    } else if (currentPage.includes("staff.html")) {
        menu.innerHTML += '<a href="../admin.html"><li>Admin</li></a>';
        menu.innerHTML += '<a href="../student.html"><li>Student</li></a>';
        menu.innerHTML += '<a href="../index.html"><li>Index</li></a>';
    } else {
        // Default menu items for other pages
        menu.innerHTML += '<a href="../student.html"><li>Student</li></a>';
        menu.innerHTML += '<a href="../staff.html"><li>Staff</li></a>';
        menu.innerHTML += '<a href="../payment.html"><li>Payment</li></a>';
    }
}

// Call the generateMenu function when the page loads
generateMenu();

