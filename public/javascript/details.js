// Get the details of the selected property
function getDetails() {
  const pId = (new URLSearchParams(window.location.search)).get("property");

  var data = JSON.stringify({
    id: pId
  });

  var xml = new XMLHttpRequest();
  xml.open('POST', 'details', true);
  xml.setRequestHeader("Content-type", "application/json");
  xml.onreadystatechange = () => {
    if (xml.readyState == 4 && xml.status == 200) {
      buildPage(JSON.parse(xml.responseText)[0]);
    }
  };
  xml.send(data);
}

// Build the webpage (replace placeholder text)
function buildPage(res) {
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
  location.textContent =  res.location;
  if (res["AVG(r.rating)"] != null) {
    rating.textContent = res["AVG(r.rating)"] + "/5";
  }
  bedrooms.textContent = "Bedrooms: " + res.bedrooms;
  bathrooms.textContent = "Bathrooms: " + res.bathrooms;
  description.textContent = res.description;
  amenities.textContent = res.ammenities;

  document.querySelectorAll("input[type=hidden]")[0].setAttribute("value", (new URLSearchParams(window.location.search)).get("property"));
  document.querySelectorAll("input[type=hidden]")[1].setAttribute("value", (new URLSearchParams(window.location.search)).get("property"));

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
function buildBookings() {

  const pId = (new URLSearchParams(window.location.search)).get("property");
  const mList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var select = document.getElementById("dates");
  var thisMonth = getWeeksInMonth((new Date()).getMonth() + 1, (new Date()).getFullYear());
  var nextMonth = getWeeksInMonth((new Date()).getMonth() + 2, (new Date()).getFullYear());

  var data = JSON.stringify({
    id: pId
  });

  var xml = new XMLHttpRequest();
  xml.open('POST', 'book/avail', true);
  xml.setRequestHeader("Content-type", "application/json");
  xml.onreadystatechange = () => {
    if (xml.readyState == 4 && xml.status == 200) {
      var avail = JSON.parse(xml.responseText);
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
  };
  xml.send(data);
}

// Call my functions
getDetails();
buildBookings();
