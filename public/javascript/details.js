// Get the details of the selected property
async function getData() {
  const pId = (new URLSearchParams(window.location.search)).get("property");
  var data = JSON.stringify({
    id: pId
  });
  var url = "details";
  var method = "POST";
  var headers = {
    "Content-Type": "application/json"
  };

  var res = await fetch(url, {
    method: method,
    headers: headers,
    body: data
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return await res.json();
}

// Build the webpage (replace placeholder text)
function buildPage(res) {
  var res = res[0];
  console.log(res);
  var title = document.getElementById("title");
  var owner = document.getElementById("owner");
  var price = document.getElementById("price");
  var location = document.getElementById("location");
  var rating = document.getElementById("rating");
  var bedrooms = document.getElementById("bedrooms");
  var bathrooms = document.getElementById("bathrooms");
  var description = document.getElementById("description");
  var amenities = document.getElementById("amenities");
  var img = document.querySelector("img");

  img.setAttribute("src", "images/" + res.image);
  title.textContent = res.title;
  owner.textContent = res.fName + " " + res.lName;
  if (res.superhost == "t") {
    owner.textContent += " SUPERHOST";
  }
  price.textContent = "$" + res.price + " per night";
  location.textContent =  res.address;
  if (res["AVG(r.rating)"] != null) {
    rating.textContent = res["AVG(r.rating)"] + "/5";
  }
  bedrooms.textContent = "Bedrooms: " + res.bedrooms;
  bathrooms.textContent = "Bathrooms: " + res.bathrooms;
  description.textContent = res.description;
  amenities.textContent = res.ammenities;

  document.querySelectorAll("input[type=hidden]")[0].setAttribute("value", (new URLSearchParams(window.location.search)).get("property"));
  document.querySelectorAll("input[type=hidden]")[1].setAttribute("value", (new URLSearchParams(window.location.search)).get("property"));

  return res.address;

}

// function to get the coordinates for address
async function getLngLat(location) {
  var key = "p5nE7vpUu74Flga2vPKXuMiGm6moHthA";
  var url = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`;
  var method = "POST";

  var res = await fetch(url, {
    method: method
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  var json = await res.json();
  latLng = json.results[0].locations[0].latLng;

  return latLng;
}

// builds the google map
function makeMap(latLng) {
  var map;
  var location = {
    lat: latLng.lat,
    lng: latLng.lng
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 12
  });

  var locationMarker = new google.maps.Marker({position: location, map:map});
}

// Function found online to get all weeks of a set month and year
function getWeeksInMonth(month, year){
   var weeks=[],
       firstDate=new Date(year, month, 1),
       lastDate=new Date(year, month+1, 0),
       numDays= lastDate.getDate();

   var start=1;
   var end=7-firstDate.getDay();
   while(start<=numDays){
       weeks.push({start:start,end:end});
       start = end + 1;
       end = end + 7;
       if(end>numDays)
           end=numDays;
   }
    return weeks;
}

// Builds out the options for booking dates, removing already booked weeks
async function getAvailibility() {
  const pId = (new URLSearchParams(window.location.search)).get("property");
  var data = JSON.stringify({
    id: pId
  });
  var url = "book/avail";
  var method = "POST";
  var headers = {
    "Content-Type": "application/json"
  };

  var res = await fetch(url, {
    method: method,
    headers: headers,
    body: data
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return await res.json();
}

// Makes the bookings
function makeBookings(avail) {
  const mList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var select = document.getElementById("dates");
  var thisMonth = getWeeksInMonth((new Date()).getMonth() + 1, (new Date()).getFullYear());
  var nextMonth = getWeeksInMonth((new Date()).getMonth() + 2, (new Date()).getFullYear());
  var res = []

  for (var i = 0; i < avail.length; i++) {
    res.push(avail[i].dates);
  }
  for (var i = 0; i < thisMonth.length; i++) {
    if (!res.includes(`${mList[(new Date()).getMonth() + 1]} ${thisMonth[i].start} - ${thisMonth[i].end}`)) {
      var option = document.createElement("option");
      option.setAttribute("value", `${mList[(new Date()).getMonth() + 1]} ${thisMonth[i].start} - ${thisMonth[i].end}`);
      option.textContent = `${mList[(new Date()).getMonth() + 1]} ${thisMonth[i].start} - ${thisMonth[i].end}`;
      select.appendChild(option);
    }
  }
  for (var i = 0; i < nextMonth.length; i++) {
    if (!res.includes(`${mList[(new Date()).getMonth() + 2]} ${nextMonth[i].start} - ${nextMonth[i].end}`)) {
      var option = document.createElement("option");
      option.setAttribute("value", `${mList[(new Date()).getMonth() + 2]} ${nextMonth[i].start} - ${nextMonth[i].end}`);
      option.textContent = `${mList[(new Date()).getMonth() + 2]} ${nextMonth[i].start} - ${nextMonth[i].end}`;
      select.appendChild(option);
    }
  }
}

// Call my functions
getData()
  .then(value => buildPage(value))
  .then(value => getLngLat(value))
  .then(value => makeMap(value))
  .then(() => getAvailibility())
  .then(value => makeBookings(value))
  .catch(err => console.log(err));
