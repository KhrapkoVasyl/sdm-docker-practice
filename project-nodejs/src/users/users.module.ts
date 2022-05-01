import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '48h',
      },
    }),
  ],
})
export class UsersModule {}
