CREATE TABLE properties (
  `id` INT NOT NULL PRIMARY KEY,
  `ownerId` INT NOT NULL,
  `title` VARCHAR(40) NOT NULL,
  `price` DEC(6,2) NOT NULL,
  `streetAddress` VARCHAR(100) NOT NULL,
  `bedrooms` INT NOT NULL,
  `bathrooms` INT NOT NULL,
  `image` VARCHAR(50) NOT NULL,
  `ammenities` TEXT NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES users (id)
)
