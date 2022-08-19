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
var cityID = destinationId[city];
console.log(cityID);



//Getting the Destination Id from the Server but using an Object containing Destination IDs to save on API Calls.

// const cityID = function () {
//     const xhr = new XMLHttpRequest();
//     const data = null;

//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             // console.log(JSON.parse(this.responseText));
//             console.log(JSON.parse(this.response));
//             // localStorage.setItem('queryResponse', JSON.parse(this.response));
//             var response = JSON.parse(this.response);
//             console.log("City Id / Destination Id = " + response.suggestions[0].entities[0].destinationId);
//             return response.suggestions[0].entities[0].destinationId;
//         }
//     });

//     xhr.open("GET", `https://hotels4.p.rapidapi.com/locations/v2/search?query=${city}&locale=en_US&currency=INR`);
//     xhr.setRequestHeader("X-RapidAPI-Key", "dfc5114d20mshcb87254d467e008p1945e8jsnce449f125de8");
//     xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

//     xhr.send(data);
// }



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

        }
    });

    xhr.open("GET", `https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityID}&pageNumber=1&pageSize=25&checkIn=${today}&checkOut=${tomorrow}&adults1=1&locale=en_US&currency=INR`);
    xhr.setRequestHeader("X-RapidAPI-Key", "dfc5114d20mshcb87254d467e008p1945e8jsnce449f125de8");
    xhr.setRequestHeader("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

    xhr.send(data);
}

if (cityID !== undefined || cityID !== null) { List(); }







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

function details(hotelId, hotelName, hotelImage, hotelRating, city){
    console.log('In the Details');
    localStorage.setItem('hotelId', hotelId);
    localStorage.setItem('hotelName', hotelName);
    localStorage.setItem('hotelImage', hotelImage);
    localStorage.setItem('hotelRating', hotelRating);
    localStorage.setItem('city', city);
}