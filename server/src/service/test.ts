//unit test folder, at least one test is required for the lab

import { Restaurants } from '../model/restaurants';
import { User } from '../model/user';

describe('Dish', () => {
  let restaurant: Restaurants;
  let user: User;

  beforeEach(() => {
    restaurant = new Restaurants(1, 'Pizza', 'https://example.com/pizza.jpg');
    user = new User(1, 'Abbas Faizi','abbas@gmail.com', "mypassword");
  });

  it('should have empty arrays for likedBy and dislikedBy', () => {
    expect(user.liked).toEqual([]);
    expect(user.disliked).toEqual([]);
  });

  it('should be able to like a dish', () => {
    user.like(restaurant);
    expect(user.liked).toEqual([user]);
  });

  it('should be able to dislike a dish', () => {
    user.dislike(restaurant);
    expect(user.disliked).toEqual([user]);
  });
});
