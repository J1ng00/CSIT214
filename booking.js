function toggleBooking() {
    var width = document.getElementById("booking_container").style.width;

    if (width === "" || width === "0%") {
        document.getElementById("booking_container").style.width = "70%";
    } else {
        document.getElementById("booking_container").style.width = "0%";
    }
}

function gotopayment() {
    window.location.href = "payment.html";
}