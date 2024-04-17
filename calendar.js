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
    addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let eventsArr = [];

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
            //getActiveDay(i); //update later
            //updateEvents(i);

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

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //call active day after click
           //getActiveDay(e.target.innerHTML);
           //updateEvents(Number(e.target.innerHTML));

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