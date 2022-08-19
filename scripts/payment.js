var paybtn = `<button type="button" class="btn btn-success" id="paymentButton" onclick="paymentStatus()">Pay Now</button>`;
document.getElementById('payment').innerHTML = paybtn;
document.getElementById('paymentButton').disabled = true;


var state = document.querySelector("header button");
state.addEventListener('click', () => {
    if (state.innerText === "LOGOUT") {
        document.getElementById('paymentButton').disabled = true;
    } else {
        document.getElementById('paymentButton').disabled = false;
    }
});


function paymentStatus() {
    alert("Hi, Your Booking is successful !!")
}

var adults = localStorage.getItem('adults');
var to = localStorage.getItem('to');
var from = localStorage.getItem('from');
var amount = localStorage.getItem('amount');
var days = localStorage.getItem('days');
var customer_name = localStorage.getItem('customer_name');
var hotelName = localStorage.getItem('hotelName');
var city = localStorage.getItem('city');
var hotelImage = localStorage.getItem('hotelImage');

display();


function display() {
    var customer = `<p><b>Name:</b> ${customer_name}</p>
    <p><b>Number of Adults:</b> ${adults}</p>
    <p><b>Check-in Date:</b> ${to}</p>
    <p><b>Check-out Date:</b> ${from}</p>`;
    document.querySelector('#customer_details').innerHTML += customer;
    
    var tariff = `<p><b>Tariff Breakdown:</b> Rs.1000 x ${adults} Adults x ${days} Nights</p>
    <p><b>Total Amount:</b> Rs. ${amount}</p>`;
    document.querySelector('#tariff_details').innerHTML += tariff;

    var hotel = `<h3>${hotelName}</h3>
    <p>#38 of 1289 Hotels in ${city}</p>
    <p>${city}, India</p>`;
    document.querySelector("#hotel_description").innerHTML += hotel;

    document.querySelector('#hotel_img').innerHTML +=`<img src="${hotelImage}">`;
    
    // Calling Remove Loader Function after the List has been Loaded
    removeLoader();
}


function removeLoader(){
    document.getElementById('preload-container').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}