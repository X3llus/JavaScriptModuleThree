class Property {
  constructor(id, title, owner, price, location, bedrooms, bathrooms, image, rating, accessibility, safety, amenities) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.price = price;
    this.location = location;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.image = image;
    this.rating = rating;
    this.accessibility = accessibility;
    this.safety = safety;
    this.amenities = amenities;
  }

  get availability() {
    
  }

  get display() {

  }

  book() {

  }

  rate(stars) {

  }

}

class DiscountProperty extends Property {
  constructor() {

  }
}
