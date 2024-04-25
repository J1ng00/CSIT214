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

function addStudentEvent() {

    // Retrieve data from local storage
    const storedEvents = JSON.parse(localStorage.getItem("events"));

    // Check if there are stored events
    if (storedEvents) {
        // Iterate through each stored event
        storedEvents.forEach(event => {
            // Access and use the properties of each event
            console.log("Title:", event.title);
            console.log("Time:", event.time);
            console.log("Price:", event.price);
            console.log("Capacity:", event.capacity);
        });
    } else {
        console.log("No events found in local storage.");
    }

    const eventsContainer = document.getElementById('events_container'); // Use getElementById without the dot
    const content = ' <div class="event-btn" onclick="toggleBooking()"> <div class="event-details"> <label class="title">Room 1</label> <label class="detail">Time: 0700 - 1800</label> <label class="detail">Rate: $5.00 per 30 minutes</label><label class="detail">Capacity: 4 pax</label></div></div>';
    /*<div class="event-btn" onclick="toggleBooking()">
       <div class="event-details">
           <label class="title">Room 1</label>
           <label class="detail">Time: 0700 - 1800</label>
           <label class="detail">Rate: $5.00 per 30 minutes</label>
           <label class="detail">Capacity: 4 pax</label>
       </div>
   </div>*/
    eventsContainer.innerHTML = content;
}

window.onload = addStudentEvent;