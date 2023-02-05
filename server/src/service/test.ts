//unit test folder, at least one test is required for the lab

import { Restaurants } from '../model/restaurants';
import { User } from '../model/user';

describe('Dish', () => {
  let dish: Restaurants;
  let user: User;

  beforeEach(() => {
    dish = new Restaurants(1, 'Pizza', 'https://example.com/pizza.jpg');
    user = new User(1, 'Abbas Faizi','abbas@gmail.com', "mypassword");
  });

  it('should have empty arrays for likedBy and dislikedBy', () => {
    expect(dish.likedBy).toEqual([]);
    expect(dish.dislikedBy).toEqual([]);
  });

  it('should be able to like a dish', () => {
    dish.like(user);
    expect(dish.likedBy).toEqual([user]);
  });

  it('should be able to dislike a dish', () => {
    dish.dislike(user);
    expect(dish.dislikedBy).toEqual([user]);
  });
});
