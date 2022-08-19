// Access Key for API. Please input your Access Key for API to work properly.
// Get your API key for Hotels API by api dojo from https://rapidapi.com/apidojo/api/hotels4/pricing
// Key 1 : dfc5114d20mshcb87254d467e008p1945e8jsnce449f125de8
// Key 2 : 6bbf55f842mshe4958b387597262p193138jsn46840aeff3e6
var key = '6bbf55f842mshe4958b387597262p193138jsn46840aeff3e6';

const xhr = new XMLHttpRequest();

//Getting the City Name from Index.html
var city = localStorage.getItem('city');
localStorage.removeItem('city');
console.log(city);

var City = toTitleCase(city);

// Creating Dates for Property Search
var date = new Date()
var currentMonth = (date.getMonth() + 1);
if (currentMonth < 10) { currentMonth = '0' + currentMonth; }

var today = date.getFullYear() + '-' + currentMonth + '-' + date.getDate();
//Acts as a Check In Parameter for API Call

var tomorrow = date.getFullYear() + '-' + currentMonth + '-' + (date.getDate() + 1);
//Acts as a Check Out Parameter for API Call

console.log(today);
console.log(tomorrow);

var destinationId = {
    delhi: 675357,
    goa: 677380,
    hyderabad: 685250,
    kolkata: 682252,
    chennai: 1640676,
    agra: 685824,
    jaipur: 10565445,
    bengaluru: 678196
}

// Acts as a parameter for getting List of Hotels
if (destinationId[city] !== null && destinationId[city] !== undefined) {
    var cityID = destinationId[city];
    console.log(cityID+` is found in JS Object`);
    List();
} else {
    inputCityID(city);
}

//Getting the Destination Id from the Server but using an Object containing Destination IDs to save on API Calls.

function inputCityID(cityName) {
    const xhr = new XMLHttpRequest();
    const data = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            // console.log(JSON.parse(this.responseText));
            console.log(JSON.parse(this.response));
            // localStorage.setItem('queryResponse', JSON.parse(this.response));
            var response = JSON.parse(this.response);
            console.log("City Id / Destination Id fetched from server = " + response.suggestions[0].entities[0].destinationId);
            cityID = response.suggestions[0].entities[0].destinationId;
            
            console.log(cityID+` fetched from server`);

            // Calling List function after fetching the City ID.
            List();
        }
    });

    xhr.open("GET", `https://hotels4.p.rapidapi.com/locations/v2/search?query=${cityName}&locale=en_US&currency=INR`);
    xhr.setRequestHeader("X-RapidAPI-Key", `${key}`);
    xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

    xhr.send(data);
}


function List() {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            // console.log(this.responseText);
            console.log(JSON.parse(this.responseText));
            var str = JSON.parse(this.responseText);

            var hotels = str.data.body.searchResults;

            hotels.results.forEach(element => {
                var hotelId = element.id;
                var hotelImage = element.optimizedThumbUrls.srpDesktop;
                var hotelName = element.name;
                var hotelRating = element.starRating;

                var template = `<a class="text-decoration-none text-reset" href="detail.html">
                <div class="hotels" id="${hotelId}" onclick="details(${hotelId},'${hotelName}', '${hotelImage}', ${hotelRating}, '${City}')">
                    <div class="hotels_img">
                        <img src="${hotelImage}">
                    </div>
                    <div class="hotels_description">
                        <h3>${hotelName}</h3>
                        <div class="star">
                            <span>${hotelRating}<span>
                            <span class="fa fa-star checked"></span>
                        </div>
                        <p>${City}</p>
                    </div>
                </div>
                </a>`;

                document.getElementById('content').innerHTML += template;

            });

            // Adding Map View after List View
            document.getElementById('content').innerHTML += `<div id="map_view">
            <img src="https://cdn.pixabay.com/photo/2018/01/31/05/43/web-3120321_960_720.png" alt="Map Image">
            </div>`;
            
            // Calling Remove Loader Function after the List has been Loaded
            removeLoader();
        }
    });

    xhr.open("GET", `https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityID}&pageNumber=1&pageSize=25&checkIn=${today}&checkOut=${tomorrow}&adults1=1&locale=en_US&currency=INR`);
    xhr.setRequestHeader("X-RapidAPI-Key", `${key}`);
    xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

    xhr.send(data);
}


// To convert String to Title Case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// console.log(toTitleCase(city));

function details(hotelId, hotelName, hotelImage, hotelRating, city) {
    console.log('In the Details');
    localStorage.setItem('hotelId', hotelId);
    localStorage.setItem('hotelName', hotelName);
    localStorage.setItem('hotelImage', hotelImage);
    localStorage.setItem('hotelRating', hotelRating);
    localStorage.setItem('city', city);
}

function removeLoader(){
    document.getElementById('preload-container').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}