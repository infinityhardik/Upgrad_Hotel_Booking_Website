// Access Key for API. Please input your Access Key for API to work properly.
// Get your API key for Hotels API by api dojo from https://rapidapi.com/apidojo/api/hotels4/pricing 
// Key 1 : dfc5114d20mshcb87254d467e008p1945e8jsnce449f125de8
// Key 2 : 6bbf55f842mshe4958b387597262p193138jsn46840aeff3e6
var key = '6bbf55f842mshe4958b387597262p193138jsn46840aeff3e6';

document.getElementById('Book_Now').disabled = true;

function calculate(adults, from_date, to_date, customer_name) {
    console.log(adults.value, from_date.value, to_date.value);
    var todate = to_date.value;
    var fromdate = from_date.value;

    var to = new Date(to_date.value);
    var from = new Date(from_date.value);
    var days = to.getDate() - from.getDate();

    // Setting the Book Now Button based on input and calculating the amount
    if (days > 0) {
        let amount = adults.value * days * 1000;
        document.getElementById("price").value = "Rs. " + amount;

        localStorage.setItem('adults', adults.value);
        localStorage.setItem('from', todate);
        localStorage.setItem('to', fromdate);
        localStorage.setItem('amount', amount);
        localStorage.setItem('days', days);
        localStorage.setItem('customer_name', customer_name.value);

        document.getElementById('Book_Now').disabled = false;
    } else {
        document.getElementById('Book_Now').disabled = true;
    }
}


var hotelId = localStorage.getItem('hotelId');
console.log(hotelId);

images(hotelId);
details(hotelId);


function images(id) {
    const xhr = new XMLHttpRequest();
    const data = null;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var obj = JSON.parse(this.responseText);
            imageCarousel(obj);
        }
    });

    xhr.open("GET", `https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${id}`);
    xhr.setRequestHeader("X-RapidAPI-Key", `${key}`);
    xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

    xhr.send(data);
}

function details(id) {
    const xhr = new XMLHttpRequest();
    const data = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var obj = JSON.parse(this.responseText);
            printDetails(obj);
        }
    });

    xhr.open("GET", `https://hotels4.p.rapidapi.com/properties/get-details?id=${id}`);
    xhr.setRequestHeader("X-RapidAPI-Key", `${key}`);
    xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

    xhr.send(data);
}


function imageCarousel(obj) {
    obj.hotelImages.forEach(element => {
        var imageSrc = element.baseUrl.replace('_{size}', '');
        console.log(imageSrc);
        var imageTemplate = `<div class="carousel-item">
        <img class="d-block" src="${imageSrc}">
        </div>`;
        document.querySelector('#carousel_images').innerHTML += imageTemplate;
    });

    // console.log(document.getElementsByClassName('carousel-item')[0]);
    document.getElementsByClassName('carousel-item')[0].setAttribute('class', 'carousel-item active');
    localStorage.setItem('hotelImage', obj.hotelImages[0].baseUrl.replace('_{size}', ''));
}

function printDetails(obj) {

    var hotelName = localStorage.getItem('hotelName');
    var hotelRating = localStorage.getItem('hotelRating');
    var tagline = obj.data.body.propertyDescription.tagline[0];
    var amenities = getAmenities(obj);

    var bodyTemplate = `<div id="description">
    <h2>${hotelName}</h2>
    <h5>RATING</h5>
    <span id="rating">${hotelRating}</span>
    <span class="fa fa-star checked"></span>
    <h5>AMENITIES</h5>
    <ul id="amenities">
        <li>Room Service</li>
        ${amenities}
    </ul>
    
    <h5>DESCRIPTION</h5>
    <p>${tagline}</p>
    </div>`;

    document.getElementById('content').innerHTML += bodyTemplate;

    // Calling Remove Loader Function after the List has been Loaded
    removeLoader();
}

function getAmenities(obj) {
    var result = "";
    obj.data.body.overview.overviewSections[0].content.forEach((element) => {
        var body = `<li>${element}</li>`;
        result += body;
    });
    console.log(result);

    return result;
}


function removeLoader() {
    document.getElementById('preload-container').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}