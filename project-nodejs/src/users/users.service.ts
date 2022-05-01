import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserI } from './interfaces/user.interface';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly users: UserI[] = [];

  constructor(private jwtService: JwtService) {}

  getAllUsers(): UserI[] {
    return this.users;
  }

  getUserById(id: string): UserI {
    const user = this.users.find((el: UserI) => el.id === id);

    if (!user)
      throw new HttpException(
        'User with the specified id was not found',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  createUser(dto: CreateUserDto) {
    const createdUser: UserI = {
      id: v4(),
      ...dto,
    };

    this.users.push(createdUser);

    const token = this.generateToken(createdUser);
    return { ...createdUser, token };
  }

  updateUser(id: string, expectedUserId: string, dto: CreateUserDto): UserI {
    if (id !== expectedUserId)
      throw new UnauthorizedException({ message: 'Incorrect token' });

    const user = this.getUserById(id);
    user.name = dto.name;
    return user;
  }

  deleteUser(id: string, expectedUserId: string): void {
    if (id !== expectedUserId)
      throw new UnauthorizedException({ message: 'Incorrect token' });

    const index = this.users.findIndex((el: UserI) => el.id === id);

    if (index === -1)
      throw new HttpException(
        'User with the specified id was not found',
        HttpStatus.NOT_FOUND,
      );

    this.users.splice(index, 1);
    return;
  }

  generateToken(user: UserI) {
    const payload = { ...user };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
