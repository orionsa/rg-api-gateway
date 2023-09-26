import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REF,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const {
      body: { refreshToken },
    } = req;
    const isValid = await this.authService.validateRefreshToken(
      payload.sub,
      refreshToken,
    );

    return isValid ? { ...payload } : null;
  }
}
