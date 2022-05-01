import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtUsersGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Incorrect token' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: 'Incorrect token' });
    }
  }
}
