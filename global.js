//----------Global Variables----------//
var eventsArray = [];
var promosArray = [];
var bookingsArray = [];
var bookingsArr = [];
var promoApplied = null
var selectedEvent = null;
var refNo = 0;
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