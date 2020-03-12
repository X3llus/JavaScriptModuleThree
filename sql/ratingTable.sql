CREATE TABLE rating (
  `id` int not null PRIMARY KEY AUTO_INCREMENT,
  `userId` int not null,
  `propertyId` int not null,
  `rating` int not null,
  `review` text not null,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (propertyId) REFERENCES properties (id)
)
