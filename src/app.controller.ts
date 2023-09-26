import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './utils/decorators';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('test')
  test(@Request() req) {
    console.log(req.user);
    return 'test';
  }
}
