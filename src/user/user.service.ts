// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserResponse } from './user-response.interface';

@Injectable()
export class UserService {
  register(user: User): UserResponse {
    // your logic here
    return {
      id: user.id,
      username: user.username,
      access_token: 'your_generated_token_here',
    };
  }

  login(username: string, password: string): UserResponse | null {
    // your logic here
    const user = this.findUserByUsernameAndPassword(username, password);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        access_token: 'your_generated_token_here',
      };
    }
    return null;
  }

  // Add a method to find a user by their username and password
  findUserByUsernameAndPassword(username: string, password: string): User | null {
    // your logic here
  }
}
