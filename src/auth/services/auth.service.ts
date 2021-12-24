import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/token.model';
import config from 'src/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jtwService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  generateJTW(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jtwService.sign(payload),
      expiresIn: this.configService.app.jwtExpiresIn,
      user,
    };
  }

  async refreshToken(token: string) {
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decode = this.jtwService.decode(tokenWithoutBearer);
    if (decode) {
      const user = await this.userService.findById(decode.sub);
      if (user) {
        const payload: PayloadToken = { role: user.role, sub: user.id };
        return {
          access_token: this.jtwService.sign(payload),
          expiresIn: this.configService.app.jwtExpiresIn,
          user,
        };
      } else {
        throw new UnauthorizedException('not allow');
      }
    } else {
      throw new UnauthorizedException('not allow');
    }
  }

  async validateToken(token: string) {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const verify = this.jtwService.verify(tokenWithoutBearer);
      return verify;
    } catch (e) {
      throw new UnauthorizedException('not allow');
    }
  }
}
