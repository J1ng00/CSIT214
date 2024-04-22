//store events in local storage 

window.saveEvents = function(){ 
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

window.getEvents = function(){
    if(localStorage.getItem("event" != null)){
        return;
    }

    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}