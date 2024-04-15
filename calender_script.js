$(document).ready(function() {
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd", // Format of the selected date
        onSelect: function(dateText, inst) {
            console.log("Selected date:", dateText);
        }
    });


    //Example of retriving value from date picker
    //Add in following line to use functiob below
    //<button id="getSelectedDate">Get Selected Date</button>
    $("#getSelectedDate").click(function() {
        var selectedDate = $("#datepicker").val();
        console.log("Selected date:", selectedDate);
    });
});
