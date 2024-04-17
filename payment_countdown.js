// Function to start or restart the countdown
function startCountdown() {
    // Get the current time
    var now = new Date().getTime();
    
    // Check if there is a start time in localStorage
    var startTime = localStorage.getItem("startTime");
    if (!startTime) {
        // If no start time, set the start time to now
        localStorage.setItem("startTime", now);
        startTime = now;
    }
    
    // Calculate remaining time (in milliseconds)
    var fiveMinutes = 5 * 60 * 1000;
    var elapsedTime = now - startTime;
    var remainingTime = fiveMinutes - elapsedTime;
    
    // Update the countdown display
    var countdownElement = document.getElementById("countdown");
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    countdownElement.innerHTML = "Time remaining: " + minutes + "m " + seconds + "s";
    
    // If the countdown is finished, remove the start time from localStorage
    if (remainingTime <= 0) {
        localStorage.removeItem("startTime");
    }
}

// Reset the start time when the page is loaded
localStorage.removeItem("startTime");

// Call startCountdown function on page load
startCountdown();

// Update the countdown every second
setInterval(startCountdown, 1000);
