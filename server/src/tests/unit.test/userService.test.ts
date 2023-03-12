import { makeUserService} from '../../db/service/user.service';
import {IUserService} from "../../service/user.interface";
import {conn} from "../../db/model/conn";


describe('UserService', () => {

  const userService = makeUserService();

  beforeAll(async () => {
    await conn.collection('restaurants').deleteMany({});
    await conn.collection('users').deleteMany({});
    await conn.collection('groups').deleteMany({});
  });

  afterAll(async () => {
    await conn.close();
  });

  describe('registerUser', () => {
    test('should add a new user to the users map', async () => {
      const id = 'test-id-1';
      const password = 'test-password';

      const result = await userService.registerUser(id, password);

      expect(result).toBe(true);
    //  expect(userService.getUsers().size).toBe(1);

      const user = await userService.findUser(id);
      expect(user.id).toBe(id);
      expect(user.password).toBe(password);
    });

    test('should return false if user already exists', async () => {
      const id = 'test-id-1';
      const password = 'test-password';

      await userService.registerUser(id, password);
      const result = await userService.registerUser(id, password);

      expect(result).toBe(false);
    //  expect(userService.getUsers().size).toBe(1);
    });
  });

  describe('checkUser', () => {
    test('should return true if user exists', async () => {
      const id = 'test-id-1';
      const password = 'test-password';

      await userService.registerUser(id, password);
      const result = await userService.checkUser(id);

      expect(result).toBe(true);
    });

    test('should return false if user does not exist', async () => {
      const id = 'test-id-2';
      const result = await userService.checkUser(id);

      expect(result).toBe(false);
    });
  });
  

  // ... Add more test cases for other UserService methods as needed
});

