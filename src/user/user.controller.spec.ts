// src/user/user.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'your_jwt_secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should register a user', () => {
    const user = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
    };

    jest.spyOn(userService, 'register').mockImplementation(() => user);

    expect(userController.register(user)).toBe(user);
  });

  it('should return a JWT token when login', () => {
    const user = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
    };

    const jwt = {
      access_token: 'your_jwt_token',
    };

    jest.spyOn(userService, 'login').mockImplementation(() => jwt);

    expect(userController.login(user.username, user.password)).toBe(jwt);
  });
});
