import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
} from '@nestjs/common';

import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RefreshTokenGuard } from './auth/guards/refresh-token.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './utils/decorators';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    /**
     * @TODO
     * send refresh token as cookie to client
     */
    return this.authService.login(req.user);
  }

  @Patch('test')
  test(@Request() req) {
    console.log('Patch test req.user', req.user);
    return 'test';
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('auth/accessToken')
  getAccessToken(@Request() req) {
    return this.authService.getAccessToken(req.user);
  }
}
