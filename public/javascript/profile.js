// request to server to get all properties belonging to user
function getProperties() {
  var xml = new XMLHttpRequest();
  xml.overrideMimeType("application/json");
  xml.open('POST', 'profile', true);
  xml.onreadystatechange =  () => {
    if (xml.readyState == 4 && xml.status == 200) {
      console.log(xml.responseText);
      buildPropertyList(JSON.parse(xml.responseText));
    }
  };
  xml.send(null);
}

// funciton to build a list of properties and display it
function buildPropertyList(list) {

  var properties = [];

  for (var i = 0; i < list.length; i++) {
    var current = list[i];
    if (current.discount == "t") {
      properties.push(new PropertyDiscount(current.id, current.title, current.price, current.address, current.bedrooms, current.bathrooms, current.image, current.ammenities, current.description, current["AVG(r.rating)"], current.superhost));
    } else {
      properties.push(new Property(current.id, current.title, current.price, current.address, current.bedrooms, current.bathrooms, current.image, current.ammenities, current.description, current["AVG(r.rating)"], current.superhost));
    }
    document.querySelector("ul").appendChild(properties[i].displayList);
  }

  document.getElementById("name").textContent = list[0].fName + " " + list[0].lName;

}

// call function
getProperties();

// property class
class Property {
  // constructor, assigns variables
  constructor(id, title, price, location, bedrooms, bathrooms, image, amenities, description, rating, superhost) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.location = location;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.image = image;
    this.amenities = amenities;
    this.description = description;
    if (rating != null) {
      this.rating = rating + "/5";
    } else {
      this.rating = null;
    }
    this.superhost = superhost;
  }

  // get function, returns the object as an html element to be displayed
  get displayList() {
    var node = document.createElement("li");
    var anchorNode = document.createElement("a");
    var imageNode = document.createElement("img");
    var titleNode = document.createElement("h3");
    var priceNode = document.createElement("p");
    var ratingNode = document.createElement("p");
    var locationNode = document.createElement("p");
    var descriptionNode = document.createElement("p");
    var divNode = document.createElement("div");
    var divNode2 = document.createElement("div");
    var deleteNode = document.createElement("a");

    imageNode.setAttribute("src", `images/${this.image}`);
    imageNode.setAttribute("height", "192px");
    imageNode.setAttribute("width", "192px");
    anchorNode.setAttribute("href", `/details?property=${this.id}`);
    deleteNode.setAttribute("href", "/delete?property=" + this.id);
    deleteNode.setAttribute("onclick", "return confirm('Are you sure?')");
    deleteNode.setAttribute("class", "delete")

    titleNode.textContent = this.title;
    priceNode.textContent = "$" + this.price;
    ratingNode.textContent = this.rating;
    locationNode.textContent = this.location;
    descriptionNode.textContent = this.description;
    deleteNode.textContent = "DELETE"

    divNode.appendChild(titleNode);
    if (this.superhost == "t") {
      var superhostNode = document.createElement("p");
      superhostNode.textContent = "SUPERHOST";
      superhostNode.setAttribute("class", "superhost");
      divNode.appendChild(superhostNode);
    }
    divNode.appendChild(priceNode);
    divNode.appendChild(ratingNode);
    divNode.appendChild(deleteNode);
    divNode2.appendChild(divNode);
    divNode2.appendChild(locationNode);
    divNode2.appendChild(descriptionNode);
    anchorNode.appendChild(imageNode);
    anchorNode.appendChild(divNode2)
    node.appendChild(anchorNode);

    return node;

  }
}

// discount object, extends property, shows a discounted price
class PropertyDiscount extends Property {
  constructor(id, title, owner, price, location, bedrooms, bathrooms, image, rating, accessibility, safety, amenities) {
    super(id, title, owner, price, location, bedrooms, bathrooms, image, rating, accessibility, safety, amenities);
    this.price = (this.price * 0.8).toFixed(2) + " Discounted from $" + this.price;
  }
}
