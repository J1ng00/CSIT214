//store events in local storage 
window.saveEvents = function () {

    let check = localStorage.getItem("events");

    if (check) {
        localStorage.setItem("events", JSON.stringify(eventsArr));
    }

}

window.getEvents = function () {

    if (localStorage.getItem("events") !== null) {
        return;
    }

    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


window.savePromo = function () {

    let check = localStorage.getItem("promos");

    if (check) {
        localStorage.setItem("promos", JSON.stringify(promosArr));
    }

}

window.getPromo = function () {

    // Check if "promos" exist in localStorage
    if (localStorage.getItem("promos") !== null) {

        // Retrieve promos from localStorage and update promosArr
        promosArr = JSON.parse(localStorage.getItem("promos"));

    }

}