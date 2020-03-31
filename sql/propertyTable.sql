CREATE TABLE properties (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `title` VARCHAR(40) NOT NULL,
  `price` DEC(6,2) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `bedrooms` INT NOT NULL,
  `bathrooms` INT NOT NULL,
  `image` VARCHAR(50) NOT NULL,
  `ammenities` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `discount` char(1) default 'f',
  FOREIGN KEY (ownerId) REFERENCES users (id)
)
