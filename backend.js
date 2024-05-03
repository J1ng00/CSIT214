//store events in local storage 
function saveEvents() {

        localStorage.setItem("events", JSON.stringify(eventsArr));

}

function getEvents() {

    if (!localStorage.getItem("events")) {
        return;
    }

    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


function savePromo() {

    if (!(localStorage.getItem("promos"))) {
        localStorage.setItem("promos", JSON.stringify(promosArr));
    }

}

function getPromo() {

    // Check if "promos" exist in localStorage
    if (localStorage.getItem("promos") !== null) {

        // Retrieve promos from localStorage and update promosArr
        promosArr = JSON.parse(localStorage.getItem("promos"));

    }

}