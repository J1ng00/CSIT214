//calendar function
const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn"),
    modal = document.querySelector(".modal");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let eventsArr = [];
getEvents();

//function to add days
function initCalendar() {
    //to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date top of calendar
    date.innerHTML = months[month] + " " + year;

    //adding days on dom
    let days = "";

    //prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class ="day prev-date" > ${prevDays - x + 1}</div>`;
    }

    //currrent month days
    for (let i = 1; i <= lastDate; i++) {

        //check if event present on current day

        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day == i && eventObj.month == month + 1 && eventObj.year == year) {
                event = true;
            }
        })

        //if day is today add class today 
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {

            activeDay = i;
            getActiveDay(i); //update later
            updateEvents(i);

            //if event found also add event class
            //add active on today at startup

            if (event) {
                days += `<div class ="day today active event" > ${i}</div>`;
            }
            else {
                days += `<div class ="day today active" > ${i}</div>`;
            }
        }
        //add remaining as it is
        else {
            if (event) {
                days += `<div class ="day event" > ${i}</div>`;
            }
            else {
                days += `<div class ="day" > ${i}</div>`;
            }
        }

    }

    //next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class ="day next-date " > ${j}</div>`;
    }

    daysContainer.innerHTML = days;

    //add listner after calendar initialzed
    addListner()
}

initCalendar();

//prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next month

function nextMonth() {
    month++
    if (month > 11) {
        month = 1;
        year++;
    }
    initCalendar();
}

//add eventlistener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//goto date and goto today functions


todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //allow only numbers remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length === 2) {
        //add a slash if two numbers entered
        dateInput.value += "/";
    }

    if (dateInput.value.length > 7) {
        //dont allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // "/" not removed when backspacing

    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
})

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length == 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    //if invalid
    alert("Invalid date entered");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".off"),
    addEventTitle = document.querySelector(".event-name"),
    fromHour = document.querySelector(".FromHours"),
    fromMinute = document.querySelector(".FromTime"),
    fromIdentifier = document.querySelector(".FromIdentifier"),
    toHour = document.querySelector(".ToHours"),
    toMinute = document.querySelector(".ToTime"),
    toIdentifier = document.querySelector(".ToIdentifier");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
})


addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    //if click outside
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
})

//allow only 50 chars in title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value - addEventTitle.value.slice(0, 50);
});

//function to add listner on days after rendered

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month day clicked goto prev month and add active

            if (e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") && day.innerHTML == e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
                //if next month day clicked goto next month and add active
            } else if (e.target.classList.contains("next-date")) {
                prevMonth();

                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") && day.innerHTML == e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else {
                //remaining current month days 
                e.target.classList.add("active");
            }

        });
    });
}

//show active day events and date at top

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function to show events of that day
function updateEvents(date) {
    let events = "";

    eventsArr.forEach((event) => {
        //get events of active day only
        if (date == event.day && month + 1 == event.month && year == event.year) {
            // Sort events by start time
            event.events.sort((a, b) => {
                const timeA = convertTo24Hour(a.time.split(" - ")[0]);
                const timeB = convertTo24Hour(b.time.split(" - ")[0]);
                return timeA.localeCompare(timeB);
            });

            //then show event on document
            event.events.forEach((event) => {
                events +=
                    `<div class="event">
                        <div class="title">
                            <i class="fas fa-circle"></i>
                            <h3 class="event-title">${event.title}</h3>
                        </div>
                        <div class="event-info">
                            <div class="event-time">
                                <span>${event.time}</span>
                            </div>
                            <div class="event-price">
                                <span>${event.price}</span>
                            </div>
                            <div class="event-cap">
                                <span>${event.capacity}</span>
                            </div>
                        </div>
                    </div>`;
            });
        }
    });

    //if nothing found 
    if (events == "") {
        events =
            `<div class="no-event">
             <h3>No Events</h3>
         </div>`;
    }
    eventsContainer.innerHTML = events;
    //save events when new one added
    saveEvents();
}

//function to add events
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventfromHour = fromHour.value;
    const eventfromMinute = fromMinute.value;
    const eventfromIdentifier = fromIdentifier.value;
    const eventtoHour = toHour.value;
    const eventtoMinute = toMinute.value;
    const eventtoIdentifier = toIdentifier.value;
    const eventTimeFrom = eventfromHour + ":" + eventfromMinute + " " + eventfromIdentifier;
    const eventTimeTo = eventtoHour + ":" + eventtoMinute + " " + eventtoIdentifier

    if (eventTitle == "" || eventfromHour == "" || eventfromMinute == "" || eventfromIdentifier == ""
        || eventtoHour == "" || eventtoMinute == "" || eventtoIdentifier == "") {
        alert("Please fill in all the fields");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (timeFromArr.length != 2 ||
        timeToArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59) {

        alert("Invalid Time Format");
    }

    const startTimeParts = eventTimeFrom.split(":");
    let startHour = parseInt(startTimeParts[0]);
    const startMinute = parseInt(startTimeParts[1]);

    if (eventTimeFrom.includes("PM") && startHour !== 12) {
        startHour += 12;
    } else if (eventTimeFrom.includes("AM") && startHour === 12) {
        startHour = 0;
    }

    const endTimeParts = eventTimeTo.split(":");
    let endHour = parseInt(endTimeParts[0]);
    const endMinute = parseInt(endTimeParts[1]);

    if (eventTimeTo.includes("PM") && endHour !== 12) {
        endHour += 12;
    } else if (eventTimeTo.includes("AM") && endHour === 12) {
        endHour = 0;
    }

    const startTime = new Date(year, month, activeDay, startHour, startMinute);
    const endTime = new Date(year, month, activeDay, endHour, endMinute);

    if (startTime >= endTime) {
        alert("End time must be after start time");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    const roomPrice = document.querySelector(".roomPrice").value;
    const roomCap = document.querySelector(".capNumber").value;

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
        price: "$" + roomPrice + " /30 mins",
        capacity: roomCap + "pax"
    };

    let eventAdded = false;

    //check if eventsarr not empty
    if (eventsArr.length > 0) {
        //check if current day already has any event then add to that
        eventsArr.forEach((item) => {
            if (item.day == activeDay && item.month == month + 1 && item.year == year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    //if event array empty or current day has no event create new
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay, month: month + 1, year: year, events: [newEvent],
        });
    }

    //remove active from add event form
    addEventContainer.classList.remove("active")
    //clear the fileds
    addEventTitle.value = "";
    fromHour.value = "";
    fromMinute.value = "";
    fromIdentifier.value = "";
    toHour.value = "";
    toMinute.value = "";
    toIdentifier.value = "";

    //show current added event
    updateEvents(activeDay);

    //also add event class to newly added day if not already
    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    let roundedMinutes = "";
    timeHour = timeHour % 12 || 12;

    if (timeMin !== "00" && timeMin !== "30") {
        // If not, set the minutes to the nearest valid value (0 or 30)
        roundedMinutes = parseInt(timeMin) < 30 ? "00" : "30";
    }

    time = timeHour + ":" + roundedMinutes + " " + timeFormat;
    return time;
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}

function convertTo24Hour(time) {
    let [timeStr, period] = time.split(" ");
    let [hours, minutes] = timeStr.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function removeListing() {
    const modalTitle = document.querySelector(".modal-title");
    const eventTitle = modalTitle.textContent;

    eventsArr.forEach((event) => {
        if (event.day == activeDay && event.month == month + 1 && event.year == year) {
            event.events.forEach((item, index) => {
                if (item.title == eventTitle) {
                    event.events.splice(index, 1);
                }
            });

            // Remove the entire day if there are no more events
            if (event.events.length == 0) {
                eventsArr.splice(eventsArr.indexOf(event), 1);
                const activeDayElem = document.querySelector(".day.active");
                if (activeDayElem.classList.contains("event")) {
                    activeDayElem.classList.remove("event");
                }
            }
        }
    });

    // Update the events display
    updateEvents(activeDay);

    // Close the modal
    modal.style.display = 'none';
}

// Function to populate the modal with event details for editing
function populateModalForEdit(eventTitle) {
    // Find the event object from eventsArr based on eventTitle
    const eventDay = eventsArr.find(day => day.events.some(event => event.title === eventTitle));
    if (eventDay) {
        const event = eventDay.events.find(event => event.title === eventTitle);
        if (event) {
            // Populate the modal inputs with event details
            document.querySelector(".modal-title").textContent = event.title;
            console.log(event.title);
            // Extract hours, minutes, and identifier from the time string
            const timeParts = event.time.split(" - ");
            const timeFromParts = timeParts[0].split(" ");
            const timeToParts = timeParts[1].split(" ");
            const timeFrom = timeFromParts[0].split(":");
            const timeTo = timeToParts[0].split(":");
            document.querySelector(".modal-time-from-hours").value = timeFrom[0];
            document.querySelector(".modal-time-from-minutes").value = timeFrom[1];
            document.querySelector(".modal-time-from-identifier").value = timeFromParts[1];
            document.querySelector(".modal-time-to-hours").value = timeTo[0];
            document.querySelector(".modal-time-to-minutes").value = timeTo[1];
            document.querySelector(".modal-time-to-identifier").value = timeToParts[1];

            const priceParts = event.price.split(" ");
            const capacityParts = event.capacity.split(" ");
            document.querySelector(".modal-price-input").value = priceParts[0].slice(1);
            document.querySelector(".modal-capacity-input").value = capacityParts[0].slice(0, -3);
            console.log(priceParts[0].slice(1));
            console.log(capacityParts[0].charAt(0));
        }
    }

    // Display the modal
    modal.style.display = "block";
}

// Update the event listener to call the populateModalForEdit function
eventsContainer.addEventListener("click", (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        console.log(eventTitle);
        populateModalForEdit(eventTitle);
    }
});

// Function to handle the edit button click
function editListing(button) {

    // Find the modal content associated with the clicked button
    const modalContent = button.closest('.modal-content');
    // Find the title element within the modal content
    const modalTitle = modalContent.querySelector('.modal-title');
    // Get the event title from the modal title element
    const eventTitle = modalTitle.textContent.trim();

    // Retrieve the updated event details from the modal inputs
    const modalTitleInput = document.querySelector(".modal-title").textContent;
    const modalTimeFromHours = document.querySelector(".modal-time-from-hours").value;
    const modalTimeFromMinutes = document.querySelector(".modal-time-from-minutes").value;
    const modalTimeFromIdentifier = document.querySelector(".modal-time-from-identifier").value;
    const modalTimeToHours = document.querySelector(".modal-time-to-hours").value;
    const modalTimeToMinutes = document.querySelector(".modal-time-to-minutes").value;
    const modalTimeToIdentifier = document.querySelector(".modal-time-to-identifier").value;
    const modalPriceInput = document.querySelector(".modal-price-input").value;
    const modalCapacityInput = document.querySelector(".modal-capacity-input").value;

    // Construct the updated event time strings
    const timeFrom = `${modalTimeFromHours}:${modalTimeFromMinutes} ${modalTimeFromIdentifier}`;
    const timeTo = `${modalTimeToHours}:${modalTimeToMinutes} ${modalTimeToIdentifier}`;

    const startTime = new Date(`2000-01-01 ${timeFrom}`);
    const endTime = new Date(`2000-01-01 ${timeTo}`);
    if (startTime >= endTime) {
        alert("End time must be after start time");
        return; // Don't proceed if validation fails
    }

    // Find the day in eventsArr
    const dayIndex = eventsArr.findIndex(day => day.events.some(event => event.title === eventTitle));
    if (dayIndex !== -1) {
        // Find the event in the day's events
        const eventIndex = eventsArr[dayIndex].events.findIndex(event => event.title === eventTitle);
        if (eventIndex !== -1) {
            // Update the event details
            eventsArr[dayIndex].events[eventIndex].title = modalTitleInput;
            eventsArr[dayIndex].events[eventIndex].time = `${timeFrom} - ${timeTo}`;
            eventsArr[dayIndex].events[eventIndex].price = "$" + modalPriceInput + " /30mins";
            eventsArr[dayIndex].events[eventIndex].capacity = modalCapacityInput + "pax";

            // Update the UI with the new event details (optional)
            updateEvents(eventsArr[dayIndex].day);
        }
    }

    // Close the modal after editing
    modal.style.display = "none";
}
