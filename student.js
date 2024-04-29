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
    localStorage.setItem("bookings", JSON.stringify(bookingsArr));
    localStorage.setItem("promos", JSON.stringify(promosArr));
    localStorage.setItem("events", JSON.stringify(eventsArr));
    console.log("push done");
    console.log("")
}
//----------default data used for testing----------//

//----------Basic Funtion for student.html----------//
function toggleBooking() {
    const bookingContainer = document.getElementById("booking_container");
    bookingContainer.classList.toggle("show-booking-container");
    resetSummary();
}
//----------Basic Funtion for student.html----------//

//----------Initailize----------//
function Initialize() {
  //  addDefaultData();
    initEventListener();
    parseStudentEvent();
    parsePromoCodes();
    parseBookings();
    addStudentEvent();
    resetSummary();

    // for console logs
    consoleLog();
}

window.onload = Initialize;
//----------Initailize----------//

//-----------Adding Event listener----------//
function initEventListener() {
    document.body.addEventListener('click', (event) => {
        const bookingContainer = document.getElementById("booking_container");
        const eventBtn = document.querySelectorAll('.event-btn');
        const clickedElement = event.target;

        // Check if the clicked element is inside the dedicated container
        const isInsideBookingContainer = bookingContainer.contains(clickedElement);
        const isInsideEventBtn = Array.from(eventBtn).some(btn => btn.contains(clickedElement));
        const isBookingContainerOpened = bookingContainer.classList.contains("show-booking-container");
        const toggle = (isInsideEventBtn && !isBookingContainerOpened) || (!isInsideBookingContainer && !isInsideEventBtn && isBookingContainerOpened);

        // for console logs
        console.log(`Toggle Booking Container: ${toggle}`);
        console.log('');

        // If the clicked element is not inside the dedicated area toggle booking container
        if (toggle) {
            toggleBooking();
        }

        // reset summary if click on event-btn

        if (isInsideEventBtn) {
            resetSummary();
        }
    });

    document.getElementById('book_btn').addEventListener('click', () => {
        book();
        bookingsArr = bookingsArray;
        localStorage.setItem("bookings", JSON.stringify(bookingsArr));
        //window.location.href = "payment.html";
    });

    document.getElementById('promo_input').addEventListener('input', () => {

        const inputValue = document.getElementById('promo_input').value;
        checkPromo(inputValue);

    });

    document.querySelector('.days').addEventListener('click', () => {

        addStudentEvent();

    });
}
//-----------Adding Event listener----------//

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
        console.log('promosArray is empty!');
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

//----------Parse event from local storage into object----------//
function parseStudentEvent() {

    let count = 0;
    // Retrieve data from local storage
    const storedEvents = JSON.parse(localStorage.getItem("events"));

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
//----------Parse event from local storage into object----------//

//----------Parse promo codes from local storage into object----------//
function parsePromoCodes() {

    let count = 0;

    // Retrive data from local storage
    const storedPromo = JSON.parse(localStorage.getItem("promos"));

    if (storedPromo && storedPromo.length > 0) {

        storedPromo.forEach(promo => {

            count++;

            promosArray.push(new PromoCode(promo.title, promo.amount));

        });

        console.log(`Total ${count} promo code(s) pulled from local storage`);
        console.log('');

    } else {
        console.log("No promo codes found in local storage.");
        console.log('');
    }
}
//----------Parse promo codes from local storage into object----------//

//----------Parse bookings from local storage into object----------//
function parseBookings() {

    let count = 0;

    // reteive data from local storage
    const storedBookings = JSON.parse(localStorage.getItem("bookings"))

    if (storedBookings && storedBookings.length > 0) {

        storedBookings.forEach(booking => {

            count++;

            bookingsArray.push(new Bookings(booking.ref, booking.user, booking.event, booking.promo, booking.time, booking.cost));

        });

        getRefNow();

        console.log(`Total ${count} booking(s) pulled from local storage`);
        console.log('');

    } else {
        console.log("No bookings found in local storage.");
        console.log('');
    }
}

// get Ref
function getRefNow() {

    bookingsArray.forEach(booking => {

        if (booking.getRef() > refNo) {
            refNo = booking.getRef();
        }

    });
}
//----------Parse bookings from local storage into object----------//

//----------Add event into Event Viewer----------//
function addStudentEvent() {

    // clear innerHTML of events container
    document.getElementById('events_container').innerHTML = '';

    const day = document.querySelector('.day.active').innerHTML.trim(); // Check if the element exists
    const [month, year] = document.querySelector('.date').innerHTML.trim().split(' '); // Check if the element exists

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthInDigit = months.indexOf(month) + 1;

    const date = year + '/' + monthInDigit + '/' + day;
    let getEvent = false;

    // console logs
    console.log(`date today: ${date}`);
    console.log('');

    let content = '';

    eventsArray.forEach((event, index) => {
        if (event.getDate() == date) {
            getEvent = true;
            content += `
                <div class="event-btn" id="event_btn${index}">
                    <div class="event-details">
                        <label class="title">${event.getTitle()}</label>
                        <label class="detail">Time: ${event.getTime()}</label>
                        <label class="detail">Price: ${event.getPrice()}</label>
                        <label class="detail">Capacity: ${event.getCapacity()}</label>
                    </div>
                </div>`;
        }
    });

    document.getElementById('events_container').insertAdjacentHTML('beforeend', content);

    // Implement event listener for event-btn
    eventsArray.forEach((event, index) => {
        const btn = document.getElementById(`event_btn${index}`)
        if (btn !== null) {
            btn.addEventListener('click', () => {
                updateBookingContainer(event);
                selectedEvent = event;
            });
        }
    });


    if (!getEvent) {
        content += `
                    <div class="no-event-container">
                    <div class="no-event">No Event</div>
                    </div>
                    `;
    }

}
//----------Add event into Event Viewer----------//

//----------Update Booking Container when click on Event btn----------//
function updateBookingContainer(event) {



    // add innerHTML for time-selection
    let content = '';

    event.getTimeArr().forEach(time => {
        content += `
                    <input type="checkbox" class="time-checkbox" id="${time}" value="${time}">
                    <label for="${time}" class="time-checkbox-label">${time}</label>
                    `
    })

    document.getElementById('time_selection').innerHTML = content;

    // disable time if it is booked by other booking(s)
    bookingsArray.forEach((booking) => {

        console.log(booking);

        if (booking.getEvent().getTitle() === event.getTitle()) {

            booking.getTime().forEach(time => {

                let checkbox = document.getElementById(`${time}`);

                if (checkbox !== null) {
                    checkbox.disabled = true;
                }

            });

        }

    });

    //implement event listener to eacj time-checkbox
    document.querySelectorAll('.time-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            updateSummary();
        });
    });

    // for console logs
    event.getTimeArr().forEach(time => {
        console.log(time);
    })
    //----------time selection----------//
}

//----------Update Booking Container when click on Event btn----------//

//----------promo codes----------//
function checkPromo(input) {
    let promoSpan = document.getElementById('promo_input_span');
    const message = 'Invalid promo code!';

    promosArray.forEach(promo => {

        if (input === promo.getTitle()) {

            match = true;
            promoApplied = promo;
            promoSpan.innerHTML = '';

        } else {

            promoApplied = null;
            promoSpan.innerHTML = message;

        }

    });

    updateSummary();
}
//----------promo codes----------//

//----------update summary on changes----------//
function updateSummary() {

    // check total time interval booked
    const checkboxes = document.querySelectorAll('.time-checkbox');
    let totalInterval = 0;

    checkboxes.forEach(checkbox => {

        if (checkbox.checked) {
            totalInterval++;
        }

    });

    let content = '';
    let price = parseInt(selectedEvent.getPriceInInt());
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

    document.getElementById('payment_details').innerHTML = content;
}
//----------update summary on changes----------//

//----------reset Summary----------//
function resetSummary() {
    let content = `
                    <div class="payment-detail"><label>Not Selected</label><label>-</label></div>
                    <div class="payment-detail"><label>Promo Discount:</label><label>-</label></div>
                    <div class="payment-total"><label>Total Charge</label><label>$0</label></div>
                `;

    document.getElementById('payment_details').innerHTML = content;
}
//----------reset Summary----------//

//----------book----------//
function book() {

    const checkboxes = document.querySelectorAll('.time-checkbox');
    let timeSelected = [];

    checkboxes.forEach(checkbox => {

        if (checkbox.checked) {
            timeSelected.push(checkbox.value);
        }

    });

    const userNow = JSON.parse(localStorage.getItem("userNow"));
    const cost = document.getElementById('payment_total').innerHTML.trim();

    bookingsArray.push(new Bookings(++refNo, userNow, selectedEvent, promoApplied, timeSelected, cost));

    console.log(`Selected time: ${timeSelected}`);
    console.log("Booking:", bookingsArray[bookingsArray.length - 1]);
}
//----------book----------//
//----------Update Booking Container when click on Event btn----------//