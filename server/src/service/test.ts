//unit test folder, at least one test is required for the lab

import { Dish } from '../model/dish';
import { User } from '../model/user';

describe('Dish', () => {
  let dish: Dish;
  let user: User;

  beforeEach(() => {
    dish = new Dish(1, 'Pizza', 'https://example.com/pizza.jpg');
    user = new User(1, 'Abbas Faizi','abbas@gmail.com');
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
