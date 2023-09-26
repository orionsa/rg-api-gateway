import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { compare } from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { USER_SERVICE_EP } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const { data: user } = await firstValueFrom(
      this.httpService.get(
        `${USER_SERVICE_EP}/api/v1/user/getByEmail?email=${email}`,
      ),
    );

    const isValid = await compare(password, user.password);
    if (isValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { email, id } = user;
    const payload = { identifier: email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
