import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtUsersGuard } from './jwt-users.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listUsers() {
    const users = this.usersService.getAllUsers();
    return { users };
  }

  @Get(':id')
  readUserById(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);
    return { user };
  }

  @Post()
  createUser(@Body() createDto: CreateUserDto) {
    const user = this.usersService.createUser(createDto);
    return { user };
  }

  @UseGuards(JwtUsersGuard)
  @Patch(':id')
  updateUserById(@Param('id') id: string, @Req() req) {
    const { user: expectedUser, body: updateDto } = req;
    const user = this.usersService.updateUser(id, expectedUser.id, updateDto);
    return { user };
  }

  @UseGuards(JwtUsersGuard)
  @Delete(':id')
  deletUserById(@Param('id') id: string, @Req() req): void {
    const expectedUser = req.user;
    return this.usersService.deleteUser(id, expectedUser.id);
  }
}
