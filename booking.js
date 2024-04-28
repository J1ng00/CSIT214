//----------default data used for testing----------//
function addDefaultData() {
    let eventsArr = [];
    eventsArr.push({
        "day": 28,
        "month": 4,
        "year": 2024,
        "events": [{
            "title": "Test",
            "time": "12:00 PM - 1:00 AM",
            "price": "$12 /30 mins",
            "capacity": "10pax"
        }]
    });
    eventsArr.push({
        "day": 28,
        "month": 4,
        "year": 2024,
        "events": [{
            "title": "Test2",
            "time": "1:00 PM - 2:00 PM",
            "price": "$15 /30 mins",
            "capacity": "15pax"
        }]
    });
    let promosArr = [];
    promosArr.push({
        "title": "Promo1",
        "amount": "10%"
    });
    let bookingsArr = [];
    bookingsArr.push({
        "ref": "1001",
        "event": {
            "title": "Test",
            "time": "12:00 PM - 1:00 AM",
            "price": "$12 / 30 mins",
            "capacity": "10pax",
            "date": "2024 / 4 / 27"
        },
        "promo": {
            "title": "Promo1",
            "discount": "10 % "
        },
        "time": ["1700", "1730"],
        "cost": "$24",
        "user": "uowstudent"
    });
    bookingsArr.push({
        "ref": "1002",
        "event": {
            "title": "Test",
            "time": "12:00 PM - 1:00 AM",
            "price": "$12 / 30 mins",
            "capacity": "10pax",
            "date": "2024 / 4 / 27"
        },
        "promo": {
            "title": "Promo1",
            "discount": "10 % "
        },
        "time": ["1800", "1830"],
        "cost": "$24",
        "user": "uowstudent"
    });
    localStorage.setItem("bookings", JSON.stringify(bookingsArr));
    localStorage.setItem("promos", JSON.stringify(promosArr));
    localStorage.setItem("events", JSON.stringify(eventsArr));
    console.log("push done");
    console.log("")
}
//----------default data used for testing----------//

//----------basic funtion----------//
function ToggleConfirmationContainer() {
    var confirmation_container = document.getElementById("confirm_container");
    confirmation_container.classList.toggle("show");
}

function ToggleEditContainer() {
    var edit_container = document.getElementById("edit_container");
    edit_container.classList.toggle("show");
}
//----------basic funtion----------//


//----------Console Logs----------//
function consoleLog() {

    if (eventsArray.length !== 0) {

        eventsArray.forEach((event, index) => {
            console.log(`Event ${index}`);
            console.log(`Title(ID): ${event.getTitle()}`);
            console.log(`Time: ${event.getTime()}`);
            console.log(`Price: ${event.getPrice()}`);
            console.log(`Capacity: ${event.getCapacity()}`);
            console.log(`Date: ${event.getDate()}`);
            console.log('');
        });

    } else {
        console.log('eventsArray is empty!');
        console.log('');
    }

    if (promosArray.length !== 0) {

        promosArray.forEach((promo, index) => {
            console.log(`Promo Code ${index}`);
            console.log(`ID: ${promo.getTitle()}`);
            console.log(`Discount: ${promo.getDiscount()}`);
            console.log('');
        });

    } else {
        console.log('promoArray is empty!');
        console.log('');
    }

    if (bookingsArray.length != 0) {

        bookingsArray.forEach((booking, index) => {
            console.log(`Booking: ${index}`);
            console.log("Ref No: ", booking.getRef());
            console.log("User: ", booking.getUser());
            console.log("Event: ", booking.getEvent());
            console.log("Promo: ", booking.getPromo());
            console.log("Time: ", booking.getTime());
            console.log("Cost: ", booking.getCost());
            console.log('');
        })

    } else {
        console.log('bookingsArray is empty!');
        console.log('');
    }
}
//----------Console Logs----------//

//----------adding event listener----------//
function initEventListener() {

    document.getElementById("promo_input").addEventListener('input', () => {

        const value = document.getElementById("promo_input").value;
        checkPromo(value);

    });

    document.getElementById("cancel_edit").addEventListener('click', () => {

        ToggleEditContainer();

    });

    document.getElementById("confirm_edit").addEventListener('click', () => {

        ToggleEditContainer();
        updateBookingUponConfirm();
        updateBookingContainer(selectedBooking);

    });

    document.getElementById("confirmation_cancelled").addEventListener('click', () => {

        ToggleConfirmationContainer();

    });

    document.getElementById("confirmation_confirm").addEventListener('click', () => {

        cancelBooking(selectedBooking);
        ToggleConfirmationContainer();

    });

}
//----------adding event listener----------//

//----------Initailize----------//
function Initialize() {
    //addDefaultData();
    parseEvents();
    parsePromo();
    parseBookings();
    addBookings();
    updateBookingContainer(null);
    initEventListener();
    consoleLog();
}

window.onload = Initialize;
//----------Initailize----------//

//----------Global Variables----------//
var eventsArray = [];
var promosArray = [];
var bookingsArray = [];
var promoApplied = null;
var selectedBooking = null;
//----------Global Variables----------//

//----------Events class----------//
class Event {

    constructor(title, time, price, capacity, date) {
        this.title = title;
        this.time = time;
        this.price = price;
        this.capacity = capacity;
        this.date = date;
    }

    // Accessor methods
    getTitle() {
        return this.title;
    }

    getTime() {
        return this.time;
    }

    getPrice() {
        return this.price;
    }

    getCapacity() {
        return this.capacity;
    }

    getDate() {
        return this.date;
    }

    getPriceInInt() {

        let priceInInt = this.price.split('/')[0].replace('$', '').trim();
        return priceInInt;

    }

    getTimeArr() {

        let nextDay;
        let [startTime, endTime] = this.time.split("-");

        startTime = startTime.trim();
        endTime = endTime.trim();

        startTime = this.convertTo24Hour(startTime);
        endTime = this.convertTo24Hour(endTime);

        const interval = 30;
        let timeArr = [];
        let hour = parseInt(startTime.slice(0, 2));
        let min = parseInt(startTime.slice(2));

        for (let check = startTime; check !== endTime;) {

            if (min >= 60) {
                min -= 60;
                hour += 1;
            }
            if (hour >= 24) {
                hour -= 24;
            }

            timeArr.push(String(hour).padStart(2, '0') + String(min).padStart(2, '0'));
            check = String(hour).padStart(2, '0') + String(min).padStart(2, '0');
            min += interval
        }

        // remove last element from timeArr as interval from endTime to endtime + 30min not valid for booking
        timeArr.pop();

        return timeArr;
    }

    // change time into 24 format
    convertTo24Hour(time) {
        let [first, second] = time.split(" ");
        let [hour, min] = first.trim().split(":");
        second = second.trim();
        hour = parseInt(hour);

        if (second === "AM") {

            if (hour === 12) {
                hour = '00';
            }

        } else {

            if (hour !== 12) {
                hour += 12;
            }

        }

        hour = String(hour).padStart(2, '0');
        min = String(min).padStart(2, '0');

        return `${hour}${min}`;
    }

}
//----------Events class----------//

//----------Promo codes class----------//
class PromoCode {

    constructor(title, discount) {
        this.title = title;
        this.discount = discount;
    }

    getTitle() {
        return this.title;
    }

    getDiscount() {
        return this.discount;
    }

    getDiscountInDouble() {
        let discountInDouble = this.discount.split('%').join('').trim();

        return (discountInDouble / 100);
    }
}
//----------Promo codes class----------//

//----------bookings class----------//
class Bookings {

    constructor(ref, user, event, promo, time, cost) {
        this.setEvent(event);
        this.setPromo(promo);
        this.ref = ref;
        this.user = user;
        this.time = time;
        this.cost = cost;
    }

    getRef() {
        return this.ref;
    }

    getUser() {
        return this.user;
    }

    getEvent() {
        return this.event;
    }

    getPromo() {
        return this.promo;
    }

    getTime() {
        return this.time;
    }

    getCost() {
        return this.cost
    }

    getTimeInterval() {

        let startTime, endTime, endTimeHour, endTimeMin;

        if (Array.isArray(this.time)) {

            startTime = this.time[0];
            endTime = this.time[(this.time.length - 1)];
            endTimeHour = parseInt(endTime.substring(0, 2));
            endTimeMin = 30 + (parseInt(endTime.substring(2)));

        } else {

            startTime = this.time;
            endTime = this.time;
            endTimeHour = parseInt(endTime.substring(0, 2));
            endTimeMin = 30 + (parseInt(endTime.substring(2)));

        }

        if (endTimeMin >= 60) {
            endTimeHour++;
            endTimeMin -= 60;
        }

        if (endTimeHour >= 24) {
            endTimeHour -= 24;
        }

        endTimeHour = String(endTimeHour).padStart(2, '0');
        endTimeMin = String(endTimeMin).padStart(2, '0');
        endTime = endTimeHour + endTimeMin;

        return (`${startTime} - ${endTime}`);
    }

    setEvent(event) {

        const matchedEvent = eventsArray.find(e => e.getTitle() === event.title);

        if (matchedEvent) {
            this.event = matchedEvent;
        }
    }

    setPromo(promo) {

        if (promo !== null) {

            const matchPromo = promosArray.find(e => e.getTitle() === promo.title);

            if (matchPromo) {
                this.promo = matchPromo;
            }

        } else {
            this.promo = null;
        }

    }

    setTime(time) {
        this.time = time;
    }
}
//----------bookings class----------//

//----------parse events from local storage into object----------//
function parseEvents() {

    let count = 0;
    const storedEvents = JSON.parse(localStorage.getItem('events'));

    if (storedEvents && storedEvents.length > 0) {

        storedEvents.forEach(array => {

            array.events.forEach(event => {
                // Create a Date object for the event's date
                let date = array.year + "/" + (array.month) + "/" + array.day;

                // Create an Event object and push it to the eventsArray
                eventsArray.push(new Event(event.title, event.time, event.price, event.capacity, date));
                count++;
            });

        });

        console.log(`Total ${count} event(s) pulled from local storage`);
        console.log('');

    } else {
        console.log("No events found in local storage.");
        console.log('');
    }
}
//----------parse events from local storage into object----------//

//----------parse promo codes from local storage into object----------//
function parsePromo() {

    let count = 0;
    const storedPromos = JSON.parse(localStorage.getItem('promos'));

    if (storedPromos && storedPromos.length > 0) {

        storedPromos.forEach(promo => {

            promosArray.push(new PromoCode(promo.title, promo.amount));
            count++;

        });

        console.log(`Total ${count} promo code(s) pulled from local storage`);
        console.log('');

    } else {
        console.log("No promo codes found in local storage.");
        console.log('');
    }
}
//----------parse promo codes from local storage into object----------//

//----------parse bookings from local storage into object----------//
function parseBookings() {

    let count = 0;
    const storedBookings = JSON.parse(localStorage.getItem('bookings'));

    if (storedBookings && storedBookings.length > 0) {

        storedBookings.forEach(booking => {

            bookingsArray.push(new Bookings(booking.ref, booking.user, booking.event, booking.promo, booking.time, booking.cost));
            count++;

        });

        console.log(`Total ${count} booking(s) pulled from local storage`);
        console.log('');

    } else {
        console.log("No bookings found in local storage.");
        console.log('');
    }
}
//----------parse bookings from local storage into object----------//

//----------add bookings into container----------//
function addBookings() {

    content = '';
    const userNow = JSON.parse(localStorage.getItem('userNow'));

    if (!userNow) {
        alert("No user!");
    }

    if (bookingsArray.length > 0) {

        bookingsArray.forEach((booking, index) => {

            if (booking.getUser() === userNow) {
                content += `
                        <div class="event-btn" id="event_btn${index}">
                            <div class="event-details">
                                <label class="title">${booking.getRef()}</label>
                                <label class="detail">Time: ${booking.getTimeInterval()}</label>
                                <label class="detail">Cost: ${booking.getCost()}</label>
                            </div>
                        </div>
                        `;

            }
        });
    }

    document.getElementById('bookings').insertAdjacentHTML("beforeend", content);

    bookingsArray.forEach((booking, index) => {
        const btn = document.getElementById(`event_btn${index}`)
        if (btn !== null) {
            btn.addEventListener('click', () => {

                selectedBooking = booking;
                updateBookingContainer(booking);

            });
        }
    });

}
//----------add bookings into container----------//

//----------update booking container----------//
function updateBookingContainer(booking) {

    let content = '';

    if (booking !== null) {

        content += `
                    <h2>Details</h2>
                        <div class="details-container">
                            <div class="detail"><label class="title">Booking Ref: </label><label>${booking.getRef()}</label></div>
                            <div class="detail"><label class="title">Room: </label><label>${booking.getEvent().getTitle()}</label></div>
                            <div class="detail"><label class="title">Date: </label><label>${booking.getEvent().getDate()}</label></div>
                            <div class="detail"><label class="title">Time: </label><label>${booking.getTimeInterval()}</label></div>
                        </div>

                    
                        <div class="btn-container">
                            <button class="click-btn" id="edit_booking">Edit Booking</button>
                            <button class="logout-btn" id="cancel_booking">Cancel Booking</button>
                        </div>
                    `;
    } else {

        content += `
                    <h2>Details</h2>
                        <div class="details-container">
                            <div class="detail"><label class="title">No selection </label>
                        </div>
                    `;

    }

    document.getElementById("details_container").innerHTML = content;
    const editBtn = document.getElementById("edit_booking");
    const cancelBtn = document.getElementById("cancel_booking");

    if (editBtn) {
        editBtn.addEventListener('click', () => {

            ToggleEditContainer();
            updateEditContainer(booking);

        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {

            ToggleConfirmationContainer(booking);

        });
    }

}
//----------update booking container----------//


//----------update edit container----------//
function updateEditContainer(booking) {

    let content = '';

    booking.getEvent().getTimeArr().forEach(time => {

        content += `
                    <input type="checkbox" class="time-checkbox" id="${time}">
                    <label for="${time}" class="time-checkbox-label">${time}</label>
                    `;

    });

    document.getElementById("time_selection").innerHTML = content;
    const timeBtns = document.querySelectorAll(".time-checkbox");

    timeBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            updateSummary();

        });

    });

    timeBtns.forEach(btn => {

        if (Array.isArray(booking.getTime())) {

            booking.getTime().forEach(time => {

                document.getElementById(`${time}`).checked = true;

            });

        }

    });

    bookingsArray.forEach(booked => {

        if ((booked.getEvent() === booking.getEvent()) && (booked !== booking)) {

            timeBtns.forEach(btn => {

                if (Array.isArray(booked.getTime()) && booked.getTime().includes(btn.id)) {
                    btn.disabled = true;
                }

            });
        }

    });

    if (booking.getPromo()) {
        document.getElementById("promo_input").value = booking.getPromo().getTitle();
        promoApplied = booking.getPromo();
    }

    updateSummary();

}
//----------update edit container----------//

//----------function to check promo----------//
function checkPromo(input) {

    let promoSpan = document.getElementById("promo_span");
    let message = 'Invalid promo code!';

    promosArray.forEach(promo => {

        if (promo.getTitle() !== input) {

            promoSpan.innerHTML = message;
            console.log(message);
            promoApplied = null;

        } else {

            promoSpan.innerHTML = '';
            promoApplied = promo;

        }

    });

    updateSummary();

}
//----------function to check promo----------//

//----------update Summary----------//
function updateSummary() {

    let totalInterval = 0;
    const checkboxes = document.querySelectorAll(".time-checkbox");

    checkboxes.forEach(checkbox => {

        if (checkbox.checked) {
            totalInterval++;
        }

    });

    let content = '';
    let price = selectedBooking.getEvent().getPriceInInt();
    let totalPrice = price * totalInterval;


    let discountPercent, discountRate;
    if (promoApplied === null) {
        discountRate = 0;
        discountPercent = '-';
    } else {
        discountRate = parseFloat(promoApplied.getDiscountInDouble());
        discountPercent = promoApplied.getDiscount();
    }

    let priceAtferDiscount = totalPrice * (1 - discountRate);

    content += `
                <div class="payment-detail"><label>${price} x ${totalInterval}session(s)</label><label>$${totalPrice}</label></div>
                <div class="payment-detail"><label>Promo Discount:</label><label>${discountPercent}</label></div>
                <div class="payment-total"><label>Total Charge</label><label id="payment_total">$${priceAtferDiscount}</label></div>
                `;

    document.getElementById('payment_detail').innerHTML = content;

}
//----------update Summary----------//

//----------update booking array when confrim----------//
function updateBookingUponConfirm() {

    let timeArr = [];

    const checkbox = document.querySelectorAll(".time-checkbox");

    checkbox.forEach(btn => {

        if (btn.checked) {

            timeArr.push(btn.id);

        }

    });

    selectedBooking.setTime(timeArr);

    localStorage.setItem("bookings", JSON.stringify(bookingsArray));
}
//----------update booking array when confrim----------//

//----------cancel booking----------//
function cancelBooking() {

    bookingsArray.splice(bookingsArray.indexOf(selectedBooking), 1);
    localStorage.setItem("bookings", JSON.stringify(bookingsArray));

}
//----------cancel booking----------//