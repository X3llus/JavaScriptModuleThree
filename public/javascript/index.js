// property class
class Property extends HTMLElement {
  // constructor, assigns variables
  constructor(id, title, price, location, bedrooms, bathrooms, image, amenities, description, rating, superhost) {
    super();
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

    // Creating the html element
    var anchorNode = document.createElement("a");
    var imageNode = document.createElement("img");
    var titleNode = document.createElement("h3");
    var priceNode = document.createElement("p");
    var ratingNode = document.createElement("p");
    var locationNode = document.createElement("p");
    var descriptionNode = document.createElement("p");
    var divNode = document.createElement("div");
    var divNode2 = document.createElement("div");

    // Setting up the image
    imageNode.setAttribute("src", `images/${this.image}`);
    imageNode.setAttribute("height", "192px");
    imageNode.setAttribute("width", "192px");
    anchorNode.setAttribute("href", `/details?property=${this.id}`);

    titleNode.textContent = this.title;
    priceNode.textContent = "$" + this.price;
    ratingNode.textContent = this.rating;
    locationNode.textContent = this.location;
    descriptionNode.textContent = this.description;

    divNode.appendChild(titleNode);
    if (this.superhost == "t") {
      var superhostNode = document.createElement("p");
      superhostNode.textContent = "SUPERHOST";
      superhostNode.setAttribute("class", "superhost");
      divNode.appendChild(superhostNode);
    }
    divNode.appendChild(priceNode);
    divNode.appendChild(ratingNode);
    divNode2.appendChild(divNode);
    divNode2.appendChild(locationNode);
    divNode2.appendChild(descriptionNode);
    anchorNode.appendChild(imageNode);
    anchorNode.appendChild(divNode2)
    this.appendChild(anchorNode);
  }
}

// discount object, extends property, shows a discounted price
class PropertyDiscount extends Property {
  constructor(id, title, owner, price, location, bedrooms, bathrooms, image, rating, accessibility, safety, amenities) {
    super(id, title, owner, price, location, bedrooms, bathrooms, image, rating, accessibility, safety, amenities);
    this.price = (this.price * 0.8).toFixed(2) + " Discounted from $" + this.price;
    this.querySelectorAll("p")[1].textContent = this.price;
  }
}

// makes request to server to get all properties
async function main() {
  try {
    var url = "properties";
    var method = "GET";
    var headers = {
      "Content-Type": "application/json"
    };

    var res = await fetch(url, {
      method: method,
      headers: headers
    });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    buildPropertyList(await res.json());
  } catch (e) {
    console.log(e);
  }
}

// function to build out a list of properties and display them to the user
function buildPropertyList(list) {

  var properties = [];

  for (var i = 0; i < list.length; i++) {
    var current = list[i];
    if (current.discount == "t") {
      document.querySelector("ul").appendChild(new PropertyDiscount(current.id, current.title, current.price, current.address, current.bedrooms, current.bathrooms, current.image, current.ammenities, current.description, current["AVG(r.rating)"], current.superhost));
    } else {
      document.querySelector("ul").appendChild(new Property(current.id, current.title, current.price, current.address, current.bedrooms, current.bathrooms, current.image, current.ammenities, current.description, current["AVG(r.rating)"], current.superhost));
    }
  }
}

customElements.define("property-li", Property);
customElements.define("property-dis-li", PropertyDiscount);

main();
