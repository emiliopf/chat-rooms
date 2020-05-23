import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';


@Injectable()
export class IsUserGuard implements CanActivate {

  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { headers: { authorization } } = request;

    if (!authorization) throw new UnauthorizedException()

    const token = authorization.replace('Bearer ', '');

    try {
      const { userId } = this.jwtService.verify(token);

      if (!userId) throw new UnauthorizedException();
      // wip: there should be other way to pass the userId to the controller without change Request
      request.user = userId; 
      return true;
    } catch (err) {
      return false;
    }

  }
}